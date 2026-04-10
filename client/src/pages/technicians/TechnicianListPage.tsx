import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTechnicians } from "@/hooks/technician/useTechnicians";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck, BriefcaseBusiness, Search, ChevronLeft, ChevronRight, UserCircle } from "lucide-react";

export default function TechnicianListPage() {
  const [sp, setSp] = useSearchParams();

  const page = Number(sp.get("page") ?? "1");
  const limit = Number(sp.get("limit") ?? "12");
  const name = sp.get("name") ?? "";
  const category = sp.get("category") ?? "";
  const address = sp.get("address") ?? "";
  const experience = sp.get("experience") ? Number(sp.get("experience")) : undefined;

  const filter = useMemo(
    () => ({
      page,
      limit,
      name: name || undefined,
      category: category || undefined,
      address: address || undefined,
      experience,
    }),
    [address, category, experience, limit, name, page]
  );

  const { data, isLoading, error } = useTechnicians(filter);

  const resp = data?.data;
  const technicians = resp?.technicians ?? [];

  return (
    <div className="py-8 space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight">Our Professionals</h1>
        <p className="text-muted-foreground mt-2 text-lg font-medium">Discover verified experts perfectly suited for your next project.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md">
          <CardContent className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  placeholder="Search by name"
                  value={name}
                  className="pl-9 h-11 bg-muted/30"
                  onChange={(e) => {
                    sp.set("name", e.target.value);
                    sp.set("page", "1");
                    setSp(sp, { replace: true });
                  }}
                />
              </div>
              <Input
                placeholder="Category (e.g. Electrician)"
                value={category}
                className="h-11 bg-muted/30"
                onChange={(e) => {
                  sp.set("category", e.target.value);
                  sp.set("page", "1");
                  setSp(sp, { replace: true });
                }}
              />
              <Input
                placeholder="Location"
                value={address}
                className="h-11 bg-muted/30"
                onChange={(e) => {
                  sp.set("address", e.target.value);
                  sp.set("page", "1");
                  setSp(sp, { replace: true });
                }}
              />
              <Input
                placeholder="Min experience"
                value={experience ?? ""}
                type="number"
                min={0}
                className="h-11 bg-muted/30"
                onChange={(e) => {
                  const v = e.target.value;
                  if (!v) sp.delete("experience");
                  else sp.set("experience", v);
                  sp.set("page", "1");
                  setSp(sp, { replace: true });
                }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div>
        {isLoading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
            <Spinner /> Loading professionals…
          </div>
        ) : error ? (
          <div className="text-destructive font-medium text-center py-20 border rounded-2xl bg-destructive/10 border-destructive/20">Failed to load technicians.</div>
        ) : technicians.length === 0 ? (
          <div className="text-muted-foreground font-medium text-center py-20 border rounded-2xl bg-muted/20 border-border/40">No technicians found matching your strict criteria.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {technicians.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
              >
                <Card className="h-full flex flex-col overflow-hidden bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start w-full">
                        <div className="h-14 w-14 rounded-full border-2 border-border/50 bg-muted/40 grid place-items-center overflow-hidden shrink-0 shadow-sm">
                          {t.profilePictureUrl ? (
                            <img src={t.profilePictureUrl} alt={t.name} className="h-full w-full object-cover" />
                          ) : (
                            <UserCircle className="h-8 w-8 text-muted-foreground/60" />
                          )}
                        </div>
                        {t.isVerified && (
                          <div className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold px-2 py-1 rounded-md inline-flex items-center gap-1 shrink-0 border border-indigo-200 dark:border-indigo-500/20">
                            <BadgeCheck className="h-3.5 w-3.5" /> Verified
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{t.name}</CardTitle>
                        <CardDescription className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
                          <span className="inline-flex items-center gap-1.5 text-foreground">
                            <BriefcaseBusiness className="h-4 w-4" /> {t.category}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span>{t.experience} years exp</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="text-sm text-muted-foreground line-clamp-3 leading-relaxed border-l-2 border-primary/20 pl-3">
                      {t.bio}
                    </div>
                    <div className="text-sm font-medium inline-flex items-center gap-1.5 p-2 rounded-lg bg-muted/40 text-foreground w-full">
                      <MapPin className="h-4 w-4 text-muted-foreground" /> {t.address || "Location not specified"}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-5">
                    <Button asChild className="w-full shadow-sm font-medium bg-foreground text-background hover:bg-muted-foreground">
                      <Link to={`/technicians/${t.id}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {resp && resp.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4 bg-muted/20 border border-border/40 w-fit mx-auto p-2 rounded-xl">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => {
                sp.set("page", String(page - 1));
                setSp(sp, { replace: true });
              }}
              className="h-9 px-4 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="text-sm text-foreground font-medium px-4 border-x border-border/60">
              Page {resp.page} of {resp.totalPages}
            </div>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= resp.totalPages}
              onClick={() => {
                sp.set("page", String(page + 1));
                setSp(sp, { replace: true });
              }}
              className="h-9 px-4 rounded-lg"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
