"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
export default function Profile() {
    const { data: session, status, update } = useSession();
console.log(session)
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  password: "",
  rePassword: "",
});
  
  /* ================= IMAGE ================= */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result as string;
      setAvatar(img);
      localStorage.setItem("profileAvatar", img);
      toast.success("Image updated");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

 /* ================= LOAD USER DATA ================= */
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name,
        email: session.user.email,
        phone: (session.user as any).phone || "",
      });
    }
  }, [session]);



  // Update profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/profile/updateProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.message === "success" && data.user) {
        await update({ name: data.user.name, email: data.user.email });
        toast.success("Profile updated successfully");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (err) {
      if(err instanceof Error){toast.error(err.message);}
    } finally {
      setLoading(false);
    }
  };
  /* ============================================*/

const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault(); 

  if (passwordData.password !== passwordData.rePassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/api/profile/changePassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
    });

    const data = await res.json();
    console.log(data);

    if (data?.message === "success") {
      toast.success("Password changed successfully");

      
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 1500);
    } else {
      toast.error(data?.errors?.msg || data?.message);
    }
  } catch (err) {
      if(err instanceof Error){toast.error(err.message);}
    
  }
};



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-200">
            {avatar ? (
              <Image src={avatar} alt="avatar" fill className="object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div>
            <h1 className="text-lg font-semibold">{formData.name}</h1>
            <p className="text-sm text-muted-foreground">{formData.email}</p>

            <label className="text-sm text-blue-600 cursor-pointer">
              Change photo
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </label>
          </div>
        </div>

    <div className="flex flex-col space-y-4">
          <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        <Button
  variant="outline"
  onClick={() => setShowPasswordForm(!showPasswordForm)}
>
  {showPasswordForm ? "Cancel" : "Change Password"}
</Button>
    </div>
      </div>
{showPasswordForm && (
  <form
    onSubmit={handleChangePassword}
    className="space-y-4 mt-6 border p-4 rounded-lg"
  >
    <div>
      <label className="text-sm">Current Password</label>
      <Input
        type="password"
        value={passwordData.currentPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, currentPassword: e.target.value })
        }
      />
    </div>

    <div>
      <label className="text-sm">New Password</label>
      <Input
        type="password"
        value={passwordData.password}
        onChange={(e) =>
          setPasswordData({ ...passwordData, password: e.target.value })
        }
      />
    </div>

    <div>
      <label className="text-sm">Confirm Password</label>
      <Input
        type="password"
        value={passwordData.rePassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, rePassword: e.target.value })
        }
      />
    </div>

    <Button type="submit">
      Save & Login Again
    </Button>
  </form>
)}      
      {/* Update Profile Form */}
   {isEditing && (   <form onSubmit={handleSubmit} className="space-y-4">
        <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Name" />
        <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email" />
        <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone" />
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Profile"}</Button>
      </form>)}
    </div>
  );
}