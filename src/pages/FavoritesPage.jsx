import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import MovieCard from '../components/MovieCard'
import { EmptyState } from './WatchlistPage'

export default function FavoritesPage() {
  const { favorites } = useApp()
  const [sort, setSort] = useState('newest')

  const sorted = [...favorites].sort((a, b) => {
    if (sort === 'newest') return b.addedAt - a.addedAt
    if (sort === 'oldest') return a.addedAt - b.addedAt
    if (sort === 'title') return a.title.localeCompare(b.title)
    if (sort === 'rating') return (b.vote_average || 0) - (a.vote_average || 0)
    return 0
  })

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-3">
            <Heart className="text-cinema-red fill-cinema-red" size={28} />
            My Favorites
          </h1>
          <p className="text-cinema-muted mt-1 text-sm">{favorites.length} beloved films</p>
        </div>
        {favorites.length > 0 && (
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-base w-auto text-sm h-9"
          >
            <option value="newest">Recently Added</option>
            <option value="oldest">Oldest First</option>
            <option value="title">A–Z</option>
            <option value="rating">TMDB Rating</option>
          </select>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Heart size={48} className="text-cinema-dim" />}
          title="No favorites yet"
          subtitle="Click the heart icon on any movie to add it to your favorites"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sorted.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
