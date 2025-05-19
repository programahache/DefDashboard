import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Edit, Trash2, Save, ArrowLeft, DollarSign, FileText, Package, AlertTriangle } from "lucide-react"
import { getproductosById } from "../../utils/productos"

const productoVacio = {
  nombre: "",
  descripcion: "",
  categoria: "",
  precio: 0,
  costo: 0,
  stock: 0,
  unidad: "unidad",
  estado: "activo",
  tiempo_preparacion: "",
  imagen: "",
}

const productoEjemplo = {
  nombre: "Hamburguesa Clásica",
  descripcion: "Hamburguesa con carne 100% res, queso y vegetales frescos.",
  categoria: "comida",
  precio: 120,
  costo: 60,
  stock: 8,
  unidad: "unidad",
  estado: "activo",
  tiempo_preparacion: "15",
  imagen: "/placeholder.svg",
}

export default function ProductoPage() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params?.id
  const isNew = id === "nuevo"

  const [modo, setModo] = useState(isNew ? "crear" : "ver") // "ver" | "editar" | "crear"
  const [producto, setProducto] = useState(isNew ? productoVacio : productoEjemplo)
  const [imagenPreview, setImagenPreview] = useState(isNew ? "/placeholder.svg" : productoEjemplo.imagen || "/placeholder.svg")
  const [hasChanges, setHasChanges] = useState(false)

  // Simula carga de producto si no es nuevo
  useEffect(() => {
    if (!isNew) {
      // Aquí iría la lógica para cargar el producto desde la API
      const fetchProducto = async () => {
        const data = await getproductosById(id)
        setProducto(data)
        setImagenPreview(data.imagen || "/placeholder.svg")
        }
        fetchProducto()
    } else {
        // Si es nuevo, inicializa con producto vacío
      setImagenPreview(productoEjemplo.imagen || "/placeholder.svg")
    }
  }, [isNew])

  // Cambios en campos de texto/select
  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto((prev) => ({ ...prev, [name]: value }))
    setHasChanges(true)
  }

  // Cambios en campos numéricos
  const handleNumberChange = (name, value) => {
    const numValue = value === "" ? 0 : Number.parseFloat(value)
    setProducto((prev) => ({ ...prev, [name]: numValue }))
    setHasChanges(true)
  }

  // Cambios en imagen
  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result)
        // Aquí normalmente subirías la imagen y guardarías la URL en el producto
        setProducto((prev) => ({ ...prev, imagen: reader.result }))
      }
      reader.readAsDataURL(file)
      setHasChanges(true)
    }
  }

  // Guardar producto
  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar en la API
    alert("Producto guardado:\n" + JSON.stringify(producto, null, 2))
    setHasChanges(false)
    if (isNew) {
      navigate("/admin/cocina")
    } else {
      setModo("ver")
    }
  }

  // Cancelar edición/creación
  const handleCancel = () => {
    if (isNew) {
      navigate("/cocina")
    } else {
      setModo("ver")
      setImagenPreview(productoEjemplo.imagen || "/placeholder.svg")
      setHasChanges(false)
    }
  }

  // Calcular margen de ganancia
  const calcularMargen = () => {
    if (!producto.precio || !producto.costo) return 0
    return ((producto.precio - producto.costo) / producto.precio) * 100
  }

  // Título dinámico
  const getTitulo = () => {
    if (modo === "crear") return "Crear Nuevo Producto"
    if (modo === "editar") return `Editar Producto: ${producto.nombre}`
    return producto.nombre
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Link to="/cocina">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{getTitulo()}</h1>
            {!isNew && modo === "ver" && (
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    producto.estado === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {producto.estado === "activo" ? "Activo" : "Inactivo"}
                </span>
                <span className="text-gray-500 text-sm">
                  Categoría: {producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {modo === "ver" ? (
            <>
              <Button variant="outline" onClick={() => setModo("editar")} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </Button>
              <Button variant="destructive" className="flex items-center gap-1" onClick={() => navigate("/admin/cocina")}>
                <Trash2 className="h-4 w-4" />
                <span>Eliminar</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-1">
                <span>Cancelar</span>
              </Button>
              <Button
                type="submit"
                form="producto-form"
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!hasChanges}
              >
                <Save className="h-4 w-4" />
                <span>{isNew ? "Crear Producto" : "Guardar Cambios"}</span>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Formulario principal */}
      <form id="producto-form" onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6 grid grid-cols-3 md:w-fit">
            <TabsTrigger value="general" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Información</span>
            </TabsTrigger>
            <TabsTrigger value="precios" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden md:inline">Precios</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className="hidden md:inline">Stock</span>
            </TabsTrigger>
          </TabsList>

          {/* Información general */}
          <TabsContent value="general" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="font-medium">Nombre del producto <span className="text-red-500">*</span></label>
                        <Input
                          id="nombre"
                          name="nombre"
                          value={producto.nombre}
                          onChange={handleChange}
                          placeholder="Ej. Hamburguesa Clásica"
                          disabled={modo === "ver"}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="categoria" className="font-medium">Categoría <span className="text-red-500">*</span></label>
                        <Select
                          value={producto.categoria}
                          onValueChange={(value) => {
                            setProducto((prev) => ({ ...prev, categoria: value }))
                            setHasChanges(true)
                          }}
                          disabled={modo === "ver"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comida">Comida</SelectItem>
                            <SelectItem value="bebida">Bebida</SelectItem>
                            <SelectItem value="postre">Postre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tiempo_preparacion" className="font-medium">Tiempo de preparación <span className="text-red-500">*</span></label>
                        <Input
                          id="tiempo_preparacion"
                          name="tiempo_preparacion"
                          value={producto.tiempo_preparacion}
                          onChange={handleChange}
                          placeholder="Ej. 15 minutos"
                          disabled={modo === "ver"}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="descripcion" className="font-medium">Descripción</label>
                        <textarea
                          id="descripcion"
                          name="descripcion"
                          value={producto.descripcion}
                          onChange={handleChange}
                          placeholder="Describe el producto..."
                          className="min-h-[120px] w-full border rounded-lg p-2"
                          disabled={modo === "ver"}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="estado" className="font-medium">Estado</label>
                        <Select
                          value={producto.estado}
                          onValueChange={(value) => {
                            setProducto((prev) => ({ ...prev, estado: value }))
                            setHasChanges(true)
                          }}
                          disabled={modo === "ver"}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="activo">Activo</SelectItem>
                            <SelectItem value="inactivo">Inactivo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <label htmlFor="imagen" className="font-medium">Imagen del producto</label>
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative w-full h-[300px] border rounded-lg overflow-hidden flex items-center justify-center bg-gray-50">
                          <img
                            src={imagenPreview || "/placeholder.svg"}
                            alt={producto.nombre || "Vista previa"}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        {modo !== "ver" && (
                          <Input
                            id="imagen"
                            name="imagen"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Precios */}
          <TabsContent value="precios" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="precio" className="font-medium">Precio de venta <span className="text-red-500">*</span></label>
                      <Input
                        id="precio"
                        name="precio"
                        type="number"
                        step="0.01"
                        value={producto.precio}
                        onChange={(e) => handleNumberChange("precio", e.target.value)}
                        placeholder="0.00"
                        disabled={modo === "ver"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="costo" className="font-medium">Costo <span className="text-red-500">*</span></label>
                      <Input
                        id="costo"
                        name="costo"
                        type="number"
                        step="0.01"
                        value={producto.costo}
                        onChange={(e) => handleNumberChange("costo", e.target.value)}
                        placeholder="0.00"
                        disabled={modo === "ver"}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="font-medium">Resumen financiero</span>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Precio de venta:</span>
                          <span className="font-medium">${Number(producto.precio).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Costo:</span>
                          <span className="font-medium">${Number(producto.costo).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 my-2"></div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Ganancia:</span>
                          <span className="font-medium">${(producto.precio - producto.costo).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Margen:</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              calcularMargen() < 30 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {calcularMargen().toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    {calcularMargen() < 30 && modo !== "ver" && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-yellow-800 font-medium">Margen de ganancia bajo</p>
                          <p className="text-yellow-700 text-sm">
                            El margen de ganancia es menor al 30% recomendado. Considera ajustar el precio de venta o reducir costos.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stock */}
          <TabsContent value="stock" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="stock" className="font-medium">Cantidad en stock <span className="text-red-500">*</span></label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={producto.stock}
                        onChange={(e) => handleNumberChange("stock", e.target.value)}
                        placeholder="0"
                        disabled={modo === "ver"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="unidad" className="font-medium">Unidad de medida</label>
                      <Select
                        value={producto.unidad}
                        onValueChange={(value) => {
                          setProducto((prev) => ({ ...prev, unidad: value }))
                          setHasChanges(true)
                        }}
                        disabled={modo === "ver"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unidad">Unidad</SelectItem>
                          <SelectItem value="kilogramo">Kilogramo</SelectItem>
                          <SelectItem value="litro">Litro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="font-medium">Estado del inventario</span>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Cantidad actual:</span>
                        <span className="font-medium">
                          {producto.stock} {producto.unidad}
                          {producto.stock !== 1 && producto.unidad === "unidad" ? "es" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Estado:</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            producto.stock <= 5
                              ? "bg-red-100 text-red-800"
                              : producto.stock <= 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {producto.stock <= 5
                            ? "Stock crítico"
                            : producto.stock <= 10
                            ? "Stock bajo"
                            : "Stock disponible"}
                        </span>
                      </div>
                    </div>
                    {producto.stock <= 5 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-800 font-medium">Stock crítico</p>
                          <p className="text-red-700 text-sm">
                            El producto tiene un nivel de stock muy bajo. Se recomienda reabastecer lo antes posible.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}