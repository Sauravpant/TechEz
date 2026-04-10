import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { forgotPassword } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state?: { email?: string } };

  const presetEmail = useMemo(() => (location?.state?.email as string | undefined) ?? "", [location?.state?.email]);

  const [email, setEmail] = useState(presetEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await forgotPassword({ email, otp, newPassword, confirmNewPassword });
      toast.success(res.message || "Password reset successful");
      navigate("/auth/login", { replace: true });
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Reset failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center px-3 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enter OTP</CardTitle>
          <CardDescription>Use the OTP we emailed you, then set a new password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">OTP</div>
              <Input value={otp} onChange={(e) => setOtp(e.target.value)} inputMode="numeric" placeholder="6 digits" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">New password</div>
              <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Confirm new password</div>
              <Input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" required />
            </div>
            <Button className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" /> Updating…
                </>
              ) : (
                "Reset password"
              )}
            </Button>
            <div className="text-sm text-muted-foreground">
              Back to{" "}
              <Link to="/auth/login" className="underline underline-offset-4 hover:text-foreground">
                sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

