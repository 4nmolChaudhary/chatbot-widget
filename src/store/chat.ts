import { CHAT_HISTORY } from '@/constants/chat-history'
import { create } from 'zustand'

type Message = {
  role: 'user' | 'assistant'
  content: string
  id: string
}
interface Chat {
  isFullScreen: boolean
  setIsFullScreen: (count: boolean) => void
  promptSuggestions: string[]
  setPromptSuggestions: (suggestions: string[]) => void
  chatHistory: Message[]
  setChatHistory: (history: Message[]) => void
  messageInput: string
  setMessageInput: (input: string) => void
}

export const useChat = create<Chat>()(set => ({
  isFullScreen: false,
  setIsFullScreen: payload => set({ isFullScreen: payload }),
  promptSuggestions: [],
  setPromptSuggestions: payload => set({ promptSuggestions: payload }),
  chatHistory: CHAT_HISTORY as Message[],
  setChatHistory: payload => set({ chatHistory: payload }),
  messageInput: '',
  setMessageInput: payload => set({ messageInput: payload }),
}))
