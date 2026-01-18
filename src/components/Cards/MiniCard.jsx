import { formateNumber } from "../../funciones/funtions"

function MiniCard({ title, since, value, porcentaje, icon, ismoney }) {







    return (
        <div className='card   sm:w-[100%] lg:w-[25%] py-4 px-5 rounded-xl flex justify-between border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'>

            <div className='flex flex-col gap-1'>
                <div>
                    <h4 className='text-lg uppercase font-medium'>{title}</h4>
                    <h3 className='text-base font-bold'>{ismoney ? formateNumber(value) : value}</h3>
                </div>
                <p> <span className='text-green-600 d'>+{porcentaje}%</span> desde {since} </p>
            </div>
            <div className='rounded-full bg-purple-500 h-10 w-10 overflow-hidden text-center flex items-center justify-center'>
                <span class="material-symbols-outlined text-red-100">
                    {icon}
                </span>
            </div>
        </div>

    )
}

export default MiniCard