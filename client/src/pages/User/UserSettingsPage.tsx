import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { logoutUser, setUser } from "@/features/auth/authSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteProfilePicture, useMyProfile, useUpdateMyProfile, useUploadProfilePicture } from "@/hooks/user/useProfile";
import { useChangePassword, useDeactivateAccount } from "@/hooks/auth/useAuth";
import { motion } from "framer-motion";
import { MapPin, Phone, User as UserIcon, Trash2, ArrowUpCircle, Key, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserSettingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authUser = useSelector((s: RootState) => s.auth.user);

  const { data, isLoading } = useMyProfile();
  const me = data?.data ?? authUser;

  const updateMutation = useUpdateMyProfile();
  const uploadMutation = useUploadProfilePicture();
  const deleteMutation = useDeleteProfilePicture();
  const pwdMutation = useChangePassword();
  const deactivateMutation = useDeactivateAccount();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!me) return;
    const extra = me as unknown as { phone?: string; address?: string };
    setName(me.name ?? "");
    setPhone(extra.phone ?? "");
    setAddress(extra.address ?? "");
  }, [me]);

  const canSubmit = useMemo(() => !!me && !updateMutation.isPending, [me, updateMutation.isPending]);
  const canSavePwd = useMemo(() => !!oldPassword && newPassword.length >= 6 && !pwdMutation.isPending, [newPassword.length, oldPassword, pwdMutation.isPending]);

  const onSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: { name?: string; phone?: string; address?: string } = {};
    if (name.trim()) payload.name = name.trim();
    if (phone.trim()) payload.phone = phone.trim();
    if (address.trim()) payload.address = address.trim();
    const res = await updateMutation.mutateAsync(payload);
    dispatch(setUser(res.data));
  };

  const onSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await pwdMutation.mutateAsync({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
  };

  const onUpload = async (file: File) => {
    await uploadMutation.mutateAsync({ file });
    const refreshed = data?.data;
    if (refreshed) dispatch(setUser(refreshed));
  };

  const onDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  const onDeactivate = async () => {
    if (!confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) return;
    await deactivateMutation.mutateAsync();
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <div className="space-y-8 max-w-4xl pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
            <CardDescription>Upload a JPEG/PNG (max 5MB) to personalize your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl border border-border/50 bg-muted/20">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full border-4 border-background bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 shadow-sm overflow-hidden grid place-items-center">
                  {me?.profilePictureUrl ? (
                    <img src={me.profilePictureUrl} alt="Profile" className="h-full w-full object-cover group-hover:blur-sm transition-all duration-300" />
                  ) : (
                    <span className="text-2xl font-bold text-muted-foreground opacity-50">
                      {me?.name?.slice(0, 1)?.toUpperCase() ?? "U"}
                    </span>
                  )}
                </div>
                {uploadMutation.isPending && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-full grid place-items-center">
                    <Spinner />
                  </div>
                )}
                {me?.profilePictureUrl && !uploadMutation.isPending && (
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white rounded-full hover:bg-white/20 hover:text-white" onClick={onDelete} disabled={deleteMutation.isPending} aria-label="Delete photo">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4 text-center sm:text-left">
                <div>
                  <h4 className="font-semibold text-lg">{me?.name || "User"}</h4>
                  <p className="text-sm text-muted-foreground">{me?.email}</p>
                </div>
                <div className="relative inline-block w-full sm:w-auto">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onUpload(f);
                    }}
                    disabled={uploadMutation.isPending}
                  />
                  <Button variant="outline" className="w-full sm:w-auto pointer-events-none">
                    <ArrowUpCircle className="mr-2 h-4 w-4 text-muted-foreground" /> Upload New Image
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
            <CardDescription>Keep your details up to date for smooth technician communication.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && !me ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Spinner /> Loading…
              </div>
            ) : (
              <form id="userProfileForm" onSubmit={onSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium inline-flex items-center gap-1.5"><UserIcon className="h-4 w-4 text-muted-foreground" /> Full Name</div>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium inline-flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground" /> Phone Number</div>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 bg-muted/30" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <div className="text-sm font-medium inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-foreground" /> Living Address</div>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full street address, City, ZIP" className="h-11 bg-muted/30" />
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-end border-t border-border/40 pt-5 pb-5">
            <Button type="submit" form="userProfileForm" disabled={!canSubmit || isLoading} className="w-full sm:w-auto h-11 px-8 shadow-sm font-medium">
              {updateMutation.isPending ? <><Spinner className="h-4 w-4 mr-2" /> Saving…</> : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}>
        <Card className="bg-[color:var(--surface)] backdrop-blur-xl border-border/60 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Security & Privacy</CardTitle>
            <CardDescription>Update your password or deactivate your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={onSavePassword} className="space-y-5 bg-muted/10 p-5 rounded-2xl border border-border/40">
              <div className="space-y-2">
                <div className="text-sm font-medium inline-flex items-center gap-1.5"><Key className="h-4 w-4 text-muted-foreground" /> Old Password</div>
                <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="h-11 bg-background" />
              </div>
              <div className="space-y-2 mb-2">
                <div className="text-sm font-medium">New Password</div>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-11 bg-background" />
              </div>
              <Button type="submit" disabled={!canSavePwd} variant="secondary" className="w-full h-11 font-medium shadow-sm">
                {pwdMutation.isPending ? <><Spinner className="h-4 w-4 mr-2" /> Updating...</> : "Update Password"}
              </Button>
            </form>

            <div className="space-y-4 flex flex-col justify-between border border-destructive/20 bg-destructive/10 p-5 rounded-2xl">
              <div>
                <h4 className="text-[15px] font-semibold text-destructive inline-flex items-center gap-1.5"><AlertTriangle className="h-4 w-4" /> Danger Zone</h4>
                <p className="text-sm text-destructive/80 mt-2 leading-relaxed font-medium">
                  Deactivating your account will hide your profile and immediately terminate any active data access.
                </p>
              </div>
              <Button type="button" variant="destructive" onClick={onDeactivate} disabled={deactivateMutation.isPending} className="w-full h-11 font-medium shadow-sm">
                <Trash2 className="h-4 w-4 mr-2" /> Deactivate Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
