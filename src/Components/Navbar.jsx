import React from 'react'
import { Link } from 'react-router-dom'
import { IoPersonAddSharp } from "react-icons/io5";
import { FaListUl, FaUser } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from 'react-icons/cg';
import { GiRoundKnob } from 'react-icons/gi';
import { BiWorld } from 'react-icons/bi';
import { useState, useEffect } from 'react';

const Navbar = () => {

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailsaved = localStorage.getItem('emailuser');
    if (emailsaved) {
      setEmail(emailsaved);
    }
  }, [])

  useEffect(() => {
    const nomsaved = localStorage.getItem('username');
    if (nomsaved) {
      setNom(nomsaved);
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"
  };
  return (
    <div className='bg-slate-950 h-screen w-full flex justify-center items-center text-white'>
      <div className='flex justify-between items-center flex-col h-screen w-full p-2'>
        <div className='text-white font-semibold text-2xl text-center w-full flex flex-col pb-10 justify-center gap-7 border-b-[1px] border-gray-500'>
          <div className='bg-gray-900 py-3 rounded shadow-sm border-b-[3px] border-orange-600'>
            <h1 className='flex justify-center items-center font-extrabold text-[20px] text-white'><BiWorld size={35} className='text-white'/>SPA Visiteur</h1>
          </div>
          <div className='flex flex-col items-center justify-start gap-2 border-b-[1px] border-gray-500 pb-3'>
            <span className='flex justify-center items-start gap-3'>
              <div>
                <FaUser size={45} className='text-white shadow-lg' />
              </div>
              <div className='flex justify-center items-center gap-1'>
                <GiRoundKnob size={15} className='text-green-500' />
                <h3 className='text-[20px]'>{nom}</h3>
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
