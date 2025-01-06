import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/home/site-header"
import { Banner } from "@/components/home/banner"
import { HeroSection } from "@/components/home/hero-section"
import { QuickLinks } from "@/components/home/quick-links"
import { ProductGrid } from "@/components/home/product-grid"

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <Banner />
      <main className="flex-1">
        <HeroSection />
        <QuickLinks />
        <ProductGrid />
      </main>
    </div>
  );
}