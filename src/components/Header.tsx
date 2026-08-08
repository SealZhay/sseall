import React, { useState } from 'react';
import { Menu, X, MessageCircle, Phone, Snowflake } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../config';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Главная', path: '/' },
    { label: 'Каталог', path: '/catalog' },
    { label: 'О компании', path: '/about' },
    { label: 'Контакты', path: '/contacts' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white transition-all overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('/')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30 group-hover:bg-sky-500 transition-colors">
              <Snowflake className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-wider text-white flex items-center gap-1 font-mono">
                ESSE<span className="text-sky-400">.KZ</span>
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium hidden sm:block">
                Коммерческий холод
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path === '/catalog' && currentPath.startsWith('/product'));
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-sm font-medium transition-colors hover:text-sky-400 py-1 border-b-2 ${
                    isActive 
                      ? 'text-sky-400 border-sky-400 font-semibold' 
                      : 'text-slate-300 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${STORE_CONFIG.phonePrimary.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-800/50"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span className="font-semibold">{STORE_CONFIG.phonePrimary}</span>
            </a>

            <a
              href={getWhatsAppLink('Здравствуйте! Нужна консультация по холодильному оборудованию ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu & WhatsApp Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={getWhatsAppLink('Здравствуйте! Нужна консультация по холодильному оборудованию ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#25D366] text-white shadow-sm hover:bg-[#20ba5a]"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              aria-label="Переключить меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left px-4 py-3 rounded-lg font-medium text-base transition-colors ${
                    isActive 
                      ? 'bg-sky-600/20 text-sky-400 font-semibold' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={`tel:${STORE_CONFIG.phonePrimary.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 text-white font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Позвонить: {STORE_CONFIG.phonePrimary}</span>
            </a>

            <a
              href={getWhatsAppLink('Здравствуйте! Нужна консультация по холодильному оборудованию ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
