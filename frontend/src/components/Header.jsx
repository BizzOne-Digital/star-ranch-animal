import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS } from '../utils/constants';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" aria-label="Star Ranch Animal Sanctuary Home">
          <Logo size="sm" />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`} aria-label="Main navigation">
          <ul className="header__links">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`header__link ${location.pathname === path ? 'header__link--active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/support" className="btn btn-primary btn-sm header__cta-drawer">
            <Heart size={16} /> Support Our Sanctuary
          </Link>
        </nav>

        <Link to="/support" className="btn btn-primary btn-sm header__cta">
          <Heart size={16} /> Support Our Sanctuary
        </Link>

        <button
          className="header__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
