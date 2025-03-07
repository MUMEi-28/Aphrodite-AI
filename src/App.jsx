import './App.css'
import 'boxicons'
import Message from './components/Message'
import Reply from './components/Reply'
import SendMessage from './components/SendMessage'

import { conversationData } from './data/conversationData'
import { useState } from 'react'

function App()
{

  const [conversation, setConversation] = useState([]);


  return (

    <div className='absolute min-w-screen bg-fuchsia-200 min-h-screen flex flex-col items-center justify-center'>

      <section className="border bg-white w-96 h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
        <header className="bg-pink-500 text-white p-4 flex items-center justify-center text-2xl font-bold">
          <h1>Aphrodite</h1>
          <box-icon name="bot" className="ml-2"></box-icon>
        </header>

        <main className='flex flex-col flex-grow p-4 overflow-y-auto space-y-3'>

          {conversationData.map((convo, index) => convo.category == "AI" ?
            <Message text={convo.message} key={index} /> : <Reply text={convo.message} key={index} />)}

        </main>

        <SendMessage />

      </section>

      <footer className='absolute bottom-0 bg-pink-500 min-w-screen text-white text-lg text-center p-4'>
        <p>Copyright {new Date().getFullYear()} by MJ.</p>
      </footer>

    </div>

  )
}

export default App
