import { useTechnicianReviews } from "@/hooks/review/useReviews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { MessageSquare, Star, UserCircle2 } from "lucide-react";

export default function TechnicianReviewsPage() {
  const { data, isLoading, error } = useTechnicianReviews();
  const resp = data?.data;

  const ratingPercent = resp ? Math.round(((resp.averageRating ?? 0) / 5) * 100) : 0;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">Client Reviews</h1>
        <p className="text-muted-foreground mt-1">Feedback from users who have booked your services.</p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Spinner /> Loading reviews…
        </div>
      ) : error || !resp ? (
        <div className="text-sm text-destructive text-center py-20">Failed to load reviews.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg sticky top-24">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Rating Summary</CardTitle>
                <CardDescription>Based on all complete jobs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold bg-gradient-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent inline-flex items-center gap-1">
                    {resp.averageRating?.toFixed(1) ?? "0.0"} <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Total Reviews</span>
                    <span className="font-bold">{resp.totalReviews}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Satisfaction</span>
                    <span className="font-bold">{ratingPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${ratingPercent}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {resp.reviews.length === 0 ? (
              <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm border-dashed">
                <CardContent className="py-20 flex flex-col items-center justify-center text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/50 mb-3" />
                  <p className="text-base font-medium">No reviews yet</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                    Complete more bookings to start receiving reviews from your customers.
                  </p>
                </CardContent>
              </Card>
            ) : (
              resp.reviews.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
                >
                  <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted/60 border border-border/40 grid place-items-center overflow-hidden shrink-0">
                            {r.user.profilePictureUrl ? (
                              <img src={r.user.profilePictureUrl} alt={r.user.name} className="h-full w-full object-cover" />
                            ) : (
                              <UserCircle2 className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{r.user.name}</div>
                            <div className="text-xs text-muted-foreground leading-none mt-0.5">{new Date(r.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md text-sm font-medium border border-amber-500/20 shrink-0">
                          {r.rating} <Star className="h-3.5 w-3.5 fill-amber-500" />
                        </div>
                      </div>
                      {r.comment && (
                        <p className="text-sm text-muted-foreground pl-[3.25rem] leading-relaxed">
                          "{r.comment}"
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
