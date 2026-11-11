import React, { useState, useMemo } from 'react';
import { PRODUCTS, formatPrice } from '../data/products';

interface ShopViewProps {
  onNavigate: (page: string, params?: { id?: number }) => void;
}

const CATEGORIES = ['ALL', 'OUTFITS', 'CO-ORDS', 'DENIM', 'TOPS', 'JACKETS'] as const;

export const ShopView: React.FC<ShopViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category.toUpperCase() === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="bc-page">
      <p className="bc-eyebrow">CURATED FOR THE WAY YOU ARE</p>
      <h1>
        The collection<span>.</span>
      </h1>
      <p className="bc-page-intro">
        Handcrafted silhouettes selected from our Instagram collection. Tap any piece to view styling details, select your size, or order directly via WhatsApp.
      </p>

      {/* Category filter pills - responsive horizontal scroll on mobile */}
      <div className="bc-category-scroll">
        <div className="bc-category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`bc-category-tab ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="bc-product-grid">
        {filteredProducts.map((p) => (
          <article className="bc-product" key={p.id}>
            <a
              href={`/product/${p.id}`}
              className="bc-product-image"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('product', { id: p.id });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label={`View ${p.name}`}
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `/assets/img/collection/look-0${p.id}.jpg`;
                }}
              />
              <span className="bc-product-index">
                0{p.id}
              </span>
              <span className="bc-quick-add">
                View piece ↗
              </span>
            </a>

            <div className="bc-product-info">
              <div>
                <h3>{p.name}</h3>
                <p>{p.note}</p>
              </div>
              <strong>{formatPrice(p.price)}</strong>
            </div>

            <div className="bc-preview-note">
              {p.id === 9
                ? 'FROM OUR INSTAGRAM COLLECTION'
                : p.sizes
                ? `AVAILABLE SIZES ${p.sizes}`
                : 'LIMITED RUN'}
            </div>
          </article>
        ))}
      </div>

      <p className="bc-catalog-disclaimer">
        Styles and sizes are listed from our Lagos Instagram collection. Please confirm current size availability before ordering.
      </p>
    </section>
  );
};
