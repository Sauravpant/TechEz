import { Link } from "react-router-dom";
import { useTechnicianBookings } from "@/hooks/booking/useBookings";
import { useTechnicianReviews } from "@/hooks/review/useReviews";
import { useTechnicianReports } from "@/hooks/report/useReports";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Star, TrendingUp, AlertOctagon, CheckCircle2, Clock, ChevronRight } from "lucide-react";

export default function TechnicianOverviewPage() {
  const { data: bookingsData, isLoading: bookingsLoading } = useTechnicianBookings({ limit: 100 });
  const { data: reviewsData, isLoading: reviewsLoading } = useTechnicianReviews();
  const { data: reportsData, isLoading: reportsLoading } = useTechnicianReports();

  const bookings = bookingsData?.data ?? [];
  const reviews = reviewsData?.data;
  const reports = reportsData?.data ?? [];

  const isLoading = bookingsLoading || reviewsLoading || reportsLoading;

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const acceptedCount = bookings.filter((b) => b.status === "accepted").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

  const chartData = [
    { name: "Pending", count: pendingCount, fill: "hsl(var(--primary))" },
    { name: "Accepted", count: acceptedCount, fill: "hsl(var(--primary))" },
    { name: "Completed", count: completedCount, fill: "hsl(var(--primary))" },
    { name: "Cancelled", count: cancelledCount, fill: "hsl(var(--destructive))" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center gap-3 text-muted-foreground font-medium">
        <Spinner /> Loading your overview…
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1.5 text-base font-medium">Here's what's happening with your technician account today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Pending Bookings"
          value={pendingCount}
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          delay={0}
        />
        <StatCard
          title="Completed Jobs"
          value={completedCount}
          icon={<CheckCircle2 className="h-5 w-5 text-muted-foreground" />}
          delay={0.05}
        />
        <StatCard
          title="Average Rating"
          value={`${reviews?.averageRating ?? 0} / 5`}
          subtitle={`${reviews?.totalReviews ?? 0} reviews`}
          icon={<Star className="h-5 w-5 text-muted-foreground" />}
          delay={0.1}
        />
        <StatCard
          title="Active Reports"
          value={reports.length}
          icon={<AlertOctagon className="h-5 w-5 text-muted-foreground" />}
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
          <Card className="h-full bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <div className="space-y-1.5">
                <CardTitle className="text-xl font-bold">Booking Status</CardTitle>
                <CardDescription className="text-sm font-medium">Your pipeline breakdown.</CardDescription>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" fontSize={13} fontWeight={500} tickLine={false} axisLine={false} opacity={0.6} />
                    <YAxis fontSize={13} fontWeight={500} tickLine={false} axisLine={false} opacity={0.6} />
                    <Tooltip cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }} contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.1)', backgroundColor: 'hsl(var(--background))' }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <Card className="h-full bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm flex flex-col">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
              <CardDescription className="text-sm font-medium">Latest requests requiring attention.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="flex flex-col h-full justify-between">
                <div>
                  {bookings.length === 0 ? (
                    <div className="text-sm font-medium text-muted-foreground py-12 text-center bg-muted/20 border-y border-border/40">No activity recorded yet.</div>
                  ) : (
                    bookings.slice(0, 5).map((b) => (
                      <div key={b.id} className="flex items-center justify-between border-b border-border/40 px-6 py-4 hover:bg-muted/10 transition-colors">
                        <div>
                          <div className="text-sm font-bold leading-none mb-1.5">{b.title}</div>
                          <div className="text-xs text-muted-foreground font-medium">{b.user.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{b.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {bookings.length > 0 && (
                  <div className="p-4 bg-muted/10 border-t border-border/40 mt-auto">
                    <Button variant="ghost" className="w-full text-xs font-semibold h-9" asChild>
                      <Link to="/technician/dashboard/bookings">View comprehensive list <ChevronRight className="h-4 w-4 ml-1.5" /></Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, delay }: { title: string; value: string | number; subtitle?: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm hover:border-border hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{title}</p>
              <div className="text-3xl font-black tracking-tight text-foreground">{value}</div>
              {subtitle && <p className="text-xs text-muted-foreground mt-2 font-medium bg-muted/40 inline-flex px-2 py-0.5 rounded">{subtitle}</p>}
            </div>
            <div className="h-12 w-12 rounded-2xl bg-muted/30 border border-border/40 grid place-items-center shrink-0 shadow-sm">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
