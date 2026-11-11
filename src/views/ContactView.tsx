import React from 'react';
import { MessageCircle, Phone, Instagram, MapPin } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_PHONE, getWhatsAppUrl, INSTAGRAM_URL, TIKTOK_URL } from '../data/products';

export const ContactView: React.FC = () => {
  return (
    <section className="bc-page bc-contact-page">
      <p className="bc-eyebrow">LET'S FIND YOUR NEXT FAVOURITE</p>
      <h1>
        We'd love<br />
        to hear <em>from you.</em>
      </h1>
      <p className="bc-page-intro">
        Questions about a piece, custom sizing, delivery timelines, or order tracking? Contact our Lagos concierge directly.
      </p>

      <div className="bc-contact-cards">
        {/* WhatsApp direct card */}
        <div className="bc-contact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#c6a15b]/10 border border-[#c6a15b]/30 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#c6a15b]" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#f2e8d4]">WhatsApp Concierge</h3>
              <p className="text-xs text-[#a8997c]">Fastest response for sizing & orders</p>
            </div>
          </div>
          <a
            className="bc-button bc-button-dark w-full justify-center min-h-[48px]"
            href={getWhatsAppUrl('Hello BERBIECLOSET, I would like to make an enquiry.')}
            target="_blank"
            rel="noreferrer"
          >
            Chat with our stylist <span>↗</span>
          </a>
        </div>

        {/* Direct Phone / Call */}
        <div className="bc-contact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#c6a15b]/10 border border-[#c6a15b]/30 flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#c6a15b]" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#f2e8d4]">Direct Telephone</h3>
              <p className="text-xs text-[#a8997c]">Monday – Saturday, 9am – 6pm WAT</p>
            </div>
          </div>
          <a
            className="bc-button bc-button-outline w-full justify-center min-h-[48px]"
            href={`tel:+${WHATSAPP_PHONE}`}
          >
            Call {DISPLAY_PHONE} <span>↗</span>
          </a>
        </div>

        {/* Social channels card */}
        <div className="bc-contact-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#c6a15b]/10 border border-[#c6a15b]/30 flex items-center justify-center">
              <Instagram className="w-5 h-5 text-[#c6a15b]" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#f2e8d4]">Social Channels</h3>
              <p className="text-xs text-[#a8997c]">Watch look reels & new drops daily</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              className="bc-button bc-button-outline flex-1 justify-center min-h-[44px] text-xs"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              Instagram ↗
            </a>
            <a
              className="bc-button bc-button-outline flex-1 justify-center min-h-[44px] text-xs"
              href={TIKTOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              TikTok ↗
            </a>
          </div>
        </div>
      </div>

      <div className="bc-contact-details">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#c6a15b]" />
          <span>LAGOS, NIGERIA · NATIONWIDE & WORLDWIDE DISPATCH</span>
        </div>
        <a className="bc-contact-phone" href={`tel:+${WHATSAPP_PHONE}`}>
          {DISPLAY_PHONE}
        </a>
      </div>
    </section>
  );
};
