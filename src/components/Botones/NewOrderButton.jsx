import React, { useState } from 'react'


function NewOrderButton() {

    const [isOpen, setIsopen] = useState(false)

    const handler = () => {
        console.log(isOpen)
    }

    return (
        <button
            className='ButtonAction bg-red-400 cursor-pointer focus:outline-none opacity-80 
        rounded-full p-3 flex items-center justify-center font-bold text-white
         hover:bg-sky-700 hover:p-5 hover:opacity-100 transition-all ease-in duration-300 absolute
          bottom-7 right-7 z-10' onClick={() => { setIsopen(!isOpen) }}>
            <span class="material-symbols-outlined">
                action_key
            </span>

            {isOpen ?
                <>
                    <div className='-top-[1.5rem] right-[5rem] hover:right-[6rem] absolute bg-red-700  px-2  truncate  transition-all'> Nuevo Pedido </div>
                    <div className='top-[12px] right-[5rem] hover:right-[6rem]  absolute bg-red-700  px-2 truncate   transition-all'> Nuevo Empleado </div>
                    <div className='top-[3rem] right-[5rem] hover:right-[6rem] absolute bg-red-700  px-2 truncate   transition-all'> Nuevo Producto </div>
                </>

                : null}

        </button>
    )
}

export default NewOrderButton