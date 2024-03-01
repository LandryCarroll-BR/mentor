import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

interface BoxProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(({ asChild, className, ...boxProps }, forwardedRef) => {
  const Comp = asChild ? Slot : "div"
  return <Comp {...boxProps} ref={forwardedRef} className={cn("block", className)} />
})
Box.displayName = "Box"

interface ContainerProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ asChild, className, ...containerProps }, forwardedRef) => {
    const Comp = asChild ? Slot : "div"
    return <Comp {...containerProps} ref={forwardedRef} className={cn("container", className)} />
  }
)
Container.displayName = "Container"

interface FlexProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({ asChild, className, ...flexProps }, forwardedRef) => {
  const Comp = asChild ? Slot : "div"
  return <Comp {...flexProps} ref={forwardedRef} className={cn("flex", className)} />
})
Flex.displayName = "Flex"

interface GridProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(({ asChild, className, ...gridProps }, forwardedRef) => {
  const Comp = asChild ? Slot : "div"
  return <Comp {...gridProps} ref={forwardedRef} className={cn("grid", className)} />
})
Grid.displayName = "Grid"

interface SectionProps extends React.ComponentProps<"section"> {
  asChild?: boolean
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ asChild, className, ...sectionProps }, forwardedRef) => {
    const Comp = asChild ? Slot : "section"

    return <Comp {...sectionProps} ref={forwardedRef} className={cn("", className)} />
  }
)
Section.displayName = "Section"

export { Box, Container, Flex, Grid, Section }
