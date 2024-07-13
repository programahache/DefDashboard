import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'



function Aside() {



    return (

        <aside className="hidden  sm:flex sm:flex-col bg-neutral-700 text-white sm:relative text-bold h-full px-2 w-16 hover:w-[260px] overflow-y-hidden overflow-x-hidden transition-[width] ease-linear duration-500 ">
            <div className="toggle flex items-center justify-between p-2 ">
                <div className="logo flex items-center gap-2 ">
                    <picture className='w-10 h-10'>
                        <img src={logo} alt="logo restaurante " />
                    </picture>
                    <h2 className='truncate'>Calamardo felix</h2>
                </div>
                <button className='close' id='close-btn'>
                    <span class="material-symbols-outlined py-3">
                        close
                    </span>
                </button>
            </div>
            <div className='sidebar mt-3 h-full flex flex-col '>
                <nav className='flex font-semibold  flex-col gap-5 2xl:gap-10 w-full h-full justify-between sm:py-2 lg:p-0 lg:justify-center  transition-[all] duration-700 ease-linear  '>

                    <NavLink to="/Home" className={`p-2 fs-base flex items-center gap-2 hover:-translate-y hover:bg-red-500 transition-all ease-linear duration-300`}>
                        <span class="material-symbols-outlined px-2  ">
                            home
                        </span>
                        Home
                    </NavLink>

                    <NavLink to="/finanzas" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            savings
                        </span>
                        Finanzas
                    </NavLink>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            inventory
                        </span>
                        Inventario
                    </a>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            assignment_ind
                        </span>
                        Empleados
                    </a>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            monitoring
                        </span>
                        Marketing
                    </a>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            layers
                        </span>
                        Layer
                    </a>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            range_hood
                        </span>
                        Cocina
                    </a>
                    
                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            calendar_month
                        </span>
                        Calendar
                    </a>

                    <a href="#" className='p-2 fs-base flex items-center gap-2 hover:-translate-y-1 hover:bg-red-500 transition-all ease-linear duration-300'>
                        <span class="material-symbols-outlined  px-2  ">
                            calendar_month
                        </span>
                        Distribución 
                    </a>


                </nav>

            </div>

            {/* <div className='absolute bottom-1 truncate border-y p-2 bg-red-200 w-full'>
                <p>Cerrar sesion</p>
            </div> */}

        </aside>

    )
}

export default Aside