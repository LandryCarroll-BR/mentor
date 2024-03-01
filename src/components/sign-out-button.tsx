import { signOut } from "@/lib/auth"
import { Button } from "@/ui/button"

type SignOutButtonProps = { provider?: string } & React.ComponentPropsWithRef<typeof Button>

function SignOutButton({ children, provider, ...props }: SignOutButtonProps) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button {...props}>{children}</Button>
    </form>
  )
}

export { SignOutButton }
