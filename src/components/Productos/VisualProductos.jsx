import React, {useState,useEffect} from 'react'

function VisualProductos({ data }) {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!data) return
        setProductos(data)
        setLoading(false)
    }
        , [data])


    // {
    //     id: number,                // Identificador único del producto
    //     nombre: string,            // Nombre del producto
    //     descripcion: string,       // Breve descripción del producto
    //     categoria: string,         // Categoría (ej., Entradas, Platos principales, Bebidas, Postres)
    //     subcategoria: string,      // Subcategoría opcional (ej., Bebidas frías, Bebidas calientes)
    //     precio: number,            // Precio de venta del producto
    //     costo: number,             // Costo de producción/preparación
    //     stock: number,             // Cantidad disponible (si aplica)
    //     unidad_medida: string,     // Ej., "unidad", "gramos", "litros"
    //     imagen: string,            // URL o path de la imagen del producto
    //     estado: string,            // Activo/Inactivo (para descontinuados o fuera de menú)
    //     ingredientes: [            // Lista de ingredientes si aplica
    //       {
    //         nombre: string,        // Nombre del ingrediente
    //         cantidad: number,      // Cantidad requerida
    //         unidad: string         // Unidad de medida (ej., gramos, unidades)
    //       }
    //     ],
    //     tiempo_preparacion: number,// Tiempo promedio de preparación en minutos
    //     fecha_creacion: Date,      // Fecha en la que se agregó el producto
    //     ultima_actualizacion: Date,// Fecha de la última actualización
    //     promociones: [             // Promociones asociadas (si hay)
    //       {
    //         descripcion: string,   // Descripción de la promoción
    //         descuento: number,     // Descuento en porcentaje o monto
    //         fecha_inicio: Date,    // Inicio de la promoción
    //         fecha_fin: Date        // Fin de la promoción
    //       }
    //     ],
    //     visibilidad_menu: boolean, // Indica si el producto está visible en el menú digital
    //     popularidad: number        // Valor para ordenar según los más vendidos
    //   }


    return (
        <>
            <div className="flex flex-col gap-5 w-full h-full overflow-y-auto overflow-x-hidden p-5">
                <h1 className="text-white text-2xl font-bold">Productos</h1>
                <div className="grid grid-cols-4 gap-5">
                    {loading ? (
                        <p className="text-white">Cargando...</p>
                    ) : (
                        productos.map((producto) => (
                            <div key={producto.id} className="bg-gray-800 p-5 rounded-lg shadow-md">
                                <img src={producto.imagen} alt={producto.nombre} className="w-full h-32 object-cover rounded-lg mb-3" />
                                <h2 className="text-white text-xl font-semibold">{producto.nombre}</h2>
                                <p className="text-gray-400">{producto.descripcion}</p>
                                <p className={`${producto.estado === "Activo"? "text-green-500" : "text-red-500" } font-bold`}>${producto.precio}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default VisualProductos