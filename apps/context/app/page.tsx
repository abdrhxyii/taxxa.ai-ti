import { useAuth } from "@/context/AuthContext"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function Page() {

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Link href="/signin">Button</Link>
      </div>
    </div>
  )
}
