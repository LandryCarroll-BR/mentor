import { signIn } from "@/lib/auth"
import { Button } from "@/ui/button"
import { BuiltInProviderType } from "next-auth/providers"

type SignInButtonProps = { provider?: BuiltInProviderType } & React.ComponentPropsWithRef<typeof Button>

function SignInButton({ children, provider, ...props }: SignInButtonProps) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <Button {...props}>{children}</Button>
    </form>
  )
}

export { SignInButton }
