import { useRef } from 'react'

import type { Message } from '@/types/chat'
import { useChat } from '@/store/chat'

import { retrieval } from '@/apis/retrieval'

export const useChatManager = () => {
  const streamingMessageId = useRef<string | null>(null)
  const chatHistoryRef = useRef<Message[]>([])
  const { setChatHistory, chatHistory, setIsLoading } = useChat()
  const isStreaming = streamingMessageId.current !== null

  const syncRef = (list: Message[]) => {
    chatHistoryRef.current = list
    setChatHistory(list)
  }

  const send = async (content: string) => {
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
    const assistant: Message = { id: assistantId, role: 'assistant', content: '' }
    const updated = [...chatHistoryRef.current, assistant]

    syncRef(updated)

    const response = await retrieval(content)
    const reader = response?.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    let buffer = ''

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
        if (data.type === 'detail_chunk') updateMessage(assistantId, data.content)
        if (data.type === 'end') {
          console.log('Stream finished')
        }
      }
    }
    streamingMessageId.current = null
    setIsLoading(false)
  }

  const resetChat = () => syncRef([])

  return { send, resetChat, isStreaming }
}
