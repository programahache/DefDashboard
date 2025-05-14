import React from 'react'
import trucha from '../../../assets/trucha.jpg'
import { Link } from 'react-router-dom'

function ProductMiniCard({ producto, setIsEdit, handlerDelete }) {
    // const [isEdit, setIsEdit] = useState(false);
    return (
        <div className="bg-gray-100 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            {/* Header compacto */}
            <div className='flex justify-between items-start mb-2'>
                {/* Nombre y Estado */}
                <div className='flex-1'>
                    <h3 className="font-semibold text-gray-800 truncate">{producto.nombre}</h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${producto.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"}`}>
                        {producto.estado}
                    </span>
                </div>

                {/* Precio destacado */}
                <p className={`text-sm font-bold ${producto.estado === "Activo"
                    ? "text-green-600"
                    : "text-red-600"}`}>
                    ${producto.precio}
                </p>
            </div>

            {/* Imagen pequeña */}
            <div className="relative my-4">
                <img
                    src={trucha}
                    alt={producto.nombre}
                    className=" object-cover rounded-lg"
                />
            </div>

            {/* Detalles compactos */}
            <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Costo</span>
                    <span>${producto.costo}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>T. Prep.</span>
                    <span>{producto.tiempo_preparacion} min</span>
                </div>

                {/* Categoría */}
                <div className="pt-1">
                    <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                        {producto.categoria}
                    </span>
                </div>
            </div>

            {/* Botones con Material Symbols */}
            <div className="flex gap-1.5 mt-2">
                <button
                    onClick={() => handlerDelete(producto.id_producto)}
                    className="flex-1 flex items-center justify-center p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span className="sr-only">Eliminar</span>
                </button>
                <Link
                    to={`/productos/editar/${producto.id_producto}`}

                    className="flex-1 flex items-center justify-center p-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded text-sm gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span className="sr-only">Editar</span>
                </Link>
            </div>
        </div>
    )
}

export default ProductMiniCard