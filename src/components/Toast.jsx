import React from 'react'
import { CheckCircle, Info, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  const icons = {
    success: <CheckCircle size={16} className="text-cinema-teal" />,
    info: <Info size={16} className="text-cinema-muted" />,
    error: <AlertCircle size={16} className="text-cinema-red" />,
  }

  return (
    <div
      key={toast.id}
      className="fixed bottom-6 right-6 z-[100] animate-slide-up"
    >
      <div className="flex items-center gap-3 bg-cinema-card border border-cinema-border rounded-xl px-4 py-3 shadow-2xl shadow-black/50 min-w-48">
        {icons[toast.type] || icons.success}
        <span className="text-sm text-cinema-text font-medium">{toast.message}</span>
      </div>
    </div>
  )
}
