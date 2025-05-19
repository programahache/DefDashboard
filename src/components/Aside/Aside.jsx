import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'



function Aside() {



    return (

        <aside
            className="flex flex-col relative bg-gray-800 text-white h-screen  top-0 left-0 w-16 hover:w-64 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out group"
            id='aside'
        >
            {/* Encabezado */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3 min-w-max">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-8 h-8 object-contain"
                    />
                    <span className="text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                        Calamardo Félix
                    </span>
                </div>
                <button
                    className="p-1 hover:bg-gray-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {/* Lógica para cerrar */ }}
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>
            </div>

            {/* Menú de navegación */}
            <nav className="flex-1 flex flex-col p-2 gap-1 mt-2">
                {[
                    { to: "/Home", icon: "home", text: "Inicio" },
                    { to: "/finanzas", icon: "savings", text: "Finanzas" },               
                    { to: "/cocina", icon: "range_hood", text: "Cocina" },
                    { to: "/pedidos", icon: "shopping_cart", text: "Pedidos" },
                    // { to: "/inventario", icon: "inventory_2", text: "Inventario" },
                    // { to: "/usuarios", icon: "people", text: "Usuarios" },
                    // { to: "/reportes", icon: "assessment", text: "Reportes" },
         
                ].map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-colors
          ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`
                        }
                    >
                        <span className="material-symbols-outlined min-w-[24px]">
                            {item.icon}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
                            {item.text}
                        </span>
                    </NavLink>
                ))}
            </nav>

            {/* Pie de página */}
            <div className="mt-auto border-t border-gray-700 p-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Cerrar sesión
                    </span>
                </button>
            </div>
        </aside>
    )
}

export default Aside