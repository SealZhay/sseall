import React from 'react';
import { Snowflake, Phone, MapPin, Clock, Mail, MessageCircle } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../config';
import { CATEGORIES } from '../data/products';

interface FooterProps {
  onNavigate: (path: string, category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <div 
              onClick={() => onNavigate('/')}
              className="cursor-pointer flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold">
                <Snowflake className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-mono tracking-wider">
                ESSE<span className="text-sky-400">.KZ</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Коммерческое холодильное оборудование для кафе, ресторанов, супермаркетов, пекарен и магазинов в Казахстане. 
            </p>

            <a
              href={getWhatsAppLink('Здравствуйте! Нужна консультация по холодильному оборудованию ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-medium text-sm hover:bg-[#20ba5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Консультация в WhatsApp</span>
            </a>
          </div>

          {/* Catalog Categories */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">Каталог оборудования</h3>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate('/catalog', cat)}
                    className="hover:text-sky-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Info */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">Информация</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-sky-400 transition-colors">
                  Главная
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/catalog')} className="hover:text-sky-400 transition-colors">
                  Каталог холодильных витрин
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-sky-400 transition-colors">
                  О компании ESSE.KZ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contacts')} className="hover:text-sky-400 transition-colors">
                  Контакты и реквизиты
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <div>
                  <a href={`tel:${STORE_CONFIG.phonePrimary.replace(/[^0-9+]/g, '')}`} className="text-white font-medium hover:text-sky-400 block">
                    {STORE_CONFIG.phonePrimary}
                  </a>
                  <a href={`tel:${STORE_CONFIG.phoneSecondary.replace(/[^0-9+]/g, '')}`} className="text-slate-400 hover:text-sky-400 block text-xs">
                    {STORE_CONFIG.phoneSecondary}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <a href={`mailto:${STORE_CONFIG.email}`} className="hover:text-sky-400">
                  {STORE_CONFIG.email}
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>{STORE_CONFIG.address}</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>{STORE_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.name}. Все права защищены. Коммерческое холодильное оборудование.
          </div>
          <div className="text-slate-400">
            Официальный поставщик холодильных витрин в Казахстане
          </div>
        </div>
      </div>
    </footer>
  );
};
