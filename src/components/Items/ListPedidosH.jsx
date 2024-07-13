import Hamburguesa from '../../assets/hamburguesa.png'

function ListPedidosH({ nombre, status, numpedidos, setIsmodal }) {
    return (
        <div className='flex gap-2 items-start'>
            <div className='flex ' >
                <p className='font-bold'>{nombre} </p>
                <span>11/07/2024 6:37 am </span>

                {/* <span className={`  ${status ? "bg-green-300" : "bg-red-300"}  px-2 py-1 rounded tex-center font-semibold capitalize text-sm`}>Activo</span>
                    <p>Pedido generado </p> */}
            </div>

            <div>
                <button onClick={() => { setIsmodal(true) }} className='hover:bg-blue-300 border border-sky-500  px-2 py-1 rounded-lg transtion-all more ' >More</button>
            </div>
        </div>
    )
}

export default ListPedidosH