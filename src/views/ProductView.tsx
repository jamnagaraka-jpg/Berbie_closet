import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, Instagram, ArrowLeft, Check } from 'lucide-react';
import { PRODUCTS, formatPrice, createProductEnquiryUrl, Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductViewProps {
  productId: number;
  onNavigate: (page: string, params?: { id?: number }) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({ productId, onNavigate }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const product: Product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  // Parse available sizes if available
  const availableSizes = React.useMemo(() => {
    if (!product.sizes) return ['Standard'];
    if (product.sizes.includes('10–16')) return ['10', '12', '14', '16'];
    if (product.sizes.includes('10–18')) return ['10', '12', '14', '16', '18'];
    if (product.sizes.includes('10–14')) return ['10', '12', '14'];
    return [product.sizes];
  }, [product.sizes]);

  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0]);

  const handleAdd = () => {
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getWhatsAppMessage = () => {
    const sizeNote = selectedSize ? ` in Size ${selectedSize}` : '';
    const message = `Hello BERBIECLOSET, I would like to make an enquiry about the "${product.name}"${sizeNote}. Is it currently available in Lagos for delivery?`;
    return createProductEnquiryUrl(product) + encodeURIComponent(`\nSelected Size: ${selectedSize}`);
  };

  return (
    <section className="bc-page bc-product-detail">
      {/* Product Image */}
      <div className="bc-product-media">
        <img
          src={product.image}
          alt={product.name}
          className="bc-product-hero-image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `/assets/img/collection/look-0${product.id}.jpg`;
          }}
        />
        <span className="bc-media-pill">0{product.id} · {product.category}</span>
      </div>

      {/* Product Details */}
      <div className="bc-product-summary">
        <p className="bc-eyebrow">
          {product.category} · BERBIECLOSET LAGOS
        </p>
        
        <h1 className="bc-product-title">{product.name}</h1>
        
        <p className="bc-detail-note">{product.note}</p>
        
        <div className="bc-product-price-row">
          <strong className="bc-product-price">{formatPrice(product.price)}</strong>
          <span className="bc-stock-status">Available on order</span>
        </div>

        {/* Size Selection */}
        <div className="bc-size-picker">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-medium text-[#b3a17f] uppercase tracking-wider">
              Select Size (UK Standard)
            </span>
            <span className="text-[11px] text-[#8e8067]">True to fit</span>
          </div>

          <div className="bc-size-buttons">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`bc-size-btn ${selectedSize === size ? 'active' : ''}`}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <p className="bc-catalog-disclaimer">
          {product.price
            ? 'Listed from our Instagram feed. Confirm current size availability before immediate payment.'
            : 'Custom size fittings and prices confirmed directly on WhatsApp with our Lagos styling team.'}
        </p>

        {/* Action Buttons - Stacked responsively on mobile */}
        <div className="bc-product-actions">
          <button
            type="button"
            className="bc-button bc-button-dark bc-action-primary"
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-[#100d07]" />
                <span>Added to Bag (Size {selectedSize})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#100d07]" />
                <span>Add to Bag (Size {selectedSize})</span>
              </>
            )}
          </button>

          <a
            className="bc-button bc-button-outline bc-action-whatsapp"
            href={getWhatsAppMessage()}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="w-4 h-4 text-[#c6a15b]" />
            <span>Enquire on WhatsApp ↗</span>
          </a>

          <a
            className="bc-button bc-button-outline bc-action-instagram"
            href={product.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="w-4 h-4 text-[#c6a15b]" />
            <span>Watch Reel on Instagram ↗</span>
          </a>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-4 border-t border-[#332a1c]">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-[#c6a15b] hover:text-[#dfbd7b] transition-colors py-2"
            onClick={() => {
              onNavigate('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to collection</span>
          </button>
        </div>
      </div>
    </section>
  );
};
