import { useState, useEffect } from 'react'
import { BiMenu } from 'react-icons/bi'
import { FaUser, FaSun, FaMoon } from 'react-icons/fa' // Import des icônes de soleil et lune
import { useTheme } from './ThemeContext' // Vérifiez bien le chemin de votre dossier

const Header = ({ onMenuClick }) => {
  const [email, setEmail] = useState('');
  const { theme, toggleTheme } = useTheme(); // Récupération du thème global

  useEffect(() => {
    const emailsauvegarder = localStorage.getItem('emailuser');
    if (emailsauvegarder) setEmail(emailsauvegarder);
  }, []);

  return (
    /* Remplacement de 'text-white' par des classes dynamiques :
      Le texte sera gris-noir par défaut et blanc en mode sombre.
    */
    <div className='text-slate-800 dark:text-white flex justify-between items-center pt-2 px-4 transition-colors duration-300'>
      
      {/* Menu burger */}
      <div onClick={onMenuClick}>
        <BiMenu size={30} className='cursor-pointer hover:text-orange-500 duration-300' />
      </div>

      {/* Section de Droite : Bouton Dark Mode + Profil */}
      <div className='flex justify-center items-center gap-6'>
        
        {/* BOUTON SWITCH DARK MODE */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-300 focus:outline-none"
          title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        >
          {theme === 'light' ? (
            <FaMoon size={20} className="text-slate-700 hover:text-slate-900 duration-300" />
          ) : (
            <FaSun size={20} className="text-yellow-400 hover:text-yellow-300 duration-300" />
          )}
        </button>

        {/* Profil Utilisateur */}
        <div className='flex justify-center items-center gap-2 bg-green-600 p-2 rounded-lg'>
          <FaUser />
          <span className='flex flex-col justify-center items-center -mt-1'>
            {/* text-slate-700 pour le mode clair, dark:text-gray-100 pour le mode sombre */}
            <p className='dark:text-gray-100 font-thin text-[10px] mt-2'>{email}</p>
          </span>
        </div>

      </div>

    </div>
  );
};

export default Header;