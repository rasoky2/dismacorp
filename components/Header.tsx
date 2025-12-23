'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, HardHat, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (pathname !== '/') {
      window.location.href = `/${href}`;
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Productos', href: '#productos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-gray-100' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary shadow-sm'}`}>
            <HardHat size={28} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none ${isScrolled ? 'text-primary' : 'text-white'}`}>
              DISMA<span className="text-secondary">CORP</span>
            </span>
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1 ${isScrolled ? 'text-primary' : 'text-white'}`}>
              Construcción
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-10">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative font-bold text-sm uppercase tracking-widest transition-all hover:text-secondary group cursor-pointer ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild className={`hidden md:flex items-center gap-2 rounded-full font-bold text-xs uppercase tracking-widest h-12 px-8 transition-all shadow-md ${
              isScrolled 
                ? 'bg-primary text-white hover:bg-secondary' 
                : 'bg-white text-primary hover:bg-secondary hover:text-white'
            }`}>
            <Link href="https://wa.me/51965282183" target="_blank" rel="noopener noreferrer">
              <Phone size={16} />
              Llamar ahora
            </Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-primary hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <button 
          className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        <div className="flex flex-col items-center gap-6 mb-12">
            <div className="bg-white p-3 rounded-2xl text-primary shadow-2xl">
                <HardHat size={48} />
            </div>
            <span className="text-3xl font-black text-white tracking-widest">DISMACORP</span>
        </div>
        <ul className="text-center space-y-8">
          {navLinks.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-white text-3xl font-black uppercase tracking-tighter hover:text-accent transition-colors block px-4 py-2 cursor-pointer"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-16 w-full px-12">
            <Button asChild size="lg" className="w-full h-16 bg-secondary text-white rounded-2xl font-black uppercase tracking-widest text-lg">
                <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>
                    Contactar Ahora
                </a>
            </Button>
        </div>
      </div>
    </header>
  );
}
