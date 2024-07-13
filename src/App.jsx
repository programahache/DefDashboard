import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Outlet } from 'react-router-dom';


import '../src/App.css'
import Aside from "./components/Aside/Aside"
import Card from './components/Cards/Card'
import MiniCard from './components/Cards/MiniCard'
import NavBar from "./components/Layouts/NavBar"

import UserMember from './components/Items/UserMember'

import LineChart from './components/Charts/LineChart'

import MenuItem from './components/Items/MenuItem'
import InventarioItem from './components/Items/InventarioItem'
import Modal from './components/Modals/Modal'
import ListPedidosH from './components/Items/ListPedidosH';
import Home from './pages/Home';







function App() {


  const [isModal, setIsmodal] = useState(false)


  // const handlerModal = () => {
  //   document.startViewTransition(() => {
  //     flushSync(() => {
  //       setIsmodal(!isModal)
  //     })
  //   })
  // }


  return (
    <div id="layout" className=" relative bg-neutral-800 h-screen ">
      {/* NAVEGACION DE LA PAGINA */}
      <Aside />
      <main className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden gap-5  pb-5 transition-all ease-linear duration-700">
        {/* BARRA DE NAVEGACION */}
        <NavBar />
        <Outlet />
      </main>



    </div>
  )
}

export default App