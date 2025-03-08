import './App.css'
import 'boxicons'
import Message from './components/Message'
import Reply from './components/Reply'
import SendMessage from './components/SendMessage'

import { conversationData } from './data/conversationData'
import { useState, useEffect, useRef } from 'react';

import { getRecipeFromChefClaude, getRecipeFromMistral } from "./data/ai"


function App()
{

  const [conversation, setConversation] = useState(conversationData);

  // Scroll after sending messages
  const conversationEndRef = useRef(null);
  useEffect(() =>
  {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);


  function addMessage(formData)
  {
    event.preventDefault();

    const userMessage = formData.get('message');


    // If there is no value on message then stop executing
    if (!message.trim()) return;

    setConversation(function (prevConvo)
    {
      return [...prevConvo,
      {
        category: 'user',
        message: userMessage
      }
      ]
    })

    console.log(userMessage);


    // Simulate AI reply (replace with actual API later)
    setTimeout(() =>
    {
      setConversation(prevConvo => [
        ...prevConvo,
        { category: 'AI', message: "I'm thinking... 🤔" }
      ]);
    }, 300); // Simulate delay

  }


  return (

    <div className='absolute min-w-screen bg-fuchsia-200 min-h-screen flex flex-col items-center justify-center'>

      <section className="border bg-white w-96 h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
        <header className="bg-pink-500 text-white p-4 flex items-center justify-center text-2xl font-bold">
          <h1>Aphrodite</h1>
          <box-icon name="bot" className="ml-2"></box-icon>
        </header>

        <main className='flex flex-col flex-grow p-4 overflow-y-auto space-y-3'>
          {conversation.map((convo, index) =>
            convo.category === "user" ? (
              <Message key={index} text={convo.message} />
            ) : (
              <Reply key={index} text={convo.message} />
            )
          )}

          <div ref={conversationEndRef} />
        </main>

        <form action={addMessage} className='flex flex-row items-center p-2 border-t'

        >
          <input type="text"
            className='border flex-grow p-2 rounded-full outline-none focus:ring-2 focus:ring-pink-400'
            placeholder='Type a message...'
            name='message'
          /*   onChange={(e) => setConversation(e.target.value)} */
          />
          <button
            className='border ml-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition'>
            Send
          </button>
        </form>
      </section>

      <footer className='absolute bottom-0 bg-pink-500 min-w-screen text-white text-lg text-center p-4'>
        <p>Copyright {new Date().getFullYear()} by MJ.</p>
      </footer>

    </div>

  )
}

export default App
