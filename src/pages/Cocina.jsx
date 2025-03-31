import { useState, useEffect } from 'react'
import { getproductos } from '../../utils/productos'
import VisualProductos from '../components/Productos/VisualProductos'
import Modal from '../components/Productos/items/Modal'

function Cocina() {

    const [productos, setProductos] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getproductos()
            setProductos(data)
            setLoading(false)
        }
        fetchData()
    }, [])


    console.log(productos)

    return (
        <div className='p-10'>
            <p>
                Productos
            </p>
            <p className='text-gray-500'>
                Listado de productos disponibles en la cocina.
            </p>
            <VisualProductos data={productos} />
            <div className='flex justify-end'>
            
                <button onClick={()=>{setIsOpen(!isOpen)}}  className='bg-red-500 text-white px-4 py-2 rounded-md' >Agregar producto</button>
                
            </div>
            <Modal isOpen={isOpen} setIsOpen />
        </div>

        
    )
}

export default Cocina