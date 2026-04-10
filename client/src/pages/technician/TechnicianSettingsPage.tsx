import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setUser, logoutUser } from "@/features/auth/authSlice";
import {
  useUpdateTechnicianProfile,
  useUploadVerificationDocument,
  useDeleteVerificationDocument
} from "@/hooks/technician/useTechnicianAccount";
import { useMyProfile } from "@/hooks/user/useProfile";
import { useChangePassword, useDeactivateAccount } from "@/hooks/auth/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { motion } from "framer-motion";
import { User as UserIcon, Phone, MapPin, BriefcaseBusiness, FileText, CheckCircle2, AlertTriangle, Key, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

export default function TechnicianSettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data, isLoading } = useMyProfile();
  const t = data?.data;

  const updateMutation = useUpdateTechnicianProfile();
  const uploadDocMutation = useUploadVerificationDocument();
  const deleteDocMutation = useDeleteVerificationDocument();
  const pwdMutation = useChangePassword();
  const deactivateMutation = useDeactivateAccount();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState<number | "">("");
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!t) return;
    const extra = t as any;
    setName(t.name ?? "");
    setPhone(extra.phone ?? "");
    setAddress(extra.address ?? "");
    setCategory(extra.category ?? "");
    setExperience(extra.experience ?? "");
    setBio(extra.bio ?? "");
    setDescription(extra.description ?? "");
  }, [t]);

  const canSaveProfile = useMemo(() => !!t && !updateMutation.isPending, [t, updateMutation.isPending]);
  const canSavePwd = useMemo(() => oldPassword && newPassword.length >= 6 && !pwdMutation.isPending, [newPassword.length, oldPassword, pwdMutation.isPending]);

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Record<string, any> = {};
    if (name.trim()) payload.name = name.trim();
    if (phone.trim()) payload.phone = phone.trim();
    if (address.trim()) payload.address = address.trim();
    if (category.trim()) payload.category = category.trim();
    if (experience !== "") payload.experience = Number(experience);
    if (bio.trim()) payload.bio = bio.trim();
    if (description.trim()) payload.description = description.trim();

    const res = await updateMutation.mutateAsync(payload);
    dispatch(setUser(res.data));
  };

  const onSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await pwdMutation.mutateAsync({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
  };

  const onUploadDoc = async (file: File) => {
    await uploadDocMutation.mutateAsync({ file });
  };

  const onDeleteDoc = async () => {
    await deleteDocMutation.mutateAsync();
  };

  const onDeactivate = async () => {
    if (!confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) return;
    await deactivateMutation.mutateAsync();
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your technician profile and account security.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Verification & Trust</CardTitle>
            <CardDescription>Upload an ID or certification document. Required to get the verified badge.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && !t ? (
              <div className="flex items-center gap-2 text-muted-foreground"><Spinner /> Loading…</div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-border/50 bg-muted/20">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 grid place-items-center shrink-0">
                  {(t as any)?.verificationDocumentUrl ? (
                    <CheckCircle2 className="h-8 w-8 text-indigo-500" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-amber-500" />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h4 className="font-semibold">{(t as any)?.verificationDocumentUrl ? "Document Uploaded" : "No Document"}</h4>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {(t as any)?.verificationDocumentUrl
                      ? "Your verification document is securely stored. You can delete and replace it if needed."
                      : "Adding a document unlocks the Verified Professional badge, increasing your bookings by up to 40%."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="max-w-[200px]"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUploadDoc(f);
                    }}
                    disabled={uploadDocMutation.isPending}
                  />
                  {(t as any)?.verificationDocumentUrl && (
                    <Button variant="outline" size="sm" onClick={onDeleteDoc} disabled={deleteDocMutation.isPending}>
                      Delete current
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Public Profile</CardTitle>
            <CardDescription>This information is visible to customers browsing your services.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && !t ? (
              <div className="flex items-center gap-2 text-muted-foreground"><Spinner /> Loading…</div>
            ) : (
              <form id="profileForm" onSubmit={onSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium inline-flex items-center gap-1.5"><UserIcon className="h-4 w-4 text-indigo-500" /> Full Name</div>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-4 w-4 text-cyan-500" /> Category</div>
                    <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Electrician" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-amber-500" /> Phone</div>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-emerald-500" /> Address</div>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2 lg:col-span-1">
                    <div className="text-sm font-medium inline-flex items-center gap-1.5"><FileText className="h-4 w-4 text-violet-500" /> Experience (Years)</div>
                    <Input type="number" min={0} value={experience} onChange={(e) => setExperience(e.target.value ? Number(e.target.value) : "")} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium">Short Bio</div>
                    <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A brief headline about you" className="resize-none" rows={2} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium">Detailed Description</div>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="List your specific skills, tools, and work history" className="resize-none" rows={4} />
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-end border-t border-border/40 pt-4 pb-4">
            <Button type="submit" form="profileForm" disabled={!canSaveProfile || isLoading} className="w-full sm:w-auto h-11 px-8 shadow-sm">
              {updateMutation.isPending ? <><Spinner className="h-4 w-4 mr-2" /> Saving…</> : "Save Profile"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Security</CardTitle>
            <CardDescription>Update your password or deactivate your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={onSavePassword} className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium inline-flex items-center gap-1.5"><Key className="h-4 w-4 text-muted-foreground" /> Old Password</div>
                <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">New Password</div>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <Button type="submit" disabled={!canSavePwd} variant="secondary" className="w-full">
                {pwdMutation.isPending ? <Spinner className="h-4 w-4" /> : "Update Password"}
              </Button>
            </form>

            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-destructive inline-flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" /> Danger Zone</h4>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Deactivating your account will hide your profile from search results and prevent new bookings. Active bookings must be resolved first.
                </p>
              </div>
              <Button type="button" variant="destructive" onClick={onDeactivate} disabled={deactivateMutation.isPending} className="w-full">
                <Trash2 className="h-4 w-4 mr-2" /> Deactivate Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
