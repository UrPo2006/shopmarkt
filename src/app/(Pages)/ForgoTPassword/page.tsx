"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const form = useForm<FormValues>({
  
  resolver: zodResolver(formSchema),
  defaultValues: { email: "" },
  mode: "onChange",
});
async function onSubmit(values: FormValues) {
  try {
    setLoading(true);

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      }
    );

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      throw new Error(data.message || "Failed to send reset code");
    }

    toast.success("Reset code sent to your email 📧");
    router.push("/verifyCode");
  } catch (error) {
    if(error instanceof Error){toast.error(error.message! || "Something went wrong ❌");}
    
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="relative w-[900px] h-[500px] mx-auto mt-24 rounded-xl overflow-hidden bg-black shadow-xl border border-cyan-400/30">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full h-full text-white"
      >
        {/* Left Side */}
        <div className="w-1/2 p-6 flex flex-col justify-center gap-6">
          <h2 className="text-4xl font-bold text-center">
            Forgot Password
          </h2>

          <p className="text-gray-400 text-center text-sm">
            Enter your email and we will send you a reset code
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
                      placeholder="example@email.com"
                      {...field}
                      className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading || !form.formState.isValid}
              className="py-3 bg-gradient-to-b text-xl from-teal-900 to-black rounded-3xl"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Remember your password?{" "}
              <a href="/login" className="bg-gradient-to-r from-teal-400 via-teal-300 to-white
             bg-clip-text text-transparent hover:underline">
                Login
              </a>
            </p>
          </Form>
        </div>

        {/* Right Side */}
        <div
          className="absolute top-0 end-0 h-full w-[60%] bg-gradient-to-tl from-teal-700 to-black rounded-l-xl flex items-center justify-center text-center text-4xl font-bold"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 40% 100%)" }}
        >
          <h3>
            RESET
            <br />
            PASSWORD
          </h3>
        </div>
      </form>
    </div>
  );
}
