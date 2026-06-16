import axios from 'axios';
import React, { useState } from 'react'
import { BiWorld } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { MdEmail, MdLockReset, MdVpnKey } from 'react-icons/md';
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
  const handlesendOtp = async () => {
    if (!email) {
      setError("Email requis");
      return;
    }

    try {
      setError('');
      setMessage('');
      const res = await axios.post('http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/send_otp.php', { identifier: email });
      if (res.data.status === "success") {
        setMessage(res.data.message || 'Code envoyé avec succès.');
        setStep(2);
      } else {
        setError(res.data.message || 'Erreur lors de l’envoi du code.');
      }
    } catch (err) {
      console.log(err);
      setError('Erreur serveur lors de l’envoi du code OTP.');
    }
  }

  //etape 2, verification du code otp
  const handleverifyOtp = async () => {
    try {
      setError('');
      setMessage('');
      const res = await axios.post('http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/verify_otp.php', { identifier: email, otp: otp });
      if (res.data.status === "success") {
        setMessage('Code vérifié. Vous pouvez changer votre mot de passe.');
        setStep(3);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
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
        'http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/reset_otp.php',
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
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-950 p-4 font-sans">
      <div className="bg-slate-900 w-full max-w-md p-8 rounded-2xl border border-slate-800 shadow-2xl ring-1 ring-white/5 relative overflow-hidden">

        {/* Background Accent Decor */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl"></div>

        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-white mb-2">
            <BiWorld size={32} className="text-orange-500" />
            <span className="text-xl font-black tracking-tighter">SPA<span className="text-orange-500">VISITEUR</span></span>
          </div>
          <div className="h-1 w-12 bg-orange-600 rounded-full"></div>
        </div>

        {/* STEP 1: Email Request */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white text-center">Mot de passe oublié ?</h2>
              <p className="text-sm text-slate-400 text-center">Indiquez votre email pour recevoir votre code de sécurité.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email professionnel</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 h-12 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <MdEmail size={22} className="text-orange-500" />
                <input
                  type="email"
                  placeholder="nom@exemple.com"
                  className="bg-transparent text-slate-200 w-full focus:outline-none px-3 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handlesendOtp}
              className="w-full bg-orange-600 text-white font-black py-3.5 rounded-xl hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-900/20 uppercase tracking-widest text-sm"
            >
              Envoyer le code
            </button>
          </div>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white text-center">Vérification</h2>
              <p className="text-sm text-slate-400 text-center italic">Code envoyé à : <span className="text-orange-400 font-medium">{email}</span></p>
            </div>

            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Code de sécurité</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 h-14 mt-2 focus-within:border-green-500/50 focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                <MdVpnKey size={22} className="text-green-500" />
                <input
                  type="text"
                  placeholder="• • • • • •"
                  className="bg-transparent text-white w-full focus:outline-none px-3 text-center text-xl tracking-[0.5em] font-mono"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleverifyOtp}
              className="w-full bg-green-600 text-white font-black py-3.5 rounded-xl hover:bg-green-500 active:scale-[0.98] transition-all shadow-lg shadow-green-900/20 uppercase tracking-widest text-sm"
            >
              Vérifier le code
            </button>
          </div>
        )}

        {/* STEP 3: Reset Password */}
        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-white italic">Nouveau départ<span className="text-orange-500">.</span></h2>
              <p className="text-sm text-slate-400">Sécurisez votre compte avec un nouveau mot de passe.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 h-12 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <MdLockReset size={25} className="text-orange-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-transparent text-slate-200 w-full focus:outline-none px-3 text-sm"
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleresetOtp}
              className="w-full bg-orange-600 text-white font-black py-3.5 rounded-xl hover:bg-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-900/20 uppercase tracking-widest text-sm"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* Feedback Messages */}
        <div className="mt-6 min-h-[20px]">
          {message && <p className="text-xs text-center text-green-400 bg-green-400/10 py-2 rounded-lg border border-green-400/20 px-2">{message}</p>}
          {error && <p className="text-xs text-center text-red-400 bg-red-400/10 py-2 rounded-lg border border-red-400/20 px-2">{error}</p>}
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full text-sm font-bold text-slate-500 hover:text-white transition-colors"
          >
            <IoIosArrowBack /> Retour à la connexion
          </button>
        </div>
      </div>
    </div>
  )
}

export default Oublier
