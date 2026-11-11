import React from 'react';
import { INSTAGRAM_URL, TIKTOK_URL, getWhatsAppUrl } from '../data/products';

interface FooterProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bc-footer">
      <div className="bc-footer-top">
        <a
          href="/"
          className={`bc-logo-link bc-footer-logo ${currentPage === 'home' ? 'active' : ''}`}
          onClick={handleNav('home')}
        >
          <img
            className="bc-logo"
            src="/berbiecloset-logo.png"
            alt="BERBIECLOSET"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/img/logo.png';
            }}
          />
        </a>

        <div className="bc-footer-nav-links">
          <a
            href="/shop"
            className={`bc-footer-link ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={handleNav('shop')}
          >
            The Collection
          </a>
          <a
            href="/about"
            className={`bc-footer-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={handleNav('about')}
          >
            Our Story
          </a>
          <a
            href="/contact"
            className={`bc-footer-link ${currentPage === 'contact' ? 'active' : ''}`}
            onClick={handleNav('contact')}
          >
            Contact & Sizing
          </a>
          <a
            href={getWhatsAppUrl('Hello BERBIECLOSET, I would like to make an enquiry.')}
            target="_blank"
            rel="noreferrer"
            className="bc-footer-link text-[#c6a15b]"
          >
            WhatsApp Concierge ↗
          </a>
        </div>

        <div className="bc-footer-socials">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <strong>@BERBIECLOSET</strong> · IG ↗
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          >
            <strong>@BERBIECLOSET</strong> · TIKTOK ↗
          </a>
        </div>
      </div>

      <div className="bc-footer-bottom">
        <p className="bc-footer-tagline">Style is personal. Make it yours.</p>
        <div className="bc-footer-meta">
          <span>LAGOS, NIGERIA · WORLDWIDE DISPATCH</span>
          <span className="bc-footer-dot">·</span>
          <span>© {currentYear} BERBIECLOSET</span>
        </div>
      </div>
    </footer>
  );
};
