import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action"
import { auth } from "./auth"
import { redirect } from "next/navigation"

export class ActionError extends Error {}

const handleReturnedServerError = (e: Error) => {
  if (e instanceof ActionError) {
    return e.message
  }

  return DEFAULT_SERVER_ERROR
}

export const action = createSafeActionClient()

export const authAction = createSafeActionClient({
  async middleware() {
    const session = await auth()
    if (!session?.user) redirect("/login")
  },
  handleReturnedServerError,
})
