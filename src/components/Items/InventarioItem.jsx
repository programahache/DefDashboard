import profile from '../../assets/logo.png'
import Hamburguesa from '../../assets/hamburguesa.png'

function InventarioItem({nombre, status}) {
    return (
        <div className='flex justify-between items-center'>
            <div className='profile flex gap-3 items-center'  >
                <picture className='w-[13%]'>
                    <img src={Hamburguesa} alt="profile" />
                </picture>
                <div >
                    <p className='font-bold  '>{nombre}</p>
              
                    <span className={` text-gray-500 font-semibold capitalize text-sm`}>Pocas unidades: 5kg</span>
                </div>
            </div>
            <div>
                <button className='hover:bg-blue-300 border border-sky-500  px-2 py-1 rounded-lg transtion-all '>Ver</button>
            </div>
        </div>
    )
}

export default InventarioItem 