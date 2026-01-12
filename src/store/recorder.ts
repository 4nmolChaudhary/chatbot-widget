import { create } from 'zustand'

import type { Recorder } from '@/types/others'

export const useRecorder = create<Recorder>()(set => ({
  isRecording: false,
  setIsRecording: payload => set({ isRecording: payload }),
  audioData: null,
  setAudioData: payload => set({ audioData: payload }),
  isSubmitting: false,
  setIsSubmitting: payload => set({ isSubmitting: payload }),
}))
