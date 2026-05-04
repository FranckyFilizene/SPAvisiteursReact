import { useState, useEffect } from 'react'

import { BiMenu } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'

const Header = ({ onMenuClick }) => { // Récupère la prop
  const [nom, setNom] = useState('');

  useEffect(() => {
    const nomsauvegarder = localStorage.getItem('username');
    if (nomsauvegarder) setNom(nomsauvegarder);
  }, []);

  return (
    <div className='text-white flex justify-between items-center pt-2 px-4'>
      <div onClick={onMenuClick}> {/* Déclenche l'action ici */}
        <BiMenu size={30} className='cursor-pointer hover:text-orange-500 duration-300' />
      </div>
      <div className='flex justify-center items-center gap-2'>
        <FaUser />
        <span className='flex flex-col justify-center items-center -mt-1'>
          <p className='text-gray-100'>{nom}</p>
          <p className='text-green-300 text-[10px]'>Connecté</p>
        </span>
      </div>
    </div>
  );
};
export default Header