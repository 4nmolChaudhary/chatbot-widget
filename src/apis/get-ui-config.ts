import { ENDPOINT } from '@/constants/endpoints'
import { transformSettings } from '@/helpers/format-data'

export const getUiConfig = async () => {
  const url = import.meta.env.VITE_STT_URL
  const authKey = import.meta.env.VITE_STT_AUTH_KEY

  if (!url || !authKey) throw new Error('Missing env variables')

  const response = await fetch(`${url}/${ENDPOINT.CONFIG}`, {
    method: 'GET',
    headers: { 'auth-key': authKey },
  })

  if (!response.ok) {
    const res = await response.text()
    throw new Error(`fetch error: ${res}`)
  }
  const config = await response.json()
  return transformSettings(config?.data)
}
