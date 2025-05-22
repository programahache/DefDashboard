import React, { useState, useEffect } from 'react'
import { getCantidadPedidos, getCantidadPedidosCancelados, getCantidadPedidosEntregados } from '../../../utils/pedidos'
import { RefreshCw, Printer, ArrowUpRight, TrendingUp, DollarSign, ShoppingBag, BarChart3, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import PedidosTable from '../../components/Pedidos/PedidosTable'


const sucursales = ["Sucursal Centro", "Sucursal Norte", "Sucursal Sur"]
const canalesVenta = ["Mostrador", "App", "Teléfono", "Web"]

export default function AdminPedidos() {
    // Estados para filtros y métricas
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("todos")
    const [dateFilter, setDateFilter] = useState("todos")
    const [sucursalFilter, setSucursalFilter] = useState("todas")
    const [canalFilter, setCanalFilter] = useState("todos")
    const [metricas, setMetricas] = useState({
        totalVentas: 12500,
        totalPedidos: 120,
        ticketPromedio: 104.16,
        pedidosEntregados: 90,
        pedidosCancelados: 10,
    })

    // Saca fetchData fuera del useEffect
    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await getCantidadPedidos()
            const responseCancelados = await getCantidadPedidosCancelados()
            const responseEntregados = await getCantidadPedidosEntregados()
            setMetricas(prev => ({
                ...prev,
                totalPedidos: response,
                pedidosCancelados: responseCancelados,
                pedidosEntregados: responseEntregados
            }))
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Ahora el refresh llama a fetchData
    const handleRefresh = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [statusFilter, dateFilter, sucursalFilter, canalFilter])


    return (
        <div className="container mx-auto p-4 md:p-6">
            {/* Cabecera */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración de Pedidos</h1>
                    <p className="text-gray-500">Gestión completa de pedidos del restaurante</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="flex items-center gap-1"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        <span>Actualizar</span>
                    </Button>
                    <Button size="sm" className="flex items-center gap-1">
                        <Printer className="h-4 w-4" />
                        <span>Imprimir</span>
                    </Button>
                </div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Ventas Totales</CardDescription>
                        <CardTitle className="text-2xl flex items-center">
                            <DollarSign className="h-5 w-5 mr-1 text-green-500" />
                            {isLoading
                                ? <Loader2 className="animate-spin h-6 w-6 text-green-400" />
                                : `$${metricas.totalVentas.toFixed(2)}`
                            }
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-sm text-green-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+5.2% vs ayer</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Pedidos</CardDescription>
                        <CardTitle className="text-2xl flex items-center">
                            <ShoppingBag className="h-5 w-5 mr-1 text-blue-500" />
                            {isLoading
                                ? <Loader2 className="animate-spin h-6 w-6 text-blue-400" />
                                : metricas.totalPedidos
                            }
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Ticket Promedio</CardDescription>
                        <CardTitle className="text-2xl flex items-center">
                            <BarChart3 className="h-5 w-5 mr-1 text-purple-500" />
                            {isLoading
                                ? <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
                                : `$${metricas.ticketPromedio.toFixed(2)}`
                            }
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Pedidos Entregados</CardDescription>
                        <CardTitle className="text-2xl flex items-center">
                            <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
                            {isLoading
                                ? <Loader2 className="animate-spin h-6 w-6 text-green-400" />
                                : metricas.pedidosEntregados
                            }
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Pedidos Cancelados</CardDescription>
                        <CardTitle className="text-2xl flex items-center">
                            <XCircle className="h-5 w-5 mr-1 text-red-500" />
                            {isLoading
                                ? <Loader2 className="animate-spin h-6 w-6 text-red-400" />
                                : metricas.pedidosCancelados
                            }
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Panel principal de pedidos */}
            <PedidosTable
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                sucursalFilter={sucursalFilter}
                setSucursalFilter={setSucursalFilter}
                canalFilter={canalFilter}
                setCanalFilter={setCanalFilter}
                sucursales={sucursales}
                canalesVenta={canalesVenta}
            />
        </div>

    )
}