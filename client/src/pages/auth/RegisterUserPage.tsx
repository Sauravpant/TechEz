import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerUser } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ name, email, phone, password });
      toast.success(res.message || "Account created");
      navigate("/auth/login", { replace: true });
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center px-3 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Book technicians with a premium experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Name</div>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Phone</div>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10 digits" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Password</div>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" /> Creating…
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4 hover:text-foreground">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

