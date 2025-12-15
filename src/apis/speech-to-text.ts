import { ENDPOINT } from '@/constants/endpoints'

export const uploadSpeechToText = async (blob: Blob) => {
  const url = import.meta.env.VITE_STT_URL
  const authKey = import.meta.env.VITE_STT_AUTH_KEY

  if (!url || !authKey) throw new Error('Missing env variables')

  const formData = new FormData()
  formData.append('audio', blob)

  const response = await fetch(`${url}/${ENDPOINT.TTS}`, {
    method: 'POST',
    headers: { 'auth-key': authKey },
    body: formData,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Speech API error: ${text}`)
  }

  return response.json()
}
