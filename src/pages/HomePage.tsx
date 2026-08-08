import React from 'react';
import { 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Award, 
  CheckCircle2, 
  PhoneCall,
  Store,
  UtensilsCrossed,
  Cake,
  Beef,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCategory } from '../types/product';
import { STORE_CONFIG, getWhatsAppLink, getConsultationWhatsAppLink } from '../config';

interface HomePageProps {
  onNavigate: (path: string, category?: ProductCategory) => void;
  onSelectProduct: (productId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const popularProducts = PRODUCTS.slice(0, 12);

  const businessTypes = [
    { title: 'Кафе и кофейни', icon: UtensilsCrossed, desc: 'Кондитерские и барные витрины для десертов и напитков' },
    { title: 'Рестораны и общепит', icon: Store, desc: 'Пристенные и гастрономические витрины для готовых блюд' },
    { title: 'Супермаркеты и магазины', icon: ShoppingBag, desc: 'Панорамные и линия витрин с глубокой выкладкой' },
    { title: 'Пекарни и кондитерские', icon: Cake, desc: 'Витрины с кубическим стеклом и деликатным обдувом' },
    { title: 'Мясные и рыбные лавки', icon: Beef, desc: 'Низкотемпературные витрины с подсветкой Pink Natura' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* MINIMALIST HERO BANNER */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Официальные поставки • Гарантия 12 месяцев</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Холодильное оборудование ESSE
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Коммерческие холодильные, кондитерские и морозильные витрины для магазинов, кафе и ресторанов.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => onNavigate('/catalog')}
              className="flex-1 md:flex-none py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Каталог ({PRODUCTS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getConsultationWhatsAppLink('Подбор оборудования')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryFilter
          selectedCategory="Все"
          onSelectCategory={(cat) => onNavigate('/catalog', cat === 'Все' ? undefined : cat)}
        />
      </section>

      {/* POPULAR PRODUCTS CATALOG GRID */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Холодильное оборудование</h2>
            <p className="text-sm text-slate-500 mt-1">Подберите надежное оборудование для вашего бизнеса.</p>
          </div>

          <button
            onClick={() => onNavigate('/catalog')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
          >
            <span>Посмотреть весь каталог ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Catalog Grid - 2 columns on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* INDUSTRIES / BUSINESS TARGETING */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Решения для всех видов торговых точек
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Оснащаем коммерческие объекты холодильными витринами любого масштаба — от кофеен до крупных супермаркетов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {businessTypes.map((b, i) => {
              const Icon = b.icon;
              return (
                <div 
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHORT ABOUT & ADVANTAGES */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">О компании ESSE.KZ</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Надежное коммерческое холодильное оборудование для бизнеса
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                ESSE.KZ — официальный поставщик холодильных, кондитерских, гастрономических и морозильных витрин в Казахстане. 
                Мы помогаем предпринимателям грамотно оснастить торговый зал, сохранить свежесть продуктов и увеличить продажи.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Бесплатная консультация и расчет</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Официальная гарантия 12 месяцев</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Помощь с подбором по габаритам</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Быстрая доставка по Казахстану</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-sky-400" />
                Нужна помощь в подборе?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Отправьте размеры вашей торговой площади или требования по температуре в WhatsApp. Наш специалист подготовит коммерческое предложение за 15 минут.
              </p>

              <a
                href={getWhatsAppLink('Здравствуйте! Помогите подобрать витрину под мои размеры.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                <span>Написать специалисту в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
