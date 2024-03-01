import * as React from "react"

import { cn } from "@/lib/utils"

const Main = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ children, className, ...props }, ref) => (
    <main ref={ref} className={cn("flex flex-1 flex-col", className)} {...props}>
      {children}
    </main>
  )
)

Main.displayName = "Main"

export { Main }
