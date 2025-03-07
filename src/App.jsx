import './App.css'
import 'boxicons'
import Message from './components/Message'
import Reply from './components/Reply'
import SendMessage from './components/SendMessage'


function App()
{
  return (

    <div className='absolute min-w-screen bg-fuchsia-200 min-h-screen flex flex-col items-center justify-center'>

      <section className="border bg-white w-96 h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
        <header className="bg-pink-500 text-white p-4 flex items-center justify-center text-2xl font-bold">
          <h1>Aphrodite</h1>
          <box-icon name="bot" className="ml-2"></box-icon>
        </header>

        <main className='flex flex-col flex-grow p-4 overflow-y-auto space-y-3'>

          <Message text='Lorem ipsum, dolor sit amet consectetur adipisicing elit.' />
          <Reply text='Officia voluptatum consequatur nemo accusamus!' />

          <Message text='Perferendis rerum, dignissimos minus ea adipisci pariatur officiis repudiandae.' />
          <Reply text='Voluptatem neque laborum, tempora vitae deleniti minus tenetur maiores? Maxime nesciunt eum nam.' />

          <Message text='Doloremque, velit nesciunt?' />
          <Reply text='Sed provident a sequi amet ab exercitationem, libero corporis nam molestiae id soluta nobis voluptatibus?' />

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
