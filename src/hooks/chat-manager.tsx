import { useRef } from 'react'

import type { Message } from '@/types/chat'
import { useChat } from '@/store/chat'
import { useConfig } from '@/store/config'

import { retrieval } from '@/apis/retrieval'

export const useChatManager = () => {
  const streamingMessageId = useRef<string | null>(null)
  const chatHistoryRef = useRef<Message[]>([])
  const { setChatHistory, chatHistory, setIsLoading, setIsStreaming, setPromptSuggestions } = useChat()
  const { sessionId } = useConfig()
  const isStreaming = streamingMessageId.current !== null

  const syncRef = (list: Message[]) => {
    chatHistoryRef.current = list
    setChatHistory(list)
  }

  const send = async (content: string) => {
    setPromptSuggestions([])
    const id = crypto.randomUUID()
    const userMsg: Message = { id, role: 'user', content }
    const updated = [...chatHistory, userMsg]
    syncRef(updated)
    setIsLoading(true)
    await startStreaming(content)
  }

  const updateMessage = (id: string, partial: string) => {
    const updated = chatHistoryRef.current.map(msg => (msg.id === id ? { ...msg, content: (msg.content || '') + partial } : msg))
    syncRef(updated)
  }

  const startStreaming = async (content: string) => {
    const assistantId = crypto.randomUUID()
    streamingMessageId.current = assistantId
    setIsStreaming(true)
    const assistant: Message = { id: assistantId, role: 'assistant', content: '' }
    const updated = [...chatHistoryRef.current, assistant]

    syncRef(updated)

    const response = await retrieval(content, sessionId)
    const reader = response?.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    let buffer = ''
    setIsLoading(false)
    while (true) {
      if (!reader) break
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() as string

      for (const line of lines) {
        if (!line.trim()) continue
        const data = JSON.parse(line)
        if (data.t === 'chunk') updateMessage(assistantId, data.c)
        if (data.t === 'end') setIsStreaming(false)
        else {
          if (data?.suggestion_chips) {
            const chips = data.suggestion_chips as string[]
            setPromptSuggestions(chips)
          }
        }
      }
    }
    streamingMessageId.current = null
  }

  const resetChat = () => syncRef([])

  return { send, resetChat, isStreaming }
}
