//Obtener ingredientes
export const getIngredientes = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ingredientes`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ingredientes:", error);
        return [];
    }
}

//Obtener ingredientes por producto
export const getIngredientesByProducto = async (productoId) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ingredientes/producto/${productoId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ingredientes by producto:", error);
        return [];
    }
}
