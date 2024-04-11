import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { VideoIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { cn, getYoutubeVideoSrc } from '../lib/utils'

const Video = React.memo(async ({ src, className }: { src?: string; className?: string }) => {
  if (!src) return

  const videoSRC = getYoutubeVideoSrc(src)

  return (
    <AspectRatio ratio={16 / 9} className={className}>
      <iframe src={videoSRC} allowFullScreen className={cn('h-full w-full rounded shadow-md')} />
    </AspectRatio>
  )
})

Video.displayName = 'Video'

function VideoSkeleton() {
  return (
    <AspectRatio ratio={16 / 9}>
      <div className='flex h-full w-full animate-pulse items-center justify-center bg-muted'>
        <VideoIcon className='h-16 w-16 text-muted-foreground' />
      </div>
    </AspectRatio>
  )
}

export { Video, VideoSkeleton }
