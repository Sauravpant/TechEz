import { Link } from "react-router-dom";
import { useUserBookings } from "@/hooks/booking/useBookings";
import { useMyProfile } from "@/hooks/user/useProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Plus, ShieldCheck, Zap, ChevronRight, BriefcaseBusiness } from "lucide-react";

export default function UserOverviewPage() {
  const { data: bData, isLoading: bLoading } = useUserBookings({ limit: 50 });
  const { data: pData, isLoading: pLoading } = useMyProfile();

  const bookings = bData?.data ?? [];
  const profile = pData?.data;
  const isLoading = bLoading || pLoading;

  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const activeCount = bookings.filter((b) => b.status === "accepted").length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center gap-3 text-muted-foreground">
        <Spinner /> Loading your overview…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {profile?.name?.split(" ")[0] ?? "User"}!</h1>
          <p className="text-muted-foreground mt-1">Here is a quick summary of your service requests.</p>
        </div>
        <Button asChild className="shadow-lg shadow-primary/20 h-11">
          <Link to="/technicians" className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" /> Book a Service
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Clock className="h-10 w-10 text-indigo-500" /></div>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
              <div className="text-3xl font-bold mt-1 tracking-tight relative z-10">{pendingCount}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50"><Zap className="h-10 w-10 text-cyan-500" /></div>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
              <div className="text-3xl font-bold mt-1 tracking-tight relative z-10">{activeCount}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-50"><CheckCircle2 className="h-10 w-10 text-emerald-500" /></div>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <div className="text-3xl font-bold mt-1 tracking-tight relative z-10">{completedCount}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
          <Card className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg relative overflow-hidden border-0">
            <div className="absolute top-0 right-0 p-4 opacity-20"><ShieldCheck className="h-10 w-10" /></div>
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <p className="text-sm font-medium text-white/80">Total Activity</p>
                <div className="text-3xl font-bold mt-1 tracking-tight">{bookings.length}</div>
              </div>
              <p className="text-xs text-white/80 mt-2">Bookings historically</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg flex flex-col h-full">
            <CardHeader className="pb-3 border-b border-border/40">
              <CardTitle className="text-lg">Recent Bookings</CardTitle>
              <CardDescription>Status of your latest requests.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                  <BriefcaseBusiness className="h-10 w-10 opacity-20 mb-3" />
                  <p>You haven't made any bookings yet.</p>
                </div>
              ) : (
                <div className="divide-y divide-border/40">
                  {bookings.slice(0, 5).map((b) => (
                    <div key={b.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-muted/60 border border-border/40 grid place-items-center shrink-0">
                          {b.technician?.profilePictureUrl ? (
                            <img src={b.technician.profilePictureUrl} alt={b.technician.name} className="h-full w-full object-cover rounded-xl" />
                          ) : (
                            <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm leading-none mb-1.5">{b.title}</div>
                          <div className="text-xs text-muted-foreground">Technician: {b.technician?.name || "Unknown"}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          b.status === "pending" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                          b.status === "accepted" ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" :
                          b.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                          "bg-destructive/10 text-destructive border border-destructive/20"
                        }`}>
                          {b.status}
                        </span>
                        <span className="text-xs font-medium">${b.finalPrice || b.initialPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {bookings.length > 0 && (
              <div className="p-3 border-t border-border/40">
                <Button variant="ghost" className="w-full text-xs h-8" asChild>
                  <Link to="/user/dashboard/bookings">View all history <ChevronRight className="h-3.5 w-3.5 ml-1" /></Link>
                </Button>
              </div>
            )}
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
          <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg sticky top-24">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto h-20 w-20 rounded-full border-4 border-background bg-muted overflow-hidden shadow-sm grid place-items-center mb-3">
                {profile?.profilePictureUrl ? (
                  <img src={profile.profilePictureUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                    {profile?.name?.slice(0, 1)?.toUpperCase() ?? "U"}
                  </span>
                )}
              </div>
              <CardTitle className="text-lg">{profile?.name}</CardTitle>
              <CardDescription className="text-xs truncate">{profile?.email}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-sm bg-muted/60 px-3 py-1.5 rounded-lg border border-border/40">
                <ShieldCheck className="h-4 w-4 text-indigo-500" />
                User Account
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline" className="w-full text-sm" asChild>
                  <Link to="/user/dashboard/settings">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
