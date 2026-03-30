import { useState, useEffect, useCallback } from 'react'
import { tmdbApi } from '../utils/tmdb'

export function useMovies(fetchFn, deps = [], options = {}) {
  const { page = 1, enabled = true } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetchFn()
      setData(res.data)
    } catch (err) {
      setError(err.response?.data?.status_message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [...deps, enabled])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}

export function useInfiniteMovies(fetchFn) {
  const [pages, setPages] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (pageNum) => {
    setLoading(true)
    try {
      const res = await fetchFn(pageNum)
      const { results, total_pages } = res.data
      setPages(prev => pageNum === 1 ? results : [...prev, ...results])
      setHasMore(pageNum < total_pages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [fetchFn])

  useEffect(() => { load(page) }, [page])

  const loadMore = () => { if (!loading && hasMore) setPage(p => p + 1) }
  const reset = () => { setPage(1); setPages([]) }

  return { movies: pages, loading, error, hasMore, loadMore, reset }
}

export function useGenres() {
  const [genres, setGenres] = useState([])
  useEffect(() => {
    tmdbApi.getGenres().then(r => setGenres(r.data.genres)).catch(() => {})
  }, [])
  return genres
}
