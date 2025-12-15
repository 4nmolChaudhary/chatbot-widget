import type { Output } from '@/helpers/format-data'
import { create } from 'zustand'

type Config = {
  config: Output
  setConfig: (config: Output) => void
}

export const useConfig = create<Config>()(set => ({
  config: {},
  setConfig: (payload: Output) => set({ config: payload }),
}))
