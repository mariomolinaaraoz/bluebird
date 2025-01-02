"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "https://bluebird-wine.vercel.app",
        },
      });
    } catch (err) {
      setError("Error al intentar iniciar sesión con GitHub. Por favor, intente de nuevo.");
      console.error("GitHub sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        className="hover:bg-gray-800 p-8 rounded-xl flex items-center justify-center"
        title="GitHub"
        disabled={loading} // Deshabilitar el botón mientras se está autenticando
      >
        {loading ? (
          <span className="text-white">Cargando...</span>
        ) : (
          <Image
            src="/github-mark-white.png"
            alt="GitHub logo"
            width={40} // Tamaño reducido para mejorar la experiencia de carga
            height={40}
            priority // Optimización de imagen
          />
        )}
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-semibold">
          {error}
        </div>
      )}
    </div>
  );
}
