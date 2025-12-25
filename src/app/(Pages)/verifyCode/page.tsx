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

const formSchema = z.object({
  resetCode: z.string().min(6, "Code must be 6 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { resetCode: "" },
    mode: "onChange",
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);

      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: values.resetCode }),
        }
      );

      const data = await res.json();
       console.log(data)
      if (!res.ok || data.status !== "Success") {
        throw new Error(data.message || "Invalid code ❌");
      }

      toast.success("Code verified successfully ✅");
      router.push("/reset-password");
    } catch (error) {
      if(error instanceof Error){toast.error(error?.message || "Something went wrong ❌");}
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-[500px] h-[300px] mx-auto mt-24 rounded-xl overflow-hidden bg-black shadow-xl border border-cyan-400/30">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full h-full text-white p-6 gap-6"
      >
        <h2 className="text-3xl font-bold text-center">Verify Code</h2>
        <p className="text-gray-400 text-center text-sm">
          Enter the 6-digit code sent to your email
        </p>

        <Form {...form}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reset Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter code"
                    {...field}
                    className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            className="py-3 bg-gradient-to-b text-xl from-teal-900 to-black rounded-3xl w-full mt-4"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </Form>
      </form>
    </div>
  );
}
