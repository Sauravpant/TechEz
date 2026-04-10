import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Users, Clock, Star } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "from-indigo-500 to-violet-500",
    title: "Verified Professionals",
    desc: "Every technician is vetted and verified with document-based trust.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    title: "Realtime Updates",
    desc: "Socket-powered events push every booking update instantly—no refresh needed.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    color: "from-violet-500 to-fuchsia-500",
    title: "Browse & Filter",
    desc: "Explore technicians by category, location, experience, and verification status.",
  },
  {
    icon: <Star className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500",
    title: "Reviews & Ratings",
    desc: "Community-driven feedback keeps quality high and helps you decide faster.",
  },
];

const steps = [
  { step: "01", title: "Browse", desc: "Explore our curated list of verified technicians." },
  { step: "02", title: "Book", desc: "Send a booking request with your preferred price." },
  { step: "03", title: "Track", desc: "Get realtime updates on acceptance, pricing, and completion." },
];

export default function HomePage() {
  const { isAuthenticated } = useSelector((s: RootState) => s.auth);

  return (
    <div className="space-y-20 pb-10">
      <section className="pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-[color:var(--surface)] backdrop-blur-xl px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Premium technician marketplace
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]">
              Book trusted technicians,{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                stay in sync in real time.
              </span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-prose text-base sm:text-lg leading-relaxed">
              Browse by category and location, create bookings in seconds, and get live updates for every
              change—pricing, agreement, acceptance, and completion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 shadow-lg shadow-primary/20">
                <Link to="/technicians" className="inline-flex items-center gap-2">
                  Browse technicians <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button asChild variant="outline" size="lg" className="h-12 bg-[color:var(--surface)] backdrop-blur-xl">
                  <Link to="/auth" className="inline-flex items-center gap-2">
                    Get started <Zap className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.06 }}
              >
                <Card className="h-full bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md mb-2`}>
                      {f.icon}
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">{f.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-[color:var(--surface)] backdrop-blur-xl px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm mb-4">
            <Clock className="h-4 w-4 text-cyan-500" />
            Simple workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">Three simple steps to get expert help at your doorstep.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
            >
              <Card className="h-full bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg text-center hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl font-bold bg-gradient-to-br from-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {s.step}
                  </div>
                  <CardTitle className="text-lg">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{s.desc}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-cyan-500/10 backdrop-blur-xl p-8 sm:p-12 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Join thousands of satisfied users who trust TechEz for their professional service needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {!isAuthenticated ? (
              <Button asChild size="lg" className="h-12 shadow-lg shadow-primary/20">
                <Link to="/auth" className="inline-flex items-center gap-2">
                  Create account <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="lg" className="h-12">
              <Link to="/technicians">Browse technicians</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
