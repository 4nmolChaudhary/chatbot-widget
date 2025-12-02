import { useRef } from 'react'

import type { Message } from '@/types/chat'
import { useChat } from '@/store/chat'
import { TOKENS } from '@/constants/chat-history'

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
    await new Promise(res => setTimeout(res, 2000))
    setIsLoading(false)
    startStreaming()
  }

  const updateMessage = (id: string, partial: string) => {
    const updated = chatHistoryRef.current.map(msg => (msg.id === id ? { ...msg, content: (msg.content || '') + partial } : msg))
    syncRef(updated)
  }

  async function* mockStreamingApi() {
    for (const chunk of TOKENS) {
      await new Promise(r => setTimeout(r, 100))
      yield chunk + ' '
    }
  }

  const startStreaming = async () => {
    const assistantId = crypto.randomUUID()
    streamingMessageId.current = assistantId
    const assistant: Message = { id: assistantId, role: 'assistant', content: '' }
    const updated = [...chatHistoryRef.current, assistant]

    syncRef(updated)
    for await (const chunk of mockStreamingApi()) {
      updateMessage(assistantId, chunk)
    }
    streamingMessageId.current = null
  }

  const resetChat = () => syncRef([])

  return { send, resetChat, isStreaming }
}
