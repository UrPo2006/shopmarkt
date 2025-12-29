"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
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
import Link from "next/link";

// schema مع التحقق من phone
const schema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    rePassword: z.string().min(8, "Please confirm your password"),
    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "Phone must be 11 digits and start with 01"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type RegisterValues = z.infer<typeof schema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(values: RegisterValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed ❌");
        return;
      }

      toast.success("Account created successfully 🎉");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  }

  return (

<div className="pt-30 "><div
  className="
    relative
    w-full
    max-w-[1030px]
    min-h-[600px]
    mx-auto
     
    rounded-xl
    overflow-hidden
    bg-black
    shadow-xl
    border border-cyan-400/30
    
  "
>
  <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="flex flex-col md:flex-row w-full h-full text-white"
  >
    {/* ================= Form Section ================= */}
    <div
      className="
        w-full
        md:w-[40%]
        p-6
        flex
        flex-col
        justify-center
        gap-6
      "
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Register
      </h2>

      <Form {...form}>
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter username"
                  className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter email"
                  className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showRePassword ? "text" : "password"}
                    {...field}
                    placeholder="Confirm password"
                    className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRePassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showRePassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="01012345678"
                  className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="
            py-3
            bg-gradient-to-b
            from-teal-900
            to-black
            text-lg md:text-2xl
            hover:from-teal-700
            rounded-3xl
            font-semibold
            shadow-teal-500
            dark:text-white
          "
        >
          {loading ? <Loader className="animate-spin" /> : "Register"}
        </Button>

        <p className="text-sm text-center text-gray-500 pb-3">
          Already have an account?{" "}
          <Link
            href="/login"
            className="
              bg-gradient-to-r
              from-teal-400
              via-teal-300
              to-white
              bg-clip-text
              text-transparent
              font-semibold
            "
          >
            Login
          </Link>
        </p>
       
      </Form>
    </div>

    {/* ================= Welcome Section ================= */}
    <div
      className="
        hidden md:flex
        md:w-[60%]
        bg-gradient-to-tl
        from-teal-700
        to-black
        rounded-l-xl
        shadow-[0_0_25px_#00e5ff]
        items-center
        justify-center
        text-center
      "
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 40% 100%)",
      }}
    >
      <h3 className="text-3xl lg:text-4xl font-extrabold">
        <span className="bg-gradient-to-r from-black via-teal-300 to-white bg-clip-text text-transparent">
          Welcome
        </span>
        <br />
        <span className="bg-gradient-to-r from-black via-teal-300 to-white bg-clip-text text-transparent">
          NEW USER!
        </span>
      </h3>
    </div>
  </form>
</div></div>

  );
}
