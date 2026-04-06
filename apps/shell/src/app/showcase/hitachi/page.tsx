'use client'

import { useState, useEffect, useRef } from 'react'
import { loadHitachiModule } from '@/lib/mf-loader'

function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        height: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d1117',
        borderRadius: 12,
        border: '1px solid #21262d',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid #21262d',
            borderTopColor: '#e8000d',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 12px',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#484f58', fontSize: 13 }}>Loading Hitachi LogiTrack…</p>
      </div>
    </div>
  )
}

export default function HitachiShowcasePage() {
  const [AppComponent, setAppComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    loadHitachiModule<{ HitachiApp: React.ComponentType }>('./HitachiApp')
      .then((mod: { HitachiApp: React.ComponentType }) => setAppComponent(() => mod.HitachiApp))
      .catch((err: unknown) => {
        console.error('[MF] HitachiShowcasePage load error:', err)
        setError('Failed to load demo. Make sure the showcase-hitachi server is running on port 5001.')
      })
  }, [])

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          height: 600,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f85149',
          fontSize: 14,
        }}
      >
        ⚠ {error}
      </div>
    )
  }

  if (!AppComponent) return <LoadingFallback />

  return (
    <div style={{ height: '100%', minHeight: 640 }}>
      <AppComponent />
    </div>
  )
}
