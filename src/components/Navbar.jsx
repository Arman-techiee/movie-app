import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Bookmark, Heart, Star, Menu, X, Film, TrendingUp, Home } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { watchlist, favorites } = useApp()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMobileOpen(false)
    }
  }

  const navItems = [
    { to: '/', icon: <Home size={16} />, label: 'Home', end: true },
    { to: '/discover', icon: <TrendingUp size={16} />, label: 'Discover' },
    { to: '/watchlist', icon: <Bookmark size={16} />, label: 'Watchlist', badge: watchlist.length },
    { to: '/favorites', icon: <Heart size={16} />, label: 'Favorites', badge: favorites.length },
    { to: '/rated', icon: <Star size={16} />, label: 'My Ratings' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cinema-black/95 backdrop-blur-md border-b border-cinema-border/50 shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-2 flex-shrink-0 group">
          <div className="w-8 h-8 bg-cinema-gold rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(245,197,24,0.4)] group-hover:shadow-[0_0_20px_rgba(245,197,24,0.6)] transition-shadow">
            <Film size={16} className="text-cinema-black" />
          </div>
          <span className="font-display text-lg font-semibold hidden sm:block">
            Cine<span className="text-cinema-gold">Vault</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              {item.label}
              {item.badge > 0 && (
                <span className="bg-cinema-gold text-cinema-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 md:flex-none md:w-64 ml-auto">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cinema-dim" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="input-base pl-8 pr-4 h-9"
            />
          </div>
        </form>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-cinema-muted hover:text-cinema-text hover:bg-cinema-card transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cinema-deep border-t border-cinema-border animate-slide-up">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-6 py-3.5 text-sm font-medium border-b border-cinema-border/50 ${
                isActive ? 'text-cinema-gold bg-cinema-gold/5' : 'text-cinema-muted hover:text-cinema-text'
              }`}
            >
              {item.icon}
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-cinema-gold text-cinema-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
