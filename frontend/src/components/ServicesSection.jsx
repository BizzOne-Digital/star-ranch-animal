import { Link } from 'react-router-dom';
import { Home, Utensils, Stethoscope, PawPrint } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ServicesSection.css';

const ICON_MAP = {
  shelter: Home,
  food: Utensils,
  medical: Stethoscope,
  default: PawPrint,
};

const DEFAULT_SERVICES = [
  {
    title: 'Safe Shelter',
    description: 'Provide animals with a secure, comfortable, and caring environment.',
    icon: 'shelter',
  },
  {
    title: 'Food & Daily Care',
    description: 'Provide food, fresh water, monitoring, and everyday care.',
    icon: 'food',
  },
  {
    title: 'Medical Care',
    description: 'Help animals access appropriate treatment, medications, and ongoing support.',
    icon: 'medical',
  },
];

const ServicesSection = ({ services = [] }) => {
  const { ref, isVisible } = useScrollAnimation();
  const displayServices = services.length ? services : DEFAULT_SERVICES;

  return (
    <section className="section services-section" ref={ref}>
      <div className="container">
        <div className={`services-section__header fade-in ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Our Services</span>
          <h2 className="section-title">How We Care for Animals</h2>
          <p className="section-subtitle">
            Contact us for pricing or assistance. Every animal deserves compassionate care.
          </p>
        </div>

        <div className={`services-section__grid fade-in ${isVisible ? 'visible' : ''}`}>
          {displayServices.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || ICON_MAP.default;
            return (
              <div key={service._id || i} className="card services-card">
                <div className="services-card__icon">
                  <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="services-section__cta">
          <Link to="/booking" className="btn btn-primary">
            Get Animal Assistance
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
