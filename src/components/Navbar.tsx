import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import MLExtensionsLogo from '../assets/ml_extensions_logo.svg';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarHidden(true);
      } else {
        setIsNavbarHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home', active: true },
    { href: '/#products', label: 'Products' },
    { href: '/#learn', label: 'Learn' },
    { href: '/#about', label: 'About' },
    { href: '/#contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isNavbarHidden ? 'hidden' : ''} ${className}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={MLExtensionsLogo} alt="ML Extensions" width="36" height="36" />
            ML Extensions
          </Link>
          
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className={`navbar-link ${item.active && window.location.pathname === '/' ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <Button href="/#products" variant="primary" className="navbar-cta">
            View Products
          </Button>
          
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={MLExtensionsLogo} alt="ML Extensions" width="24" height="24" />
            ML Extensions
          </Link>
          <button className="mobile-menu-close" onClick={closeMobileMenu}>
            <X size={24} />
          </button>
        </div>
        
        <ul className="mobile-menu-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className={item.active && window.location.pathname === '/' ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        
        <Button href="/#products" variant="primary" onClick={closeMobileMenu}>
          View Products
        </Button>
      </div>
    </>
  );
};