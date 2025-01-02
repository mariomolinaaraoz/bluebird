"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://bluebird-wine.vercel.app/auth/callback",
      },
    });
  };

  return (
    <div className="mt-4">
      <Button
        // onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        onClick={handleSignIn}
        className="w-full flex items-center justify-center"
        variant="outline"
        title="Github"
      >
        <GithubIcon className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </div>
  );
}