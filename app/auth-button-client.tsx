"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "https://bluebird-wine.vercel.app:3000/auth/callback",
      },
    });
  };

  return session ? (
    <button className="text-xs text-gray-400" onClick={handleSignOut}>Logout</button>
  ) : (
    <button className="text-xs text-gray-400" onClick={handleSignIn}>Login</button>
  );
}