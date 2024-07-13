import React from 'react'

function Card({ wid, hei, children, title, info }) {
    return (
        <div className={` bg-neutral-100  min-w-[300px] ${wid} py-4 px-5 rounded-xl flex flex-col gap-3 overflow-y-auto`}>
            <div className='header'>
                <div className='flex flex-col gap-1 '>
                    <h4 className='text-lg uppercase font-medium'>{title}</h4>
                    {/* <p className='text-base'>{info}</p> */}
                </div>
            </div>
            <div className={`container max-h-[${hei}]  overflow-y-auto`}>
                {children}
            </div>
        </div>
    )
}

export default Card