import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { action } from './safe-action'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type LoaderData<T extends (...args: any) => any> = NonNullable<Awaited<ReturnType<T>>['data']>
