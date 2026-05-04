import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { PiPassword } from 'react-icons/pi';
import { BiWorld } from 'react-icons/bi';

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
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/login.php', {
        name : username,
        password : password
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
    <div className='bg-slate-200 h-screen w-screen flex justify-center items-center'>
      <div className='flex flex-col bg-slate-950 px-4 py-6 rounded-lg w-96 space-y-6 shadow-2xl border-[1px]'>
        <h1 className=' gap-2 text-3xl font-bold text-center text-white h-20 flex justify-center items-center rounded-lg'>
          <BiWorld size={40}/>SPA Visiteur
        </h1>

        <form onSubmit={handleLogin} className='space-y-4'>

          {/* Username */}
          <div className='shadow-lg'>
            <label className='text-slate-300'>Nom d'utilisateur :</label>
            <div className='flex items-center gap-3 p-2 rounded-lg bg-white'>
              <CgProfile className='text-orange-400' size={22} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                className='w-full focus:outline-none'
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className='shadow-lg'>
            <label className='text-slate-300'>Mot de passe :</label>
            <div className='flex items-center gap-3 p-2 rounded-lg bg-white'>
              <PiPassword className='text-orange-400' size={22} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                className='w-full focus:outline-none'
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {/* Show password */}
          <div className='flex justify-between items-center gap-2 text-sm'>
            <div>
              <input
              className='shadow-lg'
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className='text-gray-500'>Afficher le mot de passe</span>
            </div>
            <div>
                <Link to="/forgetpassword"  className='text-red-700 underline text-[12px]'>mot de pass oublié ?</Link>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className='text-red-500 text-[10px] text-center'>
              {error}
            </p>
          )}

          {/* Actions */}
          <div className='flex justify-between items-center'>
            <button
              type="submit"
              disabled={loading}
              className='mt-4 bg-orange-600 px-5 py-2 text-white font-bold rounded hover:bg-orange-400 disabled:opacity-50 shadow-sm duration-300'
            >
              {loading ? "Connexion..." : "Login"}
            </button>

            <Link to='/inscrire' className='text-cyan-600 hover:underline font-bold'>
              S'inscrire
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;