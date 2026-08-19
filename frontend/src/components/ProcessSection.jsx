import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import './ProcessSection.css';

const STEPS = [
  {
    num: '01',
    title: 'Contact Us',
    description: 'Tell us about the animal and situation.',
  },
  {
    num: '02',
    title: 'We Assess Their Needs',
    description: 'The sanctuary reviews what care or assistance may be required.',
  },
  {
    num: '03',
    title: 'Compassionate Care',
    description: 'Provide the appropriate shelter, food, medical assistance, or guidance.',
  },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section process-section" ref={ref}>
      <div className="container">
        <div className={`process-section__header fade-in ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">How We Help</span>
          <h2 className="section-title">Our Process</h2>
        </div>

        <div className={`process-section__steps fade-in ${isVisible ? 'visible' : ''}`}>
          {STEPS.map((step, i) => (
            <div key={step.num} className="process-step">
              <div className="process-step__num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="process-step__arrow" size={24} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
