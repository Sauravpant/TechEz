import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerTechnician } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterTechnicianPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [verificationDocument, setVerificationDocument] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilePicture) {
      toast.error("Profile picture is required");
      return;
    }
    setLoading(true);
    try {
      const res = await registerTechnician({
        data: {
          name,
          email,
          phone,
          password,
          experience,
          registrationNumber: registrationNumber || undefined,
          category,
          bio,
          description,
        },
        profilePicture,
        verificationDocument,
      });
      toast.success(res.message || "Technician account created");
      navigate("/auth/login", { replace: true });
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center px-3 py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Register as a technician</CardTitle>
          <CardDescription>Upload your profile picture and (optional) verification document.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Name</div>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Email</div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Phone</div>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Password</div>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Category</div>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. electrician" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Experience (years)</div>
              <Input value={experience} onChange={(e) => setExperience(Number(e.target.value))} type="number" min={0} required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="text-sm font-medium">Registration number (optional)</div>
              <Input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="text-sm font-medium">Bio</div>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short intro" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <div className="text-sm font-medium">Description</div>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="More details" required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Profile picture</div>
              <Input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)} required />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Verification document (optional)</div>
              <Input type="file" accept="image/*" onChange={(e) => setVerificationDocument(e.target.files?.[0] ?? null)} />
            </div>

            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="h-4 w-4" /> Creating…
                  </>
                ) : (
                  "Create technician account"
                )}
              </Button>
              <div className="text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/auth/login" className="underline underline-offset-4 hover:text-foreground">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

