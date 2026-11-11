import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductView } from './views/ProductView';
import { BagView } from './views/BagView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CartDrawer } from './components/CartDrawer';

type Page = 'home' | 'shop' | 'product' | 'bag' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);

  // Sync with browser hash and history
  const parseRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) {
      setCurrentPage('home');
      return;
    }

    if (hash.startsWith('product')) {
      const match = hash.match(/(?:id=|\/)(\d+)/);
      if (match) {
        setSelectedProductId(parseInt(match[1], 10));
      }
      setCurrentPage('product');
    } else if (['shop', 'bag', 'about', 'contact'].includes(hash)) {
      setCurrentPage(hash as Page);
    } else {
      setCurrentPage('home');
    }
  };

  useEffect(() => {
    parseRoute();
    const handlePopState = () => parseRoute();
    window.addEventListener('hashchange', handlePopState);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (page: string, params?: { id?: number }) => {
    if (page === 'product' && params?.id) {
      setSelectedProductId(params.id);
      window.location.hash = `product/${params.id}`;
      setCurrentPage('product');
    } else {
      window.location.hash = page === 'home' ? '' : page;
      setCurrentPage(page as Page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('home');
    }
  };

  return (
    <CartProvider>
      <main className="bc-site">
        <Navbar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onBack={handleBack}
        />

        {currentPage === 'home' && <HomeView onNavigate={navigateTo} />}
        {currentPage === 'shop' && <ShopView onNavigate={navigateTo} />}
        {currentPage === 'product' && (
          <ProductView productId={selectedProductId} onNavigate={navigateTo} />
        )}
        {currentPage === 'bag' && <BagView onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutView />}
        {currentPage === 'contact' && <ContactView />}

        <Footer currentPage={currentPage} onNavigate={navigateTo} />
        <CartDrawer onNavigate={navigateTo} />
      </main>
    </CartProvider>
  );
}
