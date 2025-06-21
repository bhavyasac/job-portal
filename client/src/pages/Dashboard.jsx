import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen '>

            {/* navbar for recruiter panel */}

            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                    <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden'>Welcome , Bhavya</p>
                        <div className='relative group'>
                            <img className='w-8 border rounded-full' src={assets.company_icon} alt="" />
                            <div className='absolute top-0 right-0 z-10 text-black rounded hidden group-hover:block p-12'>
                                <ul className='list-none m-0 p-2 bg-white border text-sm rounded-md'>
                                    <li className='py-1 px-2 cursor-pointer hover:bg-gray-100'>
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-start'>
                {/* left sidebar with option to add job, manage jobs, view applications */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start text-gray-800 pt-5'>
                        <NavLink to={'/dashboard/add-job'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-300 ${isActive && 'bg-blue-100 text-black border-r-4 border-blue-500'}`} >
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Jobs</p>
                        </NavLink>
                        <NavLink to={'/dashboard/manage-jobs'} className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-300 ${isActive && 'bg-blue-100 text-black border-r-4 border-blue-500'}`} >
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>manage Jobs</p>
                        </NavLink>
                        <NavLink to={'/dashboard/view-applications'}  className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 text-black border-r-4 border-blue-500'}`}  >
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>
                    <div>
                        <Outlet />
                    </div>
            </div>
        </div>
    )
}

export default Dashboard