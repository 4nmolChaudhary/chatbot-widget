import { ENDPOINT } from '@/constants/endpoints'

export const deleteSession = async (sessionId: string) => {
  const url = import.meta.env.VITE_STT_URL
  const authKey = import.meta.env.VITE_STT_AUTH_KEY
  const version = import.meta.env.VITE_BASE_API_VERSION

  if (!url || !authKey || !version) throw new Error('Missing env variables')

  const response = await fetch(`${url}/${version}/${ENDPOINT.SESSION}/${sessionId}`, {
    method: 'DELETE',
    headers: { 'auth-key': authKey },
  })

  if (!response.ok) {
    const res = await response.text()
    throw new Error(`fetch error: ${res}`)
  }
  const res = await response.json()
  return res?.session_id
}
