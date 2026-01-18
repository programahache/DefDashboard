import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft, Printer, Download, Share2, Edit, Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, ShoppingBag, History, AlertCircle, MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { getPedidosDetallesById, actualizarEstadoPedido } from "../../../utils/pedidos"

function getStatusColor(estado) {
  switch ((estado || "").toLowerCase()) {
    case "pendiente": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "confirmado": return "bg-blue-100 text-blue-800 border-blue-300"
    case "en preparación": return "bg-blue-100 text-blue-800 border-blue-300"
    case "en camino": return "bg-purple-100 text-purple-800 border-purple-300"
    case "completado": return "bg-green-100 text-green-800 border-green-300"
    case "cancelado": return "bg-red-100 text-red-800 border-red-300"
    default: return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const pedidoInicial = {
  id_pedido_online: "",
  id_cliente: "",
  cliente_nombre: "",
  total: "0",
  estado: "",
  direccion_envio: "",
  metodo_pago: "",
  fecha_pedido: "",
  productos: [],
  notas: "Sin notas adicionales"
  // Puedes agregar aquí más campos si tu backend los agrega después
}

export default function PedidoDetalleVisual() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [pedido, setPedido] = useState(pedidoInicial)
  const [nuevoEstado, setNuevoEstado] = useState("")
  const [comentarioEstado, setComentarioEstado] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPedido() {
      setLoading(true)
      try {
        const data = await getPedidosDetallesById(id)
        setPedido({ ...pedidoInicial, ...data }) // Así siempre tienes todos los campos
      } catch (error) {
        setPedido(pedidoInicial)
      }
      setLoading(false)
    }
    fetchPedido()
  }, [id])

  const handlePrint = () => window.print()
  const handleActualizarEstado = async () => {
    if (nuevoEstado && pedido) {
      try {
        await actualizarEstadoPedido(pedido.id_pedido_online, nuevoEstado, comentarioEstado)
        setPedido(prev => ({
          ...prev,
          estado: nuevoEstado,
          historial_estados: [
            ...(prev.historial_estados || []),
            {
              estado: nuevoEstado,
              fecha: new Date().toISOString(),
              usuario: "Admin",
              comentario: comentarioEstado
            }
          ]
        }))
        setComentarioEstado("")
        setNuevoEstado("")
        // Opcional: mostrar un mensaje de éxito
        // toast.success("Estado actualizado correctamente")
      } catch (error) {
        // Opcional: mostrar un mensaje de error
        // toast.error("Error al actualizar el estado")
        console.error("Error al actualizar el estado:", error)
      }
    }
  }
  const calcularProgresoEntrega = () => {
    switch ((pedido?.estado || "").toLowerCase()) {
      case "pendiente": return 0
      case "en preparación": return 25
      case "en camino": return 50
      case "completado": return 100
      default: return 0
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando pedido...</div>
  }
  if (!pedido) {
    return <div className="p-8 text-center text-red-500">No se encontró el pedido.</div>
  }

  // Valores quemados para los campos que no llegan
  const cliente_telefono = "3123456789"
  const cliente_email = "cliente@ejemplo.com"
  const notas = "Sin notas adicionales"
  const repartidor = {
    nombre: "Carlos Motero",
    telefono: "3001234567",
    foto: "",
  }
  const historial_estados = [
    { estado: "Pendiente", fecha: pedido.fecha_pedido, usuario: "Admin", comentario: "Pedido recibido" },
    { estado: pedido.estado, fecha: pedido.fecha_pedido, usuario: "Sistema", comentario: "" }
  ]

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/pedidos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Pedido #{pedido.id_pedido_online}</h1>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {pedido.fecha_pedido
                  ? new Date(pedido.fecha_pedido).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            <span>Imprimir</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
          <Button size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            <span>Editar</span>
          </Button>
        </div>
      </div>

      {/* Estado y progreso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge className={`px-3 py-1 text-sm border ${getStatusColor(pedido.estado)}`}>{pedido.estado}</Badge>
              {/* Simulado */}
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  Entrega estimada:{" "}
                  {pedido.fecha_pedido
                    ? new Date(pedido.fecha_pedido).toLocaleTimeString("es-CO", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="border rounded px-2 py-1"
              value={nuevoEstado}
              onChange={e => setNuevoEstado(e.target.value)}
            >
              <option value="">Cambiar estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="En preparación">En preparación</option>
              <option value="En camino">En camino</option>
              <option value="Completado">Completado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
            <Button
              onClick={handleActualizarEstado}
              disabled={!nuevoEstado}
              className="bg-green-600 hover:bg-green-700"
            >
              Actualizar
            </Button>
          </div>
        </div>
        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Pedido recibido</span>
            <span>Completado</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${calcularProgresoEntrega()}%`, transition: "width 0.3s" }}
            />
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna izquierda - Detalles del pedido */}
        <div className="md:col-span-2 space-y-6">
          {/* Productos */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Productos</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {(pedido.productos?.length || 0)} {(pedido.productos?.length === 1 ? "producto" : "productos")}
                </Badge>
              </div>
              <CardDescription>Detalle de los productos ordenados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(pedido.productos || []).map((producto, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    {/* Imagen simulada */}
                    <div className="w-16 h-16 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-gray-400">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                          <p className="text-sm text-gray-500">${Number(producto.precio_unitario).toFixed(2)} por unidad</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-blue-100 text-blue-800 font-medium rounded-full w-7 h-7 flex items-center justify-center">
                            {producto.cantidad}
                          </div>
                          <p className="font-medium text-gray-900 mt-1">${Number(producto.subtotal).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="pt-4">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal:</span>
                  <span>
                    $
                    {pedido.productos
                      .reduce((sum, p) => sum + Number(p.subtotal), 0)
                      .toFixed(2)}
                  </span>
                </div>
                {/* No hay descuento/envio/impuestos en el ejemplo, puedes agregar si tu backend lo trae */}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${Number(pedido.total).toFixed(2)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Pestañas para información adicional */}
          <Tabs defaultValue="historial" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="historial">Historial</TabsTrigger>
              <TabsTrigger value="notas">Notas</TabsTrigger>
              <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
            </TabsList>
            <TabsContent value="historial" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de estados</CardTitle>
                  <CardDescription>Seguimiento de cambios en el pedido</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {historial_estados && historial_estados.length > 0 ? (
                      <div className="relative">
                        {/* Línea vertical para la cronología */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        {historial_estados.map((item, index) => (
                          <div key={index} className="flex gap-4 relative pb-8">
                            <div className="z-10 flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                              {/* Icono de estado */}
                              <span className="block w-3 h-3 bg-blue-500 rounded-full"></span>
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                <h4 className="font-medium text-gray-900">{item.estado}</h4>
                                <span className="text-sm text-gray-500">
                                  {new Date(item.fecha).toLocaleString("es-CO", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Por: {item.usuario}</p>
                              {item.comentario && (
                                <p className="text-sm bg-gray-50 p-2 rounded mt-2 border border-gray-100">
                                  {item.comentario}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">No hay historial de estados disponible</div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                  <p className="text-sm text-gray-500 mb-2">Añadir comentario al cambiar estado:</p>
                  <Textarea
                    placeholder="Escribe un comentario sobre el cambio de estado..."
                    value={comentarioEstado}
                    onChange={(e) => setComentarioEstado(e.target.value)}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notas" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notas del pedido</CardTitle>
                  <CardDescription>Instrucciones especiales y comentarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-gray-700">{pedido.notas}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Añadir nota
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="mensajes" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Mensajes</CardTitle>
                  <CardDescription>Comunicación con el cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>No hay mensajes para este pedido</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Enviar mensaje al cliente
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Columna derecha - Información del cliente y entrega */}
        <div className="space-y-6">
          {/* Información del cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Información del cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Nombre</p>
                  <p className="font-medium">{pedido.cliente_nombre}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-medium">{cliente_telefono}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{cliente_email}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>Llamar</span>
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mensaje</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
          {/* Información de entrega */}
          <Card>
            <CardHeader>
              <CardTitle>Detalles de entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Dirección de entrega</p>
                  <p className="font-medium">{pedido.direccion_envio}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Método de pago</p>
                  <p className="font-medium">{pedido.metodo_pago}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Tiempo estimado de entrega</p>
                  <p className="font-medium">
                    {pedido.fecha_pedido
                      ? new Date(pedido.fecha_pedido).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : ""}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Ver en mapa</span>
              </Button>
            </CardFooter>
          </Card>
          {/* Información del repartidor */}
          <Card>
            <CardHeader>
              <CardTitle>Repartidor asignado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                  {repartidor.nombre.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{repartidor.nombre}</p>
                  <p className="text-sm text-gray-500">{repartidor.telefono}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>Llamar</span>
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mensaje</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
          {/* Acciones adicionales */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBag className="h-4 w-4 mr-2" />
                <span>Duplicar pedido</span>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <History className="h-4 w-4 mr-2" />
                <span>Ver historial del cliente</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>Cancelar pedido</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}