"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Button } from "@/components/ui/button"
import { GithubIcon } from 'lucide-react'

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="mt-4">
      <Button
        type="button"
        title="Github"
        onClick={handleSignIn}
        className="w-full flex items-center justify-center"
        variant="outline"
      >
        <GithubIcon className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </div>
  );
}