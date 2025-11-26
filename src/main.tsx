import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function initChatbot() {
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.id = 'root'
    document.body.appendChild(container)
  }

  const root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Make global only in production (bundled)
if (typeof window !== 'undefined') {
  ;(window as any).assistant = { init: initChatbot }
}

// Auto-render in dev mode for convenience
if (import.meta.env.DEV) {
  console.log('🔥 dev mode → auto mounting widget')
  initChatbot()
}

