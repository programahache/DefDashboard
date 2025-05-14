export const getPedidosDetalles = async (req, res) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/detalles`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array");
        }

        return data;
    } catch (error) {
        console.error("Error fetching pedidos:", error.message);
        return { error: error.message };
    }
};

export const getCantidadPedidos = async (req, res) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/cantidad`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (typeof data.cantidad !== 'number') {
            throw new Error("Invalid data format: Expected a number");
        }

        return data.cantidad;
    } catch (error) {
        console.error("Error fetching cantidad pedidos:", error.message);
        return { error: error.message };
    }
}


export const getPedidos = async (req, res) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array");
        }

        return data;
    }
    catch (error) {
        console.error("Error fetching pedidos:", error.message);
        return { error: error.message };
    }
}

export const crearPedido = async (pedido) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/pedidos/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating pedido:", error.message);
        return { error: error.message };
    }
}