export const getIngredientes = async () => {
  return [
    {
      id: 1,
      nombre: 'Carne Res',
      stock: 5000,
      unidad: 'gramos',
      stock_minimo: 2000,
      productos: [101, 102]
    },
    {
      id: 2,
      nombre: 'Pan Hamburguesa',
      stock: 50,
      unidad: 'unidades',
      stock_minimo: 30,
      productos: [101, 103]
    }
  ];
};

export const actualizarIngrediente = async (id, cantidad) => {
  console.log(`Actualizando ingrediente ${id} en ${cantidad}`);
  return true;
};

export const getIngredientesByProducto = async (productoId) => {
  const ingredientes = await getIngredientes();
  return ingredientes.filter(ing => ing.productos.includes(productoId));
};
