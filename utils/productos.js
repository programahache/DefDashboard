// type productos = {
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
//         {
//             nombre: string,        // Nombre del ingrediente
//             cantidad: number,      // Cantidad requerida
//             unidad: string         // Unidad de medida (ej., gramos, unidades)
//         }
//     ],
//     tiempo_preparacion: number,// Tiempo promedio de preparación en minutos
//     fecha_creacion: Date,      // Fecha en la que se agregó el producto
//     ultima_actualizacion: Date,// Fecha de la última actualización
//     promociones: [             // Promociones asociadas (si hay)
//         {
//             descripcion: string,   // Descripción de la promoción
//             descuento: number,     // Descuento en porcentaje o monto
//             fecha_inicio: Date,    // Inicio de la promoción
//             fecha_fin: Date        // Fin de la promoción
//         }
//     ],
//     visibilidad_menu: boolean, // Indica si el producto está visible en el menú digital
//     popularidad: number        // Valor para ordenar según los más vendidos
// }

// FUNCION PARA OBTENER LOS PRODUCTOS DE LA API
export const getproductos = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos`);
    const data = await response.json();
    return data;
}

// FUNCION PARA OBTENER UN PRODUCTO POR SU ID
export const getproductosById = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/${id}`);
    const data = await response.json();
    return data;
}

// FUNCION PARA CREAR UN NUEVO PRODUCTO
export const createproductos = async (productos) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/crear`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productos)
    });
    const data = await response.json();
    return data;
}

// FUNCION PARA ACTUALIZAR UN PRODUCTO
export const updateproductos = async (id, productos) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/actualizar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productos)
    });
    const data = await response.json();
    return data;
}

// FUNCION PARA ELIMINAR UN PRODUCTO
export const deleteproductos = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/productos/eliminar/${id}`, {
        method: 'DELETE'
    });
  
    const data = await response.json();
    if (response.status === 200) {
        return {...data, status: response.status};
    } else {
        throw new Error('Error al eliminar el producto');
    }
}               
 
// FUNCION PARA OBTENER UN PRODUCTO POR SU NOMBRE


