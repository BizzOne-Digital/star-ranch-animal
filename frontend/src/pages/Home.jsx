import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import StatsStrip from '../components/StatsStrip';
import AboutSection from '../components/AboutSection';
import StoryHighlights from '../components/StoryHighlights';
import ServicesSection from '../components/ServicesSection';
import BannerSection from '../components/BannerSection';
import ProcessSection from '../components/ProcessSection';
import GalleryPreview from '../components/GalleryPreview';
import DonationContact from '../components/DonationContact';
import api from '../services/api';

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/settings'),
      api.get('/services'),
      api.get('/gallery'),
    ])
      .then(([settingsRes, servicesRes, galleryRes]) => {
        setSettings(settingsRes.data.data);
        setServices(servicesRes.data.data);
        setGallery(galleryRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <SEO
        description="Providing shelter, food, medical care, and compassion to animals in need since 2012 in Concho, Arizona."
      />
      <Hero settings={settings} />
      <StatsStrip settings={settings} />
      <AboutSection settings={settings} />
      <StoryHighlights />
      <ServicesSection services={services} />
      <BannerSection settings={settings} />
      <ProcessSection />
      <GalleryPreview images={gallery} />
      <DonationContact settings={settings} />
    </>
  );
};

export default Home;
