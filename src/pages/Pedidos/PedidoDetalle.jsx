import { useState } from "react"
import { Clock, Printer, User, Phone, MapPin, CreditCard, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Utilidad para color de estado
function getStatusColor(estado) {
  switch (estado) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "Completado":
      return "bg-green-100 text-green-800 border-green-300"
    case "Enviado":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "Cancelado":
      return "bg-red-100 text-red-800 border-red-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

export default function PedidoDetalle({ pedido: pedidoProp }) {
  const [showDetails, setShowDetails] = useState(true)

  // Si no recibes pedido por props, usa uno de prueba:
  const pedido = pedidoProp || {
    id_pedido_online: "PED-001",
    fecha_pedido: "2025-05-15T14:30:00Z",
    cliente_nombre: "Juan Pérez",
    cliente_telefono: "3123456789",
    direccion_envio: "Calle Falsa 123, Ciudad",
    metodo_pago: "Tarjeta",
    estado: "Pendiente",
    productos: [
      {
        nombre: "Pizza Margarita",
        cantidad: 2,
        precio_unitario: 80,
        subtotal: 160,
        adiciones: "Extra queso, Aceitunas"
      },
      {
        nombre: "Jugo de Naranja",
        cantidad: 1,
        precio_unitario: 30,
        subtotal: 30,
        adiciones: ""
      }
    ],
    subtotal: 190,
    envio: 10,
    total: 200
  }

  const handlePrint = () => window.print()

  return (
    <div className="container mx-auto py-8 px-2 md:px-0">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-2xl">Pedido #{pedido.id_pedido_online}</h1>
              <div className="flex items-center mt-1 text-blue-100">
                <Clock className="h-4 w-4 mr-1" />
                <p className="text-sm">{new Date(pedido.fecha_pedido).toLocaleString("es-CO")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white"
                onClick={handlePrint}
              >
                <Printer className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Badge className={`mt-3 px-3 py-1 border ${getStatusColor(pedido.estado)}`}>{pedido.estado}</Badge>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {/* Información del cliente y envío */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800 text-lg">Detalles del pedido</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Mostrar
                  </>
                )}
              </Button>
            </div>

            {showDetails && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Cliente</p>
                      <p className="font-medium">{pedido.cliente_nombre}</p>
                    </div>
                  </div>
                  {pedido.cliente_telefono && (
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">{pedido.cliente_telefono}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Dirección de entrega</p>
                      <p className="font-medium">{pedido.direccion_envio}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Método de pago</p>
                      <p className="font-medium">{pedido.metodo_pago}</p>
                    </div>
                  </div>
                </div>
                {pedido.notas && (
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <p className="text-sm text-gray-500">Notas</p>
                    <p className="text-sm bg-white p-2 rounded border border-gray-200 mt-1">{pedido.notas}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Productos */}
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 text-lg mb-4">Productos</h2>
            <div className="bg-white rounded-lg border border-gray-200">
              {pedido.productos && pedido.productos.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {pedido.productos.map((prod, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3">
                            {prod.cantidad}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{prod.nombre}</p>
                            <p className="text-sm text-gray-500">${prod.precio_unitario} por unidad</p>
                            {prod.adiciones && (
                              <div className="mt-1 text-sm">
                                <span className="text-gray-500">Adiciones:</span>
                                <span className="ml-1 text-gray-700">{prod.adiciones}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-gray-800">${prod.subtotal}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No hay productos en este pedido.</div>
              )}
            </div>
          </div>

          {/* Totales */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${pedido.subtotal ? pedido.subtotal : "0.00"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Costo de envío:</span>
                <span>${pedido.envio ? pedido.envio : "0.00"}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total:</span>
                <span>${pedido.total ? pedido.total : "0.00"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              <span>Ver en mapa</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Actualizar estado</Button>
          </div>
        </div>
      </div>
    </div>
  )
}