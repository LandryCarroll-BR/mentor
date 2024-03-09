import { unstable_cache } from 'next/cache'

interface LoaderProps<T, D extends any[]> {
  children: (data: T) => React.ReactNode
  query: (...args: D) => Promise<T>
  args?: D
}

async function Loader<T, D extends any[]>({ children, query, args = [] as unknown as D }: LoaderProps<T, D>) {
  const cachedQuery = unstable_cache(async () => query(...args), [`${query.name}${[...args]}`])
  const data = await cachedQuery()
  return <>{children(data)}</>
}

export { Loader }
