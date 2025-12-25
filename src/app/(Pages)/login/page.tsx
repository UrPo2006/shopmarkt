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
import { Eye, EyeOff, Loader } from "lucide-react";


const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  // const searchparams= useSearchParams()  //علشان اجيبerror الي في الpath     //  callbackUrl:'/',
  // redirect:false: true  فوق  بس لكن استعمل
  // console.log(searchparams.get('error'));
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode:'onChange',
  });

  async function onSubmit(values: FormValues) {
    console.log(values);
    
 setLoading(true);
     const res = await signIn('credentials',{
        email: values.email,
     password: values.password,
    //  callbackUrl:'/',
  redirect:false 

     }
    )
  setLoading(false);
        if(res?.ok){
        toast.success('Login is successfully');
            setTimeout(() => {
      router.push("/"); 
    }, 800);
    
  } else {
    toast.error("Email or password is incorrect ❌");
  }
   
  }

  return (
    <div className="relative w-[900px] h-[500px] mx-auto mt-24 rounded-xl overflow-hidden bg-black shadow-xl border border-cyan-400/30">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full h-full text-white"
      >
        {/* Form Left Side */}
        <div className="w-1/2 p-6 flex flex-col justify-center gap-6">
          <h2 className="text-4xl font-bold text-white text-center">Login</h2>

          <Form {...form}>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      {...field}
                      className="p-3 bg-gray-900 border border-teal-500/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormDescription>Your public username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <Button
              type="submit"
                disabled={loading||!form.formState.isValid} 
              className="py-3 bg-gradient-to-b text-2xl dark:text-white hover:bg-teal-700 from-teal-900 to-black shadow-2xs shadow-teal-500 rounded-3xl font-semibold cursor-pointer"
            >
            {loading&& <Loader className="animate-spin" />} Login
            </Button>

            <p className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="  bg-gradient-to-r from-teal-400 via-teal-300 to-white
             bg-clip-text text-transparent  cursor-pointer hover:underline"
              >
                Sign Up
              </a>
            </p>
          </Form>
        </div>

        {/* Right Side Decorative */}
        <div
          className="absolute top-0 end-0 h-full w-[60%] bg-gradient-to-tl from-teal-700 to-black rounded-l-xl border shadow-[0_0_25px_#00e5ff] transition-all duration-700 ease-in-out flex items-center justify-center text-white text-center text-5xl font-bold"
          style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 40% 100%)" }}
        >
          <h3 className="text-4xl font-extrabold text-center">
            WELCOME
            <br />
            BACK!
          </h3>
        </div>
      </form>
    </div>
  );
}




