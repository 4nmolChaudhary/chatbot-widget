import { PROMPTS } from '@/constants/prompts'

export const getPromptSuggestions = async (): Promise<string[]> => {
  const shuffled = [...PROMPTS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 4)
}
