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
  const [initialGreetingAdded, setInitialGreetingAdded] = useState(false);

  // Scroll after sending messages
  const conversationEndRef = useRef(null);
  useEffect(() =>
  {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Add initial greeting from AI
  useEffect(() =>
  {
    if (!initialGreetingAdded)
    {
      async function fetchInitialGreeting()
      {
        try
        {
          const initialGreeting = await getRecipeFromMistral("This is the initial greeting, I want you to greet me and ask something");
          setConversation(prevConvo => [
            ...prevConvo,
            { category: 'AI', message: initialGreeting || "Hi there! How can I make your day better today? 😊" }
          ]);
        } catch (error)
        {
          console.error("Error fetching initial greeting:", error);
          setConversation(prevConvo => [
            ...prevConvo,
            { category: 'AI', message: "Hi there! How can I make your day better today? 😊" }
          ]);
        } finally
        {
          setInitialGreetingAdded(true);
        }
      }

      fetchInitialGreeting();
    }
  }, [initialGreetingAdded]);

  async function addMessage(event)
  {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userMessage = formData.get('message');

    if (!userMessage.trim()) return;

    setConversation(prevConvo => [
      ...prevConvo,
      { category: 'user', message: userMessage }
    ]);

    event.currentTarget.reset();

    setTimeout(() =>
    {
      setConversation(prevConvo => [
        ...prevConvo,
        { category: 'AI', message: "Typing..." }
      ]);

      getAIResponse(userMessage);
    }, 500);
  }

  async function getAIResponse(userMessage)
  {
    try
    {
      const aiResponse = await getRecipeFromMistral(userMessage);

      setConversation(prevConvo => prevConvo.map((msg, index) =>
        index === prevConvo.length - 1
          ? { category: "AI", message: aiResponse || "I'm sorry, I couldn't generate a response." }
          : msg
      ));

    } catch (error)
    {
      console.error("Error fetching AI response:", error);

      setConversation(prevConvo => prevConvo.map((msg, index) =>
        index === prevConvo.length - 1
          ? { category: "AI", message: "Failed to fetch response. Please try again." }
          : msg
      ));
    }
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

        <form onSubmit={addMessage} className='flex flex-row items-center p-2 border-t'>
          <input type="text"
            className='border flex-grow p-2 rounded-full outline-none focus:ring-2 focus:ring-pink-400'
            placeholder='Type a message...'
            name='message'
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