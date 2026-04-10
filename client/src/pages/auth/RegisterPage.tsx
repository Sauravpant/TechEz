import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { registerTechnician, registerUser } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrench } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"user" | "technician">("user");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [experience, setExperience] = useState<number | "">("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [category, setCategory] = useState("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [verificationDocument, setVerificationDocument] = useState<File | null>(null);

  const onRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ name, email, phone, password });
      toast.success(res.message || "Account created");
      navigate("/auth/login");
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  const onRegisterTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profilePicture) return toast.error("Profile picture is required");
    setLoading(true);
    try {
      const res = await registerTechnician({
        data: {
          name,
          email,
          phone,
          password,
          experience: Number(experience),
          registrationNumber: registrationNumber || undefined,
          category,
          bio,
          description,
        },
        profilePicture,
        verificationDocument,
      });
      toast.success(res.message || "Technician account created");
      navigate("/auth/login");
    } catch (err: unknown) {
      toast.error(getApiErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex">
      <div className="flex-1 flex flex-col p-6 bg-background overflow-y-auto">
        <div className="flex flex-col items-center justify-center min-h-full py-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl space-y-6"
          >
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
              <p className="text-muted-foreground">Join TechEz to get started. Choose your account type below.</p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-muted/60 rounded-xl max-w-sm mx-auto sm:mx-0">
              <Button
                variant={role === "user" ? "default" : "ghost"}
                className={`w-1/2 rounded-lg ${role === "user" ? "shadow-md" : ""}`}
                onClick={() => setRole("user")}
              >
                Normal User
              </Button>
              <Button
                variant={role === "technician" ? "default" : "ghost"}
                className={`w-1/2 rounded-lg ${role === "technician" ? "shadow-md" : ""}`}
                onClick={() => setRole("technician")}
              >
                Technician
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {role === "user" ? (
                <motion.form
                  key="user-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={onRegisterUser}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <Button type="submit" className="w-full h-11 text-base font-medium shadow-md" disabled={loading}>
                      {loading ? "Creating User..." : "Create User Account"}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.form
                  key="technician-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={onRegisterTechnician}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="h-11 bg-muted/40" />
                  </div>

                  <div className="my-1 h-px bg-border/50 sm:col-span-2" />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Electrician" required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience (years)</label>
                    <Input type="number" min={0} value={experience} onChange={(e) => setExperience(e.target.value ? Number(e.target.value) : "")} required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Registration No. (Optional)</label>
                    <Input value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Short Bio</label>
                    <Input value={bio} onChange={(e) => setBio(e.target.value)} required className="h-11 bg-muted/40" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Detailed Description</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} required className="h-11 bg-muted/40" />
                  </div>

                  <div className="space-y-2 sm:col-span-2 p-4 bg-muted/20 border border-border/40 rounded-xl">
                    <div className="space-y-1 mb-3">
                      <label className="text-sm font-medium">Profile Picture*</label>
                      <Input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files?.[0] ?? null)} required className="bg-background cursor-pointer" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Verification document (Optional)</label>
                      <Input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setVerificationDocument(e.target.files?.[0] ?? null)} className="bg-background cursor-pointer" />
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-2">
                    <Button type="submit" className="w-full h-11 text-base font-medium shadow-md" disabled={loading}>
                      {loading ? "Creating Profile..." : "Create Technician Profile"}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="text-center text-sm text-muted-foreground pt-4 pb-10">
              Already have an account? <Link to="/auth/login" className="text-foreground font-semibold hover:underline">Log in</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-muted/30 border-l border-border/40 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-cyan-500/10 pointer-events-none" />
        <div className="max-w-lg relative z-10 space-y-8">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl shadow-xl flex items-center justify-center text-white mb-8">
            <Wrench className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground/90">Join our growing ecosystem.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you're looking for help or offering your expertise, TechEz provides the tools you need to connect, negotiate, and thrive in the marketplace.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="h-2 w-12 rounded-full bg-border/80" />
            <div className="h-2 w-12 rounded-full bg-indigo-500" />
            <div className="h-2 w-12 rounded-full bg-border/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
