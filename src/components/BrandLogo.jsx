import React from 'react'
import { Clapperboard } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function BrandLogo({ compact = false, className = '' }) {
  const labelClass = compact ? 'hidden sm:block' : 'block'

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`.trim()}>
      <div className="w-9 h-9 bg-cinema-gold rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(245,197,24,0.4)] group-hover:shadow-[0_0_20px_rgba(245,197,24,0.6)] transition-all duration-200 group-hover:-translate-y-0.5">
        <Clapperboard size={18} strokeWidth={2.2} className="text-cinema-black" />
      </div>
      <div className={labelClass}>
        <div className="font-display text-lg font-semibold leading-none text-cinema-text">
          Cine<span className="text-cinema-gold">Vault</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.32em] text-cinema-dim mt-1">
          Movie Discovery
        </div>
      </div>
    </Link>
  )
}
