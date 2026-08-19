import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import api from '../services/api';
import { PLACEHOLDER_GALLERY } from '../utils/constants';
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/gallery')
      .then((res) => setImages(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayImages =
    images.length > 0
      ? images
      : PLACEHOLDER_GALLERY.map((url, i) => ({ _id: i, imageUrl: url, caption: '' }));

  return (
    <>
      <SEO
        title="Gallery"
        description="Photos from Star Ranch Animal Sanctuary — rescued dogs, horses, cats, farm animals, and sanctuary life."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Gallery</span>
          <h1>Life at Star Ranch</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <div className="gallery-grid">
              {displayImages.map((img) => (
                <button
                  key={img._id}
                  className="gallery-grid__item"
                  onClick={() => setSelected(img)}
                  aria-label={img.caption || 'View gallery image'}
                >
                  <img src={img.imageUrl} alt={img.caption || 'Star Ranch sanctuary'} loading="lazy" />
                  {img.caption && <span className="gallery-grid__caption">{img.caption}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="gallery-lightbox" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
          <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox__close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>
            <img src={selected.imageUrl} alt={selected.caption || 'Gallery image'} />
            {selected.caption && <p>{selected.caption}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
