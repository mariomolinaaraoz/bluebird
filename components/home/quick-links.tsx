import Link from "next/link"
import { Monitor, ShoppingBag, Gamepad2, Package } from 'lucide-react'

export function QuickLinks() {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Link
          href="#"
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <Monitor className="h-8 w-8" />
          <span className="text-sm font-medium">Shop Surface devices</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <Gamepad2 className="h-8 w-8" />
          <span className="text-sm font-medium">Shop Xbox games and consoles</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <Package className="h-8 w-8" />
          <span className="text-sm font-medium">Shop for accessories</span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center space-y-2 text-center"
        >
          <ShoppingBag className="h-8 w-8" />
          <span className="text-sm font-medium">Shop Business deals</span>
        </Link>
      </div>
    </section>
  )
}