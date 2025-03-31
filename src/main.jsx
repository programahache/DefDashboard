import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Cocina from './pages/Cocina.jsx'

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
      element:<p> Hola</p>
    },
  {
    path: "/cocina",
    element: <Cocina />
  }
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
