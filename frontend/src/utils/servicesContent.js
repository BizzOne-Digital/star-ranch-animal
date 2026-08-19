export const SERVICES_CONTENT = {
  heroSubtitle:
    'From emergency rescue to long-term shelter, Joyce and Keith provide compassionate care for animals who need a safe place. Contact us for pricing or assistance — every situation is unique.',

  intro: {
    title: 'Compassionate Care for Every Animal',
    paragraphs: [
      'At Star Ranch Animal Sanctuary, we understand that caring for an animal in need can be overwhelming. Whether you are facing an emergency, struggling to provide daily care, or looking for a safe home for a horse, dog, cat, or farm animal — we are here to help.',
      'Joyce and Keith Robinson personally oversee shelter, feeding, medical support, and rescue assistance from their ranch in Concho, Arizona. Pricing is not fixed. We ask that you reach out so we can understand your situation and provide the right level of support.',
    ],
  },

  serviceDetails: {
    shelter: {
      points: [
        'Secure, comfortable shelter for horses, dogs, cats & farm animals',
        'Safe enclosures with daily monitoring and compassionate handling',
        'Short-term recovery or long-term sanctuary when needed',
        'A calm ranch environment where frightened animals can heal',
      ],
    },
    food: {
      points: [
        'Nutritious meals and fresh water provided daily',
        'Individual feeding plans based on each animal\'s needs',
        'Ongoing weight and health monitoring',
        'Special dietary support for seniors, rescues & recovering animals',
      ],
    },
    medical: {
      points: [
        'Coordination with veterinarians for exams & treatment',
        'Medication administration and wound care support',
        'Help accessing emergency medical attention when urgent',
        'Ongoing health monitoring throughout recovery',
      ],
    },
    rescue: {
      points: [
        'Guidance for families facing difficult animal care decisions',
        'Support for rescuers and good Samaritans who find animals in need',
        'Assessment of each situation to determine the best path forward',
        'Wildlife rescue assistance and release when appropriate',
      ],
    },
    assistance: {
      points: [
        'Advice on feeding, shelter, and everyday animal care',
        'Help connecting with resources when full sanctuary placement isn\'t needed',
        'Compassionate guidance for owners who can no longer care for an animal',
        'Emergency response coordination when time is critical',
      ],
    },
  },

  additionalServices: [
    {
      icon: 'rescue',
      title: 'Rescue Support',
      description:
        'We assist with animal rescues across Arizona — helping evaluate situations, provide transport guidance, and offer sanctuary placement when animals have nowhere else to go.',
      key: 'rescue',
    },
    {
      icon: 'assistance',
      title: 'Animal Assistance',
      description:
        'Not every situation requires full sanctuary care. Joyce and Keith offer guidance, resources, and hands-on help so families and rescuers can make the best decision for each animal.',
      key: 'assistance',
    },
  ],

  animalsWeHelp: [
    { label: 'Horses & Donkeys', emoji: '🐴' },
    { label: 'Dogs', emoji: '🐕' },
    { label: 'Cats', emoji: '🐈' },
    { label: 'Farm Animals', emoji: '🐐' },
    { label: 'Wildlife', emoji: '🦅' },
    { label: 'Other Animals in Need', emoji: '🐾' },
  ],

  pricingNote: {
    title: 'Contact Us for Pricing or Assistance',
    text: 'Every animal and every situation is different. We do not use fixed pricing — instead, Joyce and Keith take the time to understand what care or assistance is needed and discuss options with you directly. There is no obligation to reach out.',
  },

  processSteps: [
    { step: '01', title: 'Reach Out', desc: 'Call, email, or submit a help request describing the animal and situation.' },
    { step: '02', title: 'We Assess', desc: 'Joyce and Keith review what shelter, food, medical care, or guidance may be required.' },
    { step: '03', title: 'Compassionate Care', desc: 'We provide the appropriate support — from advice to full sanctuary placement.' },
  ],
};

export const enrichService = (service) => {
  const key = service.icon || 'shelter';
  const details = SERVICES_CONTENT.serviceDetails[key];
  return {
    ...service,
    points: details?.points || [],
  };
};
