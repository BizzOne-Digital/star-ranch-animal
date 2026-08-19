import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ABOUT_CONTENT } from '../utils/aboutContent';
import './StoryHighlights.css';

const StoryHighlights = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section story-highlights" ref={ref}>
      <div className={`container fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="story-highlights__header">
          <span className="section-label">Why Star Ranch</span>
          <h2 className="section-title">A Legacy of Love for Animals</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Joyce and Keith have dedicated their lives to answering one simple question:
            who will care for the animals that no one else will?
          </p>
        </div>

        <div className="story-highlights__milestones">
          {ABOUT_CONTENT.milestones.map((item) => (
            <div key={item.year} className="story-highlights__milestone card">
              <span className="story-highlights__year">{item.year}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="story-highlights__quote card">
          <blockquote>
            &ldquo;Every animal that comes through our gates carries a story. Our job is to
            give them a safe chapter — and whenever we can, a happier ending.&rdquo;
          </blockquote>
          <cite>— Joyce &amp; Keith Robinson, Founders</cite>
        </div>

        <div className="story-highlights__cta">
          <Link to="/our-story" className="btn btn-secondary">Read Our Full Story</Link>
          <Link to="/support" className="btn btn-primary">Support Our Sanctuary</Link>
        </div>
      </div>
    </section>
  );
};

export default StoryHighlights;
