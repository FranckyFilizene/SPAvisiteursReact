import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { PiPassword } from 'react-icons/pi';
import { BiWorld } from 'react-icons/bi';
import {
  FaEye,
  FaEyeSlash,
  FaUser
} from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useremail, setUseremail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 🔹 Redirection si déjà connecté
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/dashbord");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (username.trim() === '' || password.trim() === '') {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost/Delegg-Hub/SPAVisiteursReact/src/Backend/login.php', {
        name: username,
        password: password
      });

      if (response?.data?.status === "success") {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('emailuser', response.data.email);

        navigate('/dashbord');
      } else {
        setError(response?.data?.message || 'Identifiants incorrects');
      }

    } catch (err) {
      console.error(err);
      setError("Erreur serveur, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-1'>

      {/* Card Container */}
      <div className='flex flex-col bg-slate-900/50 backdrop-blur-xl px-10 py-3 rounded-2xl w-full max-w-md space-y-8 shadow-2xl border border-slate-800 ring-1 ring-white/5'>

        {/* Header / Logo */}
        <div className='text-center space-y-2'>
          <div className='flex justify-center items-center gap-3 text-orange-500'>
            <BiWorld size={48} className='drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]' />
          </div>
          <h1 className='text-3xl font-black tracking-tight text-white'>
            SPA <span className='text-orange-500'>Visiteur</span>
          </h1>
          <p className='text-slate-400 text-sm font-medium'>Accédez à votre tableau de bord</p>
        </div>

        <form onSubmit={handleLogin} className='space-y-6'>

          {/* Username */}
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-slate-300 ml-1'>Nom d'utilisateur</label>
            <div className='group flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-700 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-300'>
              <CgProfile className='text-slate-500 group-focus-within:text-orange-400 transition-colors' size={22} />
              <input
                type="text"
                placeholder="Ex: Jean Dupont"
                value={username}
                className='w-full bg-transparent text-white placeholder:text-slate-600 focus:outline-none'
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <label className='text-sm font-semibold text-slate-300 ml-1'>Mot de passe</label>
            <div className='group flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-700 focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all duration-300'>
              <PiPassword className='text-slate-500 group-focus-within:text-orange-400 transition-colors' size={22} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                className='w-full bg-transparent text-white placeholder:text-slate-600 focus:outline-none'
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
              <button
              type='button'
              onClick={()=>setShowPassword(!showPassword)}
              >
                {
                  showPassword ? <FaEyeSlash className='text-slate-300'/> : <FaEye className='text-slate-300'/>
                }
              </button>
            </div>
          </div>

          {/* Options secondaires */}
          <div className='flex justify-between items-center text-xs'>
            <label className='flex items-center gap-2 cursor-pointer group'>
              <div className='relative flex items-center'>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className='peer appearance-none w-4 h-4 border border-slate-700 rounded bg-slate-800 checked:bg-orange-600 checked:border-orange-600 transition-all'
                />
                <v-icon name="fa-check" className='absolute w-3 h-3 text-white scale-0 peer-checked:scale-100 left-0.5 transition-transform' />
              </div>
              <span className='text-slate-400 group-hover:text-slate-300 transition-colors'>Afficher le mot de passe</span>
            </label>
            <Link to="/forgetpassword" className='text-orange-500/80 hover:text-orange-500 hover:underline font-medium'>
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Error Message */}
          <div className='min-h-[20px]'>
            {error && (
              <p className='text-red-400 text-xs text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20 animate-pulse'>
                {error}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className=''>
            <button
              type="submit"
              disabled={loading}
              className='w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-900/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all duration-200 uppercase tracking-wider text-sm'
            >
              {loading ? (
                <span className='flex justify-center items-center gap-2'>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Connexion en cours...
                </span>
              ) : "Se connecter"}
            </button>

            <div className='text-center'>
              <span className='text-slate-500 text-sm'>Nouveau ici ? </span>
              <Link to='/inscrire' className='text-white hover:text-orange-500 font-bold transition-colors text-sm'>
                Créer un compte
              </Link>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;