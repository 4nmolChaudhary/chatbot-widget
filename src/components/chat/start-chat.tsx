// import { useEffect } from 'react'
// import { useChat } from '@/store/chat'
import { useConfig } from '@/store/config'

import Orb from '@/components/ui/orb'
// import { getPromptSuggestions } from '@/apis/get-prompt-suggestions'

//import { useChatManager } from '@/hooks/chat-manager'

const StartChat = () => {
  const { config } = useConfig()
  //const { send } = useChatManager()
  // const { promptSuggestions, setPromptSuggestions } = useChat()
  // useEffect(() => {
  //   ;(async () => {
  //     const prompts = await getPromptSuggestions()
  //     setPromptSuggestions(prompts)
  //   })()
  //   return () => {}
  // }, [])

  return (
    <div className='w-full h-full flex-1 flex flex-col items-center justify-between gap-2'>
      <div className='flex flex-col items-center gap-3 mb-3'>
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
      <div className='w-full flex flex-col gap-2 justify-end items-end'>
        {/* {promptSuggestions.map((suggestion, index) => (
          <button onClick={() => send(suggestion)} key={index} className='w-fit bg-white shadow-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground inline-flex flex-1 items-center justify-center gap-1.5 rounded-md py-1 whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 px-2 h-6 text-sm cursor-pointer'>
            {suggestion}
          </button>
        ))} */}
      </div>
    </div>
  )
}

export default StartChat
