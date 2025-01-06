import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Falta el código" }, { status: 400 });
  }

  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  } catch (error) {
    console.error("Error al intercambiar el código por una sesión:", error);
    return NextResponse.json(
      { error: "Error al intercambiar el código por una sesión" },
      { status: 500 }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
