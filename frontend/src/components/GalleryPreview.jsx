import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PLACEHOLDER_GALLERY } from '../utils/constants';
import './GalleryPreview.css';

const GalleryPreview = ({ images = [] }) => {
  const { ref, isVisible } = useScrollAnimation();
  const displayImages =
    images.length > 0
      ? images.slice(0, 7).map((img) => img.imageUrl)
      : PLACEHOLDER_GALLERY;

  return (
    <section className="gallery-preview" ref={ref}>
      <div className={`gallery-preview__scroll fade-in ${isVisible ? 'visible' : ''}`}>
        {displayImages.map((src, i) => (
          <div key={i} className="gallery-preview__item">
            <img src={src} alt={`Sanctuary life at Star Ranch ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="container gallery-preview__cta">
        <Link to="/gallery" className="btn btn-secondary">
          View Full Gallery
        </Link>
      </div>
    </section>
  );
};

export default GalleryPreview;
