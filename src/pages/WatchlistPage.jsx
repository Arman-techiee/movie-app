import React, { useState } from 'react'
import { Bookmark, Trash2, SortAsc } from 'lucide-react'
import { useApp } from '../context/AppContext'
import MovieCard from '../components/MovieCard'

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useApp()
  const [sort, setSort] = useState('newest')

  const sorted = [...watchlist].sort((a, b) => {
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
            <Bookmark className="text-cinema-gold fill-cinema-gold" size={28} />
            My Watchlist
          </h1>
          <p className="text-cinema-muted mt-1 text-sm">{watchlist.length} films to watch</p>
        </div>
        {watchlist.length > 0 && (
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

      {watchlist.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={48} className="text-cinema-dim" />}
          title="Your watchlist is empty"
          subtitle="Browse movies and click the bookmark icon to save them here"
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

export function EmptyState({ icon, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 opacity-50">{icon}</div>
      <h3 className="text-cinema-text text-xl font-medium mb-2">{title}</h3>
      <p className="text-cinema-muted text-sm max-w-xs">{subtitle}</p>
    </div>
  )
}
