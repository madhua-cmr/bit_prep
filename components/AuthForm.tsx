"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/admin.action";

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const isSignin = type === "sign-in" ? true : false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const{name,email,password}=values;
    try {
      if (type === "sign-up") {
       const  usercredentials=await createUserWithEmailAndPassword(auth,email,password);
       const result=await signUp({
        uid:usercredentials.user.uid,
        name:name!,
        email,
        password
       })
       if(!result?.success){
        toast.error(result?.message);
        return;
       }

        toast.success("Sign up successfully ,please login");
        router.push("/sign-in");
      } else {
        const usercredentials=await signInWithEmailAndPassword(auth,email,password);
        const idToken=await usercredentials.user.getIdToken();
        if(!idToken){
          toast.error("Sign in failed");

          return;
        }
await signIn({email,idToken})

        toast.success("Signed in successfully");
        router.push("/");
      }
    } catch (error) {
      console.log("There is something wrong", error);
      toast.error(`There was an error: ${error} `);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center  " >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 container">
          {!isSignin && (
            <FormField
              control={form.control}
              placeholder="Enter your name"
              label="Name"
              name="name"
            />
          )}
          <FormField
            control={form.control}
            placeholder="Enter your email"
            label="Email"
            name="email"
            type="email"
          />
          <FormField
            control={form.control}
            placeholder="Enter your Password"
            label="Password"
            name="password"
            type="password"
          />
          <Button type="submit" className="button">
            {isSignin ? "Sign in" : "Create an account"}
          </Button>
        </form>
      </Form>
      <p>
        {isSignin ? "No account yet ?" : "Have an account already?"}
        <Link  href={isSignin ? "/sign-up" : "/sign-in"}>
          {isSignin ? " Sign up" : " Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
