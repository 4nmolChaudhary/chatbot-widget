import type { Chat } from '@/types/chat'
import { create } from 'zustand'

export const useChat = create<Chat>()(set => ({
  isFullScreen: false,
  setIsFullScreen: payload => set({ isFullScreen: payload }),
  promptSuggestions: [],
  setPromptSuggestions: payload => set({ promptSuggestions: payload }),
  chatHistory: [],
  setChatHistory: payload => set({ chatHistory: payload }),
  messageInput: '',
  setMessageInput: payload => set({ messageInput: payload }),
  isLoading: false,
  setIsLoading: payload => set({ isLoading: payload }),
}))
