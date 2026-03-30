import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { MovieCardSkeleton } from './Skeleton'

export default function MovieRow({ title, movies = [], loading, viewAllLink }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 240, behavior: 'smooth' })
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} className="p-1.5 rounded-lg text-cinema-muted hover:text-cinema-text hover:bg-cinema-card transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="p-1.5 rounded-lg text-cinema-muted hover:text-cinema-text hover:bg-cinema-card transition-colors">
            <ChevronRight size={18} />
          </button>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm text-cinema-gold hover:text-cinema-gold-dim transition-colors ml-1">
              View all →
            </Link>
          )}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-40 sm:w-44" style={{ scrollSnapAlign: 'start' }}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map(movie => (
              <div key={movie.id} className="flex-shrink-0 w-40 sm:w-44" style={{ scrollSnapAlign: 'start' }}>
                <MovieCard movie={movie} />
              </div>
            ))
        }
      </div>
    </section>
  )
}
