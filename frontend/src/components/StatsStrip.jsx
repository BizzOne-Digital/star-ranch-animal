import { Heart, Calendar, Cross } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './StatsStrip.css';

const StatsStrip = ({ settings }) => {
  const stats = settings?.stats || {};
  const { ref, isVisible } = useScrollAnimation();

  const items = [
    { icon: Heart, value: stats.yearsRescuing || '50+', label: 'Years Rescuing & Caring for Animals' },
    { icon: Calendar, value: stats.established || '2012', label: 'Star Ranch Animal Sanctuary', highlight: true },
    { icon: Cross, value: stats.services || 'Shelter • Food • Medical Care', label: '', isText: true },
  ];

  return (
    <section className="stats-strip" ref={ref}>
      <div className={`container stats-strip__inner fade-in ${isVisible ? 'visible' : ''}`}>
        {items.map(({ icon: Icon, value, label, highlight, isText }, i) => (
          <div key={i} className="stats-strip__item">
            {i > 0 && <div className="stats-strip__divider" />}
            <Icon size={28} className="stats-strip__icon" />
            <div className="stats-strip__value" style={highlight ? { color: 'var(--red)' } : {}}>
              {value}
            </div>
            {!isText && label && <div className="stats-strip__label">{label}</div>}
            {isText && <div className="stats-strip__label stats-strip__label--large">{value}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
