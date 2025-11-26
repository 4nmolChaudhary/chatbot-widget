import Header from '@/components/chat/header'
import ChatInterface from '@/components/chat/chat-interface'
import Composer from '@/components/chat/composer'

function App() {
  return (
    <div className='min-h-svh w-full flex flex-col'>
      <Header />
      <ChatInterface />
      <Composer />
    </div>
  )
}

export default App

