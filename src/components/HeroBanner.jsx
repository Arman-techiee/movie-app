import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, Star, Calendar, Bookmark, Heart } from 'lucide-react'
import { getBackdropUrl, getPosterUrl } from '../utils/tmdb'
import { useApp } from '../context/AppContext'

export default function HeroBanner({ movies = [] }) {
  const [current, setCurrent] = useState(0)
  const { toggleWatchlist, toggleFavorite, isInWatchlist, isInFavorites } = useApp()

  useEffect(() => {
    if (movies.length < 2) return
    const interval = setInterval(() => setCurrent(i => (i + 1) % Math.min(movies.length, 5)), 6000)
    return () => clearInterval(interval)
  }, [movies.length])

  if (!movies.length) return null
  const movie = movies[current]
  const backdrop = getBackdropUrl(movie.backdrop_path)
  const year = movie.release_date?.slice(0, 4)

  return (
    <div className="relative h-[75vh] min-h-[500px] rounded-2xl overflow-hidden mb-12 group">
      {/* Background */}
      <div className="absolute inset-0">
        {backdrop ? (
          <img
            key={movie.id}
            src={backdrop}
            alt={movie.title}
            className="w-full h-full object-cover animate-fade-in"
          />
        ) : (
          <div className="w-full h-full bg-cinema-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-cinema-black/30" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-12 px-8 sm:px-12">
        <div className="max-w-lg animate-slide-up">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className="badge bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30">
              ✦ Featured
            </span>
            {year && (
              <span className="badge bg-cinema-card/80 text-cinema-muted border border-cinema-border">
                <Calendar size={10} /> {year}
              </span>
            )}
            {movie.vote_average > 0 && (
              <span className="badge bg-cinema-card/80 text-cinema-text border border-cinema-border">
                <Star size={10} className="fill-cinema-gold text-cinema-gold" />
                {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
            {movie.title}
          </h1>

          <p className="text-cinema-muted text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {movie.overview}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Link to={`/movie/${movie.id}`} className="btn-primary shadow-[0_0_20px_rgba(245,197,24,0.3)]">
              <Info size={16} /> More Info
            </Link>
            <button
              onClick={() => toggleWatchlist(movie)}
              className={`btn-ghost ${isInWatchlist(movie.id) ? 'border-cinema-gold text-cinema-gold' : ''}`}
            >
              <Bookmark size={16} className={isInWatchlist(movie.id) ? 'fill-cinema-gold' : ''} />
              {isInWatchlist(movie.id) ? 'In Watchlist' : 'Watchlist'}
            </button>
            <button
              onClick={() => toggleFavorite(movie)}
              className={`p-2.5 rounded-lg border transition-all duration-200 ${
                isInFavorites(movie.id)
                  ? 'bg-cinema-red/20 border-cinema-red/40 text-cinema-red'
                  : 'bg-transparent border-cinema-border text-cinema-muted hover:text-cinema-text'
              }`}
            >
              <Heart size={16} className={isInFavorites(movie.id) ? 'fill-cinema-red' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 right-8 flex gap-1.5">
          {movies.slice(0, 5).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-1.5 bg-cinema-gold'
                  : 'w-1.5 h-1.5 bg-cinema-border hover:bg-cinema-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
