import { useEffect } from 'react'
import { useConfig } from '@/store/config'
import { useChat } from '@/store/chat'

// import Orb from '@/components/ui/orb'
// import PromptSuggestion from '@/components/ui/prompt-suggestion'
import { getPromptSuggestions } from '@/apis/get-prompt-suggestions'

// import { useChatManager } from '@/hooks/chat-manager'

const StartChat = () => {
  const { config } = useConfig()
  const { chatHistory, setChatHistory, setPromptSuggestions } = useChat()
  // const { send } = useChatManager()
  // const { prompts, visible } = getPromptSuggestions(config)

  useEffect(() => {
    if (Object.keys(config).length > 0 && chatHistory.length === 0) {
      const welcomeMessage = config?.header?.welcomeMessage?.visible ? config?.header?.welcomeMessage?.value : ''

      if (welcomeMessage) {
        setChatHistory([
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: welcomeMessage,
          },
        ])
      }

      const { prompts, visible } = getPromptSuggestions(config)
      if (visible) {
        setPromptSuggestions(prompts)
      }
    }
  }, [config, chatHistory.length, setChatHistory, setPromptSuggestions])

  return (
    <div className='w-full h-full flex-1 flex flex-col items-center justify-between gap-2'>
      {/* <div className='flex flex-col items-center gap-3 mb-3'>
        <Orb
          animationDuration={15}
          colors={{
            bg: 'oklch(98% 0.01 264.695)',
            c1: 'oklch(43% 0.29 265)',
            c2: 'oklch(49% 0.28 265.5)',
            c3: 'oklch(71% 0.15 281)',
          }}
          size='128px'
        />
        <div>
          {config?.initialState?.title?.visible && <strong className='text-black/75 text-2xl font-instrument-serif'>{config?.initialState?.title?.value}</strong>}
          <div>{config?.initialState?.tagline?.visible && <strong className='text-black/75'>{config?.initialState?.tagline?.value}</strong>}</div>
        </div>
      </div>
      <div className='w-full flex flex-col gap-2 justify-end items-end'>{visible && prompts.map((suggestion, index) => <PromptSuggestion key={index} suggestion={suggestion} send={send} />)}</div> */}
    </div>
  )
}

export default StartChat
