import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic2, User, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, switchToAdmin, switchToUser } = useApp();
  
  const navItems = [
    { path: '/', label: 'Нүүр' },
    { path: '/contact', label: 'Холбоо барих' },
    { path: '/rooms', label: 'Өрөө' },
    { path: '/products', label: 'Бүтээгдэхүүн' },
    { path: '/profile', label: 'Profile' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-logo">
          <Mic2 size={28} />
          <span>Алтантуяа</span>
        </Link>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {user?.isAdmin && (
            <Link
              to="/admin"
              className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Админ
            </Link>
          )}
          
          {/* Toggle between User and Admin for demo */}
          <button
            onClick={() => user?.isAdmin ? switchToUser() : switchToAdmin()}
            className="btn btn-outline"
            style={{ marginLeft: '8px' }}
          >
            {user?.isAdmin ? (
              <>
                <User size={16} />
                Хэрэглэгч
              </>
            ) : (
              <>
                <Shield size={16} />
                Админ
              </>
            )}
          </button>
        </div>
        
        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

