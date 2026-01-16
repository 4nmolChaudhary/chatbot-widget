import { useRef, useEffect } from 'react'
import { useChat } from '@/store/chat'
import { useChatManager } from '@/hooks/chat-manager'
import { useLoadingMessage } from '@/hooks/use-loading-message'

import ReactMarkdown from 'react-markdown'
import { TextShimmer } from '@/components/ui/text-shimmer'
import PromptSuggestion from '@/components/ui/prompt-suggestion'

const ChatHistory = () => {
  const { chatHistory, isLoading, isStreaming, promptSuggestions } = useChat()
  const loadingMessage = useLoadingMessage(isLoading)
  const { send } = useChatManager()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, isStreaming])

  return (
    <div className='w-full flex flex-col gap-2 h-[calc(100vh-224px)] overflow-y-auto hide-scrollbar'>
      {chatHistory.map(message => (
        <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {message.content && (
            <div className={`rounded-md px-3 py-1 text-sm max-w-[75%] wrap-break-word text-left shadow-xs ${message.role === 'user' ? `bg-white text-foreground` : 'text-foreground bg-gray-100'}`}>
              {message.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className='mb-2 leading-relaxed last:mb-0'>{children}</p>,
                    strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
                    em: ({ children }) => <em className='italic'>{children}</em>,
                    code: ({ children }) => <code className='bg-background px-1.5 py-0.5 rounded text-sm font-geist-mono'>{children}</code>,
                    pre: ({ children }) => <pre className='bg-background p-3 rounded-md overflow-x-auto my-2'>{children}</pre>,
                    ul: ({ children }) => <ul className='list-disc list-inside my-2 space-y-1'>{children}</ul>,
                    ol: ({ children }) => <ol className='list-decimal list-inside my-2 space-y-1'>{children}</ol>,
                    li: ({ children }) => <li className='ml-2'>{children}</li>,
                    h1: ({ children }) => <h1 className='text-lg font-semibold mt-3 mb-2'>{children}</h1>,
                    h2: ({ children }) => <h2 className='text-base font-semibold mt-3 mb-2'>{children}</h2>,
                    h3: ({ children }) => <h3 className='text-base font-semibold mt-2 mb-1'>{children}</h3>,
                    a: ({ href, children }) => (
                      <a href={href} className='underline hover:opacity-80' target='_blank' rel='noopener noreferrer'>
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p className='leading-relaxed'>{message.content}</p>
              )}
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className='flex gap-3 justify-start'>
          <div className='px-3 py-1 text-sm max-w-[75%] text-left'>
            <TextShimmer>{loadingMessage}</TextShimmer>
          </div>
        </div>
      )}
      <div className='w-full flex flex-1 flex-col gap-2 justify-end items-end'>
        <div className='w-full flex flex-col gap-2 justify-end items-end'>{!isStreaming && promptSuggestions.map((suggestion, index) => <PromptSuggestion key={index} suggestion={suggestion} send={send} />)}</div>
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatHistory
