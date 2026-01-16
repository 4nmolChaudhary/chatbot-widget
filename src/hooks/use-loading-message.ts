import { useState, useEffect } from 'react'

import { INITIAL_MESSAGE, ROTATING_MESSAGES, INTERVAL_MS } from '@/constants/messages'

export const useLoadingMessage = (isLoading: boolean): string => {
  const [message, setMessage] = useState(INITIAL_MESSAGE)
  const [rotationIndex, setRotationIndex] = useState(0)
  const [isInitialPhase, setIsInitialPhase] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      setMessage(INITIAL_MESSAGE)
      setRotationIndex(0)
      setIsInitialPhase(true)
      return
    }

    const timer = setTimeout(() => {
      if (isInitialPhase) {
        setIsInitialPhase(false)
        setMessage(ROTATING_MESSAGES[0])
        setRotationIndex(1)
      } else {
        setMessage(ROTATING_MESSAGES[rotationIndex])
        setRotationIndex(prev => (prev + 1) % ROTATING_MESSAGES.length)
      }
    }, INTERVAL_MS)

    return () => clearTimeout(timer)
  }, [isLoading, isInitialPhase, rotationIndex])

  return message
}
