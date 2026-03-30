import React from 'react'
import { Github, Clapperboard, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-cinema-border/60 bg-cinema-deep/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cinema-gold text-cinema-black flex items-center justify-center shadow-[0_0_18px_rgba(245,197,24,0.2)]">
                <Clapperboard size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="font-display text-xl text-cinema-text">
                  Cine<span className="text-cinema-gold">Vault</span>
                </div>
                <div className="text-xs uppercase tracking-[0.28em] text-cinema-dim">
                  Movie Discovery App
                </div>
              </div>
            </div>
            <p className="text-sm leading-6 text-cinema-muted">
              Explore trending releases, build your watchlist, save favorites, and keep your personal movie picks organized in one place.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="text-cinema-dim uppercase tracking-[0.24em] text-xs">
              Project
            </span>
            <a
              href="https://github.com/Arman-techiee/movie-app.git"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-cinema-text hover:text-cinema-gold transition-colors"
            >
              <Github size={16} />
              GitHub Repository
              <ExternalLink size={14} />
            </a>
            <span className="text-cinema-muted">
              Built by Arman Khan
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
