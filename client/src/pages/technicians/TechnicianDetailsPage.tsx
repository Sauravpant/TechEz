import { Link, useParams, useNavigate } from "react-router-dom";
import { useTechnicianDetails } from "@/hooks/technician/useTechnicians";
import { useCreateReview } from "@/hooks/review/useReviews";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, CalendarCheck, MapPin, MessageSquare, ShieldAlert, Star, UserCircle, ChevronLeft } from "lucide-react";

export default function TechnicianDetailsPage() {
  const { technicianId = "" } = useParams();
  const { data, isLoading, error } = useTechnicianDetails(technicianId);
  const reviewMutation = useCreateReview();
  const navigate = useNavigate();
  const auth = useSelector((s: RootState) => s.auth);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const onReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.isAuthenticated) return navigate("/auth/login");
    await reviewMutation.mutateAsync({ technicianId, data: { rating, comment } });
    setReviewOpen(false);
    setComment("");
    setRating(5);
  };

  const t = data?.data;

  return (
    <div className="py-6 space-y-6 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-4">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground font-medium">
          <Link to="/technicians" className="inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to directory
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-muted-foreground gap-3">
          <Spinner /> Loading professional profile…
        </div>
      ) : error || !t ? (
        <div className="text-destructive font-medium text-center py-20 border rounded-2xl bg-destructive/10 border-destructive/20">Failed to load technician data.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
            <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                  <div className="h-32 w-32 rounded-full border border-border/50 bg-muted grid place-items-center overflow-hidden shrink-0 shadow-sm">
                    {t.profilePictureUrl ? (
                      <img src={t.profilePictureUrl} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <UserCircle className="h-16 w-16 text-muted-foreground/50" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t.name}</h1>
                      {t.isVerified && (
                        <div className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-500/20">
                          <BadgeCheck className="h-4 w-4" /> Verified Identity
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground mt-2 bg-muted/20 p-4 rounded-xl border border-border/40">
                      <span className="inline-flex items-center gap-2 text-foreground font-medium">
                        <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" /> {t.category}
                      </span>
                      <span className="inline-flex items-center gap-2 font-medium">
                        <CalendarCheck className="h-4 w-4 text-muted-foreground" /> {t.experience} years experience
                      </span>
                      <span className="inline-flex items-center gap-2 font-medium sm:col-span-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> {t.address || "Location not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold flex items-center leading-tracking-tight">Headline Bio</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground bg-muted/30 p-4 rounded-xl border border-border/40">{t.bio}</p>
                  </div>
                  <div className="space-y-3 h-full">
                    <h3 className="text-base font-bold flex items-center leading-tracking-tight">Detailed Services</h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground bg-muted/30 p-4 rounded-xl border border-border/40 h-[calc(100%-2rem)]">{t.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold tracking-tight">Reviews <span className="text-muted-foreground font-semibold">({t.totalReviews})</span></h3>
              <div className="space-y-4">
                {t.reviews.length === 0 ? (
                  <Card className="bg-[color:var(--surface)] border-border/60 shadow-sm border-dashed">
                    <CardContent className="py-12 text-center flex items-center justify-center flex-col text-muted-foreground">
                      <Star className="h-8 w-8 mb-3 opacity-20" />
                      <p className="font-medium">No reviews recorded yet for this professional.</p>
                    </CardContent>
                  </Card>
                ) : (
                  t.reviews.map((r, idx) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.2) }}
                    >
                      <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm">
                        <CardContent className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-muted grid place-items-center overflow-hidden shrink-0 border border-border/50">
                                {r.user.profilePictureUrl ? (
                                  <img src={r.user.profilePictureUrl} alt={r.user.name} className="h-full w-full object-cover" />
                                ) : (
                                  <span className="text-sm font-bold">{r.user.name?.slice(0, 1)?.toUpperCase()}</span>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-foreground">{r.user.name}</div>
                                <div className="text-[13px] text-muted-foreground font-medium">{new Date(r.createdAt).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-bold text-sm px-2.5 py-1 rounded-md shadow-sm">
                              {r.rating} <Star className="h-4 w-4 fill-current" />
                            </div>
                          </div>
                          {r.comment && <p className="text-[15px] text-foreground leading-relaxed pl-13 pt-1">{r.comment}</p>}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-primary/20 shadow-xl overflow-hidden sticky top-24">
              <CardHeader className="text-center pb-4 pt-8 bg-muted/10">
                <CardTitle className="text-2xl font-bold">Request Service</CardTitle>
                <CardDescription className="text-base font-medium mt-1">Hire this professional directly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 rounded-2xl bg-background border border-border/60 shadow-sm">
                    <div className="text-3xl font-black text-foreground">{t.totalBookings}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2 font-semibold">Jobs Completed</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-background border border-border/60 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-center items-center gap-1.5 text-3xl font-black text-foreground">
                      {t.averageRating || "N/A"} <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 inline-block -mt-1" />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2 font-semibold">Avg Rating</div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    className="w-full h-14 text-lg font-bold shadow-md bg-foreground text-background hover:bg-muted-foreground"
                    onClick={() => {
                      if (!auth.isAuthenticated) return navigate("/auth");
                      if (auth.user?.role !== "user") return;
                      navigate(`/bookings/manual?technicianId=${t.id}&category=${encodeURIComponent(t.category)}`);
                    }}
                  >
                    Start Manual Booking
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className={`w-full h-11 font-medium ${reviewOpen ? "bg-muted shadow-inner" : "bg-background"}`}
                      onClick={() => {
                        if (!auth.isAuthenticated) return navigate("/auth/login");
                        setReviewOpen(!reviewOpen);
                      }}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" /> {reviewOpen ? "Cancel Review" : "Write Review"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-11 font-medium bg-background text-muted-foreground hover:text-destructive hover:bg-destructive/5 hover:border-destructive/30 transition-colors"
                      onClick={() => {
                        if (!auth.isAuthenticated) return navigate("/auth/login");
                        if (auth.user?.role !== "user") return;
                        navigate(`/user/dashboard/reports/new?technicianId=${t.id}`);
                      }}
                    >
                      <ShieldAlert className="mr-2 h-4 w-4" /> Report
                    </Button>
                  </div>

                  {reviewOpen && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      className="bg-muted/30 p-4 rounded-xl border border-border/50 overflow-hidden space-y-4"
                      onSubmit={onReviewSubmit}
                    >
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Rating (1-5)</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-none transition-transform hover:scale-110"
                            >
                              <Star className={`h-6 w-6 ${rating >= star ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium">Comment (Optional)</label>
                        <textarea 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]"
                          placeholder="Describe your experience..."
                        />
                      </div>
                      <Button type="submit" disabled={reviewMutation.isPending} className="w-full h-10 shadow-sm font-medium">
                        {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                      </Button>
                    </motion.form>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
