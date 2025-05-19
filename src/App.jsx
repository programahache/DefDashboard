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

import NewOrderButton from './components/Botones/NewOrderButton';







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
    <div id="layout" className=" relative  min-h-screen bg-gray-50  ">


      {/* NAVEGACION DE LA PAGINA */}
      <Aside />
      <main className=" relative  flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden gap-5  p-5 ">

        {/* BARRA DE NAVEGACION */}
        <NavBar />

        <Outlet />
      </main>

      <NewOrderButton />

    </div>
  )
}

export default App
