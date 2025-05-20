import React, { useEffect, useState } from "react"
import { getClientes } from "../../../utils/clientes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Link } from "react-router-dom"
import {
    UserPlus, Search, X, Filter, Phone, Mail, MapPin, FileText, ChevronRight
} from "lucide-react"

export default function ClientesList() {
    const [clientes, setClientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [filtroActivo, setFiltroActivo] = useState(false)
    const [ordenarPor, setOrdenarPor] = useState("nombre")

    useEffect(() => {
        getClientes().then(setClientes)
    }, [])

    const limpiarBusqueda = () => {
        setBusqueda("")
        setFiltroActivo(false)
    }

    // Filtrado y ordenamiento
    const clientesFiltrados = clientes.filter((c) => {
        const q = busqueda.toLowerCase()
        return (
            c.nombre?.toLowerCase().includes(q) ||
            c.telefono?.toLowerCase().includes(q) ||
            c.email?.toLowerCase().includes(q) ||
            c.direccion?.toLowerCase().includes(q)
        )
    })

    const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
        if (ordenarPor === "nombre") return a.nombre.localeCompare(b.nombre)
        if (ordenarPor === "pedidos") return (b.totalPedidos || 0) - (a.totalPedidos || 0)
        if (ordenarPor === "reciente") return new Date(b.ultimoPedido) - new Date(a.ultimoPedido)
        if (ordenarPor === "antiguo") return new Date(a.ultimoPedido) - new Date(b.ultimoPedido)
        return 0
    })

    return (
        <div className="container mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Clientes</h1>
                    <p className="text-gray-500">Gestiona tu base de clientes</p>
                </div>
                <Link href="/admin/clientes/nuevo">
                    <Button className="bg-green-600 hover:bg-green-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Nuevo Cliente
                    </Button>
                </Link>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Buscar por nombre, teléfono, email o dirección..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value)
                                setFiltroActivo(e.target.value !== "")
                            }}
                            className="pl-10"
                        />
                        {filtroActivo && (
                            <button
                                onClick={limpiarBusqueda}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <div className="w-full md:w-48">
                            <Select value={ordenarPor} onValueChange={setOrdenarPor}>
                                <SelectTrigger>
                                    <div className="flex items-center">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <span>Ordenar por</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nombre">Nombre (A-Z)</SelectItem>
                                    <SelectItem value="pedidos">Más pedidos</SelectItem>
                                    <SelectItem value="reciente">Pedido reciente</SelectItem>
                                    <SelectItem value="antiguo">Más antiguo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="space-y-4">
                {clientesOrdenados.length > 0 ? (
                    clientesOrdenados.map((cliente) => (
                        <Link to={`/clientes/${cliente.id_cliente}`} key={cliente.id_cliente}>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-lg font-semibold text-gray-800">{cliente.nombre}</h3>
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                                    {cliente.cantidad_pedidos || 0} pedidos
                                                </Badge>
                                            </div>
                                            <div className="mt-2 space-y-1">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                                    {cliente.telefono}
                                                </div>
                                                {cliente.email && (
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                                        {cliente.email}
                                                    </div>
                                                )}
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                                    {cliente.direccion}
                                                </div>
                                                {cliente.notas && (
                                                    <div className="flex items-start text-sm text-gray-600 mt-2">
                                                        <FileText className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                                                        <span className="line-clamp-1">{cliente.notas}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-4 md:mt-0">
                                            <div className="mr-2 text-right hidden md:block">
                                                {cliente.ultimo_pedido && (
                                                    <div className="text-sm text-gray-500">
                                                        <span className="font-medium">Último pedido:</span>
                                                        <div>{new Date(cliente.ultimo_pedido).toLocaleDateString()}</div>
                                                    </div>
                                                )}
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron clientes</h3>
                        <p className="text-gray-500 mb-6">
                            {filtroActivo ? "No hay clientes que coincidan con tu búsqueda" : "Comienza agregando tu primer cliente"}
                        </p>
                        {!filtroActivo && (
                            <Link href="/admin/clientes/nuevo">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Nuevo Cliente
                                </Button>
                            </Link>
                        )}
                        {filtroActivo && (
                            <Button variant="outline" onClick={limpiarBusqueda}>
                                Limpiar filtros
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}