import React from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'revenue.desc', label: 'Highest Revenue' },
]

const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i)

export default function FilterBar({ filters, onChange, genres = [] }) {
  const set = (key, val) => onChange({ ...filters, [key]: val })
  const hasFilters = filters.genre || filters.year || filters.sort !== 'popularity.desc' || filters.minRating

  return (
    <div className="bg-cinema-card border border-cinema-border rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={16} className="text-cinema-gold" />
        <span className="text-sm font-semibold text-cinema-text">Filters</span>
        {hasFilters && (
          <button
            onClick={() => onChange({ sort: 'popularity.desc', genre: '', year: '', minRating: '' })}
            className="ml-auto text-xs text-cinema-muted hover:text-cinema-red flex items-center gap-1 transition-colors"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Sort */}
        <div>
          <label className="text-xs text-cinema-dim mb-1.5 block">Sort by</label>
          <select
            value={filters.sort || 'popularity.desc'}
            onChange={e => set('sort', e.target.value)}
            className="input-base h-9 text-xs"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="text-xs text-cinema-dim mb-1.5 block">Genre</label>
          <select
            value={filters.genre || ''}
            onChange={e => set('genre', e.target.value)}
            className="input-base h-9 text-xs"
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="text-xs text-cinema-dim mb-1.5 block">Year</label>
          <select
            value={filters.year || ''}
            onChange={e => set('year', e.target.value)}
            className="input-base h-9 text-xs"
          >
            <option value="">Any Year</option>
            {YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Min Rating */}
        <div>
          <label className="text-xs text-cinema-dim mb-1.5 block">Min Rating</label>
          <select
            value={filters.minRating || ''}
            onChange={e => set('minRating', e.target.value)}
            className="input-base h-9 text-xs"
          >
            <option value="">Any Rating</option>
            {[9, 8, 7, 6, 5].map(r => (
              <option key={r} value={r}>★ {r}+</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-cinema-border/50">
          {filters.genre && genres.find(g => g.id == filters.genre) && (
            <Chip label={genres.find(g => g.id == filters.genre).name} onRemove={() => set('genre', '')} />
          )}
          {filters.year && <Chip label={filters.year} onRemove={() => set('year', '')} />}
          {filters.minRating && <Chip label={`★ ${filters.minRating}+`} onRemove={() => set('minRating', '')} />}
          {filters.sort && filters.sort !== 'popularity.desc' && (
            <Chip label={SORT_OPTIONS.find(o => o.value === filters.sort)?.label} onRemove={() => set('sort', 'popularity.desc')} />
          )}
        </div>
      )}
    </div>
  )
}

function Chip({ label, onRemove }) {
  return (
    <span className="flex items-center gap-1 bg-cinema-gold/10 text-cinema-gold border border-cinema-gold/20 text-xs px-2 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-cinema-red transition-colors">
        <X size={10} />
      </button>
    </span>
  )
}
