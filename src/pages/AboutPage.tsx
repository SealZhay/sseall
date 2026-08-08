import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Wrench, 
  MessageCircle, 
  Phone, 
  CheckCircle2,
  Store,
  UtensilsCrossed,
  Cake,
  Beef,
  ShoppingBag
} from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../config';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const advantages = [
    {
      title: 'Профессиональная консультация',
      desc: 'Наши специалисты подберут витрины с учетом площади вашего торгового зала, температурного режима и нагрузки.',
      icon: Headphones,
    },
    {
      title: 'Помощь с подбором по чертежам',
      desc: 'Рассчитаем необходимый объем, длину витрин и схему их расположения для максимального удобства покупателей.',
      icon: Wrench,
    },
    {
      title: 'Официальная гарантия',
      desc: 'На всё поставляемое коммерческое оборудование предоставляется гарантия 12–24 месяца с паспортной документацией.',
      icon: ShieldCheck,
    },
    {
      title: 'Оперативная доставка',
      desc: 'Организуем аккуратную транспортировку оборудования в г. Алматы, Астана и во все регионы Республики Казахстан.',
      icon: Truck,
    },
  ];

  const categoriesServed = [
    { name: 'Кафе и кофейни', icon: UtensilsCrossed },
    { name: 'Рестораны и общепит', icon: Store },
    { name: 'Супермаркеты и магазины', icon: ShoppingBag },
    { name: 'Пекарни и кондитерские', icon: Cake },
    { name: 'Мясные и продуктовые лавки', icon: Beef },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 sm:p-14 rounded-3xl border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
            <span>Официальный поставщик</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            ESSE.KZ — коммерческое холодильное оборудование для бизнеса
          </h1>

          <p className="text-slate-300 text-base leading-relaxed">
            Мы специализируемся на поставках коммерческих холодильных и морозильных витрин для предприятий общественного питания, торговли и пищевых производств по всему Казахстану.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('/catalog')}
              className="py-3 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors"
            >
              Перейти в каталог
            </button>

            <a
              href={getWhatsAppLink('Здравствуйте! Хочу узнать больше о поставках оборудования ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Target Industries Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900">Кому мы поставляем оборудование</h2>
          <p className="text-slate-500 text-sm mt-1">
            Оборудование ESSE.KZ используется в тысячах коммерческих объектов по всему Казахстану.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categoriesServed.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm hover:border-sky-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{item.name}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Advantages */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900">Преимущества работы с ESSE.KZ</h2>
          <p className="text-slate-500 text-sm mt-1">
            Гарантируем высокое качество техники, надёжные компрессоры и безупречный сервис.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{adv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct WhatsApp Call to Action */}
      <div className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-2xl font-black text-slate-900">
          Нужна помощь в подборе холодильного оборудования?
        </h3>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Наши специалисты оперативно проконсультируют вас в WhatsApp и подготовят коммерческое предложение.
        </p>

        <div className="pt-2 flex justify-center">
          <a
            href={getWhatsAppLink('Здравствуйте! Нужна помощь в выборе холодильного оборудования')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-base shadow-lg shadow-[#25D366]/20 transition-transform hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 fill-white stroke-none" />
            <span>Написать в WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
