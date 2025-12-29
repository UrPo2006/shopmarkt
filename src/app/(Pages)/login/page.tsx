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
import Link from "next/link";


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
<div className="flex items-center justify-center min-h-screen ">
  <div
  className="
    relative
    w-full
    max-w-[900px]
    min-h-[500px]
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
 
    <div
      className="
      w-full md:w-[50%]
        p-6
        flex
        flex-col
        justify-center
        gap-6
        mt-10
      "
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Login
      </h2>

      <Form {...form}>
     
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
                    {showPassword ? (
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

      
        <Button
          type="submit"
          disabled={loading || !form.formState.isValid}
          className="
            py-3
            bg-gradient-to-b
            from-teal-900
            to-black
            text-lg md:text-2xl
            hover:from-teal-700
            rounded-3xl
            font-semibold
            dark:text-white
          "
        >
          {loading && <Loader className="animate-spin mr-2" />}
          Login
        </Button>

        <p className="text-sm text-center text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="
              bg-gradient-to-r
              from-teal-400
              via-teal-300
              to-white
              bg-clip-text
              text-transparent
              hover:underline
            "
          >
            Sign Up
          </Link>
        </p>
             <Link href="/ForgoTPassword" className="   
             bg-gradient-to-r from-teal-400 via-teal-300 to-white 
             bg-clip-text text-transparent  
              font-semibold   cursor-pointer   absolute bottom-25  left-50 xl:left-40 "> Forgot Password ? </Link> 
      </Form>
    </div>

 
    <div
      className="
        hidden md:flex
        w-[60%]
        h-full
        absolute
        top-0
        end-0
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
          BACK!
        </span>
      </h3>
    </div>
  </form>
</div></div>



  );
}




