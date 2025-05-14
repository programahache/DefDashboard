import React, { useState } from 'react';
import { createproductos } from '../../utils/productos';
import { Link } from 'react-router-dom';

function CrearProducto() {
    const [producto, setProducto] = useState({
        nombre: '',
        tiempo_preparacion: '',
        categoria: '',
        descripcion: '',
        imagen: "trucha.jpg",
        precio: '',
        costo: '',
        stock: '',
        unidad: '',
        estado: 'activo',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProducto({
            ...producto,
            imagen: e.target.files[0],
        });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault()
        // Validar que todos los campos estén completos
        if (!producto.nombre || !producto.descripcion || !producto.categoria || !producto.precio || !producto.costo) {
            alert('Por favor completa todos los campos')
            return
        }
        // Validar que el precio y costo sean números positivos
        if (isNaN(producto.precio) || producto.precio <= 0 || isNaN(producto.costo) || producto.costo <= 0) {
            alert('El precio y costo deben ser números positivos')
            return
        }
        // Validar que el stock sea un número entero no negativo
        if (isNaN(producto.stock) || producto.stock < 0 || !Number.isInteger(Number(producto.stock))) {
            alert('El stock debe ser un número entero no negativo')
            return
        }
        // Validar que el tiempo de preparación sea un número positivo
        if (isNaN(producto.tiempo_preparacion) || producto.tiempo_preparacion <= 0) {
            alert('El tiempo de preparación debe ser un número positivo')
            return
        }

        createproductos(producto)
            .then((res) => {
                console.log(res)
                console.log(producto)
                alert('Producto creado con éxito')
                setProducto({
                    nombre: '',
                    descripcion: '',
                    categoria: '',
                    subcategoria: '',
                    precio: '',
                    costo: '',
                    stock: '',
                    unidad_medida: '',
                    imagen: '',
                    tiempo_preparacion: ''
                })
                // Aquí puedes agregar lógica para cerrar el modal o redirigir al usuario
                // a otra página después de crear el producto

            })
            .catch((err) => {
                console.error(err)
                alert('Error al crear el producto')
            })

    }


    return (
        <div className='w-full h-full flex flex-col gap-5 p-5'>
            <h1 className='text-4xl text-gray-600 font-bold'>Crear Producto</h1>
            <form onSubmit={handlerSubmit} className='grid grid-cols-2 grid-rows-3 gap-4 md:p-2'>
                <div className='form-1 row-span-3 basic-info bg-white py-4 px-5 rounded-2xl shadow-2xl flex flex-col gap-3 border-2 border-gray-200'>
                    <h2 className='text-2xl text-gray-800 font-semibold'>Información básica</h2>
                    <div>
                        <label htmlFor="nombre">Nombre del producto</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleChange}
                            placeholder='Nombre del producto'
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                    <div>
                        <label htmlFor="tiempo_preparacion">Tiempo de preparación</label>
                        <input
                            type="text"
                            id="tiempo_preparacion"
                            name="tiempo_preparacion"
                            value={producto.tiempo_preparacion}
                            onChange={handleChange}
                            placeholder='Tiempo de preparación'
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoría</label>
                        <select
                            name="categoria"
                            id="categoria"
                            value={producto.categoria}
                            onChange={handleChange}
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="comida">Comida</option>
                            <option value="bebida">Bebida</option>
                            <option value="postre">Postre</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="descripcion">Descripción del producto</label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            className='border rounded-xl border-gray-200 bg-gray-200 p-2'
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="imagen">Imagen del producto</label>
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            // onChange={handleFileChange}
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                </div>



                <div className='form-1 basic-info bg-white py-4 px-5 rounded-2xl shadow-2xl flex flex-col gap-3 border-2 border-gray-200'>
                    <h2 className='text-2xl text-gray-800 font-semibold'>Precios</h2>
                    <div>
                        <label htmlFor="precio">Precio</label>
                        <input
                            type='number'
                            id="precio"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            placeholder='0.00'
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                    <div>
                        <label htmlFor="costo">Costo</label>
                        <input
                            type='number'
                            id="costo"
                            name="costo"
                            value={producto.costo}
                            onChange={handleChange}
                            placeholder='0.00'
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                </div>

                <div className='form-1 basic-info bg-white py-4 px-5 rounded-2xl shadow-2xl flex flex-col gap-3 border-2 border-gray-200'>
                    <h2 className='text-2xl text-gray-800 font-semibold'>Stock</h2>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input
                            type='number'
                            id="stock"
                            name="stock"
                            value={producto.stock}
                            onChange={handleChange}
                            placeholder='0.00'
                            className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                        />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div>
                            <label htmlFor="unidad">Unidad</label>
                            <select
                                name="unidad"
                                id="unidad"
                                value={producto.unidad}
                                onChange={handleChange}
                                className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                            >
                                <option value="unidad">Unidad</option>
                                <option value="kilogramo">Kilogramo</option>
                                <option value="litro">Litro</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="estado">Estado</label>
                            <select
                                name="estado"
                                id="estado"
                                value={producto.estado}
                                onChange={handleChange}
                                className='w-full p-2 rounded-xl border-gray-200 bg-gray-200'
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='bg-white py-4 px-5 rounded-2xl shadow-2xl flex flex-col gap-3 border-2 border-gray-200 h-fit'>
                    <button
                        type="submit"
                        className='col-span-2 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition-all'
                    >
                        Crear Producto
                    </button>
                    <Link
                        to="/cocina"
                        onClick={() => setProducto({})}
                        className='col-span-2 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition-all text-center'
                    >
                        Cancelar
                    </Link>
                </div>

            </form>
        </div>
    );
}

export default CrearProducto;