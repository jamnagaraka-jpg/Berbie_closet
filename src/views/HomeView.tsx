import React from 'react';

interface HomeViewProps {
  onNavigate: (page: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="bc-hero bc-home-hero">
        <div className="bc-hero-copy">
          <p className="bc-eyebrow">THE NEW NIGERIAN WARDROBE</p>
          <h1>
            Dress like<br />
            <em>you mean it.</em>
          </h1>
          <p className="bc-hero-intro">
            Distinctive pieces for women who move with intention. A little bold, always considered. Handcrafted in Lagos, Nigeria.
          </p>
          
          <div className="bc-hero-cta-wrapper">
            <a
              href="/shop"
              className="bc-button bc-button-dark"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Explore the collection <span>↗</span>
            </a>
          </div>

          <div className="bc-hero-foot">
            <span>THE SIGNATURE EDIT</span>
            <span>LAGOS · EVERYWHERE</span>
          </div>
        </div>

        <div
          className="bc-hero-art"
          role="img"
          aria-label="BERBIECLOSET black and silver evening collection look"
        >
          <div className="bc-hero-photo"></div>
          <div className="bc-hero-stamp">
            THE<br />
            ART OF<br />
            <i>GETTING</i><br />
            DRESSED
          </div>
          <span className="bc-photo-caption">FORM / FEELING / FREEDOM</span>
        </div>
      </section>

      {/* Brand Ethos Strip */}
      <div className="bc-ethos-strip">
        <div className="bc-ethos-item">
          <strong>LAGOS CRAFTSMANSHIP</strong>
          <span>Cut and styled with distinctive detail</span>
        </div>
        <div className="bc-ethos-divider" aria-hidden="true">·</div>
        <div className="bc-ethos-item">
          <strong>DIRECT CONCIERGE</strong>
          <span>Orders and sizing confirmed on WhatsApp</span>
        </div>
        <div className="bc-ethos-divider" aria-hidden="true">·</div>
        <div className="bc-ethos-item">
          <strong>GLOBAL DISPATCH</strong>
          <span>Nationwide Nigeria & worldwide delivery</span>
        </div>
      </div>

      {/* Home Quick Links - desktop only; on mobile, these are inside the hamburger menu */}
      <div className="bc-home-links hidden md:flex">
        <a
          href="/shop"
          className="bc-button bc-button-dark"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Shop the Collection <span>↗</span>
        </a>
        <a
          href="/about"
          className="bc-button bc-button-outline"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Our Story <span>↗</span>
        </a>
        <a
          href="/contact"
          className="bc-button bc-button-outline"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Get in Touch <span>↗</span>
        </a>
      </div>
    </>
  );
};
