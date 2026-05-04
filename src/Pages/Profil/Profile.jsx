import React, { useEffect, useState } from 'react'
import { BiPhone } from 'react-icons/bi';
import { CgMail, CgProfile } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa6';
import { GiLockedDoor } from 'react-icons/gi';

const Profile = () => {
   const [Nom, setNom] = useState('');
   const [email, setEmail] = useState('');

   useEffect(()=>{
    const emailsaved = localStorage.getItem('emailuser');
    if(emailsaved){
      setEmail(emailsaved);
    }
   },[])
   useEffect(()=>{
      const NomUsersactifs = localStorage.getItem('username');
      if(NomUsersactifs){
        setNom(NomUsersactifs);
      }
   },[])
  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex justify-center items-center relative bg-slate-300 h-28 w-[90%] rounded-lg shadow-lg'>
        <h1 
        className='absolute -bottom-12 bg-white w-32 h-32 
        rounded-[50%] shadow-lg flex justify-center items-center text-5xl font-bold text-blue-950'
        ><CgProfile size={100}/></h1>
      </div>
      <div className='mt-14 w-full flex flex-col justify-center items-center gap-2'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-semibold'>{Nom}</h1>
          <p className='text-gray-700 text-[10px]'>Visiteur</p>
        </div>
        <div className='w-[90%] bg-slate-200 rounded-lg shadow-lg px-3 py-4 overflow-x-auto'>
          <h1 className='font-semibold border-b-[1px] border-gray-800 mb-6 pb-2'>Information Personnelles</h1>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-900 text-slate-200 uppercase text-sm leading-normal rounded-lg'>
                <th className='py-3 px-6 border-b border-gray-400 text-orange-600'>Nom</th>
                <th className='py-3 px-6 border-b border-gray-400 text-orange-600'>Email</th>
                <th className='py-3 px-6 border-b border-gray-400 text-orange-600'>Password</th>
              </tr>
            </thead>
            <tbody className='text-slate-700 text-sm font-light'>
              <tr>
                <td className='py-3 px-6'><span className='flex justify-start items-center gap-2'><FaUser size={15}/>{Nom}</span></td>
                <td className='py-3 px-6'><span className='flex justify-start items-center gap-2'><CgMail size={20}/>{email}</span></td>
                <td className='py-3 px-6'><span className='flex justify-start items-center gap-2'><GiLockedDoor size={20}/>**********</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile
