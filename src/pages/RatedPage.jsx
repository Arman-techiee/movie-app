import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import MovieCard from '../components/MovieCard'
import { EmptyState } from './WatchlistPage'
import StarRating from '../components/StarRating'

export default function RatedPage() {
  const { watchlist, favorites, ratings, setRating } = useApp()
  const [filterStar, setFilterStar] = useState(0)

  // Build a combined map of all known movies
  const allMovies = {}
  ;[...watchlist, ...favorites].forEach(m => { allMovies[m.id] = m })

  // Only show movies that have been rated
  const ratedMovies = Object.entries(ratings)
    .map(([id, r]) => ({ ...allMovies[id], id: Number(id), _rating: r }))
    .filter(m => m.title) // has full data
    .filter(m => filterStar === 0 || m._rating === filterStar)
    .sort((a, b) => b._rating - a._rating)

  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, r) => ({
    ...acc,
    [r]: Object.values(ratings).filter(v => v === r).length,
  }), {})

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold flex items-center gap-3">
          <Star className="text-cinema-gold fill-cinema-gold" size={28} />
          My Ratings
        </h1>
        <p className="text-cinema-muted mt-1 text-sm">{Object.keys(ratings).length} films rated</p>
      </div>

      {/* Stats */}
      {Object.keys(ratings).length > 0 && (
        <div className="grid grid-cols-5 gap-3 mb-8">
          {[5, 4, 3, 2, 1].map(star => (
            <button
              key={star}
              onClick={() => setFilterStar(filterStar === star ? 0 : star)}
              className={`bg-cinema-card border rounded-xl p-4 text-center transition-all duration-200 ${
                filterStar === star
                  ? 'border-cinema-gold bg-cinema-gold/10'
                  : 'border-cinema-border hover:border-cinema-gold/30'
              }`}
            >
              <div className="flex justify-center mb-2">
                {Array.from({ length: star }).map((_, i) => (
                  <Star key={i} size={14} className="fill-cinema-gold text-cinema-gold" />
                ))}
              </div>
              <div className="text-2xl font-bold text-cinema-text font-mono">{ratingCounts[star] || 0}</div>
              <div className="text-cinema-dim text-xs mt-0.5">film{ratingCounts[star] !== 1 ? 's' : ''}</div>
            </button>
          ))}
        </div>
      )}

      {filterStar > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-cinema-muted text-sm">Showing</span>
          <div className="flex">{Array.from({ length: filterStar }).map((_, i) => (
            <Star key={i} size={14} className="fill-cinema-gold text-cinema-gold" />
          ))}</div>
          <button onClick={() => setFilterStar(0)} className="text-xs text-cinema-dim hover:text-cinema-muted ml-1">Clear filter</button>
        </div>
      )}

      {ratedMovies.length === 0 ? (
        <EmptyState
          icon={<Star size={48} className="text-cinema-dim" />}
          title={filterStar ? `No ${filterStar}-star ratings yet` : 'No ratings yet'}
          subtitle="Rate movies by hovering over them in the grid or visiting their detail page"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {ratedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
