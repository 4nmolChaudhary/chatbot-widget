import { useEffect } from 'react'

import Header from '@/components/chat/header'
import ChatInterface from '@/components/chat/chat-interface'
import Composer from '@/components/chat/composer'

import { getUiConfig } from '@/apis/get-ui-config'
import { generateSession } from '@/apis/generate-session'
import { useConfig } from '@/store/config'

function App() {
  const { setConfig, setSessionId } = useConfig()
  useEffect(() => {
    const config = async () => {
      try {
        const config = await getUiConfig()
        setConfig(config)
        const sessionId = await generateSession()
        setSessionId(sessionId)
      } catch (error) {
        console.error('Failed to fetch UI config:', error)
      }
    }
    config()
    return () => {}
  }, [])

  return (
    <div className='min-h-svh w-full flex flex-col'>
      <Header />
      <ChatInterface />
      <Composer />
    </div>
  )
}

export default App

