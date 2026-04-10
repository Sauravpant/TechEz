import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useReportTechnician } from "@/hooks/report/useReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ShieldAlert } from "lucide-react";

export default function NewReportPage() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const technicianId = sp.get("technicianId") ?? "";

  const mutation = useReportTechnician();

  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit = useMemo(() => technicianId && reason.trim().length >= 3 && description.trim().length >= 10, [description, reason, technicianId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutation.mutateAsync({ technicianId, data: { reason, description } });
    navigate("/user/dashboard/reports", { replace: true });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Button variant="ghost" asChild className="pl-0 mb-4 text-muted-foreground hover:bg-transparent hover:text-foreground">
          <Link to={technicianId ? `/technicians/${technicianId}` : "/technicians"}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back {technicianId ? "to profile" : "to directory"}
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Report an Issue</h1>
        <p className="text-muted-foreground mt-1 text-lg">Help us maintain platform quality and trust.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-destructive/30 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><AlertTriangle className="h-40 w-40 text-destructive" /></div>
          <CardHeader className="pb-6 border-b border-border/40 bg-destructive/5 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-destructive/10 grid place-items-center text-destructive">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">File a Report</CardTitle>
                <CardDescription className="text-xs uppercase tracking-wider font-medium text-foreground mt-1">
                  Target ID: {technicianId || "—"}
                </CardDescription>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-prose">
              All reports are reviewed by our trust and safety team. False reports may lead to account consequences.
            </p>
          </CardHeader>
          <CardContent className="pt-6 relative z-10">
            <form id="reportForm" onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Brief Reason</div>
                <Input 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)} 
                  placeholder="e.g. Unprofessional behavior, No-show, Overcharging..." 
                  className="h-11 bg-background/50 focus-visible:ring-destructive" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium flex justify-between">
                  <span>Detailed Description</span>
                  <span className="text-muted-foreground font-normal text-xs">Min 10 characters</span>
                </div>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Please provide specific details about what happened..." 
                  className="resize-none bg-background/50 focus-visible:ring-destructive" 
                  rows={6} 
                  required 
                />
              </div>
            </form>
          </CardContent>
          <div className="p-6 bg-muted/10 border-t border-border/40 flex justify-end relative z-10">
            <Button 
              type="submit" 
              form="reportForm" 
              variant="destructive"
              disabled={!canSubmit || mutation.isPending} 
              size="lg" 
              className="w-full sm:w-auto shadow-lg shadow-destructive/20 text-base h-12"
            >
              {mutation.isPending ? (
                <><Spinner className="h-4 w-4 mr-2" /> Submitting…</>
              ) : (
                <><ShieldAlert className="h-4 w-4 mr-2" /> Submit Report</>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
