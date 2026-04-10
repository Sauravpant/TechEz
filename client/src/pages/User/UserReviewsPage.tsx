import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteReview, useUpdateReview, useUserReviews } from "@/hooks/review/useReviews";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { MessageSquare, Star, Trash2 } from "lucide-react";

export default function UserReviewsPage() {
  const { data, isLoading, error } = useUserReviews();
  const resp = data?.data;
  const reviews = resp?.reviews ?? [];

  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview();

  const [draft, setDraft] = useState<Record<string, { rating: number; comment: string }>>({});

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground mt-1">Manage the feedback you've left for technicians.</p>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
          <Spinner /> Loading reviews…
        </div>
      ) : error ? (
        <div className="text-sm text-destructive text-center py-20">Failed to load reviews.</div>
      ) : reviews.length === 0 ? (
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg border-dashed">
          <CardContent className="py-20 flex flex-col items-center justify-center text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <p className="text-lg font-medium">No reviews written</p>
            <p className="text-muted-foreground text-sm mt-1 max-w-sm">After a job is complete, you can review your technician from their profile.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {reviews.map((r, idx) => {
            const d = draft[r.id] ?? { rating: r.rating, comment: r.comment ?? "" };
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
              >
                <Card className="h-full flex flex-col bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md">
                  <CardHeader className="pb-3 border-b border-border/40">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-base text-foreground/90 font-semibold group-hover:text-indigo-500 transition-colors">
                          <Link className="hover:underline hover:text-indigo-500" to={`/technicians/${r.technician.technicianId}`}>
                            {r.technician.name}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          Posted on {new Date(r.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-muted grid place-items-center shrink-0 border border-border/50 overflow-hidden">
                        {r.technician.profilePictureUrl ? (
                          <img src={r.technician.profilePictureUrl} alt={r.technician.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs font-semibold">{r.technician.name?.slice(0, 1)?.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 flex-1">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium inline-flex items-center gap-1.5">Rating <Star className="h-3 w-3 text-amber-500" /></div>
                        <Input
                          type="number"
                          min={1}
                          max={5}
                          value={d.rating}
                          onChange={(e) => setDraft((p) => ({ ...p, [r.id]: { ...d, rating: Number(e.target.value) } }))}
                          className="w-24"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Review Comment</div>
                        <Textarea
                          value={d.comment}
                          onChange={(e) => setDraft((p) => ({ ...p, [r.id]: { ...d, comment: e.target.value } }))}
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-border/40 pb-4 mt-4 bg-muted/10 gap-2 items-center flex-wrap">
                    <Button
                      variant="default"
                      onClick={() => updateMutation.mutate({ reviewId: r.id, data: { rating: d.rating, comment: d.comment || undefined } })}
                      disabled={updateMutation.isPending || (d.rating === r.rating && d.comment === (r.comment ?? ""))}
                      className="flex-1 mt-4 shadow-sm"
                    >
                      {updateMutation.isPending ? <Spinner className="h-4 w-4" /> : "Update Review"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        if (confirm("Delete this review?")) {
                          deleteMutation.mutate({ reviewId: r.id });
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="mt-4 shrink-0 text-destructive border-border/50 hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
