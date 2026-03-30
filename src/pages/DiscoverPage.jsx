import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { tmdbApi } from '../utils/tmdb'
import { useGenres } from '../hooks/useMovies'
import MovieGrid from '../components/MovieGrid'
import FilterBar from '../components/FilterBar'
import { Loader2 } from 'lucide-react'

const CATEGORIES = {
  trending: { label: 'Trending', fn: (p) => tmdbApi.getTrending('week') },
  popular: { label: 'Popular', fn: (p) => tmdbApi.getPopular(p) },
  top_rated: { label: 'Top Rated', fn: (p) => tmdbApi.getTopRated(p) },
  now_playing: { label: 'Now Playing', fn: (p) => tmdbApi.getNowPlaying(p) },
  upcoming: { label: 'Upcoming', fn: (p) => tmdbApi.getUpcoming(p) },
}

export default function DiscoverPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || 'popular'
  const genres = useGenres()

  const [filters, setFilters] = useState({ sort: 'popularity.desc', genre: '', year: '', minRating: '' })
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [usingFilters, setUsingFilters] = useState(false)

  const isFiltered = filters.genre || filters.year || filters.minRating || filters.sort !== 'popularity.desc'

  const fetchMovies = useCallback(async (pageNum, reset = false) => {
    setLoading(true)
    try {
      let res
      if (isFiltered) {
        setUsingFilters(true)
        const params = {
          sort_by: filters.sort,
          page: pageNum,
          ...(filters.genre && { with_genres: filters.genre }),
          ...(filters.year && { primary_release_year: filters.year }),
          ...(filters.minRating && { 'vote_average.gte': filters.minRating }),
          'vote_count.gte': 50,
        }
        res = await tmdbApi.discoverMovies(params)
      } else {
        setUsingFilters(false)
        const catFn = CATEGORIES[category]?.fn || CATEGORIES.popular.fn
        res = await catFn(pageNum)
      }
      const { results, total_pages } = res.data
      setMovies(prev => reset || pageNum === 1 ? results : [...prev, ...results])
      setHasMore(pageNum < total_pages)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [filters, category, isFiltered])

  useEffect(() => {
    setPage(1)
    setMovies([])
    fetchMovies(1, true)
  }, [filters, category])

  const loadMore = () => {
    if (loading || !hasMore) return
    const next = page + 1
    setPage(next)
    fetchMovies(next)
  }

  const title = isFiltered ? 'Filtered Results' : (CATEGORIES[category]?.label || 'Discover')

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">
          {title}
          {movies.length > 0 && (
            <span className="text-cinema-dim text-lg font-normal ml-3 font-body">
              {movies.length} films
            </span>
          )}
        </h1>
      </div>

      {/* Category tabs */}
      {!isFiltered && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <a
              key={key}
              href={`/discover?category=${key}`}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                category === key
                  ? 'bg-cinema-gold text-cinema-black'
                  : 'bg-cinema-card border border-cinema-border text-cinema-muted hover:text-cinema-text hover:border-cinema-gold/30'
              }`}
            >
              {val.label}
            </a>
          ))}
        </div>
      )}

      <FilterBar filters={filters} onChange={setFilters} genres={genres} />

      <MovieGrid movies={movies} loading={loading && movies.length === 0} />

      {/* Load more */}
      {hasMore && movies.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-ghost"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}
