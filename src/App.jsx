import './App.css'
import 'boxicons'


function App()
{
  return (

    <div className='absolute min-w-screen bg-fuchsia-200 min-h-screen flex flex-col items-center justify-center'>

      <section className="border bg-white w-96 h-[600px] flex flex-col shadow-lg rounded-lg overflow-hidden">
        <header className="bg-pink-600 text-white p-4 flex items-center justify-center text-2xl font-bold">
          <h1>Aphrodite</h1>
          <box-icon name="bot" className="ml-2"></box-icon>
        </header>

        <main className='flex flex-col flex-grow p-4 overflow-y-auto space-y-3'>
          <div className='flex justify-end'> {/* THIS IS USER MESSAGE [MAKE IT COMPONENT LATER] */}
            <div className='bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs'>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>

          {/*THIS IS AI REPLY [ALSO COMPONENT LATER*/}
          <div className='flex justify-start'>
            <div className='bg-gray-300 text-black px-4 py-2 rounded-lg max-w-xs'>
              <p> Officia voluptatum consequatur nemo accusamus! </p>
            </div>
          </div>

          <div className='flex justify-end'> {/* THIS IS USER MESSAGE [MAKE IT COMPONENT LATER] */}
            <div className='bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs'>
              <p>Perferendis rerum, dignissimos minus ea adipisci pariatur officiis repudiandae. </p>
            </div>
          </div>

          {/*THIS IS AI REPLY [ALSO COMPONENT LATER*/}
          <div className='flex justify-start'>
            <div className='bg-gray-300 text-black px-4 py-2 rounded-lg max-w-xs'>
              <p>Voluptatem neque laborum, tempora vitae deleniti minus tenetur maiores? Maxime nesciunt eum nam.</p>
            </div>
          </div>

          <div className='flex justify-end'> {/* THIS IS USER MESSAGE [MAKE IT COMPONENT LATER] */}
            <div className='bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs'>
              <p> Doloremque, velit nesciunt?</p>
            </div>
          </div>

          {/*THIS IS AI REPLY [ALSO COMPONENT LATER*/}
          <div className='flex justify-start'>
            <div className='bg-gray-300 text-black px-4 py-2 rounded-lg max-w-xs'>
              <p>Sed provident a sequi amet ab exercitationem, libero corporis nam molestiae id soluta nobis voluptatibus?</p>
            </div>
          </div>


        </main>


        <form action="" className='flex flex-row items-center p-2 border-t'>
          <input type="text"
            className='border flex-grow p-2 rounded-full outline-none focus:ring-2 focus:ring-pink-400'
            placeholder='Type a message...'
          />

          <input type="submit"
            className='border ml-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition'
            value='send' />
        </form>
      </section>

      <footer className='absolute bottom-0 bg-pink-600 min-w-screen text-white text-lg text-center p-4'>
        <p>Copyright {new Date().getFullYear()} by MJ.</p>
      </footer>

    </div>

  )
}

export default App
