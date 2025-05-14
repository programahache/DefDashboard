import { useEffect, useState } from 'react'
import MiniCard from '../components/Cards/MiniCard';
import Card from '../components/Cards/Card';
import LineChart from '../components/Charts/LineChart';
import ListPedidosH from '../components/Items/ListPedidosH';
import UserMember from '../components/Items/UserMember';
import MenuItem from '../components/Items/MenuItem';
import InventarioItem from '../components/Items/InventarioItem';

import { getCantidadPedidos } from '../../utils/pedidos';

function Home() {

    const [cantidadPedidos, setCantidadPedidos] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCantidadPedidos();
                setCantidadPedidos(data);
            } catch (err) {
                setError('No se pudo cargar la cantidad de pedidos');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    return (
        <>
            {/* GADGETS DE DATOS DEL DIA DE HOY */}
            <div className='flex flex-col lg:flex-row w-full gap-2 justify-around px-2'>
                <MiniCard title={"INGRESOS "} value={"100000020.23"} since={"ayer"} porcentaje={55} icon={"payments"} iconColor={""} ismoney={true} />
                <MiniCard title={"Nuevos clientes"} value={103} since={"10/01/24"} porcentaje={55} icon={"groups"} />
                <MiniCard title={"Pedidos"} value={cantidadPedidos} since={"25/02/22"} porcentaje={155} icon={"checklist"} />
                <MiniCard title={"Ocupación"} value={"73%"} since={"10/20/24"} porcentaje={55} icon={"table_restaurant"} />
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-2 justify-around px-2'>
                <Card wid="sm:w-[75%]" hei="500px" title={"Ventas totales"}>
                    <p> <span className='material-symbols-outlined text-sm font-bold text-green-500'>arrow_upward</span>4% mas en 2024</p>
                    <LineChart />
                </Card>

                {/* //Lista de pedidos */}
                <Card wid="600px" hei="400px" title={"Lista de pedidos"} >

                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #35604"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #31784"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #21784"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #21784"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #21784"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #21784"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <ListPedidosH nombre={"Pedido #21784"} />
                    </div>
                </Card>
            </div>

            <div className='flex flex-col sm:flex-row w-full gap-2 justify-around px-2'>

                {/* //Lista de miembros de equipo */}
                <Card wid="600px" hei="400px" title={"Miembros del equipo"} >
                    <div className='mb-2 border-b-2 p-2'>
                        <UserMember status={true} nombre={"Harold Palacios"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <UserMember status={true} nombre={"Harold Palacios"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <UserMember status={true} nombre={"Harold Palacios"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <UserMember status={false} nombre={"Harold Palacios"} />
                    </div>
                </Card>

                {/* //PLATOS MAS PEDIDOS */}
                <Card wid="600px" hei="400px" title={"Platos mas pedidos"} >
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Pussy Burguer"} numpedidos={10} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Little Mac"} numpedidos={7} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={false} nombre={"Canabis Burguer "} numpedidos={5} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer"} numpedidos={10} />
                    </div>

                </Card>


                {/* //Lista de pedidos */}
                <Card wid="600px" hei="400px" title={"Inventario"} >
                    <div className='mb-2 border-b-2 p-2'>
                        <InventarioItem nombre={"Papas criollas"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <InventarioItem nombre={"Carne"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <InventarioItem nombre={"Pan"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <InventarioItem nombre={"Harina"} />
                    </div>
                </Card>


            </div>

            <div className='flex flex-col sm:flex-row w-full gap-2 justify-around px-2'>
                <Card wid="sm:w-[75%]" hei="500px" title={"Ventas totales"}>
                    <p> <span className='material-symbols-outlined text-sm font-bold text-green-500'>arrow_upward</span>4% mas en 2024</p>
                    <LineChart />
                </Card>
                <Card wid="sm:w-[35%]" hei="500px" title={"Platos mas pedidos"} >
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Pussy Burguer"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Little Mac"} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={false} nombre={"Canabis Burguer "} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer  "} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer  "} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer  "} />
                    </div>
                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer  "} />
                    </div>

                    <div className='mb-2 border-b-2 p-2'>
                        <MenuItem status={true} nombre={"Red Hot Burguer  "} />
                    </div>





                </Card>
            </div>
        </>
    )
}

export default Home