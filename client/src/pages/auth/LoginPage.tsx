import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrench } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((s: RootState) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      toast.success("Signed in.");
      if (result.payload.role === "technician") return navigate("/technician/dashboard", { replace: true });
      if (result.payload.role === "admin") return navigate("/admin", { replace: true });
      return navigate("/", { replace: true });
    }
    toast.error((result.payload as string) || "Login failed");
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex">
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to book experts or manage your services.</p>
          </div>

          <form onSubmit={onLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email address</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="h-11 bg-muted/40" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link to="/auth/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-400 font-medium">
                  Forgot Password?
                </Link>
              </div>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="h-11 bg-muted/40" />
            </div>

            <Button className="h-11 w-full text-base font-medium shadow-md shadow-primary/10" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground pt-4">
            New user? <Link to="/auth/register" className="text-foreground font-semibold hover:underline">Register here</Link>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-muted/30 border-l border-border/40 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 pointer-events-none" />
        <div className="max-w-lg relative z-10 space-y-8">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center text-white mb-8">
            <Wrench className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground/90">Your trusted partner for home services.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TechEz connects you instantly with verified professionals for all your maintenance, repair, and installation needs. Quality work, negotiated prices, and reliable results.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="h-2 w-12 rounded-full bg-indigo-500" />
            <div className="h-2 w-12 rounded-full bg-border/80" />
            <div className="h-2 w-12 rounded-full bg-border/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
