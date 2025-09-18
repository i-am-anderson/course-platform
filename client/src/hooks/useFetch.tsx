import { useEffect, useRef, useState } from 'react'

const useFetch = <T,>(url: RequestInfo | URL, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const optionsRef = useRef(options)

  optionsRef.current = options

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const handleFetch = async () => {
      setLoading(true)
      setData(null)

      try {
        const urlString = url instanceof URL ? url.href : url
        const res = await fetch(urlString, { signal, ...optionsRef.current })

        if (!res.ok) throw new Error(`Error: ${res.status}`)

        const json = (await res.json()) as T

        if (!signal.aborted) setData(json)
      } catch (err) {
        if (!signal.aborted && err instanceof Error) setError(err.message)
      } finally {
        if (!signal.aborted) setLoading(false)
      }
    }

    handleFetch()
    
    return () => {
      controller.abort()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch
