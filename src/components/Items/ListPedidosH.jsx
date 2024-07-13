import { useState } from 'react'

import Hamburguesa from '../../assets/hamburguesa.png'
import Modal from '../Modals/Modal'



function ListPedidosH({ nombre }) {

    const [isModal, setIsmodal] = useState(false)

    return (
        <div className='flex justify-between items-center'>
            <div className='flex flex-col items-start' >
                <p className='font-bold'>{nombre}</p>
                <span>11/07/2024 6:37 am</span>

                {/* <span className={`  ${status ? "bg-green-300" : "bg-red-300"}  px-2 py-1 rounded tex-center font-semibold capitalize text-sm`}>Activo</span>
                    <p>Pedido generado </p> */}
            </div>

            <div>
                <button onClick={() => { setIsmodal(true) }} className='hover:bg-blue-300 border border-sky-500  px-2 py-1 rounded-lg   ' >Mas</button>
            </div>
            {isModal ? <Modal setIsmodal={setIsmodal} isModal={isModal} nombre={nombre} /> : null}

        </div>

    )
}

export default ListPedidosH