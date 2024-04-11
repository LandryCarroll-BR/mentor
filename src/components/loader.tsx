import { unstable_cache as cache } from 'next/cache'

interface LoaderProps<T, D extends any[]> {
  children: (data: T) => React.ReactNode
  query: (...args: D) => Promise<T>
  args?: D
  tags?: string[]
}

async function Loader<T, D extends any[]>({ children, query, args = [] as unknown as D, tags }: LoaderProps<T, D>) {
  const cachedQuery = cache(async () => query(...args), [`${query.name}${[...args]}`], { tags })
  const data = await cachedQuery()
  if (!data) return
  return <>{children(data)}</>
}

export { Loader }
