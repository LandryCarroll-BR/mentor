import Link from "next/link"
import { ChatBubbleIcon, DashboardIcon, GearIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons"

import { Main } from "@/components/main"
import { Box, Flex } from "@/components/layout"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { SessionLoader } from "../../components/session-loader"

export default async function Dashboard() {
  return (
    <Main className='h-dvh w-full flex-row'>
      <aside className='flex flex-col border-r p-4 pb-3 md:w-full md:max-w-[250px]'>
        <Box className='mb-8 hidden px-2 text-2xl font-bold md:block'>Mentor</Box>
        <nav className='flex flex-1 flex-col gap-2'>
          <Button asChild className='justify-start gap-2 px-2'>
            <Link href={"/"}>
              <DashboardIcon className='h-5 w-5' />
              <Box className='text-md hidden md:block'>Dashboard</Box>
            </Link>
          </Button>
          <Button asChild className='justify-start gap-2 px-2' variant={"ghost"}>
            <Link href={"/"}>
              <PersonIcon className='h-5 w-5' />
              <Box className='text-md hidden md:block'>Mentors</Box>
            </Link>
          </Button>
          <Button asChild className='justify-start gap-2 px-2' variant={"ghost"}>
            <Link href={"/"}>
              <RocketIcon className='h-5 w-5' />
              <Box className='text-md hidden md:block'>Assessments</Box>
            </Link>
          </Button>
          <Button asChild className='justify-start gap-2 px-2' variant={"ghost"}>
            <Link href={"/"}>
              <ChatBubbleIcon className='h-5 w-5' />
              <Box className='text-md hidden md:block'>Messages</Box>
            </Link>
          </Button>
          <Button asChild className='mt-auto justify-start gap-2 px-2' variant={"ghost"}>
            <Link href={"/"}>
              <GearIcon className='h-5 w-5' />
              <Box className='text-md hidden md:block'>Settings</Box>
            </Link>
          </Button>
        </nav>
      </aside>
      <article className='flex-col0 flex flex-1'>
        <Flex className='h-fit w-full border-b p-3'>
          <Box className='ml-auto'>
            <SessionLoader>{(session) => <UserNav session={session} />}</SessionLoader>
          </Box>
        </Flex>
      </article>
    </Main>
  )
}
