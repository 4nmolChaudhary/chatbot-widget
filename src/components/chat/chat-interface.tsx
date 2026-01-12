import StartChat from '@/components/chat/start-chat'
import ChatHistory from '@/components/chat/chat-history'

import { useChat } from '@/store/chat'

const ChatInterface = () => {
  const { chatHistory } = useChat()
  return <div className='flex-1 w-full flex flex-col items-center justify-center gap-4 p-4 text-center relative'>{!chatHistory.length ? <StartChat /> : <ChatHistory />}</div>
}

export default ChatInterface
