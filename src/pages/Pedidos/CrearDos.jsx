"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Importa tus utilidades
import { getproductos } from "../../../utils/productos"
import { crearPedido } from "../../../utils/pedidos"

import hamburguesa from "../../assets/hamburguesa.png"

export default function CrearDos() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all")
  const [productosDisponibles, setProductosDisponibles] = useState([])

  const [pedido, setPedido] = useState({
    cliente: {
      id: 1,
      nombre: "",
      telefono: "3332233",
    },
    productos: [],
    direccion_envio: "",
    metodo_pago: "",
    detalles: "",
    estado: "Pendiente",
  })

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productos = await getproductos()
        setProductosDisponibles(productos)
      } catch (error) {
        console.error("Error al obtener productos:", error)
      }
    }
    fetchProductos()
  }, [])

  const categorias = [...new Set(productosDisponibles.map((p) => p.categoria))]

  const productosFiltrados = productosDisponibles.filter((producto) => {
    const matchesCategoria = categoriaSeleccionada === "all" ? true : producto.categoria === categoriaSeleccionada
    const matchesSearch = searchTerm ? producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) : true
    return matchesCategoria && matchesSearch
  })

  const handleAgregarProducto = (producto, cantidad) => {
    if (cantidad < 1) return

    setPedido((prev) => ({
      ...prev,
      productos: [
        ...prev.productos.filter((p) => p.id_producto !== producto.id_producto),
        {
          id_producto: producto.id_producto,
          nombre: producto.nombre,
          precio_unitario: producto.precio,
          cantidad: cantidad,
          subtotal: producto.precio * cantidad,
        },
      ],
    }))
  }

  const handleCantidadChange = (producto, cantidad) => {
    if (cantidad < 1) return

    setPedido((prev) => ({
      ...prev,
      productos: [
        ...prev.productos.filter((p) => p.id_producto !== producto.id_producto),
        {
          id_producto: producto.id_producto,
          nombre: producto.nombre,
          precio_unitario: producto.precio,
          cantidad: cantidad,
          subtotal: producto.precio * cantidad,
        },
      ],
    }))
  }

  const handleRemoveProducto = (idProducto) => {
    setPedido((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.id_producto !== idProducto),
    }))
  }

  const calcularTotal = () => {
    return pedido.productos.reduce((sum, p) => sum + p.subtotal, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevoPedido = {
      id_cliente: pedido.cliente.id,
      estado: pedido.estado,
      direccion_envio: pedido.direccion_envio,
      metodo_pago: pedido.metodo_pago,
      detalles: pedido.productos,
    }

    try {
      const response = await crearPedido(nuevoPedido)
      console.log("Pedido creado:", response)
      navigate("/pedidos")
    } catch (error) {
      console.error("Error al crear el pedido:", error)
    }
  }

  return (
    <div className="w-full h-fit mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Nuevo Pedido</h1>

      <div className="flex gap-4 mb-6">
        <div className={`w-1/3 p-2 text-center ${step === 1 ? "bg-blue-100" : "bg-gray-100"} rounded`}>
          Paso 1: Cliente
        </div>
        <div className={`w-1/3 p-2 text-center ${step === 2 ? "bg-blue-100" : "bg-gray-100"} rounded`}>
          Paso 2: Productos
        </div>
        <div className={`w-1/3 p-2 text-center ${step === 3 ? "bg-blue-100" : "bg-gray-100"} rounded`}>
          Paso 3: Confirmación
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div className="form-group">
            <label className="block mb-2 font-medium">Buscar Cliente</label>
            <Input type="text" className="w-full" placeholder="Nombre o teléfono del cliente" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Información del Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Nombre</label>
                <Input
                  type="text"
                  className="w-full"
                  value={pedido.cliente?.nombre || ""}
                  onChange={(e) =>
                    setPedido((prev) => ({
                      ...prev,
                      cliente: { ...prev.cliente, nombre: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Teléfono</label>
                <Input
                  type="tel"
                  className="w-full"
                  value={pedido.cliente?.telefono || "3332233"}
                  onChange={(e) =>
                    setPedido((prev) => ({
                      ...prev,
                      cliente: { ...prev.cliente, telefono: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} className="mt-4">
              Siguiente <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Productos */}
            <div className="md:w-3/4">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    className="pl-10"
                    placeholder="Buscar platillo"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tabs de categorías */}
              <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                <Badge
                  variant={categoriaSeleccionada === "all" ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setCategoriaSeleccionada("all")}
                >
                  Todos
                </Badge>
                {categorias.map((cat) => (
                  <Badge
                    key={cat}
                    variant={categoriaSeleccionada === cat ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 whitespace-nowrap"
                    onClick={() => setCategoriaSeleccionada(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {productosFiltrados.map((producto) => {
                  const productoEnPedido = pedido.productos.find((p) => p.id_producto === producto.id_producto)
                  const cantidadActual = productoEnPedido ? productoEnPedido.cantidad : 1

                  return (
                    <div
                      key={producto.id_producto}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200"
                    >
                      {/* Imagen del producto */}
                      <div className="flex justify-center mb-2">
                        <img
                          src={producto.imagen || hamburguesa}
                          alt={producto.nombre}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg text-gray-800">{producto.nombre}</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Stock: {producto.stock}
                        </span>
                      </div>
                      <p className="text-gray-600 text-base mb-2">
                        <span className="font-bold text-green-600">${producto.precio}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-auto">
                        <Input
                          type="number"
                          min="1"
                          max={producto.stock}
                          value={cantidadActual}
                          className="w-20 p-1"
                          onChange={(e) => handleCantidadChange(producto, Number.parseInt(e.target.value) || 1)}
                        />
                        <Button
                          onClick={() => handleAgregarProducto(producto, cantidadActual)}
                          variant={productoEnPedido ? "secondary" : "default"}
                          type="button"
                          className="flex-1"
                        >
                          {productoEnPedido ? "Actualizar" : "Agregar"}
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {productosFiltrados.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    No se encontraron productos que coincidan con tu búsqueda
                  </div>
                )}
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg border shadow-sm p-4 sticky top-4">
                <div className="flex items-center mb-4">
                  <ShoppingBag className="mr-2 h-5 w-5 text-gray-600" />
                  <h3 className="font-medium">Tu pedido</h3>
                </div>

                {pedido.productos.length > 0 ? (
                  <>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
                      {pedido.productos.map((prod) => (
                        <div key={prod.id_producto} className="flex justify-between items-start group">
                          <div>
                            <div className="flex items-center">
                              <span className="font-medium">{prod.cantidad}x</span>
                              <span className="ml-2">{prod.nombre}</span>
                            </div>
                            <p className="text-sm text-gray-600">${prod.precio_unitario}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">${prod.subtotal}</span>
                            <button
                              onClick={() => handleRemoveProducto(prod.id_producto)}
                              className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${calcularTotal()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Costo de envío</span>
                        <span>$3.00</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(calcularTotal() + 3)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Tu pedido está vacío</p>
                    <p className="text-sm mt-2">Agrega algunos productos para continuar</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button onClick={() => setStep(1)} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={pedido.productos.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Continuar <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Resumen del Pedido</h3>

            <div className="space-y-3">
              {pedido.productos.map((producto) => (
                <div key={producto.id_producto} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{producto.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {producto.cantidad} x ${producto.precio_unitario}
                    </p>
                  </div>
                  <p className="font-medium">${producto.subtotal}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${calcularTotal()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block mb-2 font-medium">Dirección de Envío</label>
              <Textarea
                className="w-full min-h-[100px]"
                value={pedido.direccion_envio}
                onChange={(e) => setPedido((prev) => ({ ...prev, direccion_envio: e.target.value }))}
                required
              />
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium">Método de Pago</label>
              <Select
                value={pedido.metodo_pago}
                onValueChange={(value) => setPedido((prev) => ({ ...prev, metodo_pago: value }))}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="Efectivo">Efectivo</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between">
            <Button onClick={() => setStep(2)} variant="secondary" type="button">
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirmar Pedido
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
