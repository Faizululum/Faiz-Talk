"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col card gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo_0.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">FaizTalk</h2>
        </div>
        <div className="flex flex-col gap-1">
        <h3 className="text-center">Train Smart. Talk Better.</h3>
        <h4 className="text-center text-light-100">
          An AI-powered platform for preparing for mock interviews.
        </h4>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4 w-full form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your Email Address"
                type="email"
              />
            <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-light-100">
            {isSignIn ? "No account yet?" : "Already have an account?"}
            <Link
              href={!isSignIn ? "/sign-in" : "/sign-up"}
              className="text-user-primary-100 ml-1 font-bold"
            >
              {!isSignIn ? "Sign In" : "Sign Up"}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
