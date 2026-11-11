import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <section className="bc-page bc-about-page">
      <p className="bc-eyebrow">A POINT OF VIEW, NOT A DRESS CODE</p>
      <h1>
        Not just what you wear.<br />
        <em>How you arrive.</em>
      </h1>

      <div className="bc-about-grid">
        <img
          className="bc-discover-image"
          src="/assets/img/about.jpg"
          alt="BERBIECLOSET yellow casual co-ord look"
        />
        <div>
          <p>
            BERBIECLOSET is a celebration of personal style — expressive, assured and entirely your own.
          </p>
          <p>
            We believe getting dressed should feel like coming into yourself. Distinctive pieces, confident details, and a wardrobe that lets you arrive as you are.
          </p>
        </div>
      </div>
    </section>
  );
};
