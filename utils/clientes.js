export const getClientes = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching clientes:", error);
        return [];
    }
}

export const getClientesPaginados = async (offset, limit) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching clientes:", error);
        return [];
    }
}

export const getCantidadClientes = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/cantidad`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.cantidad;
    } catch (error) {
        console.error("Error fetching cantidad clientes:", error);
        return 0;
    }
}

export const getClientesById = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by ID:", error);
        return null;
    }
}

export const getClientesByNombre = async (nombre) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/nombre/${nombre}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by nombre:", error);
        return null;
    }
}

export const getPedidosByCliente = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/${id}/pedidos`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching pedidos by cliente:", error);
        return null;
    }
}

export const crearCliente = async (cliente) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error("Error creating cliente:", error);
        return { status: 500, data: null };
    }
}

export const actualizarCliente = async (id, cliente) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating cliente:", error);
        return null;
    }
}

export const eliminarCliente = async (id) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error("Error deleting cliente:", error);
        return false;
    }
}
export const getClientesByTelefono = async (telefono) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/telefono/${telefono}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by telefono:", error);
        return null;
    }
}
export const getClientesByEmail = async (email) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/email/${email}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by email:", error);
        return null;
    }
}
export const getClientesByDireccion = async (direccion) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/direccion/${direccion}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by direccion:", error);
        return null;
    }
}
export const getClientesByNotas = async (notas) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/notas/${notas}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by notas:", error);
        return null;
    }
}
export const getClientesByNombreCompleto = async (nombreCompleto) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/nombre-completo/${nombreCompleto}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by nombre completo:", error);
        return null;
    }
}
export const getClientesByIdCliente = async (idCliente) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/id-cliente/${idCliente}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by id cliente:", error);
        return null;
    }
}
export const getClientesByIdPedido = async (idPedido) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/id-pedido/${idPedido}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by id pedido:", error);
        return null;
    }
}
export const getClientesByIdProducto = async (idProducto) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/id-producto/${idProducto}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by id producto:", error);
        return null;
    }
}
export const getClientesByIdUsuario = async (idUsuario) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/clientes/id-usuario/${idUsuario}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching cliente by id usuario:", error);
        return null;
    }
}

