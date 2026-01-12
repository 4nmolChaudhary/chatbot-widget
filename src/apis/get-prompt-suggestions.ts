import type { Output } from '@/helpers/format-data'

export const getPromptSuggestions = (config: Output): { prompts: string[]; visible: boolean } => {
  const chips = config?.initialState?.initialChips
  if (!config || !chips) return { prompts: [], visible: false }
  const { value, visible } = chips
  return { prompts: JSON.parse(value), visible: !!visible }
}
