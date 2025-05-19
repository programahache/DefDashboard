import { useState } from 'react'
import { Clock, MapPin, CreditCard, ChevronRight } from "lucide-react"
import Modal from '../Modals/Modal'

function getStatusColor(estado) {
  switch (estado) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800"
    case "Completado":
      return "bg-green-100 text-green-800"
    case "Enviado":
      return "bg-blue-100 text-blue-800"
    case "Cancelado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function ListPedidosH({ nombre, pedido}) {
  const [isModal, setIsmodal] = useState(false)

//   const pedido = {
//     id_pedido_online: 17,
//     id_cliente: 1,
//     total: "627.00",
//     estado: "Completado",
//     direccion_envio: "Prueba 10",
//     metodo_pago: "Efectivo",
//     fecha_pedido: "2025-05-15T16:20:53.000Z"
//   }

  return (
    <>
      <div
        className="flex items-center justify-between bg-white rounded-xl shadow p-4 mb-3 hover:shadow-md transition cursor-pointer border border-gray-100"
        onClick={() => setIsmodal(true)}
      >
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(pedido.estado)}`}>
              {pedido.estado}
            </span>
            <span className="text-xs text-gray-400">#{pedido.id_pedido_online}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            {new Date(pedido.fecha_pedido).toLocaleString("es-CO")}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{pedido.direccion_envio}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4 mr-1" />
            {pedido.metodo_pago}
          </div>
        </div>
        <div className="flex flex-col items-end ml-4">
          <span className="font-bold text-lg text-blue-700">${Number(pedido.total).toFixed(2)}</span>
          <button
            onClick={e => { e.stopPropagation(); setIsmodal(true) }}
            className="mt-2 flex items-center gap-1 px-3 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold hover:bg-blue-200 transition"
          >
            Ver <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {isModal && (
        <Modal setIsmodal={setIsmodal} id_pedido_online={pedido.id_pedido_online} isModal={isModal} nombre={nombre} />
      )}
    </>
  )
}

export default ListPedidosH