import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Cocina from './pages/Cocina.jsx'
import CrearProducto from './pages/CrearProducto.jsx'
import EditarProducto from './pages/EditarProducto.jsx'
import PedidosAdmin from './pages/Pedidos/Admin.jsx'
import CrearPedido from './pages/Pedidos/CrearPedido.jsx'
import CrearDos from './pages/Pedidos/CrearDos.jsx'
import PedidoDetalle from './pages/Pedidos/pedidoDetalle.jsx'
import ProductoPage from './pages/ProductoPage.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import './index.css'
import Home from './pages/Home.jsx'
import FormNuevoCliente from './components/Clientes/FormNuevoCliente.jsx'
import ClientesList from './components/Clientes/ClientesList.jsx'
import ClienteDetalle from './components/Clientes/ClienteDetalle.jsx'
import PedidoDetalleVisual from './pages/Pedidos/PedidoDetalleVisual.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: "/home",
      element: <Home />
    },
    {
      path: "/finanzas",
      element: <p> Hola</p>
    },
    {
      path: "/cocina",
      element: <Cocina />
    },
    {
      path: "/productos/crear",
      element: <CrearProducto />
    },
    // {
    //   path: "/productos/editar/:id",
    //   element: <EditarProducto />
    // },
    {
      path: "/productos/editar/:id",
      element: <ProductoPage />

    },
    {
      path: "/pedidos",
      element: <PedidosAdmin />

    },
    {
      path: "/pedidos/crear",
      element: <CrearDos />

    },
    {
      path: "/clientes/",
      element: <ClientesList />

    },
    {
      path: "/clientes/:id",
      element: <ClienteDetalle />

    },
    {
      path: "/clientes/nuevo",
      element: <FormNuevoCliente />
    },
    {
      path: "/pedido/:id",
      element: <PedidoDetalleVisual />
    },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
