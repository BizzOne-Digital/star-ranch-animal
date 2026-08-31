import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Utensils, Stethoscope, PawPrint, LifeBuoy, HeartHandshake, Phone } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../services/api';
import { SERVICES_CONTENT, enrichService } from '../utils/servicesContent';
import './Services.css';

const ICON_MAP = {
  shelter: Home,
  food: Utensils,
  medical: Stethoscope,
  rescue: LifeBuoy,
  assistance: HeartHandshake,
  default: PawPrint,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then((res) => setServices(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const mainServices = services.length
    ? services.map(enrichService)
    : [
        {
          title: 'Safe Shelter',
          description:
            'Provide animals with a secure, comfortable, and caring environment where they can rest, recover, and feel protected.',
          icon: 'shelter',
          points: SERVICES_CONTENT.serviceDetails.shelter.points,
        },
        {
          title: 'Food & Daily Care',
          description:
            'Provide food, fresh water, monitoring, and everyday care to ensure every animal receives the attention they need.',
          icon: 'food',
          points: SERVICES_CONTENT.serviceDetails.food.points,
        },
        {
          title: 'Medical Care',
          description:
            'Help animals access appropriate treatment, medications, and ongoing support for injuries, illness, and recovery.',
          icon: 'medical',
          points: SERVICES_CONTENT.serviceDetails.medical.points,
        },
      ];

  const extraServices = SERVICES_CONTENT.additionalServices.map((s) => ({
    ...s,
    points: SERVICES_CONTENT.serviceDetails[s.key]?.points || [],
  }));

  return (
    <>
      <SEO
        title="Services"
        description="Safe shelter, food & daily care, medical care, rescue support and animal assistance at Star Ranch Animal Sanctuary in Concho, Arizona. Contact us for pricing."
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label">Services</span>
          <h1>How We Care for Animals</h1>
          <p className="page-hero__subtitle">{SERVICES_CONTENT.heroSubtitle}</p>
        </div>
      </section>

      <section className="section services-intro">
        <div className="container services-intro__inner">
          <h2 className="section-title">{SERVICES_CONTENT.intro.title}</h2>
          {SERVICES_CONTENT.intro.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </section>

      <section className="section services-main">
        <div className="container">
          <div className="services-page__header">
            <span className="section-label">Core Services</span>
            <h2 className="section-title">What We Provide</h2>
          </div>

          {loading ? (
            <div className="loading-spinner" />
          ) : (
            <div className="services-page__grid">
              {mainServices.map((service) => {
                const Icon = ICON_MAP[service.icon] || ICON_MAP.default;
                return (
                  <article key={service._id || service.title} className="card services-page__card">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.title} className="services-page__img" />
                    ) : (
                      <div className="services-page__icon">
                        <Icon size={32} />
                      </div>
                    )}
                    <h2>{service.title}</h2>
                    <p className="services-page__desc">{service.description}</p>
                    {service.points?.length > 0 && (
                      <ul className="services-page__list">
                        {service.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section services-extra">
        <div className="container">
          <div className="services-page__header">
            <span className="section-label">Also Available</span>
            <h2 className="section-title">Rescue & Assistance</h2>
            <p className="section-subtitle">
              Beyond daily sanctuary care, Joyce and Keith support rescuers, families, and animals across Arizona.
            </p>
          </div>

          <div className="services-page__grid services-page__grid--two">
            {extraServices.map((service) => {
              const Icon = ICON_MAP[service.icon] || ICON_MAP.default;
              return (
                <article key={service.title} className="card services-page__card">
                  <div className="services-page__icon">
                    <Icon size={32} />
                  </div>
                  <h2>{service.title}</h2>
                  <p className="services-page__desc">{service.description}</p>
                  <ul className="services-page__list">
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section services-animals">
        <div className="container">
          <h2 className="section-title services-animals__title">Animals We Help</h2>
          <p className="section-subtitle services-animals__subtitle">
            Star Ranch welcomes a wide range of animals — from beloved companions to farm animals and wildlife in need.
          </p>
          <div className="services-animals__grid">
            {SERVICES_CONTENT.animalsWeHelp.map((animal) => (
              <div key={animal.label} className="services-animals__item card">
                <span className="services-animals__emoji" aria-hidden="true">{animal.emoji}</span>
                <span>{animal.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-suppliers">
        <div className="container">
          <div className="services-page__header">
            <span className="section-label">Where We Get Our Supplies</span>
            <h2 className="section-title">Feed & Food Partners</h2>
          </div>
          <div className="services-page__grid services-page__grid--two">
            <article className="card services-page__card">
              <h2>Dog & Cat Food</h2>
              <p className="services-page__desc">
                We source quality food for our dogs and cats from Gentle Giants Pet Products.
              </p>
              <a
                href="https://gentlegiantspetproducts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Visit Gentle Giants Pet Products
              </a>
            </article>
            <article className="card services-page__card">
              <h2>Horse Feed</h2>
              <p className="services-page__desc">
                Our horses are fed Awesome Feed, sourced from The Pet Food Warehouse.
              </p>
              <a
                href="https://thepetfoodwarehouse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Visit The Pet Food Warehouse
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="section services-process">
        <div className="container">
          <div className="services-page__header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Getting Help Is Simple</h2>
          </div>
          <div className="services-process__steps">
            {SERVICES_CONTENT.processSteps.map((item) => (
              <div key={item.step} className="services-process__step card">
                <span className="services-process__num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-pricing">
        <div className="container services-pricing__card card">
          <Phone size={36} color="#C94343" />
          <h2>{SERVICES_CONTENT.pricingNote.title}</h2>
          <p>{SERVICES_CONTENT.pricingNote.text}</p>
          <div className="services-pricing__actions">
            <Link to="/booking" className="btn btn-primary">Request Help</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
