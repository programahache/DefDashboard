import { useState, useEffect } from 'react'
import { getproductos } from '../../utils/productos'
import VisualProductos from '../components/Productos/VisualProductos'
import { Link } from 'react-router-dom'

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



    return (
        <div className='px-5'>
            <VisualProductos data={productos} />
        </div>


    )
}

export default Cocina