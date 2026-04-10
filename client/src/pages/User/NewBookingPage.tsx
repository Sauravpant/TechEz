import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateBooking } from "@/hooks/booking/useBookings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Sparkles } from "lucide-react";

export default function NewBookingPage() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const technicianId = sp.get("technicianId") ?? "";
  const category = sp.get("category") ?? "";

  const createMutation = useCreateBooking();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [initialPrice, setInitialPrice] = useState<number | "">("");

  const canSubmit = useMemo(() => technicianId && category && title.trim() && description.trim() && location.trim() && initialPrice !== "", [category, description, location, technicianId, title, initialPrice]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      technicianId,
      category,
      title,
      description,
      location,
      initialPrice: Number(initialPrice),
    });
    navigate("/user/dashboard/bookings", { replace: true });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Button variant="ghost" asChild className="pl-0 mb-4 text-muted-foreground hover:bg-transparent hover:text-foreground">
          <Link to={`/technicians/${technicianId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to technician
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Request Service</h1>
        <p className="text-muted-foreground mt-1 text-lg">Detail your problem to get a precise quote.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none"><Sparkles className="h-40 w-40 text-indigo-500" /></div>
          <CardHeader className="pb-6 border-b border-border/40 bg-muted/20 relative z-10">
            <CardTitle>Booking Details</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <span className="bg-background px-2 py-1 rounded-md border border-border/60 font-medium text-xs uppercase tracking-wider">
                {category || "General"} Category
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 relative z-10">
            <form id="bookingForm" onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Job Title</div>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Broken AC Compressor" 
                  className="h-12 bg-background/50" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium flex justify-between">
                  <span>Detailed Description</span>
                  <span className="text-muted-foreground font-normal text-xs">Be as specific as possible</span>
                </div>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe the issue, when it started, and any specific requirements..." 
                  className="resize-none bg-background/50" 
                  rows={5} 
                  required 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Service Location</div>
                  <Input 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="Full address" 
                    className="h-11 bg-background/50" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Your Initial Offer ($)</div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      min={0} 
                      value={initialPrice} 
                      onChange={(e) => setInitialPrice(e.target.value ? Number(e.target.value) : "")} 
                      placeholder="0" 
                      className="h-11 pl-8 bg-background/50 font-medium" 
                      required 
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">The technician can accept this or propose a new total.</p>
                </div>
              </div>
            </form>
          </CardContent>
          <div className="p-6 bg-muted/10 border-t border-border/40 flex justify-end relative z-10">
            <Button 
              type="submit" 
              form="bookingForm" 
              disabled={!canSubmit || createMutation.isPending} 
              size="lg" 
              className="w-full sm:w-auto shadow-lg shadow-primary/20 text-base h-12"
            >
              {createMutation.isPending ? (
                <><Spinner className="h-4 w-4 mr-2" /> Sending Request…</>
              ) : (
                <><Send className="h-4 w-4 mr-2" /> Send Booking Request</>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
