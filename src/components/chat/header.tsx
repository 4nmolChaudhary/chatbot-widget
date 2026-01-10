import { RotateCcw, X, Maximize, Minimize } from 'lucide-react'
import { useChat } from '@/store/chat'
import { useConfig } from '@/store/config'

import { deleteSession } from '@/apis/delete-session'

export default function Header() {
  const test = 'test'
  const { config, sessionId } = useConfig()
  const actions = config?.header?.action as unknown as Record<'restart' | 'close' | 'resize', { visible: boolean }>
  const { isFullScreen, setIsFullScreen, setChatHistory } = useChat()

  const onRestart = async () => {
    setChatHistory([])
    await deleteSession(sessionId)
  }
  const onToggleFullscreen = () => {
    setIsFullScreen(!isFullScreen)
    sendMessage('toggle-fullscreen', String(!isFullScreen))
  }
  const onClose = async () => {
    sendMessage('close-window')
    setChatHistory([])
    await deleteSession(sessionId)
  }
  const sendMessage = (type: string, value?: string) => window.parent?.postMessage({ type, value }, '*')
  return (
    <header className='flex items-center justify-between border-b border-border px-4 py-3 bg-accent text-white h-16'>
      <div className='relative flex items-center justify-center text-xl font-instrument-serif gap-2'>
        <div className='flex items-center gap-2'>
          {config?.header?.titleIcon?.visible && <img src={config?.header?.titleIcon?.value} alt='Logo' className='h-6 w-6 object-contain' />}
          <div>{config?.header?.title?.visible && <strong>{config?.header?.title?.value}</strong>}</div>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        {actions?.restart?.visible && (
          <div onClick={onRestart} title='Restart' className='cursor-pointer'>
            <RotateCcw size={16} />
          </div>
        )}
        {actions?.resize?.visible && (
          <div onClick={onToggleFullscreen} title={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'} className='cursor-pointer'>
            {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </div>
        )}
        {actions?.close?.visible && (
          <div onClick={onClose} title='Close' className='cursor-pointer'>
            <X size={18} />
          </div>
        )}
      </div>
    </header>
  )
}
