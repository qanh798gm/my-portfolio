'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { loadAquariuxModule } from '@/lib/mf-loader'

function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        height: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0e1a',
        borderRadius: 12,
        border: '1px solid #253047',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid #253047',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 12px',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: '#475569', fontSize: 13 }}>Loading Aquariux Trading Terminal…</p>
      </div>
    </div>
  )
}

export default function AquariuxShowcasePage() {
  const [AppComponent, setAppComponent] = useState<React.ComponentType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true

    loadAquariuxModule<{ AquariuxApp: React.ComponentType }>('./AquariuxApp')
      .then((mod: { AquariuxApp: React.ComponentType }) => setAppComponent(() => mod.AquariuxApp))
      .catch((err: unknown) => {
        console.error('[MF] AquariuxShowcasePage load error:', err)
        setError(
          'Failed to load demo. Make sure the showcase-aquariux server is running on port 5002.'
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
          color: '#ef4444',
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
      {/* Top bar — exit button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '6px 12px',
          borderBottom: '1px solid #253047',
          backgroundColor: '#111827',
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
            border: '1px solid #253047',
            backgroundColor: '#1a2235',
            color: '#475569',
            textDecoration: 'none',
            transition: 'background-color 0.15s, color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#253047'
            el.style.color = '#f0f4ff'
            el.style.borderColor = '#3b82f6'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = '#1a2235'
            el.style.color = '#475569'
            el.style.borderColor = '#253047'
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
