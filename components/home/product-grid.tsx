import { Card, CardContent } from "@/components/ui/card"

export function ProductGrid() {
  const products = [
    {
      title: "Surface Laptop 5",
      description: "Sophisticated style and multitasking speed powered by 12th Gen Intel® Core™ i5/i7 processors built on the Intel® Evo™ platform make this the perfect gift.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Xbox Wireless Controller",
      description: "Experience the modernized design of the Xbox Wireless Controller, featuring Pulse Red and other vibrant colors.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Xbox Series X",
      description: "The fastest, most powerful Xbox ever.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Microsoft 365",
      description: "Premium Office apps, extra cloud storage, advanced security, and more—all in one convenient subscription.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="container py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.title}
                className="aspect-[3/2] w-full object-cover"
              />
              <h3 className="mt-4 text-xl font-bold">{product.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {product.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}