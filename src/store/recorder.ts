import { create } from 'zustand'

interface Recorder {
  isRecording: boolean
  setIsRecording: (count: boolean) => void
  audioData: Blob | null
  setAudioData: (blob: Blob | null) => void
  isSubmitting: boolean
  setIsSubmitting: (count: boolean) => void
}

export const useRecorder = create<Recorder>()(set => ({
  isRecording: false,
  setIsRecording: payload => set({ isRecording: payload }),
  audioData: null,
  setAudioData: payload => set({ audioData: payload }),
  isSubmitting: false,
  setIsSubmitting: payload => set({ isSubmitting: payload }),
}))
