import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { LiveWaveform } from '@/components/ui/live-waveform'

import { Mic, X, Check, Loader } from 'lucide-react'

import { useRecorder } from '@/store/recorder'
import { useChat } from '@/store/chat'

import { audioBufferToWav } from '@/helpers/encode-audio'
import { uploadSpeechToText } from '@/apis/speech-to-text'

export function AudioRecorder() {
  const { isRecording, setIsRecording, audioData, setAudioData, setIsSubmitting, isSubmitting } = useRecorder()
  const { setMessageInput } = useChat()
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const isRecordingRef = useRef(false)
  const isCancelledRef = useRef(false)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      audioContextRef.current = audioContext
      const analyser = audioContext.createAnalyser()
      analyserRef.current = analyser
      analyser.fftSize = 256

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioData(blob)
        stream.getTracks().forEach(track => track.stop())
        isRecordingRef.current = false
      }

      mediaRecorder.start()
      isRecordingRef.current = true
      isCancelledRef.current = false
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }
  }

  const cancelRecording = () => {
    isCancelledRef.current = true
    stopRecording()
    setAudioData(null)
    setIsRecording(false)
    streamRef.current?.getTracks().forEach(track => track.stop())
  }

  const submitAudio = async () => {
    if (!audioData) return
    setIsSubmitting(true)
    try {
      // Convert WebM blob to WAV
      const arrayBuffer = await audioData.arrayBuffer()
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const wavBlob = audioBufferToWav(audioBuffer)

      const response: { status: boolean; transcription: string } = await uploadSpeechToText(wavBlob)
      if (response.status) setMessageInput(response.transcription)
      console.log(response)
      setAudioData(null)
    } catch (err) {
      console.error('Error submitting audio:', err)
    } finally {
      setIsSubmitting(false)
      setIsRecording(false)
    }
  }

  useEffect(() => {
    if (!audioData) return
    if (isCancelledRef.current) {
      isCancelledRef.current = false
      return
    }
    submitAudio()
  }, [audioData])

  return (
    <div className='flex flex-col gap-4 w-full pb-1'>
      {!isRecording && (
        <Button onClick={startRecording} variant='ghost' className='cursor-pointer w-9 h-9 rounded-full px-1 py-1 text-gray-600 hover:bg-gray-200'>
          <Mic className='h-4 w-4' />
        </Button>
      )}
      {isRecording && (
        <div className='w-full flex items-center gap-2'>
          <div className='bg-red-500 animate-pulse w-9 h-9 rounded-full px-1 py-1 text-white flex items-center justify-center'>
            <Mic className='h-4 w-4' />
          </div>
          <LiveWaveform active={isRecording} processing={isRecording} height={36} barWidth={3} barGap={2} mode='static' fadeEdges={true} barColor='blue' historySize={120} />
          {/* <canvas ref={canvasRef} className='w-[98%] h-9' /> */}
          <div className='flex gap-1'>
            <Button onClick={cancelRecording} variant='outline' className='cursor-pointer w-9 h-9 rounded-full px-1 py-1 bg-transparent hover:bg-red-500 hover:text-white'>
              <X className='h-4 w-4' />
            </Button>
            {!isSubmitting ? (
              <Button onClick={stopRecording} className='cursor-pointer w-9 h-9 rounded-full px-1 py-1 bg-green-600 hover:bg-green-700'>
                <Check className='h-4 w-4' />
              </Button>
            ) : (
              <div className='w-9 h-9 rounded-full px-1 py-1 bg-green-500 flex items-center justify-center text-white'>
                <Loader className='h-4 w-4 animate-spin text-white' />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
