import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"

import { crearCliente } from "../../../utils/clientes"

const clienteVacio = {
    nombre: "",
    telefono: "",
    direccion: "",
    email: "",
    notas: "",
}

export default function FormNuevoCliente({ onSave, onCancel, isLoading, clienteInicial }) {
    // Si recibes datos para editar, usa clienteInicial, si no, usa clienteVacio
    const [cliente, setCliente] = useState(clienteInicial || clienteVacio)

    const handleChange = (e) => {
        const { name, value } = e.target
        setCliente((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
            alert("Nombre, teléfono y dirección son obligatorios")
            return
        }
        crearCliente(cliente)
            .then((response) => {
                if (response.status === 201) {
                    alert("Cliente creado exitosamente")
                    setCliente(clienteVacio)
                    onSave && onSave()
                } else {
                    console.error("Error al crear el cliente:", response)
                    alert("Error al crear el cliente")
                }
            })
            .catch((error) => {
                console.error("Error al crear el cliente:", error)
                alert("Error al crear el cliente")
            })
    }

    return (
        <div className="container mx-auto p-4 md:p-6">
            {/* Cabecera */}
            <div className="flex items-center gap-3 mb-6">
                <Link to="/admin/clientes">
                    <Button variant="outline" size="icon" type="button">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Nuevo Cliente</h1>
            </div>

            {/* Formulario */}
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Información del cliente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">
                                    Nombre <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    value={cliente.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre completo"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="telefono">
                                    Teléfono <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="telefono"
                                    name="telefono"
                                    value={cliente.telefono}
                                    onChange={handleChange}
                                    placeholder="Ej. 5551234567"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="direccion">
                                    Dirección <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="direccion"
                                    name="direccion"
                                    value={cliente.direccion}
                                    onChange={handleChange}
                                    placeholder="Calle, número, colonia"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={cliente.email}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notas">Notas</Label>
                                <Textarea
                                    id="notas"
                                    name="notas"
                                    value={cliente.notas}
                                    onChange={handleChange}
                                    placeholder="Notas adicionales o preferencias del cliente"
                                    className="min-h-[100px]"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Link to="/admin/clientes">
                                    <Button variant="outline" type="button" disabled={isLoading}>
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {isLoading ? "Guardando..." : "Guardar Cliente"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}