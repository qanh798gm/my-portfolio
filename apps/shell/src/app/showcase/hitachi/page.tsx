'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
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
        setError(
          'Failed to load demo. Make sure the showcase-hitachi server is running on port 5001.'
        )
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 640 }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '6px 12px',
          borderBottom: '1px solid #21262d',
          backgroundColor: '#0d1117',
          flexShrink: 0,
        }}
      >
        <Link
          href="/#timeline"
          title="Exit full screen"
          aria-label="Exit full screen"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: '1px solid #30363d',
            backgroundColor: '#161b22',
            color: '#8d96a0',
            textDecoration: 'none',
            transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#21262d'
            el.style.color = '#e6edf3'
            el.style.borderColor = '#484f58'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#161b22'
            el.style.color = '#8d96a0'
            el.style.borderColor = '#30363d'
          }}
        >
          {/* Compress / exit-fullscreen icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </svg>
        </Link>
      </div>

      {/* Micro-app */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <AppComponent />
      </div>
    </div>
  )
}
