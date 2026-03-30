import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Loader2 } from 'lucide-react'
import { tmdbApi } from '../utils/tmdb'
import { useGenres } from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import FilterBar from '../components/FilterBar'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const genres = useGenres()

  const [query, setQuery] = useState(q)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ sort: 'popularity.desc', genre: '', year: '', minRating: '' })

  const doSearch = useCallback(async (term, pageNum, reset = false) => {
    if (!term.trim()) return
    setLoading(true)
    try {
      const res = await tmdbApi.searchMovies(term, pageNum, {
        ...(filters.year && { year: filters.year }),
      })
      const { results, total_pages, total_results } = res.data
      let filtered = results
      if (filters.minRating) filtered = filtered.filter(m => m.vote_average >= Number(filters.minRating))
      if (filters.genre) filtered = filtered.filter(m => m.genre_ids?.includes(Number(filters.genre)))
      setMovies(prev => reset || pageNum === 1 ? filtered : [...prev, ...filtered])
      setHasMore(pageNum < total_pages)
      setTotal(total_results)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [filters])

  useEffect(() => {
    setQuery(q)
    setPage(1)
    setMovies([])
    if (q) doSearch(q, 1, true)
  }, [q])

  useEffect(() => {
    if (q) { setPage(1); setMovies([]); doSearch(q, 1, true) }
  }, [filters])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) setSearchParams({ q: query.trim() })
  }

  const loadMore = () => {
    const next = page + 1
    setPage(next)
    doSearch(q, next)
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative max-w-2xl">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-cinema-dim" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for movies, actors, directors..."
            className="input-base pl-12 pr-4 h-14 text-base rounded-xl"
            autoFocus
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary py-2 h-10">
            Search
          </button>
        </div>
      </form>

      {q && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-cinema-muted text-sm">
              {loading && movies.length === 0 ? 'Searching...' : (
                total > 0
                  ? <><span className="text-cinema-text font-semibold">{total.toLocaleString()}</span> results for "<span className="text-cinema-gold">{q}</span>"</>
                  : `No results for "${q}"`
              )}
            </h2>
          </div>

          <FilterBar filters={filters} onChange={setFilters} genres={genres} />
          <MovieGrid
            movies={movies}
            loading={loading && movies.length === 0}
            emptyMessage={`No movies found for "${q}"`}
          />

          {hasMore && movies.length > 0 && (
            <div className="flex justify-center mt-8">
              <button onClick={loadMore} disabled={loading} className="btn-ghost">
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}

      {!q && (
        <div className="flex flex-col items-center justify-center py-24">
          <Search size={48} className="text-cinema-dim mb-4" />
          <p className="text-cinema-muted text-lg">Start typing to discover films</p>
          <p className="text-cinema-dim text-sm mt-1">Search by title, genre, or mood</p>
        </div>
      )}
    </div>
  )
}
