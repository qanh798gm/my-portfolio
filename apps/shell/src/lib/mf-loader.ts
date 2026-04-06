/**
 * Module Federation runtime loader for browser-only use.
 *
 * Works with @module-federation/vite remotes (ES module remoteEntry).
 *
 * ## Preamble fix
 * In dev mode, @vitejs/plugin-react injects a Fast Refresh preamble into
 * every JSX/TSX file transformed by the remote Vite dev server:
 *
 *   import RefreshRuntime from '/@react-refresh'
 *   RefreshRuntime.injectIntoGlobalHook(window)
 *   window.$RefreshReg$ = () => {}
 *   window.$RefreshSig$ = () => (type) => type
 *   window.__vite_plugin_react_preamble_installed__ = true
 *
 * When the shell (Next.js / webpack) loads modules from a *different* Vite
 * dev server (port 5001), those window globals are missing because the remote
 * Vite server never injected them into this page.  The per-module preamble
 * guard then throws "can't detect preamble. Something is wrong."
 *
 * Fix: before loading any remote module we directly set the required globals
 * on window.  In dev mode we also import /@react-refresh from the remote
 * origin so RefreshRuntime is properly set up for HMR.  In production (vite
 * build) the preamble is stripped entirely and no fix is needed.
 *
 * This file must only be used in 'use client' components inside useEffect.
 */

import React from 'react'
import ReactDOM from 'react-dom'

interface MFContainer {
  init(shareScope: Record<string, unknown>): Promise<void>
  get(modulePath: string): Promise<() => Record<string, unknown>>
}

const containerCache = new Map<string, MFContainer>()

const sharedScope: Record<string, unknown> = {
  react: {
    [React.version]: {
      get: () => Promise.resolve(() => React),
      loaded: true,
      from: 'shell',
      shareConfig: { singleton: true, requiredVersion: '^19.0.0' },
    },
  },
  'react-dom': {
    [ReactDOM.version]: {
      get: () => Promise.resolve(() => ReactDOM),
      loaded: true,
      from: 'shell',
      shareConfig: { singleton: true, requiredVersion: '^19.0.0' },
    },
  },
}

/** Check if a URL responds successfully (HEAD request). */
async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

/**
 * Install the React Fast Refresh preamble globals so that modules loaded from
 * a remote Vite dev server don't throw "can't detect preamble".
 *
 * Strategy:
 *  1. Check if the remote is a Vite dev server (HEAD /@react-refresh).
 *  2. Immediately set `window.__vite_plugin_react_preamble_installed__` and
 *     the `$RefreshReg$` / `$RefreshSig$` no-op stubs so the per-file guard
 *     passes.  We do this synchronously (before any further awaits) so there
 *     is no race with module evaluation.
 *
 * We intentionally skip importing the actual RefreshRuntime because:
 *  - It uses `import.meta` which can't be imported cross-origin from webpack.
 *  - Full HMR across origins is unsupported anyway; we only need the guard to
 *    not throw so the component renders correctly.
 *
 * In production (`vite build`) the preamble is stripped from all output; the
 * `/@react-refresh` endpoint won't exist, so this function is a no-op.
 */
async function installReactRefreshPreamble(remoteOrigin: string): Promise<void> {
  const w = window as unknown as Record<string, unknown>

  // Already installed — nothing to do
  if (w['__vite_plugin_react_preamble_installed__'] === true) return

  // Check if this is a Vite dev server (production builds don't serve /@react-refresh)
  const isViteDev = await urlExists(`${remoteOrigin}/@react-refresh`)
  if (!isViteDev) return

  // Install no-op stubs + preamble flag.
  // These are all the globals the per-file guard checks for.
  if (!w['$RefreshReg$']) w['$RefreshReg$'] = () => {}
  if (!w['$RefreshSig$']) w['$RefreshSig$'] = () => (type: unknown) => type
  w['__vite_plugin_react_preamble_installed__'] = true
}

/**
 * Load a Vite MF container by dynamically importing its remoteEntry.js.
 */
async function loadContainer(remoteUrl: string): Promise<MFContainer> {
  if (containerCache.has(remoteUrl)) {
    return containerCache.get(remoteUrl)!
  }

  // Extract the origin (e.g. http://localhost:5001) from the remote URL
  const remoteOrigin = new URL(remoteUrl).origin

  // Install preamble BEFORE importing the remote so the per-module guard passes
  await installReactRefreshPreamble(remoteOrigin)

  const container = await new Function(
    'url',
    'return import(url)',
  )(remoteUrl) as MFContainer

  if (typeof container.init !== 'function' || typeof container.get !== 'function') {
    throw new Error(
      `[MF] ${remoteUrl} does not export { init, get }. ` +
        `Check the @module-federation/vite config.`,
    )
  }

  await container.init(sharedScope)
  containerCache.set(remoteUrl, container)
  return container
}

const HITACHI_REMOTE_URL =
  (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_HITACHI_REMOTE_URL : undefined) ??
  'http://localhost:5001'

/**
 * Load an exposed module from the showcase_hitachi Vite MF remote.
 * @param exposedPath  e.g. './HitachiApp'
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loadHitachiModule<T = any>(exposedPath: string): Promise<T> {
  const remoteUrl = `${HITACHI_REMOTE_URL}/remoteEntry.js`
  const container = await loadContainer(remoteUrl)
  const factory = await container.get(exposedPath)
  return factory() as T
}
