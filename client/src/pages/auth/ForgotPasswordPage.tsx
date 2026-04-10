import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { sendOtp, forgotPassword } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, MailCheck, Wrench } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const onSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendOtp(email);
      toast.success(res.message || "OTP sent to your email");
      setStep("reset");
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Failed to send OTP"));
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      const res = await forgotPassword({ email, otp, newPassword, confirmNewPassword });
      toast.success(res.message || "Password updated successfully");
      navigate("/auth/login");
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Reset failed"));
    } finally {
      setLoading(false);
    }
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
            <div className="h-12 w-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center mb-6">
              {step === "request" ? <KeyRound className="h-6 w-6" /> : <MailCheck className="h-6 w-6" />}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {step === "request" ? "Forgot Password" : "Reset Password"}
            </h1>
            <p className="text-muted-foreground w-[90%]">
              {step === "request" 
                ? "Enter your email address and we'll send you a 6-digit verification code." 
                : "Enter the code we emailed you along with your new password choice."}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === "request" ? (
              <motion.form
                key="form-request"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onSubmit={onSendOtp}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email address</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="h-11 bg-muted/40" />
                </div>

                <Button className="h-11 w-full text-base font-medium shadow-md shadow-primary/10" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="form-reset"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={onResetPassword}
                className="space-y-5"
              >
                <div className="space-y-2 hidden">
                  <label className="text-sm font-medium">Email</label>
                  <Input value={email} disabled type="email" className="h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">6-Digit Code</label>
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" placeholder="e.g. 123456" required className="h-12 text-center text-xl tracking-[0.3em] font-mono bg-muted/40" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required className="h-11 bg-muted/40" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" required className="h-11 bg-muted/40" />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" className="h-11 w-full text-base font-medium shadow-md" disabled={loading}>
                    {loading ? "Updating..." : "Reset Password"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setStep("request")} className="w-full">
                    Back to email
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {step === "request" && (
            <div className="text-center text-sm text-muted-foreground pt-4">
              Remember your password? <Link to="/auth/login" className="text-foreground font-semibold hover:underline">Log in</Link>
            </div>
          )}
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-muted/30 border-l border-border/40 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/10 pointer-events-none" />
        <div className="max-w-lg relative z-10 space-y-8">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center text-white mb-8">
            <Wrench className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground/90">Safe & Secure</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your security is our priority. Fast, reliable verification ensures you get back to managing your services securely.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="h-2 w-12 rounded-full bg-border/80" />
            <div className="h-2 w-12 rounded-full bg-border/80" />
            <div className="h-2 w-12 rounded-full bg-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
