
function Modal({ isModal, setIsmodal, nombre, delivery }) {



  return (


    <div className=" modal w-screen h-100 absolute flex items-center justify-center top-0 left-0 overflow-x-hidden overflow-y-auto z-20 ">
      <div className="h-3/4 w-3/4 bg-white p-2 rounded-xl flex flex-col gap-5 overflow-x-hidden overflow-y-auto">
        {/* --HEADER DEL MODAL */}
        <div className="modal-header flex items-center justify-between ">
          <div className="">
            <h1 className="font-bold">{nombre}</h1>
          </div>

          <button className="bg-red-200 px-3 py-1 rounded-full text-center  " onClick={() => setIsmodal(false)}>
            x
          </button>

        </div>
        {/* --CUERPO DEL MODAL ---  */}
        <div>
          <div>
            <p> Fecha de creacion: 18/07/2024 a las 7:26 p.m </p>
            <p className="font-bold">Informacion de pedido </p>
            <p>{delivery ? "Cra 44a #41a-29" : "Mesa #3"}</p>
            <p>Cliente: Harold Palacios</p>
          </div>
          <div>
            <p className="font-bold">Informacion de pedido </p>
            <p>Pussy Burguer: <span>$17.700</span></p>
            <p>Master Burguer: <span>$17.700</span></p>
            <p>Coca Cola : <span>$17.700</span></p>
            <p>Pussy Burguer: <span>$17.700</span></p>
            <p>Pussy Burguer: <span>$17.700</span></p>
            <p >Adiciones: <span className="font-normal">Papas medianas + gaseosa +  </span> </p>

          </div>

        </div>
      </div>

    </div>


  )
}

export default Modal