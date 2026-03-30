import React from 'react'

export function MovieCardSkeleton() {
  return (
    <div className="card">
      <div className="skeleton aspect-[2/3]" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  )
}

export function MovieGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] skeleton rounded-2xl overflow-hidden">
      <div className="absolute bottom-8 left-8 space-y-4">
        <div className="skeleton h-10 w-64 rounded-lg" />
        <div className="skeleton h-4 w-96 rounded" />
        <div className="skeleton h-4 w-80 rounded" />
        <div className="flex gap-3">
          <div className="skeleton h-10 w-32 rounded-lg" />
          <div className="skeleton h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
