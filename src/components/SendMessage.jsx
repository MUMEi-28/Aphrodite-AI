import React from 'react'

export default function SendMessage()
{
    return (
        <form action="" className='flex flex-row items-center p-2 border-t'>
            <input type="text"
                className='border flex-grow p-2 rounded-full outline-none focus:ring-2 focus:ring-pink-400'
                placeholder='Type a message...'
            />

            <input type="submit"
                className='border ml-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition'
                value='send' />
        </form>
    )
}
