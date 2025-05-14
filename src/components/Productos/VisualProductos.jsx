import React, { useState, useEffect } from 'react'
import { deleteproductos, getproductos } from '../../../utils/productos'
import Form from './items/Form'
import Modal from './items/Modal'
import { Link } from 'react-router-dom'


import ProductoCard from '../Cards/ProductoCard'
import ProductMiniCard from './cards/productMiniCard'
import FilterCategoryy from './FilterCategoryy'

function VisualProductos({ data }) {

    const [productos, setProductos] = useState([])
    const [editProducto, setEditProducto] = useState({})
    const [loading, setLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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


    const handlerDelete = (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.");
        if (confirmDelete) {
            deleteproductos(id)
                .then((res) => {
                    if (res.status === 200) {
                        // setProductos(productos.filter((producto) => producto.id_producto !== id));
                        alert("Producto eliminado con éxito.");
                        getproductos()
                            .then((data) => {
                                console.log(data)
                                setProductos(data);
                                setLoading(false);
                            })
                            .catch((error) => {
                                console.error("Error al obtener los productos:", error);
                            });
                    } else {
                        alert("Error al eliminar el producto. Inténtalo de nuevo.");
                    }
                })
                .catch((error) => {
                    console.error("Error al eliminar el producto:", error);
                    alert("Error al eliminar el producto. Inténtalo de nuevo.");
                });
        }
    }

    const handlerEdit = (id) => {
        const productoToEdit = productos.find((producto) => producto.id_producto === id);
        setEditProducto(productoToEdit);
        setIsEdit(true);
        setIsOpen(true);

    }

    const categorias = productos.map((producto) => producto.categoria)
    const uniqueCategorias = [...new Set(categorias)] // Elimina duplicados de categorias
    console.log(uniqueCategorias)

    const filteredProductos = selectedCategory
        ? productos.filter((producto) => producto.categoria === selectedCategory)
        : productos;


    return (
        <>
            <div className="flex flex-col gap-5 w-full h-full overflow-y-auto overflow-x-hidden ">
                <h1 className="text-white text-2xl font-bold">Productos</h1>
                <div>
                    <FilterCategoryy 
                        categorias={uniqueCategorias} 
                        onCategorySelect={(categoria) => setSelectedCategory(categoria)} 
                    />
                    <div>
                          <Link to="/productos/crear" className='bg-red-500 text-white px-4 py-2 rounded-lg mt-5'>Crear Producto</Link>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {loading ? (
                        <p className="text-white">Cargando...</p>
                    ) : (
                        filteredProductos.map((producto, key) => (
                            <ProductMiniCard 
                                key={key} 
                                producto={producto} 
                                handlerDelete={handlerDelete} 
                                handlerEdit={handlerEdit} 
                            />
                        ))
                    )}
                </div>

                <dialog open={isEdit} className="bg-gray-500 w-1/2 h-1/2 rounded-md p-5 flex-col gap-5 absolute z-50" id='modal'>
                    formulario de edicion
                    <Form setIsOpen={setIsOpen} isEdit={isEdit} editProducto={editProducto} />
                    <button onClick={() => { setIsEdit(false) }} className='bg-red-500 p-2 mt-2'>Cerrar</button>

                </dialog>
            </div>
        </>
    )
}

export default VisualProductos