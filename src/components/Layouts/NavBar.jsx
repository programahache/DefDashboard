import React from 'react'

function NavBar() {
    return (
        <nav className='flex justify-between items-center w-full bg-neutral-700   py-3 px-5 '>
            <div className='text-xl text-white'>
                <p>Daniela Moreno</p>
            </div>
            <div className=' w-1/2 flex gap-1 items-center'>
                <input type="text" className='w-full px-2 py-1 rounded-lg' placeholder='Search...' />
             
            </div>
            <div className='flex gap-3 w-auto'>
                <div className="flex">
                    <span class="material-symbols-outlined text-white text-3xl" >
                        person
                    </span>
                 
                </div>
                <button>
                    <span class="material-symbols-outlined text-white text-3xl">
                        dark_mode
                    </span>
                </button>
                <div>
                 
                </div>
            </div>
        </nav>
    )
}

export default NavBar