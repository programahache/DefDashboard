import React, { useState } from 'react'
import { useEffect } from 'react'
import { createproductos, getproductos } from '../../../../utils/productos'

function Form({ setIsOpen, editProducto, isEdit }) {

    const [producto, setProducto] = useState({})

    useEffect(() => {
        console.log(isEdit)
        if (isEdit) {
            console.log(editProducto)
            setProducto({
                ...editProducto
            })
        } else {
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
                tiempo_preparacion: '',
            })
        }
    }, [isEdit, editProducto])



        const handleChange = (e) => {
            const { name, value } = e.target
            setProducto({
                ...producto,
                [name]: value
            })
        }

        const handlerSubmit = async (e) => {
            e.preventDefault()
            // Validar que todos los campos estén completos
            if (!producto.nombre || !producto.descripcion || !producto.categoria || !producto.precio || !producto.costo || !producto.stock || !producto.unidad_medida || !producto.imagen) {
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
            <form className="flex flex-col gap-5 w-full h-full overflow-y-auto overflow-x-hidden p-5" onSubmit={handlerSubmit}>
                <div>
                    <h1 className="text-white text-2xl font-bold">Crea tu producto</h1>
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Nombre del producto</label>
                    <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre del producto" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Descripción</label>
                    <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción del producto" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Categoría</label>
                    <select name="categoria" value={producto.categoria} onChange={handleChange} className="p-2 rounded-md bg-gray-800 text-white">
                        <option value="entradas">Entradas</option>
                        <option value="platos_principales">Platos principales</option>
                        <option value="bebidas">Bebidas</option>
                        <option value="postres">Postres</option>
                        <option value="snacks">Snacks</option>
                        <option value="especiales">Especiales</option>
                    </select>
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Precio</label>
                    <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio del producto" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Costo</label>
                    <input type="number" name="costo" value={producto.costo} onChange={handleChange} placeholder="Costo del producto" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Stock</label>
                    <input type="number" name="stock" value={producto.stock} onChange={handleChange} placeholder="Cantidad disponible" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Unidad de medida</label>
                    <input type="text" name="unidad_medida" value={producto.unidad_medida} onChange={handleChange} placeholder="Unidad de medida" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Imagen</label>
                    <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Estado</label>
                    <select name="estado" value={producto.estado} onChange={handleChange} className="p-2 rounded-md bg-gray-800 text-white">
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Tiempo de preparación</label>
                    <input type="number" name="tiempo_preparacion" value={producto.tiempo_preparacion} onChange={handleChange} placeholder="Tiempo de preparación (min)" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Visibilidad en menú</label>
                    <select name="visibilidad" value={producto.visibilidad} onChange={handleChange} className="p-2 rounded-md bg-gray-800 text-white">
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div>
                    <label className="text-white text-lg font-semibold">Popularidad</label>
                    <input type="number" name="popularidad" value={producto.popularidad} onChange={handleChange} placeholder="Popularidad" className="p-2 rounded-md bg-gray-800 text-white" />
                </div>
                <button type="submit" className="bg-red-500 text-white p-2 rounded-md">Crear producto</button>
            </form>
        )
    }

export default Form