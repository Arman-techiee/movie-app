import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Bookmark, Eye, Star, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getPosterUrl } from '../utils/tmdb'
import StarRating from './StarRating'

export default function MovieCard({ movie, style = 'grid' }) {
  const { toggleWatchlist, toggleFavorite, toggleWatched, setRating,
          isInWatchlist, isInFavorites, isWatched, getRating } = useApp()
  const [imgError, setImgError] = useState(false)
  const [showRating, setShowRating] = useState(false)

  const posterUrl = getPosterUrl(movie.poster_path)
  const year = movie.release_date?.slice(0, 4)
  const tmdbRating = movie.vote_average?.toFixed(1)
  const myRating = getRating(movie.id)
  const inWatchlist = isInWatchlist(movie.id)
  const inFavorites = isInFavorites(movie.id)
  const watched = isWatched(movie.id)

  const handleAction = (e, fn) => {
    e.preventDefault()
    e.stopPropagation()
    fn(movie)
  }

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card group relative block animate-fade-in"
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3] bg-cinema-deep">
        {posterUrl && !imgError ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
            <span className="text-4xl">🎬</span>
            <span className="text-cinema-dim text-xs text-center line-clamp-2">{movie.title}</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Watched badge */}
        {watched && (
          <div className="absolute top-2 left-2 bg-cinema-teal/90 rounded-full p-1">
            <Eye size={12} className="text-white" />
          </div>
        )}

        {/* My Rating badge */}
        {myRating > 0 && (
          <div className="absolute top-2 right-2 bg-cinema-gold text-cinema-black text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <Star size={9} className="fill-cinema-black" />
            {myRating}
          </div>
        )}

        {/* Action buttons — show on hover */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-1.5">
            <ActionBtn
              icon={<Heart size={13} className={inFavorites ? 'fill-cinema-red text-cinema-red' : ''} />}
              active={inFavorites}
              onClick={e => handleAction(e, toggleFavorite)}
              title={inFavorites ? 'Remove from favorites' : 'Add to favorites'}
              activeColor="bg-cinema-red/20 border-cinema-red/40"
            />
            <ActionBtn
              icon={<Bookmark size={13} className={inWatchlist ? 'fill-cinema-gold text-cinema-gold' : ''} />}
              active={inWatchlist}
              onClick={e => handleAction(e, toggleWatchlist)}
              title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              activeColor="bg-cinema-gold/20 border-cinema-gold/40"
            />
            <ActionBtn
              icon={watched ? <EyeOff size={13} /> : <Eye size={13} />}
              active={watched}
              onClick={e => handleAction(e, toggleWatched)}
              title={watched ? 'Mark as unwatched' : 'Mark as watched'}
              activeColor="bg-cinema-teal/20 border-cinema-teal/40"
            />
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setShowRating(!showRating) }}
            className="bg-cinema-black/70 border border-cinema-border/60 rounded-full p-1 hover:border-cinema-gold/40 transition-colors"
          >
            <Star size={13} className={myRating > 0 ? 'fill-cinema-gold text-cinema-gold' : 'text-cinema-muted'} />
          </button>
        </div>

        {/* Inline rating panel */}
        {showRating && (
          <div
            className="absolute inset-0 bg-cinema-black/85 flex flex-col items-center justify-center gap-3"
            onClick={e => e.preventDefault()}
          >
            <span className="text-sm font-medium text-cinema-text">Rate this film</span>
            <StarRating
              movieId={movie.id}
              rating={myRating}
              onChange={(r) => { setRating(movie.id, r); setShowRating(false) }}
              size="lg"
            />
            <button
              onClick={e => { e.preventDefault(); setShowRating(false) }}
              className="text-xs text-cinema-dim hover:text-cinema-muted"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-cinema-text text-sm leading-tight line-clamp-1 group-hover:text-cinema-gold transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-cinema-dim text-xs font-mono">{year || '—'}</span>
          {tmdbRating && (
            <div className="flex items-center gap-1 bg-cinema-deep px-1.5 py-0.5 rounded text-xs">
              <Star size={10} className="fill-cinema-gold text-cinema-gold" />
              <span className="text-cinema-muted font-mono">{tmdbRating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

function ActionBtn({ icon, active, onClick, title, activeColor }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-full border transition-all duration-200 ${
        active
          ? `${activeColor} text-white`
          : 'bg-cinema-black/70 border-cinema-border/60 text-cinema-muted hover:text-cinema-text'
      }`}
    >
      {icon}
    </button>
  )
}
