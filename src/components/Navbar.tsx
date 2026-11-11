import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, MessageCircle, Instagram } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { INSTAGRAM_URL, TIKTOK_URL, getWhatsAppUrl } from '../data/products';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: { id?: number }) => void;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onBack }) => {
  const { itemCount, setIsCartOpen } = useCart();
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNavOpen) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNavOpen]);

  const handleLinkClick = (page: string) => {
    setIsNavOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBagClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavOpen(false);
    setIsCartOpen(true);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bc-announcement">
        <span>A considered wardrobe · Made to make a statement</span>
      </div>

      {/* Header */}
      <header className="bc-header">
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="bc-menu-toggle"
          aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isNavOpen}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <a
          aria-label="BERBIECLOSET home"
          className={`bc-logo-link ${currentPage === 'home' ? 'active' : ''}`}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
        >
          <img
            className="bc-logo"
            src="/berbiecloset-logo.png"
            alt="BERBIECLOSET crowned monogram"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/img/logo.png';
            }}
          />
        </a>

        {/* Desktop Nav - hidden on mobile since it is inside the hamburger drawer */}
        <nav className="bc-nav hidden md:flex" aria-label="Main navigation">
          <a
            href="/shop"
            className={currentPage === 'shop' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('shop');
            }}
          >
            Shop
          </a>
          <a
            href="/about"
            className={currentPage === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('about');
            }}
          >
            Our story
          </a>
          <a
            href="/contact"
            className={currentPage === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
          >
            Contact
          </a>
        </nav>

        {/* Desktop Header Actions - hidden on mobile since Bag, WhatsApp and Socials are inside hamburger drawer */}
        <div className="bc-header-actions hidden md:flex">
          <a
            className="bc-social-link hidden lg:inline-flex"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit BERBIECLOSET on Instagram"
          >
            <strong>@berbiecloset</strong> · IG ↗
          </a>
          <a
            className="bc-social-link hidden xl:inline-flex"
            href={TIKTOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit BERBIECLOSET on TikTok"
          >
            <strong>@berbiecloset</strong> · TikTok ↗
          </a>
          <a
            className="bc-social-link bc-whatsapp-link hidden sm:inline-flex"
            href={getWhatsAppUrl('Hello BERBIECLOSET, I have a general enquiry.')}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp ↗
          </a>
          <button
            type="button"
            className={`bc-bag ${currentPage === 'bag' ? 'active' : ''}`}
            onClick={handleBagClick}
            aria-label={`Shopping bag with ${itemCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5 inline mr-1 text-[#c6a15b]" />
            <span>Bag</span>
            <span className="bc-bag-count">{itemCount > 0 ? itemCount : '0'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isNavOpen && (
        <div
          className="bc-nav-backdrop"
          onClick={() => setIsNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`bc-mobile-drawer ${isNavOpen ? 'is-open' : ''}`}
        aria-hidden={!isNavOpen}
      >
        <div className="bc-mobile-drawer-header">
          <a
            href="/"
            className="bc-logo-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
          >
            <img
              className="bc-logo h-12"
              src="/berbiecloset-logo.png"
              alt="BERBIECLOSET"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/img/logo.png';
              }}
            />
          </a>
          <button
            type="button"
            className="bc-drawer-close"
            onClick={() => setIsNavOpen(false)}
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bc-mobile-drawer-body">
          <nav className="bc-mobile-nav-links">
            <a
              href="/"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
            >
              <span>Home</span>
              <span className="bc-nav-arrow">↗</span>
            </a>
            <a
              href="/shop"
              className={currentPage === 'shop' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('shop');
              }}
            >
              <span>The Collection</span>
              <span className="bc-nav-arrow">↗</span>
            </a>
            <a
              href="/about"
              className={currentPage === 'about' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('about');
              }}
            >
              <span>Our Story</span>
              <span className="bc-nav-arrow">↗</span>
            </a>
            <a
              href="/contact"
              className={currentPage === 'contact' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
            >
              <span>Contact & Enquiries</span>
              <span className="bc-nav-arrow">↗</span>
            </a>
            <a
              href="/bag"
              className={currentPage === 'bag' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleBagClick(e);
              }}
            >
              <span>Shopping Bag ({itemCount})</span>
              <span className="bc-nav-arrow">↗</span>
            </a>
          </nav>

          <div className="bc-mobile-drawer-action">
            <a
              href={getWhatsAppUrl('Hello BERBIECLOSET, I would like to enquire about your collection.')}
              target="_blank"
              rel="noreferrer"
              className="bc-btn w-full"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="bc-mobile-drawer-socials">
            <p className="bc-drawer-kicker">CONNECT WITH US</p>
            <div className="flex flex-col gap-2.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="bc-drawer-social-item"
              >
                <Instagram className="w-4 h-4 text-[#c6a15b]" />
                <span>@berbiecloset on Instagram</span>
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="bc-drawer-social-item"
              >
                <span className="font-bold text-[#c6a15b] text-xs">♪</span>
                <span>@berbiecloset on TikTok</span>
              </a>
            </div>
          </div>

          <div className="bc-mobile-drawer-footer">
            <p className="text-xs text-[#a8997c]">LAGOS, NIGERIA · WORLDWIDE DELIVERY</p>
          </div>
        </div>
      </div>

      {/* Back button row for subpages */}
      {currentPage !== 'home' && (
        <div className="bc-back-row">
          <button
            type="button"
            className="bc-back-button"
            onClick={onBack}
          >
            ← Back
          </button>
        </div>
      )}
    </>
  );
};
