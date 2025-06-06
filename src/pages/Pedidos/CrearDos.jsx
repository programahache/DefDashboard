"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, Search, ShoppingBag } from "lucide-react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"

// Importa tus utilidades
import { getproductos } from "../../../utils/productos"
import { crearPedido, actualizarEstadoPedido } from "../../../utils/pedidos"
import { getClientes } from "../../../utils/clientes"
import { getIngredientesByProducto, actualizarIngrediente } from '../../../utils/ingredientes';

import hamburguesa from "../../assets/hamburguesa.png"

export default function CrearDos() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all")
  const [productosDisponibles, setProductosDisponibles] = useState([])
  const [clientes, setClientes] = useState([])
  const [loadingClientes, setLoadingClientes] = useState(true)
  const [nota, setNota] = useState("") // Estado para la nota
  const [stockInsuficiente, setStockInsuficiente] = useState([]);
  const [errorStock, setErrorStock] = useState(null);

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

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes()
        setClientes(data)
        setLoadingClientes(false)
        // Si hay id por parámetro, selecciona ese cliente
        if (id) {
          const clientePorDefecto = data.find((c) => String(c.id_cliente) === String(id))
          if (clientePorDefecto) {
            setPedido((prev) => ({
              ...prev,
              cliente: clientePorDefecto,
            }))
          }
        }
      } catch (error) {
        setLoadingClientes(false)
        console.error("Error al obtener clientes:", error)
      }
    }
    fetchClientes()
  }, [id])

  const categorias = [...new Set(productosDisponibles.map((p) => p.categoria))]

  const productosFiltrados = productosDisponibles.filter((producto) => {
    const matchesCategoria = categoriaSeleccionada === "all" ? true : producto.categoria === categoriaSeleccionada
    const matchesSearch = searchTerm ? producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) : true
    return matchesCategoria && matchesSearch
  })

  const handleAgregarProducto = async (producto, cantidad) => {
    if (cantidad < 1) return

    const ingredientesRequeridos = await getIngredientesByProducto(producto.id);
  
    const faltantes = [];
    for (const ingrediente of ingredientesRequeridos) {
      const stockNecesario = producto.ingredientes.find(i => i.id === ingrediente.id)?.cantidad || 0;
      
      if (ingrediente.stock < stockNecesario) {
        faltantes.push({
          ...ingrediente,
          requerido: stockNecesario
        });
      }
    }

    if (faltantes.length > 0) {
      setStockInsuficiente(faltantes);
      setErrorStock(`Stock insuficiente para: ${faltantes.map(f => f.nombre).join(', ')}`);
      return;
    }

    try {
      for (const ingrediente of ingredientesRequeridos) {
        await actualizarIngrediente(
          ingrediente.id, 
          -producto.ingredientes.find(i => i.id === ingrediente.id).cantidad
        );
      }
      
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
      setErrorStock(null);
    } catch (error) {
      toast.error('Error actualizando stock');
    }
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
      id_cliente: pedido.cliente.id_cliente,
      estado: pedido.estado,
      direccion_envio: pedido.direccion_envio,
      metodo_pago: pedido.metodo_pago,
      detalles: pedido.productos,
      notas: nota, // Incluye la nota al crear el pedido
    }

    try {
      const response = await crearPedido(nuevoPedido)
      toast("Pedido creado y confirmado exitosamente", {
        description: "El pedido ha sido creado y confirmado.",
        duration: 3000,
        icon: "✅",
        style: {
          backgroundColor: "#f0f4f8",
          color: "#333",
        },
      })
      navigate("/pedidos")
    } catch (error) {
      toast.error("Error al crear el pedido", {
        description: "Hubo un problema al crear el pedido. Por favor, intenta nuevamente.",
        duration: 3000,
        icon: "❌",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      })
      console.error("Error al crear el pedido:", error)
    }
  }

  return (
    <div className="w-full h-fit mx-auto p-6 bg-white rounded-xl shadow-lg">
        <Button variant="ghost" size="icon" onClick={() => navigate("/pedidos")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
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

      {errorStock && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <h4 className="font-semibold">Problemas de stock</h4>
          </div>
          <div className="mt-2 grid gap-2">
            {stockInsuficiente.map((item) => (
              <div key={item.id} className="text-sm">
                <span className="font-medium">{item.nombre}:</span>
                <span> Necesario {item.requerido}{item.unidad}</span>
                <span> | Disponible {item.stock}{item.unidad}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Información del Cliente */}
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Información del Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
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
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <Input
                      type="tel"
                      className="w-full"
                      value={pedido.cliente?.telefono || ""}
                      onChange={(e) =>
                        setPedido((prev) => ({
                          ...prev,
                          cliente: { ...prev.cliente, telefono: e.target.value },
                        }))
                      }
                      placeholder="Ej. 3331234567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                    <Input
                      type="email"
                      className="w-full"
                      value={pedido.cliente?.email || ""}
                      onChange={(e) =>
                        setPedido((prev) => ({
                          ...prev,
                          cliente: { ...prev.cliente, email: e.target.value },
                        }))
                      }
                      placeholder="Ej. cliente@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección predeterminada</label>
                    <Input
                      type="text"
                      className="w-full"
                      value={pedido.direccion_envio || ""}
                      onChange={(e) =>
                        setPedido((prev) => ({
                          ...prev,
                          direccion_envio: e.target.value,
                        }))
                      }
                      placeholder="Ej. Calle Principal #123"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <input type="checkbox" id="guardar-cliente" className="rounded text-green-600 focus:ring-green-500" />
                  <label htmlFor="guardar-cliente" className="text-sm text-gray-600">
                    Guardar información para futuros pedidos
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                  <p>Los campos de nombre y teléfono son obligatorios para continuar con el pedido.</p>
                </div>
              </div>
            </div>

            {/* Clientes recientes */}
            <div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-full">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Clientes recientes</h3>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    className="pl-10"
                    placeholder="Buscar cliente"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {clientes
                    .filter(cliente =>
                      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      cliente.telefono.includes(searchTerm)
                    )
                    .map(cliente => (
                      <div
                        key={cliente.id_cliente}
                        className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() =>
                          setPedido((prev) => ({
                            ...prev,
                            cliente: {
                              id_cliente: cliente.id_cliente,
                              nombre: cliente.nombre,
                              telefono: cliente.telefono,
                              email: cliente.email || "",
                            },
                          }))
                        }
                      >
                        <div className="font-medium text-gray-800">{cliente.nombre}</div>
                        <div className="text-sm text-gray-500">{cliente.telefono}</div>
                      </div>
                    ))}
                  {clientes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No hay clientes recientes</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setStep(2)}
              className="bg-green-600 hover:bg-green-700"
              disabled={!pedido.cliente?.nombre || !pedido.cliente?.telefono}
            >
              Continuar con el pedido <ChevronRight className="ml-2 h-4 w-4" />
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
                        <span>${calcularTotal() + 3}</span>
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
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
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

          <div className="form-group">
            <label className="block mb-2 font-medium">Notas para el pedido</label>
            <Textarea
              className="w-full min-h-[80px]"
              value={nota}
              onChange={e => setNota(e.target.value)}
              placeholder="Ej: Sin cebolla, entregar en portería, etc."
            />
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
