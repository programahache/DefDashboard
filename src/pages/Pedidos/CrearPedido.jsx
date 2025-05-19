import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getproductos } from '../../../utils/productos';
import { getPedidosDetalles, crearPedido } from '../../../utils/pedidos';
import { createproductos } from '../../../utils/productos';
import { Button } from "@/components/ui/button";

function CrearPedido() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [pedido, setPedido] = useState({
        cliente: null,
        productos: [],
        direccion_envio: '',
        metodo_pago: '',
        detalles: '',
        estado: 'Pendiente'
    });

    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const productos = await getproductos();
                setProductosDisponibles(productos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProductos();
    }, []);

    const categorias = [...new Set(productosDisponibles.map(p => p.categoria))];

    const productosFiltrados = categoriaSeleccionada
        ? productosDisponibles.filter(p => p.categoria === categoriaSeleccionada)
        : productosDisponibles;

    const handleAgregarProducto = (producto, cantidad) => {
        if (cantidad < 1) return;

        setPedido(prev => ({
            ...prev,
            productos: [
                ...prev.productos.filter(p => p.id_producto !== producto.id_producto),
                {
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    precio_unitario: producto.precio,
                    cantidad: cantidad,
                    subtotal: producto.precio * cantidad
                }
            ]
        }));
    };

    const handleCantidadChange = (producto, cantidad) => {
        if (cantidad < 1) return;
        setPedido(prev => ({
            ...prev,
            productos: [
                ...prev.productos.filter(p => p.id_producto !== producto.id_producto),
                {
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    precio_unitario: producto.precio,
                    cantidad: cantidad,
                    subtotal: producto.precio * cantidad
                }
            ]
        }));
    };

    const calcularTotal = () => {
        return pedido.productos.reduce((sum, p) => sum + p.subtotal, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoPedido = {
            id_cliente: 1,
            // cliente_nombre: "harold",
            // total: calcularTotal(),
            estado: pedido.estado,
            // detalles: pedido.detalles,
            direccion_envio: pedido.direccion_envio,
            metodo_pago: pedido.metodo_pago,
            detalles: pedido.productos
        };

        crearPedido(nuevoPedido)
            .then((response) => {
                console.log('Pedido creado:', response);
                navigate('/pedidos');
            })
            .catch((error) => {
                console.error('Error al crear el pedido:', error);
            });
    };

    return (
        <div className="w-full h-full  mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Nuevo Pedido</h1>

            <div className="flex gap-4 mb-6">
                <div className={`w-1/3 p-2 text-center ${step === 1 ? 'bg-blue-100' : 'bg-gray-100'} rounded`}>
                    Paso 1: Cliente
                </div>
                <div className={`w-1/3 p-2 text-center ${step === 2 ? 'bg-blue-100' : 'bg-gray-100'} rounded`}>
                    Paso 2: Productos
                </div>
                <div className={`w-1/3 p-2 text-center ${step === 3 ? 'bg-blue-100' : 'bg-gray-100'} rounded`}>
                    Paso 3: Confirmación
                </div>
            </div>

            {step === 1 && (
                <div className="space-y-4">
                    <div className="form-group">
                        <label className="block mb-2 font-medium">Buscar Cliente</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Nombre o teléfono del cliente"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Información del Cliente</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={pedido.cliente?.nombre || ''}
                                    onChange={(e) => setPedido(prev => ({
                                        ...prev,
                                        cliente: { ...prev.cliente, nombre: e.target.value }
                                    }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Teléfono</label>
                                <input
                                    type="tel"
                                    className="w-full p-2 border rounded"
                                    value={pedido.cliente?.telefono || '3332233'}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => setStep(2)}
                        className="btn-primary mt-4"
                    >
                        Siguiente
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <div className="form-group">
                        <label className="block mb-2 font-medium">Buscar Producto</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg"
                            placeholder="Nombre del producto"
                        />
                    </div>

                    <div className="form-group">
                        <label className="block mb-2 font-medium">Filtrar por Categoría</label>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={categoriaSeleccionada}
                            onChange={e => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option value="">Todas</option>
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productosFiltrados.map(producto => {
                            const productoEnPedido = pedido.productos.find(p => p.id_producto === producto.id_producto);
                            const cantidadActual = productoEnPedido ? productoEnPedido.cantidad : 1;

                            return (
                                <div key={producto.id_producto} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{producto.nombre}</h4>
                                            <p className="text-gray-600">${producto.precio}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="1"
                                                max={producto.stock}
                                                value={cantidadActual}
                                                className="w-20 p-1 border rounded"
                                                onChange={(e) => handleCantidadChange(producto, parseInt(e.target.value))}
                                            />
                                            <button
                                                onClick={() => handleAgregarProducto(producto, cantidadActual)}
                                                className="btn-secondary"
                                                type="button"
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {pedido.productos.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg mt-6">
                            <h3 className="font-medium mb-2">Productos en el pedido</h3>
                            <ul className="space-y-2">
                                {pedido.productos.map(prod => (
                                    <li key={prod.id_producto} className="flex justify-between items-center">
                                        <span>{prod.nombre} x {prod.cantidad}</span>
                                        <span className="text-gray-600">${prod.subtotal}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-end mt-4 font-bold">
                                Subtotal: ${pedido.productos.reduce((sum, p) => sum + p.subtotal, 0)}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <button onClick={() => setStep(1)} className="btn-secondary">
                            Anterior
                        </button>
                        <button onClick={() => setStep(3)} className="btn-primary">
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-4">Resumen del Pedido</h3>

                        <div className="space-y-3">
                            {pedido.productos.map(producto => (

                                <div key={producto.id_producto} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{producto.nombre}</p>
                                        <p className="text-sm text-gray-600">
                                            {producto.cantidad} x ${producto.precio}
                                        </p>
                                    </div>
                                    <p className="font-medium">${producto.subtotal}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${calcularTotal()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block mb-2 font-medium">Dirección de Envío</label>
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                value={pedido.direccion_envio}
                                onChange={(e) => setPedido(prev => ({ ...prev, direccion_envio: e.target.value }))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block mb-2 font-medium">Método de Pago</label>
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={pedido.metodo_pago}
                                onChange={(e) => setPedido(prev => ({ ...prev, metodo_pago: e.target.value }))}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Tarjeta">Tarjeta</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(2)} className="btn-secondary">
                            Anterior
                        </button>
                        <button type="submit" className="btn-primary">
                            Confirmar Pedido
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CrearPedido;