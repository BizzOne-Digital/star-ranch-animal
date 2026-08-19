import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { DEFAULT_ABOUT_IMAGE } from '../utils/constants';
import { ABOUT_CONTENT } from '../utils/aboutContent';
import './AboutSection.css';

const AboutSection = ({ settings }) => {
  const about = settings?.about || {};
  const { ref, isVisible } = useScrollAnimation();
  const imageUrl = about.imageUrl || DEFAULT_ABOUT_IMAGE;

  const paragraphs = about.description
    ? [about.description, ...ABOUT_CONTENT.homeParagraphs.slice(1)]
    : [ABOUT_CONTENT.intro, ...ABOUT_CONTENT.homeParagraphs];

  return (
    <section className="section about-section" ref={ref}>
      <div className={`container about-section__grid fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="about-section__image">
          <img
            src={imageUrl}
            alt="Joyce and Keith Robinson, founders of Star Ranch Animal Sanctuary"
          />
        </div>
        <div className="about-section__content">
          <span className="section-label">About Us</span>
          <h2 className="section-title">
            {about.title || ABOUT_CONTENT.title}
          </h2>
          <p className="about-section__highlight">
            {about.highlight || ABOUT_CONTENT.highlight}
          </p>
          {paragraphs.map((text, i) => (
            <p key={i} className="about-section__text">
              {text}
            </p>
          ))}
          <ul className="about-section__list">
            <li>Safe shelter for horses, dogs, cats & farm animals</li>
            <li>Food, daily care & medical assistance</li>
            <li>Wildlife rescue & compassionate release when possible</li>
          </ul>
          <div className="about-section__actions">
            <Link to="/our-story" className="btn btn-primary">
              Our Story
            </Link>
            <Link to="/booking" className="btn btn-secondary">
              Get Help for an Animal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
