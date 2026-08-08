import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { ProductCategory } from './types/product';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'Все'>('Все');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Sync with URL Hash for deep links & browser navigation
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === '/') {
        setCurrentPath('/');
        setSelectedProductId(null);
      } else if (hash.startsWith('/product/')) {
        const id = hash.replace('/product/', '');
        setCurrentPath('/product');
        setSelectedProductId(id);
      } else if (hash.startsWith('/catalog')) {
        setCurrentPath('/catalog');
        setSelectedProductId(null);
      } else if (hash.startsWith('/about')) {
        setCurrentPath('/about');
        setSelectedProductId(null);
      } else if (hash.startsWith('/contacts')) {
        setCurrentPath('/contacts');
        setSelectedProductId(null);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (path: string, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (path === '/') {
      window.location.hash = '/';
    } else if (path === '/catalog') {
      window.location.hash = '/catalog';
    } else if (path === '/about') {
      window.location.hash = '/about';
    } else if (path === '/contacts') {
      window.location.hash = '/contacts';
    } else {
      window.location.hash = path;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    window.location.hash = `/product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-sky-500 selection:text-white w-full max-w-full overflow-x-hidden">
      
      {/* Sticky Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPath === '/' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPath === '/catalog' && (
          <CatalogPage
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPath === '/product' && selectedProductId && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === '/contacts' && (
          <ContactsPage />
        )}
      </main>

      {/* Global Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
