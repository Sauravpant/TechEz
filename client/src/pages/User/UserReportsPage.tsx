import { Link } from "react-router-dom";
import { useDeleteReport, useUserReports } from "@/hooks/report/useReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { ShieldAlert, Trash2, Clock, AlertTriangle } from "lucide-react";

export default function UserReportsPage() {
  const { data, isLoading, error } = useUserReports();
  const reports = data?.data ?? [];
  const del = useDeleteReport();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold tracking-tight">My Reports</h1>
          <p className="text-muted-foreground mt-1">Status of issues you've reported.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Button asChild variant="outline" className="border-border/60">
            <Link to="/technicians">Report a Technician</Link>
          </Button>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Spinner /> Loading reports…
        </div>
      ) : error ? (
        <div className="text-sm text-destructive text-center py-20">Failed to load reports.</div>
      ) : reports.length === 0 ? (
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg border-dashed">
          <CardContent className="py-20 flex flex-col items-center justify-center text-center">
            <ShieldAlert className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">No active reports</p>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">You haven't filed any reports against technicians.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reports.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
            >
              <Card className="h-full bg-[color:var(--surface)] backdrop-blur-xl border-destructive/20 shadow-sm relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 p-4 opacity-5"><AlertTriangle className="h-24 w-24 text-destructive" /></div>
                <CardHeader className="pb-3 border-b border-border/40 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-destructive/10 grid place-items-center shrink-0">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-foreground/90 font-semibold mb-1">
                        Report against{" "}
                        <Link className="text-indigo-500 hover:underline" to={`/technicians/${r.reportedTechnician.id}`}>
                          {r.reportedTechnician.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="uppercase tracking-wider text-[11px] font-medium text-destructive">
                        {r.reason}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 flex-1 relative z-10">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{r.details}</div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/30">
                      <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Filed {new Date(r.createdAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-muted/60 text-foreground font-medium">Pending Review</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 relative z-10">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (confirm("Withdraw this report?")) {
                        del.mutate({ reportId: r.id })
                      }
                    }} 
                    disabled={del.isPending}
                    className="w-full text-destructive border-border/50 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Withdraw Report
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
