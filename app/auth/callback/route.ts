import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    try {
      // Intenta intercambiar el código por la sesión
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        // Maneja el error si el intercambio falla
        console.error("Error exchanging code for session:", error);
        return NextResponse.redirect("/login?error=true");
      }

      // Si todo sale bien, redirige a la página de inicio
      return NextResponse.redirect("/"); // Redirige a donde necesites
    } catch (error) {
      console.error("Unexpected error:", error);
      return NextResponse.redirect("/login?error=true");
    }
  }

  // Si no hay código, redirige a la página de inicio
  return NextResponse.redirect("/login");
}
