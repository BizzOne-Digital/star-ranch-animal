import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { DEFAULT_BANNER_IMAGE } from '../utils/constants';
import './BannerSection.css';

const BannerSection = ({ settings }) => {
  const banner = settings?.banner || {};
  const imageUrl = banner.imageUrl || DEFAULT_BANNER_IMAGE;

  return (
    <section className="banner-section">
      <img src={imageUrl} alt="" className="banner-section__bg" aria-hidden="true" />
      <div className="banner-section__overlay" />
      <div className="container banner-section__content">
        <div className="banner-section__animals" aria-hidden="true">
          <svg viewBox="0 0 120 60" width="120" height="60" fill="white" opacity="0.3">
            <ellipse cx="30" cy="40" rx="15" ry="10" />
            <ellipse cx="60" cy="35" rx="12" ry="8" />
            <ellipse cx="90" cy="40" rx="14" ry="9" />
          </svg>
        </div>
        <div className="banner-section__text">
          <h2>{banner.heading || 'Every Animal Deserves a Second Chance.'}</h2>
          <p>
            {banner.subheading ||
              'With your support, we can continue to rescue, heal, protect, and give hope.'}
          </p>
        </div>
        <Link to="/support" className="btn btn-primary">
          <Heart size={18} />
          {banner.ctaText || 'Support Our Mission'}
        </Link>
      </div>
    </section>
  );
};

export default BannerSection;
