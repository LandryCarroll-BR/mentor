import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYoutubeVideoSrc(src: string) {
  if (src.includes('watch')) {
    // ex: https://www.youtube.com/watch?v=VIDEOID
    const url = new URL(src)
    const videoId = url.searchParams.get('v')
    return `https://www.youtube.com/embed/${videoId}`
  }

  if (src.startsWith('https://youtu.be')) {
    //ex: https://youtu.be/XMlzAFzWpqM?si=mTOYrFL4N9lALnpM
    const url = new URL(src)
    const videoId = url.pathname
    return `https://www.youtube.com/embed/${videoId}`
  }
}

export type LoaderData<T extends (...args: any) => any> = NonNullable<Awaited<ReturnType<T>>['data']>

export async function copyToClipboard(value: string) {
  navigator.clipboard.writeText(value)
}
