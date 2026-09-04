import { Link } from 'react-router-dom';
import { PawPrint, Heart, Star } from 'lucide-react';
import { DEFAULT_HERO_IMAGE } from '../utils/constants';
import './Hero.css';

const Hero = ({ settings }) => {
  const hero = settings?.hero || {};
  const imageUrl = hero.imageUrl || DEFAULT_HERO_IMAGE;

  return (
    <section className="hero">
      <div className="hero__bg">
        <picture>
          {!hero.imageUrl && <source media="(max-width: 640px)" srcSet="/mobile-hero.png" />}
          <img src={imageUrl} alt="Rescued animals at Star Ranch Animal Sanctuary" />
        </picture>
        <div className="hero__overlay" />
      </div>
      <div className="container hero__content">
        <div className="hero__text">
          <h1>{hero.heading || 'A Safe Home for Animals Who Need Us Most'}</h1>
          <Star className="hero__star" size={20} fill="#C94343" color="#C94343" />
          <p className="hero__subtitle">
            {hero.subheading ||
              'Providing shelter, food, medical care, and compassion to animals in need since 2012.'}
          </p>
          <div className="hero__actions">
            <Link to="/booking" className="btn btn-primary">
              <PawPrint size={18} />
              {hero.primaryCta || 'Get Help for an Animal'}
            </Link>
            <Link to="/support" className="btn btn-secondary">
              <Heart size={18} />
              {hero.secondaryCta || 'Support Our Mission'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
