import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaPhone } from 'react-icons/fa';
import { BiDollar, BiEdit, BiTrash } from 'react-icons/bi';
import { IoIosSync } from 'react-icons/io';
import { MdCalendarToday } from 'react-icons/md';

const Liste = () => {
  const [visiteurs, setVisiteurs] = useState([]);
  const [filteredVisiteurs, setFilteredVisiteurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour le Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedVisiteur, setSelectedVisiteur] = useState({
    id: '', Nom: '', Numero: '', Jours: '', TarifJornalier: ''
  });

  const fetchVisiteurs = async () => {
    try {
      setLoading(true);
      const reponse = await axios.get('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/lister.php');
      setVisiteurs(reponse.data);
      setFilteredVisiteurs(reponse.data);
    } catch (err) {
      setErreur('Impossible de charger les visiteurs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisiteurs();
  }, []);

  // Logique de recherche
  useEffect(() => {
    const results = visiteurs.filter(v =>
      v.Nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.Numero.includes(searchTerm)
    );
    setFilteredVisiteurs(results);
  }, [searchTerm, visiteurs]);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce visiteur ?")) return;
    try {
      const res = await axios.get(`http://localhost/Delegg-Hub/sapvisiteur/src/Backend/Delete.php?id=${id}`);
      if (res.data.status === "success") {
        setSuccess('Visiteur supprimé avec succès');
        // Mise à jour locale pour éviter un fetch
        setVisiteurs(visiteurs.filter(v => v.id !== id));
      } else {
        setErreur(res.data.message);
      }
    } catch (err) {
      setErreur("Erreur lors de la suppression");
    }
  };

  const handleEditClick = (v) => {
    setSelectedVisiteur(v);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Ici tu ajouteras ton appel axios.post vers Update.php
    console.log("Données à envoyer :", selectedVisiteur);
    setSuccess("Modification enregistrée (Simulation)");
    setShowModal(false);
    fetchVisiteurs(); // Recharger la liste
  };

  if (loading) return <div className="text-center mt-10 text-white text-xl">Chargement...</div>;

  return (
    <div className='p-8 w-full h-full relative'>
      <div className='bg-slate-200 rounded-xl shadow-2xl overflow-hidden'>
        <div className='bg-slate-950 p-6 flex flex-col md:flex-row justify-between items-center gap-4'>
          <h1 className='text-2xl font-bold text-white'>Liste des Visiteurs</h1>
          <div className='flex items-center gap-5 w-full md:w-auto'>
            <input 
              type="text" 
              className='h-10 rounded-lg flex-1 md:w-60 bg-slate-100 px-3 focus:ring-2 focus:ring-orange-500 outline-none' 
              placeholder='Rechercher un nom...' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={fetchVisiteurs}
              className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors flex items-center gap-2 font-semibold whitespace-nowrap'
            >
              <IoIosSync /> Actualiser
            </button>
          </div>
        </div>

        {(erreur || success) && (
            <div className={`p-4 text-center font-bold ${erreur ? 'text-red-500' : 'text-green-600'}`}>
                {erreur || success}
            </div>
        )}

        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-300 text-orange-700 uppercase text-sm'>
                <th className='py-3 px-6 border-b border-gray-400'>Nom</th>
                <th className='py-3 px-6 border-b border-gray-400'>Numéro</th>
                <th className='py-3 px-6 border-b border-gray-400 text-center'>Jours</th>
                <th className='py-3 px-6 border-b border-gray-400'>Tarif</th>
                <th className='py-3 px-6 border-b border-gray-400 font-bold'>Total</th>
                <th className='py-3 px-6 border-b border-gray-400'>Action</th>
              </tr>
            </thead>
            <tbody className='text-slate-700 text-sm font-light'>
              {filteredVisiteurs.map((v) => (
                <tr key={v.id} className='border-b border-gray-300 hover:bg-slate-100 transition-colors'>
                  <td className='py-3 px-6 flex items-center gap-2'>
                    <FaUser className='text-blue-900' /> {v.Nom}
                  </td>
                  <td className='py-3 px-6'><FaPhone className='inline mr-2 text-gray-500' /> {v.Numero}</td>
                  <td className='py-3 px-6 text-center font-medium'>{v.Jours}</td>
                  <td className='py-3 px-6 whitespace-nowrap'>{parseFloat(v.TarifJornalier).toLocaleString()} Ar</td>
                  <td className='py-3 px-6 font-bold text-blue-900 whitespace-nowrap'>{parseFloat(v.Total).toLocaleString()} Ar</td>
                  <td className='py-3 px-6'>
                    <div className='flex items-center gap-6'>
                        <BiTrash
                            size={20}
                            onClick={() => handleDelete(v.id)}
                            className='text-red-600 cursor-pointer hover:scale-125 duration-300' 
                        />
                        <BiEdit 
                            size={20} 
                            onClick={() => handleEditClick(v)}
                            className='text-green-700 cursor-pointer hover:scale-125 duration-300' 
                        />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVisiteurs.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500 italic">Aucun visiteur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE MODIFICATION */}
      {showModal && (
        <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4'>
          <form 
            onSubmit={handleUpdate}
            className='flex flex-col space-y-5 bg-slate-900 p-8 w-full max-w-md rounded-2xl shadow-2xl border border-slate-700'
          >
            <h1 className='text-orange-500 font-bold text-3xl text-center mb-4'>Modifications</h1>
            
            <div className='space-y-4'>
                <div className='flex flex-col gap-1'>
                    <label className='text-gray-300 text-sm'>Nom du visiteur</label>
                    <div className='flex items-center gap-2 bg-white p-2 rounded-lg'>
                        <FaUser className='text-orange-500' />
                        <input 
                            type="text" 
                            className='outline-none text-black w-full'
                            value={selectedVisiteur.Nom}
                            onChange={(e) => setSelectedVisiteur({...selectedVisiteur, Nom: e.target.value})}
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-gray-300 text-sm'>Numéro</label>
                    <div className='flex items-center gap-2 bg-white p-2 rounded-lg'>
                        <FaPhone className='text-orange-500' />
                        <input 
                            type="text" 
                            className='outline-none text-black w-full'
                            value={selectedVisiteur.Numero}
                            onChange={(e) => setSelectedVisiteur({...selectedVisiteur, Numero: e.target.value})}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>Jours</label>
                        <div className='flex items-center gap-2 bg-white p-2 rounded-lg'>
                            <MdCalendarToday className='text-orange-500' />
                            <input 
                                type="number" 
                                className='outline-none text-black w-full'
                                value={selectedVisiteur.Jours}
                                onChange={(e) => setSelectedVisiteur({...selectedVisiteur, Jours: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-gray-300 text-sm'>Tarif (Ar)</label>
                        <div className='flex items-center gap-2 bg-white p-2 rounded-lg'>
                            <BiDollar className='text-orange-500'/>
                            <input 
                                type="number" 
                                className='outline-none text-black w-full'
                                value={selectedVisiteur.TarifJornalier}
                                onChange={(e) => setSelectedVisiteur({...selectedVisiteur, TarifJornalier: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-end items-center gap-4 mt-6'>
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                Annuler
              </button>
              <button 
                type="submit"
                className='bg-green-600 px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-500 transition-all font-bold'
              >
                <BiEdit/> Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Liste;