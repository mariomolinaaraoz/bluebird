"use client";

import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return session ? (
    <button
      className={`text-xs text-gray-400 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleSignOut}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  ) : (
    <button
      className={`text-xs text-gray-400 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={handleSignIn}
      disabled={isLoading}
    >
      {isLoading ? "Signing in..." : "Sign In"}
    </button>
  );
}