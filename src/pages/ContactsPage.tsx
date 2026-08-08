import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink, getConsultationWhatsAppLink } from '../config';

export const ContactsPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Свяжитесь с нами</h1>
        <p className="text-slate-500 text-sm">
          Поможем подобрать холодильное оборудование под ваш бизнес и ответим на все вопросы.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* WhatsApp Primary Card */}
          <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-3xl space-y-4 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-7 h-7 fill-white stroke-none" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Отдел продаж в WhatsApp</h3>
                <p className="text-xs text-slate-600">Основной канал быстрой связи и консультаций</p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Напишите нам в WhatsApp для моментального уточнения стоимости, наличии на складе и просчета доставки по Казахстану.
            </p>

            <a
              href={getWhatsAppLink('Здравствуйте! Нужна консультация и расчёт стоимости витрин ESSE.KZ')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-md transition-transform hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>

          {/* Phone Numbers */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Телефоны отдела продаж</h3>
            <div className="space-y-1.5 text-sm font-semibold">
              <a href={`tel:${STORE_CONFIG.phonePrimary.replace(/[^0-9+]/g, '')}`} className="block text-slate-900 hover:text-sky-600">
                {STORE_CONFIG.phonePrimary}
              </a>
              <a href={`tel:${STORE_CONFIG.phoneSecondary.replace(/[^0-9+]/g, '')}`} className="block text-slate-600 hover:text-sky-600 text-xs">
                {STORE_CONFIG.phoneSecondary}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Электронная почта</h3>
            <p className="text-xs text-slate-500">Для коммерческих запросов и тендеров</p>
            <a href={`mailto:${STORE_CONFIG.email}`} className="block text-sm font-bold text-slate-900 hover:text-sky-600">
              {STORE_CONFIG.email}
            </a>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Адреса складов и офисов</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {STORE_CONFIG.address}
            </p>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">График работы</h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {STORE_CONFIG.workingHours}
            </p>
          </div>

        </div>

        {/* Quick WhatsApp Topic Inquiry (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white">Быстрый запрос менеджеру</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Выберите тему обращения, и мы сформируем готовое сообщение для WhatsApp:
          </p>

          <div className="space-y-2">
            {[
              'Уточнить актуальные цены и скидки',
              'Помочь с подбором витрин по размерам',
              'Узнать сроки доставки в мой город',
              'Запросить паспорт и технические условия'
            ].map((topic, i) => (
              <a
                key={i}
                href={getConsultationWhatsAppLink(topic)}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium transition-colors flex items-center justify-between group"
              >
                <span>{topic}</span>
                <Send className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            ESSE.KZ — коммерческое оборудование для торговых объектов.
          </div>
        </div>

      </div>

    </div>
  );
};
