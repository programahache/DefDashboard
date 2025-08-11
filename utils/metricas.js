//Platos mas pedidos 

const url = `${import.meta.env.VITE_API_URL}/metricas/`;

export const getPlatosMasPedidos = async () => {
    try {
        const response = await fetch(url + "platos-mas-pedidos");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching platos mas pedidos:", error);
        return [];
    }
}

getPlatosMasPedidos()