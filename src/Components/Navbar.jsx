import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoPersonAddSharp } from "react-icons/io5";
import { FaListUl, FaUser } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from 'react-icons/cg';
import { BiWorld } from 'react-icons/bi';
import { useTheme } from './ThemeContext';

const getStoredUserData = () => ({
  nom: window.localStorage.getItem('username') || '',
  email: window.localStorage.getItem('emailuser') || ''
});

const Navbar = () => {
  const location = useLocation();
  const routeUser = location.state?.user;

  const [nom, setNom] = useState(() => routeUser?.name || getStoredUserData().nom);
  const [email, setEmail] = useState(() => routeUser?.email || getStoredUserData().email);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (routeUser?.name || routeUser?.email) {
      setNom(routeUser.name || '');
      setEmail(routeUser.email || '');
      return;
    }

    const { nom: storedNom, email: storedEmail } = getStoredUserData();
    setNom(storedNom);
    setEmail(storedEmail);
  }, [routeUser?.name, routeUser?.email, location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"
  };
  return (
    <div
      className='h-screen w-full flex justify-center items-center transition-colors duration-300'
      style={{ backgroundColor: isDark ? '#020617' : '#f1f5f9', color: isDark ? '#f8fafc' : '#0f172a' }}
    >
      <div className='flex justify-between items-center flex-col h-screen w-full p-2 bg-white dark:bg-black duration-300'>
        <div className='text-white font-semibold text-2xl text-center w-full flex flex-col pb-10 justify-center gap-7 border-b-[1px] border-gray-500'>
          <div className='bg-gray-900 py-3 rounded shadow-sm border-b-[3px] border-orange-600'>
            <h1 className='flex justify-center items-center font-extrabold text-[20px] text-white'><BiWorld size={35} className='text-white'/>SPA Visiteur</h1>
          </div>
          <div className='flex flex-col items-center justify-start gap-2 border-b-[1px] border-gray-500 pb-3'>
            <span className='flex justify-center items-start gap-3'>
              <div>
                <FaUser size={25} className='text-black dark:text-white' />
              </div>
              <div className='flex justify-center items-center gap-1'>
                <h3 className='text-[20px] text-gray-700 dark:text-slate-300'>{nom}</h3>
              </div>
            </span>
            <p className='text-[10px] text-gray-500 -mt-3 flex justify-center items-center'>{email}</p>
          </div>
          <ul className='flex justify-center items-start flex-col gap-2'>
            <p className='flex justify-start items-start text-[12px] text-gray-500'>Menu</p>
            <li>
              <Link to="/dashbord"
                className='flex justify-center items-center gap-2 hover:bg-orange-500 rounded duration-500 bg-orange-600 px-3 py-1 text-[15px] w-52'>
                <RiDashboardFill />Bilan et Graphique
              </Link>
            </li>
            <li>
              <Link to="/ajouter"
                className='flex justify-center items-center gap-2 hover:bg-orange-500 rounded duration-500 bg-orange-600 px-3 py-1 text-[15px] w-52'>
                <IoPersonAddSharp />Ajouter un visiteur
              </Link>
            </li>
            <li>
              <Link to="/lister"
                className='flex justify-center items-center gap-3 hover:bg-orange-500 rounded duration-500 bg-orange-600 px-3 py-1 text-[15px] w-52'>
                <FaListUl />Lister des visiteur
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-2 justify-center items-start w-full'>
          <p className='flex justify-start items-start text-[12px] text-gray-500'>Parametre</p>
          <Link to="/profile"
            className='bg-slate-800 hover:bg-slate-600 duration-500 text-white py-2 px-4 w-full rounded flex justify-center items-center gap-2'>
            <CgProfile />Profil
          </Link>
          <button onClick={handleLogout}
            className='bg-slate-800 hover:bg-slate-600 duration-500 text-white  w-full py-2 px-4 rounded flex justify-center items-center gap-2'>
            <IoLogOutOutline /> Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
