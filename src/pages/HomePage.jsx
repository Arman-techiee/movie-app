import React from 'react'
import { tmdbApi } from '../utils/tmdb'
import { useMovies } from '../hooks/useMovies'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import { HeroSkeleton } from '../components/Skeleton'

export default function HomePage() {
  const { data: trendingData, loading: trendingLoading } = useMovies(() => tmdbApi.getTrending('week'))
  const { data: popularData, loading: popularLoading } = useMovies(() => tmdbApi.getPopular())
  const { data: topRatedData, loading: topRatedLoading } = useMovies(() => tmdbApi.getTopRated())
  const { data: nowPlayingData, loading: nowPlayingLoading } = useMovies(() => tmdbApi.getNowPlaying())
  const { data: upcomingData, loading: upcomingLoading } = useMovies(() => tmdbApi.getUpcoming())

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Hero */}
      {trendingLoading && !trendingData ? (
        <HeroSkeleton />
      ) : (
        <HeroBanner movies={trendingData?.results || []} />
      )}

      {/* Rows */}
      <MovieRow
        title="🔥 Trending This Week"
        movies={trendingData?.results || []}
        loading={trendingLoading}
        viewAllLink="/discover?category=trending"
      />
      <MovieRow
        title="🎬 Now Playing"
        movies={nowPlayingData?.results || []}
        loading={nowPlayingLoading}
        viewAllLink="/discover?category=now_playing"
      />
      <MovieRow
        title="⭐ Top Rated"
        movies={topRatedData?.results || []}
        loading={topRatedLoading}
        viewAllLink="/discover?category=top_rated"
      />
      <MovieRow
        title="🌟 Popular"
        movies={popularData?.results || []}
        loading={popularLoading}
        viewAllLink="/discover?category=popular"
      />
      <MovieRow
        title="📅 Coming Soon"
        movies={upcomingData?.results || []}
        loading={upcomingLoading}
        viewAllLink="/discover?category=upcoming"
      />
    </div>
  )
}
