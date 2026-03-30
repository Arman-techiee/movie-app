import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-6">🎬</div>
      <h1 className="font-display text-5xl font-bold text-cinema-gold mb-4">404</h1>
      <p className="text-cinema-muted text-lg mb-8">This scene doesn't exist in our library</p>
      <Link to="/" className="btn-primary">← Back to Home</Link>
    </div>
  )
}
