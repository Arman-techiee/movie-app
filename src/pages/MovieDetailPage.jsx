import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Star, Calendar, Clock, Globe, Heart, Bookmark, Eye, EyeOff,
  ChevronLeft, Play, Users, Clapperboard, ExternalLink
} from 'lucide-react'
import { tmdbApi, getBackdropUrl, getPosterUrl } from '../utils/tmdb'
import { useMovies } from '../hooks/useMovies'
import { useApp } from '../context/AppContext'
import StarRating from '../components/StarRating'
import MovieCard from '../components/MovieCard'
import { MovieGridSkeleton } from '../components/Skeleton'

export default function MovieDetailPage() {
  const { id } = useParams()
  const { data: movie, loading, error } = useMovies(() => tmdbApi.getMovieDetails(id), [id])
  const {
    toggleWatchlist, toggleFavorite, toggleWatched, setRating,
    isInWatchlist, isInFavorites, isWatched, getRating
  } = useApp()

  const [activeTab, setActiveTab] = useState('overview')

  if (loading) return <DetailSkeleton />
  if (error || !movie) return (
    <div className="pt-32 text-center text-cinema-muted">
      <p className="text-xl">Could not load movie details</p>
      <Link to="/" className="btn-ghost mt-4 inline-flex">← Go Home</Link>
    </div>
  )

  const backdrop = getBackdropUrl(movie.backdrop_path)
  const poster = getPosterUrl(movie.poster_path, 'w500')
  const year = movie.release_date?.slice(0, 4)
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null
  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 12) || []
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const similar = movie.similar?.results?.slice(0, 12) || []
  const myRating = getRating(movie.id)
  const watched = isWatched(movie.id)

  const tabs = ['overview', 'cast', 'similar']
  if (movie.reviews?.results?.length) tabs.push('reviews')

  return (
    <div className="pb-16">
      {/* Backdrop */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        {backdrop && (
          <img src={backdrop} alt={movie.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-cinema-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/60 to-transparent" />

        {/* Back */}
        <Link to="/" className="absolute top-20 left-6 flex items-center gap-1 text-cinema-muted hover:text-cinema-text transition-colors text-sm">
          <ChevronLeft size={16} /> Back
        </Link>

        {/* Trailer button */}
        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 border border-white/30"
          >
            <Play size={24} className="text-white fill-white ml-1" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-48 sm:w-56 rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-cinema-border/50">
              {poster ? (
                <img src={poster} alt={movie.title} className="w-full" />
              ) : (
                <div className="aspect-[2/3] bg-cinema-card flex items-center justify-center">
                  <Clapperboard size={48} className="text-cinema-dim" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-cinema-muted italic font-display text-lg mb-4">"{movie.tagline}"</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-5 text-sm text-cinema-muted">
              {year && <span className="flex items-center gap-1"><Calendar size={13} /> {year}</span>}
              {runtime && <span className="flex items-center gap-1"><Clock size={13} /> {runtime}</span>}
              {movie.original_language && (
                <span className="flex items-center gap-1 uppercase font-mono text-xs">
                  <Globe size={13} /> {movie.original_language}
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {movie.genres?.map(g => (
                <Link
                  key={g.id}
                  to={`/discover?category=popular`}
                  className="badge bg-cinema-card border border-cinema-border text-cinema-muted hover:border-cinema-gold/30 hover:text-cinema-gold transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>

            {/* Ratings row */}
            <div className="flex items-center gap-6 mb-6 flex-wrap">
              {/* TMDB Rating */}
              <div className="flex items-center gap-2 bg-cinema-card border border-cinema-border rounded-xl px-4 py-2.5">
                <Star size={18} className="fill-cinema-gold text-cinema-gold" />
                <div>
                  <div className="text-white font-bold text-lg leading-none">{movie.vote_average?.toFixed(1)}</div>
                  <div className="text-cinema-dim text-xs mt-0.5">{movie.vote_count?.toLocaleString()} votes</div>
                </div>
              </div>

              {/* My Rating */}
              <div className="flex flex-col gap-1">
                <span className="text-xs text-cinema-dim">My Rating</span>
                <StarRating
                  movieId={movie.id}
                  rating={myRating}
                  onChange={r => setRating(movie.id, r)}
                  size="md"
                  showLabel
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`btn-ghost ${isInWatchlist(movie.id) ? 'border-cinema-gold text-cinema-gold' : ''}`}
              >
                <Bookmark size={15} className={isInWatchlist(movie.id) ? 'fill-cinema-gold' : ''} />
                {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={`btn-ghost ${isInFavorites(movie.id) ? 'border-cinema-red text-cinema-red' : ''}`}
              >
                <Heart size={15} className={isInFavorites(movie.id) ? 'fill-cinema-red' : ''} />
                {isInFavorites(movie.id) ? 'Favorited' : 'Favorite'}
              </button>
              <button
                onClick={() => toggleWatched(movie)}
                className={`btn-ghost ${watched ? 'border-cinema-teal text-cinema-teal' : ''}`}
              >
                {watched ? <EyeOff size={15} /> : <Eye size={15} />}
                {watched ? 'Watched' : 'Mark Watched'}
              </button>
              {movie.homepage && (
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <ExternalLink size={15} /> Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex gap-1 border-b border-cinema-border mb-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium capitalize transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'border-cinema-gold text-cinema-gold'
                    : 'border-transparent text-cinema-muted hover:text-cinema-text'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-cinema-gold text-sm font-semibold mb-3 uppercase tracking-wider">Synopsis</h3>
                  <p className="text-cinema-muted leading-relaxed">{movie.overview || 'No synopsis available.'}</p>
                </div>
                {director && (
                  <div>
                    <h3 className="text-cinema-gold text-sm font-semibold mb-2 uppercase tracking-wider">Director</h3>
                    <span className="text-cinema-text font-medium">{director.name}</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <InfoItem label="Status" value={movie.status} />
                <InfoItem label="Budget" value={movie.budget ? `$${(movie.budget / 1e6).toFixed(1)}M` : 'N/A'} />
                <InfoItem label="Revenue" value={movie.revenue ? `$${(movie.revenue / 1e6).toFixed(1)}M` : 'N/A'} />
                {movie.production_companies?.slice(0, 3).map(c => (
                  <InfoItem key={c.id} label="Studio" value={c.name} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fade-in">
              {cast.map(person => (
                <CastCard key={person.id} person={person} />
              ))}
            </div>
          )}

          {activeTab === 'similar' && (
            <div className="animate-fade-in">
              {similar.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {similar.map(m => <MovieCard key={m.id} movie={m} />)}
                </div>
              ) : (
                <p className="text-cinema-muted text-center py-12">No similar movies found</p>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-fade-in max-w-3xl">
              {movie.reviews?.results?.slice(0, 5).map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  if (!value || value === 'N/A') return null
  return (
    <div>
      <span className="text-cinema-dim text-xs uppercase tracking-wider">{label}</span>
      <p className="text-cinema-text text-sm mt-0.5">{value}</p>
    </div>
  )
}

function CastCard({ person }) {
  const photo = getPosterUrl(person.profile_path, 'w185')
  return (
    <div className="bg-cinema-card border border-cinema-border rounded-xl overflow-hidden text-center">
      <div className="aspect-square bg-cinema-deep">
        {photo ? (
          <img src={photo} alt={person.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Users size={32} className="text-cinema-dim" />
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-cinema-text text-xs font-medium line-clamp-1">{person.name}</p>
        <p className="text-cinema-dim text-xs line-clamp-1 mt-0.5">{person.character}</p>
      </div>
    </div>
  )
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)
  const content = review.content || ''
  const isLong = content.length > 400

  return (
    <div className="bg-cinema-card border border-cinema-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-cinema-text text-sm">{review.author}</span>
        {review.author_details?.rating && (
          <span className="flex items-center gap-1 text-cinema-gold text-xs font-mono">
            <Star size={11} className="fill-cinema-gold" />
            {review.author_details.rating}/10
          </span>
        )}
      </div>
      <p className={`text-cinema-muted text-sm leading-relaxed ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
        {content}
      </p>
      {isLong && (
        <button onClick={() => setExpanded(!expanded)} className="text-cinema-gold text-xs mt-2 hover:underline">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="pb-16">
      <div className="h-[55vh] skeleton" />
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex gap-8">
          <div className="skeleton w-56 h-80 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-8">
            <div className="skeleton h-10 w-2/3 rounded" />
            <div className="skeleton h-5 w-1/2 rounded" />
            <div className="skeleton h-4 w-full rounded mt-6" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-3/4 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
