import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AquariuxApp } from './AquariuxApp'

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    <AquariuxApp />
  </StrictMode>
)
