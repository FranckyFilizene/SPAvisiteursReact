import React, { useState } from 'react';
import { FaPhoneAlt, FaPortrait } from "react-icons/fa";
import { MdCalendarToday, MdAttachMoney } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { IoIosSync } from "react-icons/io";
import axios from 'axios';


const Ajouter = () => {

  const[success, setSuccess] = useState('');
  const[erreur, setErreur] = useState('');
  const[loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    numero: '',
    nom: '',
    jours: '',
    tarifjournalier: ''
  });
  
  const handleReset = (e) => {
    setFormData({
      numero: '',
      nom: '',
      jours: '',
      tarifjournalier: ''
    })
    setSuccess('');
    setErreur('');
  }

  const handleClick = async (e) => {
  e.preventDefault();

  if (!formData.numero || !formData.nom || !formData.jours || !formData.tarifjournalier) {
    setErreur('Veuillez remplir tous les champs');
    return;
  }

  try {
    setLoading(true);
    setErreur('');
    setSuccess('');

    const response = await axios.post(
      'http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/ajouter.php',
      {
        numero: formData.numero,
        nom: formData.nom,
        jours: formData.jours,
        tarifjournalier: formData.tarifjournalier
      }
    );

    const data = response.data;

    if (data.status === "success") {
      setSuccess(data.message);   // message PHP
      setErreur('');
    } else {
      setErreur(data.message);    // message PHP erreur (ex: existe déjà)
      setSuccess('');
    }

  } catch (err) {
    console.error(err);
    setErreur("Erreur serveur, veuillez réessayer");
    setSuccess('');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className='flex justify-center items-center h-full w-full p-4'>
      {/* Container principal */}
      <div className='flex flex-col gap-8 h-fit w-full max-w-4xl bg-slate-200 rounded-xl shadow-2xl p-8 dark:bg-slate-800 dark:shadow-lg'>
        
        <h1 className='text-2xl text-orange-700 font-bold border-b-2 dark:text-orange-600 border-gray-400 pb-2 w-full'>
          Ajouter un nouveau visiteur
        </h1>

        <form className='flex flex-col space-y-8 w-full' onSubmit={handleClick}>
          
          {/* Ligne 1 : Numéro et Nom */}
          <div className='flex flex-col md:flex-row justify-between gap-6 w-full'>
            <div className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor="Number" className="font-medium text-slate-700 dark:text-slate-300">Numéro du visiteur</label>
              <div className='w-full bg-white dark:bg-slate-900 h-12 rounded-lg flex items-center px-3 shadow-md gap-3 focus-within:ring-1 focus-within:ring-orange-400 transition-all'>
                <FaPhoneAlt size={18} className='text-orange-300'/>
                <input 
                  type="text" 
                  id="Number" 
                  name="Number" 
                  className='w-full focus:outline-none bg-transparent' 
                  placeholder='Ex: 034 00 000 00'
                  value ={formData.numero}
                  onChange={(e)=> setFormData({...formData, numero: e.target.value})}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor="Name" className="font-medium text-slate-700 dark:text-slate-300">Nom du visiteur</label>
              <div className='w-full bg-white dark:bg-slate-900 h-12 rounded-lg flex items-center px-3 shadow-md gap-3 focus-within:ring-1 focus-within:ring-orange-400 transition-all'>
                <FaPortrait size={20} className='text-orange-300'/>
                <input 
                  type="text" 
                  id="Name" 
                  name="Name" 
                  className='w-full focus:outline-none bg-transparent' 
                  placeholder='Nom complet'
                  value={formData.nom}
                  onChange={(e)=>setFormData({...formData, nom: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Ligne 2 : Jours et Tarif */}
          <div className='flex flex-col md:flex-row justify-between gap-6 w-full'>
            <div className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor="jour" className="font-medium text-slate-700 dark:text-slate-300">Nombre de jours</label>
              <div className='w-full bg-white dark:bg-slate-900 h-12 rounded-lg flex items-center px-3 shadow-md gap-3 focus-within:ring-1 focus-within:ring-orange-400 transition-all'>
                <MdCalendarToday size={20} className='text-orange-300'/>
                <input 
                  type="number" 
                  id="jour" 
                  name="jour" 
                  className='w-full focus:outline-none bg-transparent' 
                  placeholder='0'
                 value={formData.jours}
                 onChange={(e)=>setFormData({...formData,jours: e.target.value})}
                />
              </div>
            </div>

            <div className='flex flex-col gap-2 w-full md:w-[48%]'>
              <label htmlFor="tarif" className="font-medium text-slate-700 dark:text-slate-300">Tarif journalier (Ar)</label>
              <div className='w-full bg-white dark:bg-slate-900 h-12 rounded-lg flex items-center px-3 shadow-md gap-3 focus-within:ring-1 focus-within:ring-orange-400 transition-all'>
                <MdAttachMoney size={20} className='text-orange-300'/>
                <input 
                  type="number" 
                  id="tarif" 
                  name="tarif" 
                  step="0.01" 
                  className='w-full focus:outline-none bg-transparent' 
                  placeholder='0.00'
                  value={formData.tarifjournalier}
                  onChange={(e)=>setFormData({...formData, tarifjournalier: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Boutons d'actions */}
          <div className='flex flex-col md:flex-row justify-center items-center gap-5 pt-4'>
            <button 
              type="submit" 
               onClick={handleClick}
               className='flex items-center gap-2 bg-orange-700 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 hover:scale-[1.03] transition-all font-semibold'>
              <IoSaveOutline size={20} />
              {loading ? 'Enregistrement...' : 'Enregistrer'} 
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className='flex items-center gap-2 bg-slate-950 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-slate-800 hover:scale-[1.03] transition-all font-semibold'
            >
              <IoIosSync size={20} />
              Réinitialiser
            </button>
          </div>
          <div className='flex flex-col justify-center items-center w-full'>
           <p className='text-green-500 font-semibold'>{success}</p>
           <p className='text-red-500 font-semibold'>{erreur}</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Ajouter;