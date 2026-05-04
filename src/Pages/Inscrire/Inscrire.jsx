import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { PiPassword } from "react-icons/pi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

const Inscrire = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // On utilise onSubmit pour gérer la soumission du formulaire
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des mots de passe
    if (password !== confirmPassword) {
      setErreur('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);
      setErreur(''); // On réinitialise l'erreur avant de lancer l'appel
      
      const reponse = await axios.post('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/Inscription.php', {
        name : name,
        password: password,
        email : email
      });

      if (reponse?.data?.status === 'success') {
        alert('Inscription réussie !');
        navigate('/'); // Redirige vers le login (vérifie si ta route est bien "/" ou "/login")
      } else {
        setErreur(reponse?.data?.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
      setErreur('Erreur serveur, veuillez réessayer plus tard');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='bg-slate-200 h-screen flex justify-center items-center shadow-2xl'>
      <div className='bg-slate-900 p-5 flex flex-col gap-2 rounded-xl w-96 border-[1px] shadow-lg'>
        <h1 className='text-orange-600 text-3xl font-bold mb-2 pb-2 border-b-[1px] border-orange-500'>Inscription</h1>
        
        {/* Changement : onSubmit ici */}
        <form onSubmit={handleFormSubmit} className='flex flex-col items-start justify-center space-y-3'>

            {/* Username */}
            <div className='flex justify-start items-center gap-2 h-10 bg-white rounded-lg w-full shadow-lg'>
                <CgProfile className='ml-2 text-orange-500' size={22}/>
                <input 
                 type="text"
                 placeholder='Nom'
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className='focus:outline-none h-10 p-1 w-full bg-transparent' 
                 required />
            </div>

            {/* Email */}

            <div className='flex justify-start items-center gap-2 h-10 bg-white rounded-lg w-full shadow-lg'>
              <MdEmail className='ml-2 text-orange-500' size={22}/>
              <input 
              type="email" 
              name="email" 
              placeholder='Email'
              value={email}
              id="email"
              onChange={(e)=>setEmail(e.target.value)} 
              className='focus:outline-none h-10 p-1 w-full bg-transparent' 
              required/>
            </div>

            {/* Password */}
            <div className='flex justify-start items-center gap-2 h-10 bg-white rounded-lg w-full shadow-lg'>
                <PiPassword className='ml-2 text-orange-600' size={22}/>
                <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder='Mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='focus:outline-none h-10 p-1 w-full bg-transparent'
                required />
            </div>

            {/* Confirm Password */}
            <div className='flex justify-start items-center gap-2 h-10 bg-white rounded-lg w-full shadow-lg'>
                <PiPassword className='ml-2 text-orange-600' size={22}/>
                <input 
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirmer le mot de passe' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='focus:outline-none h-10 p-1 w-full bg-transparent'
                required />
            </div>

            <div className='flex items-center gap-2'>
              <input 
                type="checkbox" 
                id="showPass"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} 
                className='cursor-pointer' />
              <label htmlFor="showPass" className='text-sm cursor-pointer text-gray-400'>Afficher le mot de passe</label>
            </div>

            <div className='w-full'>
                <button 
                  type="submit" 
                  className='w-full bg-orange-600 text-white font-semibold px-4 py-2 
                  rounded hover:bg-orange-500 transition-colors disabled:bg-orange-300 duration-300 shadow-lg'
                  disabled={loading}>
                  {loading ? 'Inscription en cours...' : "S'inscrire"}
                </button>
                {erreur && <p className='text-red-500 text-sm mt-2 font-medium text-center'>{erreur}</p>}
            </div>
            
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className='text-xs text-cyan-300 hover:underline w-full text-center'>
              Déjà un compte ? Se connecter
            </button>
        </form>
      </div>
    </div>
  )
}

export default Inscrire;