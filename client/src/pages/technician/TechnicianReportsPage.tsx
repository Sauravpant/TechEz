import { useTechnicianReports } from "@/hooks/report/useReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, UserIcon } from "lucide-react";

export default function TechnicianReportsPage() {
  const { data, isLoading, error } = useTechnicianReports();
  const reports = data?.data ?? [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">Issues reported by users regarding your services.</p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Spinner /> Loading reports…
        </div>
      ) : error ? (
        <div className="text-sm text-destructive text-center py-20">Failed to load reports.</div>
      ) : reports.length === 0 ? (
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg border-dashed">
          <CardContent className="py-20 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 mb-4 rounded-full bg-emerald-500/10 grid place-items-center">
              <AlertTriangle className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="text-base font-medium">All clear</p>
            <p className="text-sm text-muted-foreground mt-1">You have no reports entirely. Keep up the good work!</p>
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
              <Card className="h-full bg-gradient-to-br from-destructive/5 to-background border-destructive/20 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-destructive/10 grid place-items-center shrink-0">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-destructive">{r.reason}</CardTitle>
                      <CardDescription className="uppercase tracking-wider text-[10px] sm:text-xs mt-1.5 flex flex-wrap gap-2 items-center">
                        <span className="inline-flex items-center gap-1"><UserIcon className="h-3 w-3" /> {r.reporter.name}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(r.createdAt).toLocaleDateString()}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{r.details}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
