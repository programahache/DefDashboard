import React from 'react'
import hamburguesa from '../../assets/hamburguesa.png'
import PedidosTable from '../../components/Pedidos/PedidosTable'

//FUCNIONES 
import { useState, useEffect } from 'react'
import { getPedidosDetalles } from '../../../utils/pedidos'
import PedidosPorProductoList from '../../components/Pedidos/PedidosPorProductoList'
const ejemploPedido = [
    {
        "id_pedido_online": 1,
        "id_cliente": 1,
        "cliente_nombre": "Juan",
        "total": "250.00",
        "estado": "Pendiente",
        "direccion_envio": "Calle Falsa 123, Ciudad",
        "metodo_pago": "Tarjeta",
        "fecha_pedido": "2025-05-11T00:10:26.000Z",
        "id_producto": 23,
        "producto_nombre": "Clapton",
        "cantidad": 2,
        "precio_unitario": "50.00",
        "subtotal": "100.00"
    },
    {
        "id_pedido_online": 1,
        "id_cliente": 1,
        "cliente_nombre": "Juan",
        "total": "250.00",
        "estado": "Pendiente",
        "direccion_envio": "Calle Falsa 123, Ciudad",
        "metodo_pago": "Tarjeta",
        "fecha_pedido": "2025-05-11T00:10:26.000Z",
        "id_producto": 24,
        "producto_nombre": "Pizza trifasica",
        "cantidad": 1,
        "precio_unitario": "150.00",
        "subtotal": "150.00"
    },
    {
        "id_pedido_online": 2,
        "id_cliente": 2,
        "cliente_nombre": "María",
        "total": "150.00",
        "estado": "Completado",
        "direccion_envio": "Avenida Siempre Viva 742, Ciudad",
        "metodo_pago": "PayPal",
        "fecha_pedido": "2025-05-11T00:10:26.000Z",
        "id_producto": 25,
        "producto_nombre": "Ensalada César",
        "cantidad": 3,
        "precio_unitario": "50.00",
        "subtotal": "150.00"
    },
    {
        "id_pedido_online": 3,
        "id_cliente": 3,
        "cliente_nombre": "Carlos",
        "total": "300.00",
        "estado": "Enviado",
        "direccion_envio": "Boulevard Principal 456, Ciudad",
        "metodo_pago": "Tarjeta",
        "fecha_pedido": "2025-05-11T00:10:26.000Z",
        "id_producto": 26,
        "producto_nombre": "Jugo de Naranja",
        "cantidad": 1,
        "precio_unitario": "100.00",
        "subtotal": "100.00"
    },
    {
        "id_pedido_online": 3,
        "id_cliente": 3,
        "cliente_nombre": "Carlos",
        "total": "300.00",
        "estado": "Enviado",
        "direccion_envio": "Boulevard Principal 456, Ciudad",
        "metodo_pago": "Tarjeta",
        "fecha_pedido": "2025-05-11T00:10:26.000Z",
        "id_producto": 27,
        "producto_nombre": "Pizza Margarita",
        "cantidad": 2,
        "precio_unitario": "100.00",
        "subtotal": "200.00"
    }
]

function admin() {


    return (
        <div className='px-5'>
            {/* <PedidosPorProductoList /> */}
            <PedidosTable />
        </div>
    )
}

export default admin