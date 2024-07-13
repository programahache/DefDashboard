
function Modal({ isModal, setIsmodal, nombre }) {



  return (


    <div className=" modal w-screen h-100 absolute flex items-center justify-center top-0 left-0 overflow-x-hidden overflow-y-auto z-20 ">
      <div className="h-2/4 w-1/3 bg-white p-2 rounded-xl flex flex-col gap-5">
        {/* --HEADER DEL MODAL */}
        <div className="modal-header flex items-center justify-between ">
          <div className="">
            <h1 className="font-bold">{nombre}</h1>
          </div>

          <button className="bg-red-200 px-3 py-1 rounded-full text-center  " onClick={() =>  setIsmodal(false)}>
            x
          </button>

        </div>
        {/* --CUERPO DEL MODAL ---  */}
        <div>
          <div>
            <p> <span className="font-bold">Mesa #1</span> <span>Pedido generado a 18:19 12/07/2024 </span> <span>cliente: N/A</span> </p>
            <p className="font-bold">Productos: </p>
            <div>
              <p>Pussy Burguer: <span>$17.700</span></p>
            </div>
          </div>
          <div>
            <p className="font-bold">Adiciones: <span className="font-normal">Papas medianas + gaseosa +  </span> </p>
          </div>

        </div>
      </div>

    </div>


  )
}

export default Modal