
import Hamburguesa from '../../assets/hamburguesa.png'
import Modal from '../Modals/Modal'

function MenuItem({ nombre, status, numpedidos, setIsmodal }) {




    return (
        <div className='flex justify-between items-center'>
            <div className='profile flex gap-3 items-center'  >
                <picture className='w-[13%]'>
                    <img src={Hamburguesa} alt="profile" />
                </picture>
                <div >
                    <p className='font-bold mb-1 '>{nombre}</p>
                    {numpedidos ? null : <span className={`  ${status ? "bg-green-300" : "bg-red-300"}  px-2 py-1 rounded tex-center font-semibold capitalize text-sm`}>Activo</span>}
                    {numpedidos ? <p>Cantidad de pedidos: <span className='font-semibold'>{numpedidos}</span> </p> : null}
                </div>
            </div>
            <div>
                <button onClick={() => { setIsmodal(true) }} className='hover:bg-blue-300 border border-sky-500  px-2 py-1 rounded-lg transtion-all more ' >More</button>
            </div>
            {/* <Modal></Modal> */}
        </div>
    )
}

export default MenuItem 