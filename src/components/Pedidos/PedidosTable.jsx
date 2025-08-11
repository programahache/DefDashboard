import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RefreshCw, Plus, Search, Filter, Calendar, Eye, MoreHorizontal, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { actualizarEstadoPedido, getPedidosPaginados } from '../../../utils/pedidos'

function getStatusColor(estado) {
  switch (estado?.toLowerCase()) {
    case "pendiente":
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "completado":
      return "bg-green-100 text-green-800 border-green-300"
    case "enviado":
      return "bg-blue-100 text-blue-800 border-blue-300"
    case "cancelado":
      return "bg-red-100 text-red-800 border-red-300"
    default:
      return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

function PedidosTable({fetchData}) {
  const [pedidos, setPedidos] = useState([])
  const [filteredPedidos, setFilteredPedidos] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [dateFilter, setDateFilter] = useState("todos")
  const [viewMode, setViewMode] = useState("tabla")
  const itemsPerPage = 10

  useEffect(() => {
    const fetchPedidos = async () => {
      setLoading(true)
      try {
        const data = await getPedidosPaginados(currentPage, itemsPerPage)
        setPedidos(data.pedidos || [])
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        setPedidos([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    fetchPedidos()
    
  }, [currentPage])

  useEffect(() => {
    let result = [...pedidos]
    if (searchTerm) {
      result = result.filter(
        (pedido) =>
          pedido.id_pedido_online?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pedido.cliente_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pedido.direccion_envio?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (statusFilter !== "todos") {
      result = result.filter((pedido) => pedido.estado?.toLowerCase() === statusFilter.toLowerCase())
    }
    if (dateFilter === "hoy") {
      const today = new Date().toISOString().split("T")[0]
      result = result.filter((pedido) => pedido.fecha_pedido?.startsWith(today))
    }
    setFilteredPedidos(result)
  }, [searchTerm, statusFilter, dateFilter, pedidos])

  const handleEstadoChange = async (id, nuevoEstado) => {
    const res = await actualizarEstadoPedido(id, nuevoEstado)
    if (res.error) return
    setPedidos(prevPedidos =>
      prevPedidos.map(pedido =>
        pedido.id_pedido_online === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    )
    fetchData()
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex gap-2 w-full justify-end">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Actualizar</span>
          </Button> */}
          <Link to="/pedidos/crear">
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Nuevo Pedido</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, cliente o dirección..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="enviado">Enviado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="hoy">Hoy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Mostrando <span className="font-medium">{filteredPedidos.length}</span> pedidos
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={viewMode === "tabla" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("tabla")}
              >
                Tabla
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={viewMode === "tarjetas" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("tarjetas")}
              >
                Tarjetas
              </Button>
            </div>
          </div>

          {viewMode === "tabla" ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">ID</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Estado</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Método de pago</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Fecha</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Dirección</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Total</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-500">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPedidos.length > 0 ? (
                    filteredPedidos.map((pedido, key) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{pedido.id_pedido_online}</td>
                        <td className="px-4 py-3">
                          <Select
                            value={pedido.estado?.toLowerCase()}
                            onValueChange={nuevoEstado => handleEstadoChange(pedido.id_pedido_online, nuevoEstado)}
                          >
                            <SelectTrigger className={`w-[140px] border ${getStatusColor(pedido.estado)}`}>
                              <SelectValue>{pedido.estado}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendiente">Pendiente</SelectItem>
                              <SelectItem value="completado">Completado</SelectItem>
                              <SelectItem value="enviado">Enviado</SelectItem>
                              <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">{pedido.metodo_pago}</td>
                        <td className="px-4 py-3">
                          {new Date(pedido.fecha_pedido).toLocaleString("es-CO", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-3">{pedido.direccion_envio}</td>
                        <td className="px-4 py-3">${Number(pedido.total).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link to={`/pedido/${pedido.id_pedido_online}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Printer className="h-4 w-4 mr-2" />
                                  <span>Imprimir</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  <span>Exportar</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No se encontraron pedidos con los filtros seleccionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPedidos.length > 0 ? (
                filteredPedidos.map((pedido, key) => (
                  <div key={key} className="bg-white border rounded-lg shadow p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-lg">{pedido.id_pedido_online}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(pedido.fecha_pedido).toLocaleString("es-CO", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <Badge className={`border ${getStatusColor(pedido.estado)}`}>{pedido.estado}</Badge>
                    </div>
                    <div className="text-sm text-gray-700">{pedido.cliente_nombre}</div>
                    <div className="text-xs text-gray-500 truncate">{pedido.direccion_envio}</div>
                    <div className="font-bold text-blue-700">${Number(pedido.total).toFixed(2)}</div>
                    <div className="flex gap-2 mt-2">
                      <Link to={`/pedido/${pedido.id_pedido_online}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="ml-1">Ver detalles</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  No se encontraron pedidos con los filtros seleccionados
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Mostrando {filteredPedidos.length} de {pedidos.length} pedidos
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="px-2">{currentPage} / {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PedidosTable