'use client'

import { useRef } from 'react'

/**
 * A modal dialog that previews the CV PDF using the browser's built-in
 * PDF viewer inside an <iframe>.
 *
 * Uses the native HTML <dialog> element — no library needed.
 * - `dialog.showModal()` opens with backdrop
 * - Escape key closes automatically
 * - Focus trap is built-in
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
 */
export function CvPreviewDialog({ trigger }: { trigger: (open: () => void) => React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL

  if (!cvUrl) {
    return (
      <span className="inline-flex cursor-default items-center rounded-md border border-[var(--color-bg-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)]">
        CV Coming Soon
      </span>
    )
  }

  return (
    <>
      {trigger(() => dialogRef.current?.showModal())}

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-0 h-screen max-h-none w-screen max-w-none border-none bg-transparent p-0 backdrop:bg-black/70"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef.current?.close()
          }
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center p-4 sm:p-8">
          {/* Header bar */}
          <div className="flex w-full max-w-5xl items-center justify-between rounded-t-xl border border-b-0 border-[var(--color-bg-border)] bg-[var(--color-bg-primary)] px-4 py-3">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              📄 Anh Quoc Do — CV
            </span>
            <button
              onClick={() => dialogRef.current?.close()}
              className="cursor-pointer rounded-md px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]"
              aria-label="Close CV preview"
            >
              ✕ Close
            </button>
          </div>

          {/* PDF iframe — browser's native PDF viewer */}
          <iframe
            src={cvUrl}
            title="CV Preview — Anh Quoc Do"
            className="h-full w-full max-w-5xl flex-1 rounded-b-xl border border-[var(--color-bg-border)] bg-white"
            style={{ minHeight: '70vh' }}
          />
        </div>
      </dialog>
    </>
  )
}
