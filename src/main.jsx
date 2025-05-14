import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Cocina from './pages/Cocina.jsx'
import CrearProducto from './pages/CrearProducto.jsx'
import EditarProducto from './pages/EditarProducto.jsx'
import PedidosAdmin from './pages/Pedidos/Admin.jsx'
import CrearPedido from './pages/Pedidos/CrearPedido.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import './index.css'
import Home from './pages/Home.jsx'

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
    {
      path: "/productos/editar/:id",
      element: <EditarProducto />
    },
    {
      path: "/pedidos",
      element: <PedidosAdmin />

    },
      {
      path: "/pedidos/crear",
      element: <CrearPedido />

    }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
