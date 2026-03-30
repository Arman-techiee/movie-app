import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppContext = createContext(null)

const STORAGE_KEYS = {
  WATCHLIST: 'cinevault_watchlist',
  FAVORITES: 'cinevault_favorites',
  RATINGS: 'cinevault_ratings',
  WATCHED: 'cinevault_watched',
}

const loadFromStorage = (key, fallback = []) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch { return fallback }
}

const saveToStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function AppProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => loadFromStorage(STORAGE_KEYS.WATCHLIST))
  const [favorites, setFavorites] = useState(() => loadFromStorage(STORAGE_KEYS.FAVORITES))
  const [ratings, setRatings] = useState(() => loadFromStorage(STORAGE_KEYS.RATINGS, {}))
  const [watched, setWatched] = useState(() => loadFromStorage(STORAGE_KEYS.WATCHED))
  const [toast, setToast] = useState(null)

  useEffect(() => { saveToStorage(STORAGE_KEYS.WATCHLIST, watchlist) }, [watchlist])
  useEffect(() => { saveToStorage(STORAGE_KEYS.FAVORITES, favorites) }, [favorites])
  useEffect(() => { saveToStorage(STORAGE_KEYS.RATINGS, ratings) }, [ratings])
  useEffect(() => { saveToStorage(STORAGE_KEYS.WATCHED, watched) }, [watched])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist(prev => {
      const exists = prev.find(m => m.id === movie.id)
      if (exists) {
        showToast('Removed from watchlist', 'info')
        return prev.filter(m => m.id !== movie.id)
      }
      showToast('Added to watchlist ✓')
      return [...prev, { ...movie, addedAt: Date.now() }]
    })
  }, [showToast])

  const toggleFavorite = useCallback((movie) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === movie.id)
      if (exists) {
        showToast('Removed from favorites', 'info')
        return prev.filter(m => m.id !== movie.id)
      }
      showToast('Added to favorites ❤️')
      return [...prev, { ...movie, addedAt: Date.now() }]
    })
  }, [showToast])

  const setRating = useCallback((movieId, rating) => {
    setRatings(prev => {
      if (rating === 0) {
        const next = { ...prev }
        delete next[movieId]
        return next
      }
      return { ...prev, [movieId]: rating }
    })
    if (rating > 0) showToast(`Rated ${rating} ⭐`)
  }, [showToast])

  const toggleWatched = useCallback((movie) => {
    setWatched(prev => {
      const exists = prev.find(m => m.id === movie.id)
      if (exists) return prev.filter(m => m.id !== movie.id)
      return [...prev, { ...movie, watchedAt: Date.now() }]
    })
  }, [])

  const isInWatchlist = useCallback((id) => watchlist.some(m => m.id === id), [watchlist])
  const isInFavorites = useCallback((id) => favorites.some(m => m.id === id), [favorites])
  const isWatched = useCallback((id) => watched.some(m => m.id === id), [watched])
  const getRating = useCallback((id) => ratings[id] || 0, [ratings])

  return (
    <AppContext.Provider value={{
      watchlist, favorites, ratings, watched,
      toggleWatchlist, toggleFavorite, setRating, toggleWatched,
      isInWatchlist, isInFavorites, isWatched, getRating,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
