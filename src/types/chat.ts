export type Message = {
  role: 'user' | 'assistant'
  content: string
  id: string
}

export type Chat = {
  isFullScreen: boolean
  setIsFullScreen: (count: boolean) => void
  promptSuggestions: string[]
  setPromptSuggestions: (suggestions: string[]) => void
  chatHistory: Message[]
  setChatHistory: (history: Message[]) => void
  messageInput: string
  setMessageInput: (input: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
