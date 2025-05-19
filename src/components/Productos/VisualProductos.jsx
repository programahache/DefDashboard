import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ShoppingBag, BarChart2, Plus, Search, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function VisualProductos({ data }) {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoriaFilter, setCategoriaFilter] = useState("todos")
    const [viewMode, setViewMode] = useState("grid")

    useEffect(() => {
        if (!data) return
        setProductos(data)
        setLoading(false)
    }, [data])

    // Extrae categorías únicas
    const categorias = [...new Set(productos.map((p) => p.categoria))].filter(Boolean)

    // Filtro por búsqueda y categoría
    const filteredProductos = productos.filter((producto) => {
        const matchCategoria = categoriaFilter === "todos" || producto.categoria === categoriaFilter
        const matchSearch =
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (producto.descripcion && producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchCategoria && matchSearch
    })

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            {/* Cabecera con título y acciones */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Administrador de Cocina</h1>
                    <p className="text-gray-500">Gestiona productos, ingredientes y preparaciones</p>
                    <span className="mt-2 inline-block text-sm font-semibold text-gray-700">
                        Total de productos: {filteredProductos.length}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className="flex items-center gap-1"
                    >
                        <Filter className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        <span>Actualizar</span>
                    </Button>
                    <Link to="/admin/cocina/inventario">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ShoppingBag className="h-4 w-4" />
                            <span>Inventario</span>
                        </Button>
                    </Link>
                    <Link to="/admin/cocina/estadisticas">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <BarChart2 className="h-4 w-4" />
                            <span>Estadísticas</span>
                        </Button>
                    </Link>
                    <Link to="/productos/crear">
                        <Button size="sm" className="flex items-center gap-1 bg-red-500 text-white">
                            <Plus className="h-4 w-4" />
                            <span>Crear Producto</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar productos por nombre o descripción..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todas las categorías</SelectItem>
                                    {categorias.map((cat) => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                variant={viewMode === "grid" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("grid")}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect width="7" height="7" x="3" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="14" rx="1" />
                                    <rect width="7" height="7" x="3" y="14" rx="1" />
                                </svg>
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="icon"
                                onClick={() => setViewMode("list")}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                            </Button>
                        </div>
                    </div>

                    {/* Grid de productos */}
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {loading ? (
                                <p className="text-gray-500 col-span-4">Cargando...</p>
                            ) : filteredProductos.length > 0 ? (
                                filteredProductos.map((producto, key) => (
                                    <Card key={key} className="p-4 flex flex-col gap-2">
                                        <img
                                            src={producto.imagen || "/placeholder.svg"}
                                            alt={producto.nombre}
                                            className="w-full h-40 object-cover rounded mb-2"
                                        />
                                        <div className="font-bold text-lg">{producto.nombre}</div>
                                        <div className="text-sm text-gray-500">{producto.categoria}</div>
                                        <div className="text-xs text-gray-400">{producto.descripcion}</div>
                                        <div className="font-bold text-green-700">${producto.precio}</div>
                                        <Badge variant="outline">{producto.estado}</Badge>
                                        <div className="flex gap-2 mt-2">
                               
                                             <Link to={`/productos/editar/${producto.id_producto}`}>
                                                <Button size="icon" variant="outline" title="Ver"  >
                                                   <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link to={`/productos/editar/${producto.id_producto}`}>
                                                <Button size="icon" variant="outline" title="Editar" className="text-blue-500 hover:text-blue-700" >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button size="icon" variant="outline" title="Eliminar" className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="col-span-4 text-center py-12 text-gray-500">
                                    No se encontraron productos con los filtros seleccionados
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Categoría
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Precio
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProductos.length > 0 ? (
                                        filteredProductos.map((producto, key) => (
                                            <tr key={key} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                                                    <img
                                                        src={producto.imagen || "/placeholder.svg"}
                                                        alt={producto.nombre}
                                                        className="h-10 w-10 rounded object-cover"
                                                    />
                                                    <span>{producto.nombre}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{producto.categoria}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">${producto.precio}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant="outline">{producto.estado}</Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        <Button size="icon" variant="outline" title="Ver">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="outline" title="Editar">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="icon" variant="outline" title="Eliminar" className="text-red-500 hover:text-red-700">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                No se encontraron productos con los filtros seleccionados
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VisualProductos