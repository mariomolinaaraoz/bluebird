"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function EmailButton() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleLogin = async (event : any) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ 
      email: email,
      password: password,
    })

    if (error) {
      alert(error || error)
    } else {
      router.refresh();
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Login with email</h1>        
        <form className="form-widget" onSubmit={handleLogin}>
          <div className="flex flex-col gap-4">
            <input
              className="text-black"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-black"
              type="password"
              placeholder="password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Login</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}