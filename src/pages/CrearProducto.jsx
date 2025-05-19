import React, { useState } from 'react'
import { createproductos } from '../../utils/productos'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Save, ArrowLeft, DollarSign, FileText, Package } from "lucide-react"

const productoVacio = {
  nombre: '',
  tiempo_preparacion: '',
  categoria: '',
  descripcion: '',
  imagen: '',
  precio: '',
  costo: '',
  stock: '',
  unidad: 'unidad',
  estado: 'activo',
}

function CrearProducto() {
  const [producto, setProducto] = useState(productoVacio)
  const [imagenPreview, setImagenPreview] = useState("/placeholder.svg")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto({
      ...producto,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result)
        setProducto((prev) => ({
          ...prev,
          imagen: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    // Validaciones
    if (!producto.nombre || !producto.descripcion || !producto.categoria || !producto.precio || !producto.costo) {
      alert('Por favor completa todos los campos')
      return
    }
    if (isNaN(producto.precio) || producto.precio <= 0 || isNaN(producto.costo) || producto.costo <= 0) {
      alert('El precio y costo deben ser números positivos')
      return
    }
    if (isNaN(producto.stock) || producto.stock < 0 || !Number.isInteger(Number(producto.stock))) {
      alert('El stock debe ser un número entero no negativo')
      return
    }
    if (isNaN(producto.tiempo_preparacion) || producto.tiempo_preparacion <= 0) {
      alert('El tiempo de preparación debe ser un número positivo')
      return
    }

    setIsLoading(true)
    createproductos(producto)
      .then(() => {
        alert('Producto creado con éxito')
        setProducto(productoVacio)
        setImagenPreview("/placeholder.svg")
        navigate("/cocina")
      })
      .catch((err) => {
        console.error(err)
        alert('Error al crear el producto')
      })
      .finally(() => setIsLoading(false))
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Crear Producto</h1>
        </div>
      </div>

      <form onSubmit={handlerSubmit} className="space-y-6" autoComplete="off">
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
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="categoria" className="font-medium">Categoría <span className="text-red-500">*</span></label>
                        <Select
                          value={producto.categoria}
                          onValueChange={(value) => setProducto((prev) => ({ ...prev, categoria: value }))}
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
                          type="number"
                          value={producto.tiempo_preparacion}
                          onChange={handleChange}
                          placeholder="Ej. 15"
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
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="estado" className="font-medium">Estado</label>
                        <Select
                          value={producto.estado}
                          onValueChange={(value) => setProducto((prev) => ({ ...prev, estado: value }))}
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
                        <Input
                          id="imagen"
                          name="imagen"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full"
                        />
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
                        onChange={handleChange}
                        placeholder="0.00"
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
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
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
                        onChange={handleChange}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="unidad" className="font-medium">Unidad de medida</label>
                      <Select
                        value={producto.unidad}
                        onValueChange={(value) => setProducto((prev) => ({ ...prev, unidad: value }))}
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 justify-end">
          <Button
            type="submit"
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={isLoading}
          >
            <Save className="h-4 w-4" />
            Crear Producto
          </Button>
          <Link to="/cocina">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default CrearProducto