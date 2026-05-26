"use client";

import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input2";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";

export function SignInForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none  p-4 md:rounded-2xl md:px-6 ">
      <h2 className="text-6xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back!
      </h2>
      <p className="mt-2 max-w-sm text-base text-neutral-600 dark:text-neutral-300/90">
        Please choose one of the following sign in options or create a new
        account to
      </p>

      <form className="my-10" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="example@gmail.com" type="email" />
        </LabelInputContainer>

        <button
          className="group/btn shadow-input mt-8 relative block h-10 w-full rounded-md bg-gray-50 font-medium text-neutral-800 dark:text-white  dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
          type="submit"
        >
          Continue with email
          <BottomGradient />
        </button>

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] cursor-pointer"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Login With Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
