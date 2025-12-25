"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", newPassword: "" },
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            newPassword: values.newPassword,
             
          }),
        }
      );

      const data = await res.json();
      console.log(data)

      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      toast.success("Password reset successfully ✅");
      router.push("/login");
    } catch (err) {
      if(err instanceof Error){toast.error(err.message || "Something went wrong ❌");}
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-[500px] h-[400px] mx-auto mt-24 rounded-xl overflow-hidden bg-black shadow-xl border border-cyan-400/30">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full h-full text-white p-6 gap-6"
      >
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <p className="text-gray-400 text-center text-sm">
          Enter your email and new password
        </p>

        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
  control={form.control}
  name="newPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...field}
            placeholder="Enter password"
            className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg pr-10"
          />
          <button
            type="button"
               onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          

          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            className="text-white py-3 bg-gradient-to-b text-xl from-teal-900 to-black rounded-3xl w-full mt-4"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </Form>
      </form>
    </div>
  );
}
