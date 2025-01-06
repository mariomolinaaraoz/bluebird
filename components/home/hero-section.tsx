import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-blue-50">
      <div className="container grid items-center gap-4 pb-8 pt-6 md:grid-cols-2 md:py-10">
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Maximize the everyday with Microsoft 365
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Get online protection, secure cloud storage, and innovative apps
            designed to fit your needs—all in one plan.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button>For 1 person</Button>
            <Button variant="outline">For up to 6 people</Button>
          </div>
        </div>
        <div className="relative hidden md:block">
          <img
            src="/placeholder.svg?height=600&width=600"
            alt="Microsoft 365 apps"
            className="aspect-square object-cover"
          />
        </div>
      </div>
    </section>
  )
}