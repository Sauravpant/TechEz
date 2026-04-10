import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAcceptBooking, useCancelTechnicianBooking, useCompleteBooking, useRaiseBookingPrice, useTechnicianBookings } from "@/hooks/booking/useBookings";
import type { BookingStatus } from "@/types/booking";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { Clock, TrendingUp, CheckCircle2, XCircle, MapPin } from "lucide-react";

export default function TechnicianBookingsPage() {
  const [sp] = useSearchParams();
  const status = sp.get("status") as BookingStatus | null;
  const filters = useMemo(() => ({ status: status || undefined, sortBy: "desc" as const, limit: 20, page: 0 }), [status]);
  const { data, isLoading, error } = useTechnicianBookings(filters);
  const bookings = data?.data ?? [];

  const raiseMutation = useRaiseBookingPrice();
  const acceptMutation = useAcceptBooking();
  const completeMutation = useCompleteBooking();
  const cancelMutation = useCancelTechnicianBooking();

  const [priceDraft, setPriceDraft] = useState<Record<string, number>>({});

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
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Bookings Pipeline</h1>
        <p className="text-muted-foreground mt-1">Manage all your incoming and active jobs.</p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Spinner /> Loading bookings…
        </div>
      ) : error ? (
        <div className="text-sm text-destructive text-center py-20">Failed to load bookings.</div>
      ) : bookings.length === 0 ? (
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg">
          <CardContent className="py-20 text-center text-muted-foreground">
            No bookings found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {bookings.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
            >
              <Card className="h-full flex flex-col bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-base">{b.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 font-medium text-foreground px-2 py-0.5 rounded-md bg-muted/60">
                          <StatusIcon status={b.status} />
                          <span className="capitalize">{b.status}</span>
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {b.location}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium">Customer</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{b.user.name}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{b.description}</p>
                    
                    <div className="flex items-center justify-between rounded-xl bg-muted/30 p-3 border border-border/40">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price Details</div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm">
                            <span className="font-semibold text-foreground">${b.finalPrice > 0 ? b.finalPrice : b.initialPrice}</span>
                          </div>
                          {b.finalPrice > b.initialPrice && (
                            <div className="text-xs text-muted-foreground line-through">${b.initialPrice} start</div>
                          )}
                        </div>
                      </div>
                      {!b.userAgreement && b.status === "pending" && b.finalPrice > 0 && (
                        <div className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                          Waiting client approval
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    {b.status === "pending" && (
                      <div className="flex gap-2 items-center mb-4 p-3 rounded-xl border border-border/50 bg-[color:var(--surface-2)]">
                        <Input
                          type="number"
                          min={0}
                          placeholder={`New price (curr: $${b.finalPrice || b.initialPrice})`}
                          value={priceDraft[b.id] ?? ""}
                          onChange={(e) => setPriceDraft((p) => ({ ...p, [b.id]: Number(e.target.value) }))}
                          className="h-9 bg-background"
                        />
                        <Button
                          variant="secondary"
                          className="h-9 shrink-0"
                          onClick={() => raiseMutation.mutate({ bookingId: b.id, finalPrice: priceDraft[b.id] ?? b.initialPrice })}
                          disabled={raiseMutation.isPending || !priceDraft[b.id]}
                        >
                          Send New Price
                        </Button>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Button asChild variant="outline" className="flex-1 shadow-sm">
                        <Link to={`/technician/dashboard/bookings/${b.id}`}>View Details</Link>
                      </Button>
                      
                      {b.status === "pending" && (
                        <Button
                          className="flex-1 shadow-sm shadow-primary/20 bg-indigo-500 text-white hover:bg-indigo-600"
                          onClick={() => acceptMutation.mutate({ bookingId: b.id })}
                          disabled={acceptMutation.isPending || (!b.userAgreement && b.finalPrice > 0)}
                        >
                          Accept
                        </Button>
                      )}
                      
                      {b.status === "accepted" && (
                        <Button
                          className="flex-1 shadow-sm bg-emerald-500 text-white hover:bg-emerald-600"
                          onClick={() => completeMutation.mutate({ bookingId: b.id })}
                          disabled={completeMutation.isPending}
                        >
                          Mark Completed
                        </Button>
                      )}
                      
                      {b.status === "pending" && (
                        <Button
                          variant="destructive"
                          onClick={() => cancelMutation.mutate({ bookingId: b.id })}
                          disabled={cancelMutation.isPending}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
