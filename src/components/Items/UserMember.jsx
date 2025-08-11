import profile from '../../assets/avataaars.svg'


function UserMember({ nombre, status }) {
    return (
        <div className='flex justify-between items-center'>
            <div className='profile flex gap-3 items-center'  >
                <picture className=' w-[13%]'>
                    <img src={profile} alt="profile" />
                </picture>
                <div >
                    <p className='font-bold mb-1 '>{nombre}</p>
                    <span className={` ${ status ? "bg-green-300" : "bg-red-300"} px-2 py-1 rounded tex-center font-semibold capitalize text-sm`}>status</span>
                </div>
            </div>
            <div>
                <button className='hover:bg-blue-300 border border-sky-500  px-2 py-1 rounded-lg transtion-all '>Ver</button>
            </div>
        </div>
    )
}

export default UserMember