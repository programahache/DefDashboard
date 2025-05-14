import { useState, useEffect } from 'react'

import hamburguesa from '../../assets/hamburguesa.png'

function PedidosTable() {

    const [pedidos, setPedidos] = useState([
        {
            "id_pedido_online": 1,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 123, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T00:10:26.000Z"
        },
        {
            "id_pedido_online": 2,
            "id_cliente": 2,
            "total": "150.00",
            "estado": "Completado",
            "direccion_envio": "Avenida Siempre Viva 742, Ciudad",
            "metodo_pago": "PayPal",
            "fecha_pedido": "2025-05-11T00:10:26.000Z"
        },
        {
            "id_pedido_online": 3,
            "id_cliente": 3,
            "total": "300.00",
            "estado": "Enviado",
            "direccion_envio": "Boulevard Principal 456, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T00:10:26.000Z"
        },
        {
            "id_pedido_online": 4,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 123, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T19:32:38.000Z"
        },
        {
            "id_pedido_online": 5,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 222, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T19:33:27.000Z"
        },
        {
            "id_pedido_online": 6,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 222, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T19:33:48.000Z"
        },
        {
            "id_pedido_online": 7,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 222, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-11T19:34:17.000Z"
        },
        {
            "id_pedido_online": 8,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "Calle Falsa 222, Ciudad",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-13T21:42:07.000Z"
        },
        {
            "id_pedido_online": 12,
            "id_cliente": 1,
            "total": "587.00",
            "estado": "Pendiente",
            "direccion_envio": "cra",
            "metodo_pago": "Efectivo",
            "fecha_pedido": "2025-05-13T21:58:37.000Z"
        },
        {
            "id_pedido_online": 13,
            "id_cliente": 1,
            "total": "240.00",
            "estado": "Pendiente",
            "direccion_envio": "asd",
            "metodo_pago": "Tarjeta",
            "fecha_pedido": "2025-05-13T22:44:37.000Z"
        },
        {
            "id_pedido_online": 14,
            "id_cliente": 1,
            "total": "375.00",
            "estado": "Pendiente",
            "direccion_envio": "asd",
            "metodo_pago": "Efectivo",
            "fecha_pedido": "2025-05-13T22:55:53.000Z"
        },
        {
            "id_pedido_online": 15,
            "id_cliente": 1,
            "total": "250.00",
            "estado": "Pendiente",
            "direccion_envio": "afad",
            "metodo_pago": "Efectivo",
            "fecha_pedido": "2025-05-14T00:39:58.000Z"
        }
    ])
    const [loading, setLoading] = useState(false)



    console.log(pedidos.map((pedido) => pedido.id_pedido_online))

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className='text-gray-500'>Cargando pedidos...</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Metodo de pago
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Direccion
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Productos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pedidos.map((pedido) => (
                            <tr key={pedido.id_pedido_online} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {pedido.id_pedido_online}
                                </td>
                                <td className="px-6 py-4">
                                    {pedido.estado}
                                </td>
                                <td className="px-6 py-4">
                                    {pedido.metodo_pago}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(pedido.fecha_pedido).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    {pedido.direccion_envio}
                                </td>
                                <td className="px-6 py-4">
                                    {pedido.total}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={hamburguesa} alt="Hamburguesa" className="w-10 h-10 object-cover rounded-full" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PedidosTable