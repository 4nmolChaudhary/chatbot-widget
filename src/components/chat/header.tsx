import { RotateCcw, X, Maximize, Minimize } from 'lucide-react'
import { useChat } from '@/store/chat'

export default function Header() {
  const { isFullScreen, setIsFullScreen, setChatHistory } = useChat()
  const onRestart = () => setChatHistory([])
  const onToggleFullscreen = () => {
    setIsFullScreen(!isFullScreen)
    sendMessage('toggle-fullscreen', String(!isFullScreen))
  }
  const onClose = () => {
    sendMessage('close-window')
    setChatHistory([])
  }
  const sendMessage = (type: string, value?: string) => window.parent?.postMessage({ type, value }, '*')
  return (
    <header className='flex items-center justify-between border-b border-border px-4 py-3 bg-accent text-white h-16'>
      <div className='relative flex items-center justify-center text-xl font-instrument-serif gap-2'>
        <div className='flex items-center gap-2'>
          <svg width='25' height='25' viewBox='0 0 114 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M55.0117 2C55.0048 2.33211 55 2.66543 55 3C55 53.1473 78.6876 53.984 108 53.998V55.0107C107.668 55.0039 107.335 55 107 55C56 55 56 79.5 56 109.5C56 109.667 56.0011 109.834 56.0029 110H54.9053C54.9676 109.012 55 108.011 55 107C55 56 30.5 56 0.5 56C0.332846 56 0.166181 56.0011 0 56.0029V54.9346C0.825415 54.9778 1.65886 55 2.5 55C52.6473 55 53.485 31.3124 53.499 2H55.0117Z' fill='white' />
            <path d='M93.8799 0.379883C93.8799 19.4169 102.872 19.7339 114 19.7393V20.124C113.874 20.1214 113.748 20.1201 113.621 20.1201C94.26 20.1201 94.2598 29.4217 94.2598 40.8105C94.2598 40.8739 94.261 40.937 94.2617 41H93.8428C93.8664 40.6248 93.8799 40.2452 93.8799 39.8613C93.8799 20.5004 84.5792 20.5 73.1904 20.5C73.1268 20.5 73.0632 20.5013 73 20.502V20.0947C73.3134 20.1111 73.6298 20.1201 73.9492 20.1201C92.9867 20.1201 93.3042 11.1279 93.3096 0H93.8848C93.8822 0.126099 93.8799 0.252853 93.8799 0.379883Z' fill='white' />
          </svg>
          <div>
            <strong>Al Assist</strong>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <div onClick={onRestart} title='Restart' className='cursor-pointer'>
          <RotateCcw size={16} />
        </div>
        <div onClick={onToggleFullscreen} title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'} className='cursor-pointer'>
          {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </div>
        <div onClick={onClose} title='Close' className='cursor-pointer'>
          <X size={18} />
        </div>
      </div>
    </header>
  )
}
