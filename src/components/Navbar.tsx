import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: '首页', href: '/' },
    { path: '/courses', label: '课程', href: '#courses' },
    { path: '/achievements', label: '成就', href: '/achievements' },
    { path: '/about', label: '关于', href: '#about' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'}`}>
      <div className="container-custom">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center group animate-fade-in"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                EduPlatform
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path.startsWith('/') ? link.path : '/'}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === link.path || 
                  (link.href.startsWith('#') && location.pathname === '/')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-background-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="btn-primary text-sm px-5 py-2.5 animate-fade-in animate-delay-300">
              登录
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-background-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center">
                <span 
                  className={`w-full h-0.5 bg-background-700 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`w-full h-0.5 bg-background-700 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`w-full h-0.5 bg-background-700 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-background-100 animate-fade-in-down">
          <div className="container-custom py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path.startsWith('/') ? link.path : '/'}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === link.path || 
                  (link.href.startsWith('#') && location.pathname === '/')
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-background-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
