/**
 * Module Federation runtime loader for browser-only use.
 *
 * Works with @module-federation/vite remotes (ES module remoteEntry).
 *
 * ## Preamble fix
 * In dev mode, @vitejs/plugin-react(-swc) injects a Fast Refresh preamble
 * into every JSX/TSX file:
 *   import RefreshRuntime from '/@react-refresh'
 *   RefreshRuntime.injectIntoGlobalHook(window)
 *   window.$RefreshReg$ = () => {}
 *   window.$RefreshSig$ = () => (type) => type
 *   window.__vite_plugin_react_preamble_installed__ = true
 *
 * The last line is what the plugin checks — if it's not set, it throws the
 * "can't detect preamble" error. We fix this by loading the Vite dev client
 * (`/@vite/client`) from the remote server BEFORE importing any remote modules.
 * The Vite client sets up the HMR runtime and the preamble globals.
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

/** Injects a module-type script tag and waits for it to load (idempotent). */
function injectModuleScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = url
    s.type = 'module'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load: ${url}`))
    document.head.appendChild(s)
  })
}

/**
 * Detect if the remote server is a Vite dev server by checking if its
 * client script is available. In production (vite preview / real server),
 * the /@vite/client endpoint doesn't exist.
 */
async function tryInjectViteClient(remoteOrigin: string): Promise<void> {
  try {
    const res = await fetch(`${remoteOrigin}/@vite/client`, { method: 'HEAD' })
    if (res.ok) {
      await injectModuleScript(`${remoteOrigin}/@vite/client`)
    }
  } catch {
    // Not a Vite dev server, or CORS blocked — safe to ignore
  }
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

  // Inject Vite client first so the React Refresh preamble doesn't throw.
  // In production this is a no-op (the endpoint won't exist / return 404).
  await tryInjectViteClient(remoteOrigin)

  const container = await import(/* webpackIgnore: true */ remoteUrl) as MFContainer

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
  (typeof process !== 'undefined'
    ? process.env.NEXT_PUBLIC_HITACHI_REMOTE_URL
    : undefined) ?? 'http://localhost:5001'

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
