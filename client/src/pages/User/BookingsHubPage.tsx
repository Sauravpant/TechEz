import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useUserBookings, useUserCancelBooking, useUserAgreement } from "@/hooks/booking/useBookings";
import type { BookingStatus } from "@/types/booking";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Clock, TrendingUp, CheckCircle2, XCircle, MapPin, Plus, Zap, AlertTriangle, ShieldCheck, Wrench, Activity, ChevronRight } from "lucide-react";

export default function BookingsHubPage() {
  const [sp] = useSearchParams();
  const status = sp.get("status") as BookingStatus | null;

  const filters = useMemo(() => ({ status: status || undefined, sortBy: "desc" as const, limit: 20, page: 0 }), [status]);
  const { data, isLoading, error } = useUserBookings(filters);
  const bookings = data?.data ?? [];

  const agreeMutation = useUserAgreement();
  const cancelMutation = useUserCancelBooking();

  const StatusIcon = ({ status }: { status: BookingStatus }) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-indigo-500" />;
      case "accepted": return <TrendingUp className="h-4 w-4 text-cyan-500" />;
      case "completed": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 py-8 max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-4xl font-extrabold tracking-tight">Service Bookings</h1>
        <p className="text-muted-foreground mt-2 text-lg font-medium">Request a new service or manage your active jobs.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Link to="/technicians" className="block h-full group">
            <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm relative overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-md hover:border-border">
              <div className="absolute -bottom-6 -right-6 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Wrench className="h-48 w-48 text-foreground" />
              </div>
              <CardHeader className="pb-4 relative z-10 space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-muted/60 border border-border/50 grid place-items-center shadow-sm">
                  <Plus className="h-7 w-7 text-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center justify-between">
                    Manual Booking
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription className="text-base mt-2 font-medium leading-relaxed">
                    Browse our marketplace to find the perfect verified professional for your specific needs, and negotiate a price.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
          <Link to="/bookings/live" className="block h-full group">
            <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm relative overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-md hover:border-border">
              <div className="absolute -bottom-6 -right-6 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                <Activity className="h-48 w-48 text-foreground" />
              </div>
              <CardHeader className="pb-4 relative z-10 space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-muted/60 border border-border/50 grid place-items-center shadow-sm">
                  <Zap className="h-7 w-7 text-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center justify-between">
                    Live Bidding Arena
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription className="text-base mt-2 font-medium leading-relaxed">
                    Need it done urgently? Broadcast your request to available professionals and receive competing offers in real-time.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </motion.div>
      </div>

      <div className="pt-6 border-t border-border/40">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Your Booking History</h2>
        
        <div className="space-y-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
              <Spinner /> Loading your history…
            </div>
          ) : error ? (
            <div className="text-sm font-medium text-destructive text-center py-20 bg-destructive/10 rounded-2xl border border-destructive/20">Failed to load bookings.</div>
          ) : bookings.length === 0 ? (
            <Card className="bg-transparent border-dashed shadow-none">
              <CardContent className="py-24 text-center flex flex-col items-center">
                <ShieldCheck className="h-14 w-14 text-muted-foreground/30 mb-4" />
                <p className="text-xl font-bold">No active or past bookings</p>
                <p className="text-muted-foreground text-sm font-medium mt-2 max-w-sm mb-6">Select an option above to get started with your first service request.</p>
              </CardContent>
            </Card>
          ) : (
            bookings.map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
              >
                <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6 flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-xl">{b.title}</h3>
                            <div className={`inline-flex sm:hidden items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
                              b.status === "pending" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                              b.status === "accepted" ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" :
                              b.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                              "bg-destructive/10 text-destructive border border-destructive/20"
                            }`}>
                              {b.status}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium flex-wrap bg-muted/40 p-2 rounded-lg inline-flex">
                            <span className="text-foreground">{b.technician?.name || "Unknown Technician"}</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {b.location}</span>
                            <span>•</span>
                            <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-[15px] text-foreground leading-relaxed pl-1 border-l-2 border-border">{b.description}</p>

                        {!b.userAgreement && b.finalPrice !== undefined && b.finalPrice !== b.initialPrice && b.status === "pending" && (
                          <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 flex sm:items-center flex-col sm:flex-row gap-4 justify-between mt-4">
                            <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 text-sm font-bold">
                              <AlertTriangle className="h-5 w-5" /> 
                              <span>Price updated by technician to <span className="text-lg ml-1 font-black">${b.finalPrice}</span></span>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 shrink-0 font-bold h-10 px-6"
                              onClick={() => agreeMutation.mutate({ bookingId: b.id })}
                              disabled={agreeMutation.isPending}
                            >
                              Agree & Contine
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 sm:w-56 flex flex-col gap-4 justify-between border-t sm:border-t-0 sm:border-l border-border/40 pt-5 sm:pt-0 sm:pl-6 bg-muted/10 sm:bg-transparent rounded-b-xl sm:rounded-none p-4 sm:p-0 -mx-6 -mb-6 sm:mx-0 sm:mb-0">
                        <div>
                          <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Status</div>
                          <div className={`hidden sm:inline-flex items-center gap-2 font-bold text-[11px] uppercase tracking-wider px-3 py-1 rounded-md shadow-sm mb-4 ${
                            b.status === "pending" ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                            b.status === "accepted" ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" :
                            b.status === "completed" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                            "bg-destructive/10 text-destructive border border-destructive/20"
                          }`}>
                            <StatusIcon status={b.status} /> {b.status}
                          </div>
                          
                          <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Total Price</div>
                          <div className="text-2xl font-black flex items-baseline gap-2">
                            ${b.finalPrice || b.initialPrice}
                            {b.finalPrice !== undefined && b.finalPrice !== b.initialPrice && (
                              <span className="text-sm font-medium text-muted-foreground line-through">${b.initialPrice}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 w-full mt-4 sm:mt-0">
                          {b.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-10 font-bold text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 shadow-sm"
                              onClick={() => cancelMutation.mutate({ bookingId: b.id })}
                              disabled={cancelMutation.isPending}
                            >
                              Cancel Job
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
