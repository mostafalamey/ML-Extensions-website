import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import MLExtensionsLogo from '../assets/ml_extensions_logo.svg';

interface ProductNavbarProps {
  productName: string;
  gumroadUrl: string;
  className?: string;
}

export const ProductNavbar: React.FC<ProductNavbarProps> = ({ 
  productName,
  gumroadUrl, 
  className = '' 
}) => {
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
    { href: '#problem', label: 'Problem' },
    { href: '#solution', label: 'Solution' },
    { href: '#features', label: 'Features' },
    { href: '#workflow', label: 'Workflow' },
    { href: '#who-its-for', label: 'Users' },
    { href: '#compatibility', label: 'Compatibility' }
  ];

  const linkStyle = {
    color: 'var(--color-text-primary)',
    textDecoration: 'none',
    padding: 'var(--spacing-2) var(--spacing-3)',
    borderRadius: 'var(--border-radius)',
    transition: 'var(--transition)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500',
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const
  };

  const linkHoverStyle = {
    color: 'var(--color-accent)',
    backgroundColor: 'rgba(218, 165, 32, 0.1)'
  };

  return (
    <nav className={`product-navbar ${isNavbarHidden ? 'hidden' : ''} ${className}`}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        
        {/* Brand Section with Home Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', flexShrink: 0 }}>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              cursor: 'pointer'
            }}
          >
            {productName}
          </a>
          
          <Link 
            to="/" 
            style={{
              ...linkStyle,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
              color: 'var(--color-text-secondary)',
              flexShrink: 0,
              minWidth: 'auto'
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent', color: 'var(--color-text-secondary)' })}
          >
            <img src={MLExtensionsLogo} alt="Home" width="\36" height="36" />
            <span>Home</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-2)'
          }} 
          className="product-navbar-desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={linkStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}
              onClick={closeMobileMenu}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA and Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <div className="product-navbar-desktop-cta">
            <Button 
              href={gumroadUrl}
              target="_blank"
              variant="primary"
              icon={<ExternalLink size={16} />}
              className="product-navbar-cta-button"
            >
              Buy on Gumroad
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text)',
              cursor: 'pointer',
              padding: 'var(--spacing-2)'
            }}
            className="product-navbar-mobile-menu-button"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: 'calc(var(--spacing-6) + 70px)',
            left: '50%',
            transform: 'translateX(-50%)',
            maxWidth: '900px',
            width: 'calc(100% - 48px)',
            background: 'rgba(28, 28, 28, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: 'var(--spacing-4)'
          }} className="product-navbar-mobile-menu">
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 'var(--spacing-3)',
              marginBottom: 'var(--spacing-4)'
            }}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    ...linkStyle,
                    textAlign: 'center',
                    padding: 'var(--spacing-3)'
                  }}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            <Button 
              href={gumroadUrl}
              target="_blank"
              variant="primary"
              icon={<ExternalLink size={16} />}
              className="product-navbar-mobile-cta-button"
            >
              Buy on Gumroad
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};