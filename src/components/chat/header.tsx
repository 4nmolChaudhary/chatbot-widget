import { RotateCcw, X, Maximize, Minimize, Sparkles } from 'lucide-react'
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
          <Sparkles size={24} fill='white' />
          <div>
            <strong>Al Assist</strong>
            {/* <div className='text-xs font-geist-mono'>AI Assistant</div> */}
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
