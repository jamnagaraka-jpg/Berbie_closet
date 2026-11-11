import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getWhatsAppUrl } from '../data/products';

interface CartDrawerProps {
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    hasPricedItems,
    itemCount,
  } = useCart();

  // Lock body scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  // Build WhatsApp order message
  const handleWhatsAppOrder = () => {
    if (!cart.length) return;
    const itemList = cart
      .map(
        item =>
          `${item.quantity}x ${item.product.name}${
            item.selectedSize ? ` (Size ${item.selectedSize})` : ''
          }${item.product.price ? ` - ₦${(item.product.price * item.quantity).toLocaleString('en-NG')}` : ''}`
      )
      .join('\n• ');

    const totalText = hasPricedItems
      ? `\nTotal (priced items): ₦${subtotal.toLocaleString('en-NG')}`
      : '';

    const message = `Hello BERBIECLOSET,\n\nI would like to place an order for the following pieces:\n• ${itemList}${totalText}\n\nPlease confirm availability, sizing, and payment details. Thank you!`;

    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm transition-opacity duration-200">
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0e0c0a] border-l border-[#382e1e] flex flex-col justify-between shadow-2xl h-full">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#282115] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c6a15b]" />
              <h2 className="font-serif text-lg tracking-wide text-[#f2e8d4]">
                Your Bag
              </h2>
              <span className="text-xs text-[#c6a15b] font-medium tabular-nums">
                ({itemCount})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-[#a8997c] hover:text-[#f2e8d4] transition-colors focus:outline-none"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-12 sm:py-16 flex flex-col items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-[#403522] mb-4 stroke-1" />
                <p className="font-serif text-lg text-[#f2e8d4] mb-2">
                  Your bag is currently empty.
                </p>
                <p className="text-xs text-[#a8997c] max-w-xs mb-6 leading-relaxed">
                  Discover distinctive handcrafted silhouettes from our Instagram collection.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onNavigate('shop');
                  }}
                  className="bc-btn text-xs"
                >
                  Explore Collection ↗
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || ''}-${index}`}
                  className="flex gap-3 sm:gap-4 p-3 bg-[#14120e] border border-[#2b2216] rounded-sm group hover:border-[#423522] transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-24 sm:w-20 sm:h-26 object-cover shrink-0 bg-[#211b11] rounded-xs"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `/assets/img/collection/look-0${item.product.id}.jpg`;
                    }}
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-normal text-[#f2e8d4] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="min-w-[32px] min-h-[32px] flex items-center justify-center text-[#756752] hover:text-[#f87171] p-1 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#b3a17f] mt-0.5">
                        {item.selectedSize && (
                          <span className="mr-2">Size: {item.selectedSize}</span>
                        )}
                        <span className="text-[#8e8067]">· {item.product.category}</span>
                      </div>

                      <p className="text-xs font-medium text-[#c6a15b] mt-1 tabular-nums">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="inline-flex items-center border border-[#382e1e] rounded-full bg-[#0b0b0a] text-xs">
                        <button
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 flex items-center justify-center text-[#c6a15b] hover:bg-[#c6a15b]/10 rounded-l-full focus:outline-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#f2e8d4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#c6a15b] hover:bg-[#c6a15b]/10 rounded-r-full focus:outline-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.product.price && (
                        <span className="text-[11px] text-[#8e8067] ml-auto tabular-nums">
                          ₦{(item.product.price * item.quantity).toLocaleString('en-NG')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#282115] bg-[#0b0b0a] space-y-3.5">
              {hasPricedItems && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#b3a17f] font-serif">Estimated Total</span>
                  <span className="font-serif text-lg font-bold text-[#c6a15b] tabular-nums">
                    ₦{subtotal.toLocaleString('en-NG')}
                  </span>
                </div>
              )}

              <p className="text-[11px] text-[#8e8067] leading-relaxed">
                Prices and availability are personally confirmed by our Lagos team on WhatsApp before processing.
              </p>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full bc-btn py-3.5 justify-center text-xs font-semibold min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-[#100d07]" />
                <span>Order on WhatsApp ↗</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigate('bag');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] tracking-wider uppercase text-[#c6a15b] hover:text-[#dfbd7b] transition-colors py-2 min-h-[40px]"
              >
                <span>View Full Bag Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
