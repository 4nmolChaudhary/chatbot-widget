import { ENDPOINT } from '@/constants/endpoints'

export const retrieval = async (query: string, session_id: string) => {
  const url = import.meta.env.VITE_STT_URL
  const authKey = import.meta.env.VITE_STT_AUTH_KEY
  const version = import.meta.env.VITE_RETRIEVAL_API_VERSION

  if (!url || !authKey || !version) throw new Error('Missing env variables')

  const response = await fetch(`${url}/${version}/${ENDPOINT.RETRIEVAL}`, {
    method: 'POST',
    headers: {
      'auth-key': authKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      session_id,
      language_code: 'en',
    }),
  })

  if (!response.body) {
    const text = await response.text()
    throw new Error(`Retrieval API error: ${text}`)
  }
  return response
}
