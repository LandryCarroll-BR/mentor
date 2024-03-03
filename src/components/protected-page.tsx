import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { PropsWithChildren } from "react"

async function ProtectedPage({ children }: PropsWithChildren) {
  const session = await auth()
  if (!session) redirect("/login")
  return <>{children}</>
}

export { ProtectedPage }
