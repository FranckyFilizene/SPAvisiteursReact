import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import './Layout.scss';

const Layout = () => {
  // État pour savoir si le menu est affiché ou non
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    /* On ajoute une classe dynamique 'menu-closed' si isMenuOpen est faux */
    <div className={`layout-container ${!isMenuOpen ? 'menu-closed' : ''}`}>
      <header className="header-area bg-slate-950">
        {/* On passe la fonction toggle au Header */}
        <Header onMenuClick={toggleMenu} />
      </header>

      <nav className="navbar-area bg-slate-950">
        <Navbar />
      </nav>

      <main className="content-area bg-slate-200">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;