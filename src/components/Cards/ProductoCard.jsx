import React from 'react'
import trucha from '../../assets/trucha.jpg'

function ProductoCard({ producto, setIsEdit, handlerDelete }) {
    return (
        <div className="bg-gray-100 p-5 rounded-lg shadow-md flex flex-col gap-3 " >

            {/* Encabezado con ID y Estado */}
            <div className='flex justify-between items-center text-sm'>
                <div className='space-y-1'>
                    <span className="text-gray-400 font-medium block">ID Producto</span>
                    <span className="text-gray-600 font-mono">#{producto.id_producto}</span>
                </div>

                {/* Estado como badge flotante */}
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${producto.estado === "Activo"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}>
                    {producto.estado.toUpperCase()}
                </span>
            </div>


            {/* //IMAGEN DE PRODUCTO */}
            <img src={trucha} alt={producto.nombre} className="w-full max-h-60 object-cover rounded-lg mb-3" />

            <h2 className="text-xl font-semibold">{producto.nombre}</h2>
            <p className="text-gray-500">{producto.descripcion}</p>
            <div className='text-center flex justify-between items-center'>
                <div className='border-r-2 border-gray-300 pr-3'>
                    <p>Precio </p>
                    <p className={`${producto.estado === "Activo" ? "text-green-500" : "text-red-500"} font-bold`}>${producto.precio}</p>
                </div>
                <div className='text-center'>
                    <p>T. Preparacion</p>
                    <p className={`text-blue-500 font-bold`}>{producto.tiempo_preparacion} min</p>
                </div>
                <div className='border-l-2 border-gray-300 pl-3'>

                    <p>Costo</p>
                    <p className={`text-red-500 font-bold`}>${producto.costo}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                    {producto.categoria}
                </span>
            </div>
            {/* 
                                   <div>
                                       <span className="text-gray-400">SubCategoria: </span>
                                       <span className="text-white">{producto.subcategoria ? producto.subcategoria : "N/A"}</span>
                                   </div> */}
            {/* <div>
                                       <span className="text-gray-400">Stock: </span>
                                       <span className="text-white">{producto.stock ? producto.stock : "N/A"}</span>
                                   </div> */}
            <div>
                <span className="text-gray-400">Estado </span>
                <span className={`${producto.estado === "Activo" ? "text-green-500" : "text-red-500"} font-bold`}>{producto.estado}</span>
            </div>
            <div className='flex gap-2 justify-between'>
                <button onClick={() => { handlerDelete(producto.id_producto) }} className='btn-1-eliminar  mt-2'>Delete</button>
                <button onClick={() => { setIsEdit(true) }} className='btn-1-editar  mt-2'>Edit</button>
            </div>

        </div>
    )
}

export default ProductoCard