import Form from "./Form"

function Modal({ isOpen, setIsOpen }) {
    return (
        <dialog className="bg-gray-800 w-1/2 h-1/2 rounded-md p-5  flex-col gap-5" open={isOpen}>        
            <h1 className="text-white text-2xl font-bold">Crea tu producto</h1>

            <Form setIsOpen />
            
        </dialog>
    )
}

export default Modal