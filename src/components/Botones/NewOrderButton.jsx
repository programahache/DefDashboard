import React from 'react'

function NewOrderButton() {
    return (
        <button className='bg-red-400 focus:outline-none opacity-80 rounded-full p-3 flex items-center justify-center font-bold text-white hover:bg-sky-700 hover:p-5 hover:opacity-100 transition-all ease-in duration-300 absolute bottom-3 right-6 z-10 '>
            <span class="material-symbols-outlined">
                action_key
            </span>
        </button>
    )
}

export default NewOrderButton