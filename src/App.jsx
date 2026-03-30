import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'))
const WatchlistPage = lazy(() => import('./pages/WatchlistPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))
const RatedPage = lazy(() => import('./pages/RatedPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cinema-border border-t-cinema-gold rounded-full animate-spin" />
        <span className="text-cinema-dim text-sm">Loading...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-cinema-black flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/rated" element={<RatedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Toast />
      </div>
    </AppProvider>
  )
}
