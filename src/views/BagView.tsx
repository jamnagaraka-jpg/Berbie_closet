import React from 'react';
import { ShoppingBag, MessageCircle, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getWhatsAppUrl } from '../data/products';

interface BagViewProps {
  onNavigate: (page: string) => void;
}

export const BagView: React.FC<BagViewProps> = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, subtotal, hasPricedItems } = useCart();

  const handleWhatsAppOrder = () => {
    if (!cart.length) return;
    const items = cart
      .map(
        (l) =>
          `${l.quantity} x ${l.product.name}${
            l.selectedSize ? ` (Size ${l.selectedSize})` : ''
          }${
            l.product.price ? ` (₦${(l.product.price * l.quantity).toLocaleString('en-NG')})` : ''
          }`
      )
      .join('\n• ');

    const totalText = hasPricedItems ? `\n\nTotal (priced items): ₦${subtotal.toLocaleString('en-NG')}` : '';

    const text = `Hello BERBIECLOSET,\n\nI would like to order the following from my bag:\n• ${items}${totalText}\n\nPlease confirm availability, delivery timelines in Lagos / nationwide, and payment details. Thank you!`;
    window.open(getWhatsAppUrl(text), '_blank');
  };

  return (
    <section className="bc-page bc-bag-page">
      <p className="bc-eyebrow">YOUR SELECTION</p>
      <h1>
        Your bag<span>.</span>
      </h1>

      {cart.length === 0 ? (
        <div className="bc-empty-bag">
          <ShoppingBag className="w-12 h-12 text-[#403522] mx-auto mb-4 stroke-1" />
          <p>Your bag is currently empty.</p>
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
      ) : (
        <div className="bc-bag-content">
          <div className="bc-bag-lines">
            {cart.map((item, index) => (
              <div className="bc-bag-line" key={`${item.product.id}-${item.selectedSize || ''}-${index}`}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="bc-bag-img"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `/assets/img/collection/look-0${item.product.id}.jpg`;
                  }}
                />

                <div className="bc-bag-item-details">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="bc-bag-item-title">{item.product.name}</h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="bc-remove-btn"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <Trash2 className="w-4 h-4 text-[#756752] hover:text-[#f87171] transition-colors" />
                    </button>
                  </div>

                  <div className="text-xs text-[#b3a17f] mb-2">
                    {item.selectedSize && (
                      <span className="mr-2">Size: <strong className="text-[#f2e8d4]">{item.selectedSize}</strong></span>
                    )}
                    <span className="text-[#8e8067]">· {item.product.category}</span>
                  </div>

                  <p className="text-sm font-medium text-[#c6a15b] mb-3 tabular-nums">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="bc-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, -1)}
                      aria-label="Decrease quantity"
                      className="bc-qty-btn"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="bc-qty-num tabular-nums">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(index, 1)}
                      aria-label="Increase quantity"
                      className="bc-qty-btn"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>

                    {item.product.price && (
                      <span className="bc-line-subtotal tabular-nums ml-auto">
                        ₦{(item.product.price * item.quantity).toLocaleString('en-NG')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasPricedItems && (
            <div className="bc-bag-total">
              <span>Total (priced items)</span>
              <strong className="tabular-nums">₦{subtotal.toLocaleString('en-NG')}</strong>
            </div>
          )}

          <p className="bc-catalog-disclaimer" style={{ textAlign: 'left', margin: '20px 0 25px' }}>
            Prices and availability are personally confirmed on WhatsApp before any payment or dispatch.
          </p>

          <div className="bc-bag-actions flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="bc-button bc-button-dark flex-1 justify-center min-h-[50px]"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle className="w-4 h-4 text-[#100d07]" />
              <span>Order on WhatsApp ↗</span>
            </button>

            <button
              type="button"
              className="bc-button bc-button-outline justify-center min-h-[50px]"
              onClick={() => {
                onNavigate('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
