import { useRef, useEffect } from 'react'

import { ArrowUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AudioRecorder } from '@/components/chat/audio-recorder'

import { useRecorder } from '@/store/recorder'
import { useChat } from '@/store/chat'

const Composer = () => {
  const { messageInput, setMessageInput } = useChat()
  const { isRecording } = useRecorder()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // if (input.trim()) {
    //   setIsTyping(true)
    //   handleSubmit(e).finally(() => {
    //     setIsTyping(false)
    //     if (textareaRef.current) {
    //       textareaRef.current.style.height = "auto"
    //     }
    //   })
    // }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textareaRef])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit(e as any)
    }
  }

  return (
    <div className='w-full p-4 pt-0'>
      <div className='w-full inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-card shadow-sm rounded-md gap-1.5 p-1'>
        <form onSubmit={onSubmit} className='relative w-full'>
          <textarea id='input' ref={textareaRef} value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyDown={handleKeyDown} placeholder='Type your message...' className='w-full h-full px-3 py-2 text-sm outline-none disabled:cursor-not-allowed pr-12 resize-none overflow-hidden border-none' rows={2} />
          {!isRecording && (
            <Button type='submit' disabled={!messageInput.trim()} className='absolute rounded-full bottom-1 right-1 px-2 py-1 bg-accent cursor-pointer hover:bg-accent/80' size='icon'>
              <ArrowUp className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          )}
          <AudioRecorder />
        </form>
      </div>
    </div>
  )
}

export default Composer
