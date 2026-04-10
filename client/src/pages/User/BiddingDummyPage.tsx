import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateBid } from "@/hooks/bid/useBid";
import { connectSocket, getSocket } from "@/lib/socket";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Radio, BellRing, Activity } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface LiveBidEvent {
  at: string;
  category: string;
  payload: {
    message?: string;
    result?: unknown;
  };
}

export default function BiddingDummyPage() {
  const mutation = useCreateBid();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [offeredPrice, setOfferedPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => title.trim() && category.trim() && offeredPrice !== "" && Number(offeredPrice) > 0 && description.trim().length >= 10, [category, description, offeredPrice, title]);

  const [joinedCategory, setJoinedCategory] = useState<string>("");
  const [events, setEvents] = useState<LiveBidEvent[]>([]);

  useEffect(() => {
    const s = connectSocket();
    const onNewBid = (...args: unknown[]) => {
      const message = typeof args[0] === "string" ? (args[0] as string) : undefined;
      const result = args[1];
      setEvents((prev) => [
        {
          at: new Date().toISOString(),
          category: joinedCategory,
          payload: { message, result },
        },
        ...prev,
      ]);
      toast.success(typeof message === "string" ? message : "New bid event", { icon: <Zap className="h-4 w-4 text-cyan-500" /> });
    };
    s.on("newBid", onNewBid);
    return () => {
      getSocket().off("newBid", onNewBid);
    };
  }, [joinedCategory]);

  const join = () => {
    if (!category.trim()) return;
    const s = connectSocket();
    s.emit("joinBidsRoom", category.trim());
    setJoinedCategory(category.trim());
    toast.success(`Joined room: ${category.trim()}`);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({ title, category, offeredPrice: Number(offeredPrice), description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Live Bidding Arena</h1>
        <p className="text-muted-foreground mt-1">Broadcast requests and watch real-time events via Socket.IO.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Zap className="h-40 w-40 text-cyan-500" /></div>
            <CardHeader className="relative z-10 border-b border-border/40 pb-4 bg-muted/20">
              <CardTitle>Broadcast a Request</CardTitle>
              <CardDescription>Dispatch a bid to the backend room.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 relative z-10">
              <form id="bidForm" onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium">Job Title</div>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Need immediate plumbing fix" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Category Room</div>
                    <div className="flex gap-2">
                      <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. plumber" className="bg-background/50" />
                      <Button type="button" variant="secondary" onClick={join} className="shrink-0 group">
                        <Radio className="h-4 w-4 mr-2 group-hover:text-cyan-500 transition-colors" /> Join
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Offered Price ($)</div>
                    <Input type="number" min={1} value={offeredPrice} onChange={(e) => setOfferedPrice(e.target.value ? Number(e.target.value) : "")} placeholder="0" className="bg-background/50" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium">Description</div>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the job (min 10 chars)" className="resize-none bg-background/50" rows={3} />
                  </div>
                </div>
                <div className="pt-2">
                  <Button type="submit" disabled={!canSubmit || mutation.isPending} className="w-full text-base h-11 bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-600/20 text-white">
                    {mutation.isPending ? <><Spinner className="h-4 w-4 mr-2" /> Broadcasting…</> : <><Zap className="h-4 w-4 mr-2" /> Broadcast Bid</>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Activity className="h-40 w-40 text-emerald-500" /></div>
            <CardHeader className="relative z-10 border-b border-border/40 pb-4 bg-[color:var(--surface-2)]">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Event Feed</CardTitle>
                  <CardDescription>
                    Listening on room: {joinedCategory ? <span className="font-semibold text-cyan-500">{joinedCategory}</span> : "None"}
                  </CardDescription>
                </div>
                {joinedCategory && (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative z-10 bg-black/20">
              <div className="h-[400px] overflow-y-auto p-4 space-y-3 font-mono text-sm">
                {events.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60 gap-4">
                    <BellRing className="h-10 w-10 opacity-50" />
                    <p className="font-sans">Waiting for incoming bid events...</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {events.map((e, idx) => (
                      <motion.div
                        key={`${e.at}-${idx}`}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3 shadow-md"
                      >
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold">EVENT: newBid</span>
                          <span>{new Date(e.at).toLocaleTimeString()}</span>
                        </div>
                        <div className="mt-2 text-foreground font-medium">{e.payload?.message || "Incoming payload received"}</div>
                        {e.payload.result && typeof e.payload.result === "object" && "title" in e.payload.result ? (
                          <div className="mt-2 pl-3 border-l-2 border-cyan-500/30 text-muted-foreground">
                            Job: <span className="text-foreground">{String((e.payload.result as { title?: unknown }).title ?? "")}</span>
                          </div>
                        ) : null}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
