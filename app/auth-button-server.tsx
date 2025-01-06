import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./auth-button-client";

/**
 * Server Component that fetches the session and passes it to AuthButtonClient.
 */
export default async function AuthButtonServer() {
  // Initialize Supabase client
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch the session data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Render the client-side component with the session
  return <AuthButtonClient session={session} />;
}