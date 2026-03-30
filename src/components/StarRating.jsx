import React, { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ movieId, rating, onChange, size = 'md', showLabel = false }) {
  const [hovered, setHovered] = useState(0)
  const sizes = { sm: 14, md: 18, lg: 24 }
  const sz = sizes[size] || 18

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange(star === rating ? 0 : star) }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-100 hover:scale-110 active:scale-95"
          title={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={sz}
            className={`transition-colors duration-100 ${
              star <= (hovered || rating)
                ? 'fill-cinema-gold text-cinema-gold'
                : 'text-cinema-dim fill-transparent'
            }`}
          />
        </button>
      ))}
      {showLabel && rating > 0 && (
        <span className="text-xs text-cinema-muted ml-1 font-mono">{rating}/5</span>
      )}
    </div>
  )
}
