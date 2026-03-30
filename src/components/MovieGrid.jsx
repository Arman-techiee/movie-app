import React from 'react'
import MovieCard from './MovieCard'
import { MovieGridSkeleton } from './Skeleton'

export default function MovieGrid({ movies, loading, emptyMessage = 'No movies found' }) {
  if (loading && !movies?.length) return <MovieGridSkeleton />

  if (!movies?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-4">🎬</span>
        <p className="text-cinema-muted text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {loading && <MovieGridSkeleton count={6} />}
    </div>
  )
}
