import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import api from '../services/api';
import { ABOUT_CONTENT } from '../utils/aboutContent';
import './About.css';

const About = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  const about = settings?.about || {};
  const imageUrl = about.imageUrl || '/img1.jpg';

  return (
    <>
      <SEO
        title="Our Story"
        description="Learn about Joyce and Keith Robinson — over 50 years of rescuing animals and founding Star Ranch Animal Sanctuary in Concho, Arizona in 2012."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>{about.title || ABOUT_CONTENT.title}</h1>
          <p className="page-hero__subtitle">
            Meet Joyce and Keith Robinson — lifelong animal rescuers and founders of Star Ranch
            Animal Sanctuary in the heart of Arizona ranch country.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-page__grid">
          <div className="about-page__image">
            <img src={imageUrl} alt="Joyce and Keith Robinson at Star Ranch" />
          </div>
          <div className="about-page__content">
            <span className="section-label">The Founders</span>
            <h2 className="section-title about-page__name">
              {about.highlight || ABOUT_CONTENT.highlight}
            </h2>
            <p>
              {about.description || ABOUT_CONTENT.intro}
            </p>
            {ABOUT_CONTENT.homeParagraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            <div className="about-page__actions">
              <Link to="/booking" className="btn btn-primary">Get Help for an Animal</Link>
              <Link to="/support" className="btn btn-secondary">Support Our Mission</Link>
            </div>
          </div>
        </div>
      </section>

      {ABOUT_CONTENT.storySections.map((section) => (
        <section
          key={section.id}
          className={`section about-story-block ${section.id === 'mission' ? 'about-story-block--cream' : ''}`}
        >
          <div className="container about-story-block__inner">
            <span className="section-label">{section.label}</span>
            <h2 className="section-title">{section.title}</h2>
            {section.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="section about-values">
        <div className="container">
          <h2 className="section-title about-values__title">What We Stand For</h2>
          <p className="section-subtitle about-values__subtitle">
            Everything we do at Star Ranch is guided by a simple promise — every animal deserves
            safety, nourishment, and compassion.
          </p>
          <div className="about-values__grid">
            {ABOUT_CONTENT.values.map((v) => (
              <div key={v.title} className="card about-values__card">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
