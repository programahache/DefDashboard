import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, UserPlus, ShoppingCart, PackagePlus } from "lucide-react"

function NewOrderButton() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const handleNewOrder = () => {
        setIsOpen(false)
        navigate('/pedidos/crear')
    }

    return (
        <div className="fixed bottom-7 right-7 z-50">
            <div className="relative">
                {isOpen && (
                    <div className="flex flex-col items-end gap-2 mb-2 absolute bottom-20 right-0 z-50">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
                            onClick={handleNewOrder}
                        >
                            <ShoppingCart size={20} />
                            Nuevo Pedido
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all"
                            onClick={handleNewOrder}
                        >
                            <UserPlus size={20} />
                            Nuevo Empleado
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <PackagePlus size={20} />
                            Nuevo Producto
                        </button>
                    </div>
                )}
                {/* Botón flotante principal */}
                <button
                    className={`rounded-full bg-red-500 text-white shadow-xl w-16 h-16 flex items-center justify-center text-3xl hover:bg-red-600 transition-all duration-300 focus:outline-none ${isOpen ? "rotate-45" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Abrir menú de acciones"
                >
                    <Plus size={36} />
                </button>
            </div>
        </div>
    )
}

export default NewOrderButton