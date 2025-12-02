import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.tsx'

import { ACTIONS } from './constants/keys.ts'

let root: ReturnType<typeof createRoot> | null = null

function initChatbot() {
  if (root) return
  let container = document.getElementById('root')
  if (!container) {
    container = document.createElement('div')
    container.id = 'root'
    document.body.appendChild(container)
  }
  root = createRoot(container)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  if (window.parent !== window) {
    window.parent.postMessage({ action: ACTIONS.READY }, '*')
  }
}

if (import.meta.env.DEV) {
  console.log('🔥 DEV MODE → auto-mounting widget')
  const params = new URLSearchParams(window.location.search)
  const action = params.get('action')
  const key = params.get('key')
  setTimeout(() => window.postMessage({ action, key }, '*'), 300)
}

window.addEventListener('message', event => {
  const { action, key } = event.data || {}
  console.log('📨 message received →', event.data)
  if (action === ACTIONS.INIT && key === import.meta.env.VITE_SECRET_KEY) initChatbot()
})

