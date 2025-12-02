export type Recorder = {
  isRecording: boolean
  setIsRecording: (count: boolean) => void
  audioData: Blob | null
  setAudioData: (blob: Blob | null) => void
  isSubmitting: boolean
  setIsSubmitting: (count: boolean) => void
}
