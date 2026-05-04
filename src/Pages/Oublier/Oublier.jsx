import axios from 'axios';
import React, { useState } from 'react'
import { BiWorld } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Oublier = () => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  //etape 1, l'envoi du code
  const handlesendOtp = async () =>{
    if (!email) {
    setError("Email requis");
    return;
    }

    try{
      setError('');
      setMessage('');
      const res = await axios.post('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/send_otp.php', { identifier: email });
      if(res.data.status === "success"){
        setMessage(res.data.message || 'Code envoyé avec succès.');
        setStep(2);
      } else {
        setError(res.data.message || 'Erreur lors de l’envoi du code.');
      }
    }catch(err){
      console.log(err);
      setError('Erreur serveur lors de l’envoi du code OTP.');
    }
  }

  //etape 2, verification du code otp
  const handleverifyOtp = async () =>{
    try{
      setError('');
      setMessage('');
      const res = await axios.post('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/verify_otp.php', { identifier: email, otp: otp });
      if(res.data.status === "success"){
        setMessage('Code vérifié. Vous pouvez changer votre mot de passe.');
        setStep(3);
      } else {
        setError(res.data.message);
      }
    }catch(err){
      console.log(err);
      setError('Erreur serveur lors de la vérification OTP.');
    }
  }

  //etape 3 nouveau mdp
 const handleresetOtp = async () => {
  try {
    setError('');
    setMessage('');

    const res = await axios.post(
      'http://localhost/Delegg-Hub/sapvisiteur/src/Backend/reset_otp.php',
      { identifier: email, password: newpassword }
    );

    if (res.data.status === "success") {
      setMessage("Mot de passe changé avec succès");
      setStep(1);
      setEmail('');
      setOtp('');
      setNewpassword('');
      navigate('/')
      
    } else {
      setError(res.data.message);
    }

  } catch (err) {
    console.log(err);
    setError('Erreur serveur lors du changement de mot de passe.');
  }
}
  return (
    <div className='bg-slate-300 w-full h-screen'>
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <div className="bg-slate-900 p-8 rounded-lg shadow-md w-96 text-white">

        {step === 1 && (
          <div className="flex flex-col gap-4">
              <p className='flex justify-start items-center'><BiWorld size={40}/>SPAvisiteur</p>
              <h2 className="text-xl font-bold">Mot de passe oublié ?</h2>
            <p className="text-sm text-gray-500">Entrez votre email pour recevoir un code.</p>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
           <div className='flex justify-start items-center bg-white rounded-lg px-2 py-1'>
             <MdEmail size={25} className='text-orange-400'/>
            <input type="email" placeholder="Email" className=" text-slate-900 w-full focus:outline-none p-2 rounded" value={email} onChange={(e)=>setEmail(e.target.value)} />
           </div>
            <button  onClick={handlesendOtp} className="bg-orange-600 text-white py-2 rounded hover:bg-orange-400 duration-300">Recevoir le code</button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Vérification</h2>
            <p className="text-sm text-gray-500">Entrez le code envoyé à {email}</p>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <input type="text" placeholder="Code OTP" className="border p-2 rounded" value={otp} onChange={(e)=>setOtp(e.target.value)}/>
            <button onClick={handleverifyOtp} className="bg-green-600 text-white py-2 rounded">Vérifier le code</button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Nouveau mot de passe</h2>
            {message && <p className="text-sm text-green-600">{message}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <input type="password" placeholder="Nouveau mot de passe" className="border p-2 rounded" value={newpassword} onChange={(e)=>setNewpassword(e.target.value)}/>
            <button onClick={handleresetOtp} className="bg-orange-600 text-white py-2 rounded">Changer le mot de passe</button>
          </div>
        )}

      </div>
    </div>
    </div>
  )
}

export default Oublier
