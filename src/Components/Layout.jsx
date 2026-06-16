import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import { useTheme } from './ThemeContext';
import './Layout.scss';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`layout-container min-h-screen transition-colors duration-300 ${!isMenuOpen ? 'menu-closed' : ''}`}
      style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc', color: isDark ? '#f8fafc' : '#0f172a' }}
    >
      <header
        className="header-area shadow-sm"
        style={{ backgroundColor: isDark ? '#020617' : '#ffffff', color: isDark ? '#f8fafc' : '#0f172a' }}
      >
        <Header onMenuClick={toggleMenu} />
      </header>

      <nav className="navbar-area" style={{ backgroundColor: isDark ? '#020617' : '#f1f5f9' }}>
        <Navbar />
      </nav>

      <main className="content-area p-4 transition-colors duration-300" style={{ backgroundColor: isDark ? '#111827' : '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;