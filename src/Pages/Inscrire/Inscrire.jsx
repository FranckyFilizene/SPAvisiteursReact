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

      const reponse = await axios.post('http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/Inscription.php', {
        name: name,
        password: password,
        email: email
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
    <div className="min-h-screen w-full flex justify-center items-center bg-slate-950 p-4">
      {/* Container Principal avec Glassmorphism léger */}
      <div className="bg-slate-900 w-full max-w-md p-8 rounded-2xl border border-slate-800 shadow-2xl ring-1 ring-white/5">

        {/* Header avec ligne d'accent orange pro */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-black tracking-tight italic">
            INSCRIPTION<span className="text-orange-500">.</span>
          </h1>
          <div className="h-1 w-12 bg-orange-600 mt-2 rounded-full"></div>
          <p className="text-slate-400 text-sm mt-3 font-medium">Rejoignez l'aventure SPA Visiteur.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-5">

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nom Complet</label>
            <div className="flex items-center gap-3 h-12 bg-slate-950 border border-slate-800 rounded-xl px-3 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-300">
              <CgProfile className="text-orange-500" size={20} />
              <input
                type="text"
                placeholder="Ex: John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Professionnel</label>
            <div className="flex items-center gap-3 h-12 bg-slate-950 border border-slate-800 rounded-xl px-3 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-300">
              <MdEmail className="text-orange-500" size={20} />
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* Password Group (Ligne par ligne pour le pro) */}
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mot de passe</label>
              <div className="flex items-center gap-3 h-12 bg-slate-950 border border-slate-800 rounded-xl px-3 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <PiPassword className="text-orange-600" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmation</label>
              <div className="flex items-center gap-3 h-12 bg-slate-950 border border-slate-800 rounded-xl px-3 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                <PiPassword className="text-orange-600" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:outline-none w-full bg-transparent text-slate-200 placeholder:text-slate-600 text-sm font-medium"
                  required
                />
              </div>
            </div>
          </div>

          {/* Utils */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-orange-600 focus:ring-orange-500 focus:ring-offset-slate-900 transition-all cursor-pointer"
              />
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Afficher les mots de passe</span>
            </label>
          </div>

          {/* Boutons d'action */}
          <div className="pt-4 space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white font-black py-4 rounded-xl hover:bg-orange-500 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-orange-900/20 disabled:bg-slate-700 uppercase tracking-widest text-sm"
            >
              {loading ? (
                <span className="flex justify-center items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Validation...
                </span>
              ) : "Créer le compte"}
            </button>

            {erreur && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 py-2 rounded-lg text-center font-bold">
                ⚠ {erreur}
              </p>
            )}

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full text-center text-sm font-bold text-slate-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Déjà un compte ? <span className="underline italic">Se connecter</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Inscrire;