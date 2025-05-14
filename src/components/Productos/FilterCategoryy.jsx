import React from 'react'

function FilterCategoryy({ categorias, onCategorySelect }) {
    return (
        <div className='flex flex-row gap-2 items-center justify-center w-full overflow-x-auto'>
            <div
                className='bg-slate-400 p-2 rounded-md flex items-center gap-2 hover:bg-slate-500 cursor-pointer transition-all ease-linear duration-300'
                onClick={() => onCategorySelect(null)}
            >
                <p className='text-white font-bold capitalize'>Mostrar todos</p>
            </div>
            {categorias.map((categoria, key) => (
                <div
                    key={key}
                    className='bg-slate-400 p-2 rounded-md flex items-center gap-2 hover:bg-slate-500 cursor-pointer transition-all ease-linear duration-300'
                    onClick={() => onCategorySelect(categoria)}
                >
                    <p className='text-white font-bold capitalize'>{categoria}</p>
                </div>
            ))}
        </div>
    );
}

export default FilterCategoryy