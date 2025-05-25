import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { getClientesById, eliminarCliente, getPedidosByCliente } from "../../../utils/clientes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    ArrowLeft, Edit, Trash2, User, ShoppingBag, Phone, Mail, MapPin, FileText, Calendar, Clock, DollarSign, ChevronRight
} from "lucide-react"
// Importa tu AlertDialog según tu librería
// import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

const ESTADO_PEDIDO_COLORS = {
    completado: "bg-green-100 text-green-800",
    preparando: "bg-blue-100 text-blue-800",
    pendiente: "bg-yellow-100 text-yellow-800",
    enviado: "bg-purple-100 text-purple-800",
    cancelado: "bg-red-100 text-red-800",
    // agrega más estados si los tienes
};

export default function ClienteDetalle() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [cliente, setCliente] = useState(null)
    const [pedidos, setPedidos] = useState([]) // Simula o carga los pedidos del cliente
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        getClientesById(id).then(data => setCliente(data))
        // Aquí podrías cargar los pedidos del cliente si tienes endpoint
        getPedidosByCliente(id).then(setPedidos)
    }, [id])

    const handleEliminar = async () => {
        await eliminarCliente(id)
        navigate("/admin/clientes")
    }

    if (!cliente) {
        return <div className="text-center py-12">Cargando...</div>
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <Link to="/clientes">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{cliente.nombre}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{cliente.cantidad_pedidos} pedidos</Badge>
                            <span className="text-gray-500 text-sm">
                                Cliente desde {new Date(cliente.fecha_registro).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link to={`/clientes/${cliente.id_cliente}/editar`}>
                        <Button variant="outline" className="flex items-center gap-1">
                            <Edit className="h-4 w-4" />
                            <span>Editar</span>
                        </Button>
                    </Link>
                    {/* Reemplaza este AlertDialog por el de tu UI */}
                    <Button variant="destructive" className="flex items-center gap-1" onClick={() => setDialogOpen(true)}>
                        <Trash2 className="h-4 w-4" />
                        <span>Eliminar</span>
                    </Button>
                    {dialogOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                                <h2 className="text-lg font-bold mb-2">¿Estás seguro?</h2>
                                <p className="mb-4">
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente el cliente &quot;{cliente.nombre}&quot; y todos sus datos asociados.
                                </p>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleEliminar}>Eliminar</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contenido principal */}
            <Tabs defaultValue="informacion" className="w-full">
                <TabsList className="mb-6 grid grid-cols-2 md:w-fit">
                    <TabsTrigger value="informacion" className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span className="hidden md:inline">Información</span>
                    </TabsTrigger>
                    <TabsTrigger value="pedidos" className="flex items-center gap-1">
                        <ShoppingBag className="h-4 w-4" />
                        <span className="hidden md:inline">Pedidos</span>
                    </TabsTrigger>
                </TabsList>

                {/* Pestaña de información */}
                <TabsContent value="informacion" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Información de contacto</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Teléfono</div>
                                        <div className="text-gray-700">{cliente.telefono}</div>
                                    </div>
                                </div>
                                {cliente.email && (
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 mr-3 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Email</div>
                                            <div className="text-gray-700">{cliente.email}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium">Dirección</div>
                                        <div className="text-gray-700">{cliente.direccion}</div>
                                    </div>
                                </div>
                                {cliente.notas && (
                                    <div className="flex items-start">
                                        <FileText className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Notas</div>
                                            <div className="text-gray-700">{cliente.notas}</div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Resumen de actividad</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Fecha de registro</div>
                                        <div className="text-gray-700">{new Date(cliente.fecha_registro).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <ShoppingBag className="h-5 w-5 mr-3 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Total de pedidos</div>
                                        <div className="text-gray-700">{cliente.cantidad_pedidos} pedidos realizados</div>
                                    </div>
                                </div>
                                {cliente.ultimo_pedido && (
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 mr-3 text-gray-500" />
                                        <div>
                                            <div className="font-medium">Último pedido</div>
                                            <div className="text-gray-700">{new Date(cliente.ultimo_pedido).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <DollarSign className="h-5 w-5 mr-3 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Gasto total</div>
                                        <div className="text-gray-700">
                                            ${cliente.gasto_total ? Number(cliente.gasto_total).toFixed(2) : "0.00"}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Pestaña de pedidos */}
                <TabsContent value="pedidos" className="mt-0">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">Historial de pedidos</CardTitle>
                            <Link to={`/pedido/nuevo?cliente=${cliente.id_cliente}`}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Nuevo Pedido
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {Array.isArray(pedidos) && pedidos.filter(Boolean).length > 0 ? (
                                <div className="space-y-4">
                                    {pedidos.filter(Boolean).map((pedido) => {
                                        // Normaliza el estado para buscar el color
                                        const estadoKey = pedido && pedido.estado ? pedido.estado.trim().toLowerCase() : "";
                                        const badgeColor = ESTADO_PEDIDO_COLORS[estadoKey] || "bg-gray-100 text-gray-800";
                                        return (
                                            <Link to={`/pedido/${pedido && (pedido.id_pedido_online ?? pedido.id_pedido_online)}`} key={pedido && (pedido.id_pedido_online ?? pedido.id)}>
                                                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex flex-col md:flex-row justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-medium">
                                                                    Pedido #{pedido && (pedido.id_pedido_online ?? pedido.id)}
                                                                </h3>
                                                                <Badge className={badgeColor}>
                                                                    {pedido && pedido.estado
                                                                        ? pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)
                                                                        : "Desconocido"}
                                                                </Badge>
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-1">
                                                                {pedido && pedido.fecha_pedido
                                                                    ? new Date(pedido.fecha_pedido).toLocaleDateString()
                                                                    : "Sin fecha"}
                                                            </div>
                                                            <div className="mt-2">
                                                                <ul className="text-sm text-gray-600">
                                                                    {(pedido && Array.isArray(pedido.productos) ? pedido.productos : []).map((producto, index) => (
                                                                        <li key={index}>
                                                                            {producto.cantidad}x {producto.nombre}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 md:mt-0 text-right">
                                                            <div className="text-lg font-semibold">
                                                                ${Number(pedido && pedido.total ? pedido.total : 0).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
                                    <p className="text-gray-500 mb-6">Este cliente aún no ha realizado ningún pedido</p>
                                    <Link to={`/pedidos/nuevo?cliente=${cliente.id_cliente}`}>
                                        <Button className="bg-green-600 hover:bg-green-700">
                                            <ShoppingBag className="h-4 w-4 mr-2" />
                                            Crear Primer Pedido
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}