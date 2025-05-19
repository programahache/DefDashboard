import { useState, useEffect } from 'react'
import hamburguesa from '../../assets/hamburguesa.png'
import { getPedidosDetalles } from '../../../utils/pedidos'


function PedidosPorProductoList() {
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPedidosDetalles()
                setPedidos(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    return (
        <div className='p-6 rounded-2xl shadow-lg bg-white w-full max-w-3xl overflow-hidden'>
            {/* Encabezado */}
            <div className='flex justify-between items-center pb-4 mb-4 border-b border-gray-200'>
                <h2 className='text-2xl font-bold text-gray-800'>Listado de Pedidos</h2>
                <button className='px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors'>
                    Ver todo
                </button>
            </div>

            {/* Estados de carga y error */}
            {loading && (
                <div className='flex flex-col items-center py-8 space-y-3'>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className='text-gray-500'>Cargando pedidos...</p>
                </div>
            )}

            {error && (
                <div className='p-4 bg-red-50 text-red-700 rounded-lg border border-red-200'>
                    ⚠️ Error al cargar los pedidos: {error.message}
                </div>
            )}

            {/* Listado de pedidos */}
            <div className='divide-y divide-gray-100'>
                {pedidos?.map((pedido,key) => (
                    <div
                        key={key}
                        className='group flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer'
                    >
                        {/* Imagen del producto */}
                        <div className='relative aspect-square w-20 flex-shrink-0'>
                            <img
                                src={pedido.imagen || hamburguesa}
                                alt={pedido.producto_nombre}
                                className='w-full h-full object-cover rounded-xl'
                            />
                            <span className='absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded'>
                                x{pedido.cantidad}
                            </span>
                        </div>

                        {/* Detalles del pedido */}
                        <div className='flex-1 min-w-0'>
                            <h3 className='text-lg font-semibold truncate'>{pedido.producto_nombre}</h3>

                            <div className='grid grid-cols-2 gap-2 mt-2 text-sm'>
                                <div>
                                    <span className='text-gray-500'>ID Pedido:</span>
                                    <span className='font-mono ml-2 text-gray-700'>#{pedido.id_pedido_online}</span>
                                </div>
                                <div>
                                    <span className='text-gray-500'>Total:</span>
                                    <span className='ml-2 font-medium text-green-600'>
                                        ${(pedido.precio_unitario * pedido.cantidad).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Estado del pedido */}
                            <div className='mt-3 flex items-center gap-2'>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${pedido.estado === 'Entregado' ? 'bg-green-100 text-green-800' :
                                    pedido.estado === 'En proceso' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {pedido.estado}
                                </span>
                                <span className='text-xs text-gray-500'>
                                    {new Date(pedido.fecha_pedido).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Icono de flecha */}
                        <span className='material-symbols-outlined text-gray-400 group-hover:text-blue-600 transition-colors'>
                            chevron_right
                        </span>
                    </div>
                ))}
            </div>

            {/* Placeholder cuando no hay pedidos */}
            {!loading && pedidos.length === 0 && (
                <div className='py-8 text-center text-gray-500'>
                    <span className='material-symbols-outlined text-4xl mb-2'>fastfood</span>
                    <p>No hay pedidos registrados</p>
                </div>
            )}
        </div>
    )
}

export default PedidosPorProductoList