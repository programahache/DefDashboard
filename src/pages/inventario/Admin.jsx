// src/pages/inventario/admin.jsx
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getIngredientes } from '../../../utils/inventario';

export default function Admin() {
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getIngredientes();
        setInventario(data);
      } catch (error) {
        console.error("Error cargando ingredientes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Gestión de Inventario</h1>
        <p className="text-gray-500">Stock actual de ingredientes y productos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ítems en Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ítem</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Vencimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Cargando ingredientes...
                  </TableCell>
                </TableRow>
              ) : inventario.length > 0 ? (
                inventario.map((item) => (
                  <TableRow key={item.id_item}>
                    <TableCell>#{item.id_item}</TableCell>
                    <TableCell className="font-medium">{item.nombre}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.unidad}</TableCell>
                    <TableCell>
                      {new Date(item.fecha_vencimiento).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                    No se encontraron ingredientes
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}