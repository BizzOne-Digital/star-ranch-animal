export const ABOUT_CONTENT = {
  title: 'Founded with Heart. Built on Compassion.',
  highlight: 'Joyce and Keith Robinson',
  intro:
    'Joyce and Keith founded Star Ranch Animal Sanctuary in 2012 after spending more than 50 years rescuing, saving, caring for, and advocating for animals across Arizona and beyond.',

  homeParagraphs: [
    'What began as a lifelong calling to protect vulnerable animals became a permanent sanctuary — a safe ranch home where horses, dogs, cats, farm animals, and wildlife can heal, rest, and receive the care they deserve.',
    'From emergency rescues to long-term shelter, Joyce and Keith personally oversee daily feeding, medical support, and compassionate handling for every animal who arrives at the ranch. Their work has also included wildlife rescue, with successful releases of animals such as vultures back into the wild.',
    'Located in Concho, Arizona, Star Ranch Animal Sanctuary exists for people who need help caring for an animal — and for animals who have nowhere else to turn.',
  ],

  storySections: [
    {
      id: 'beginning',
      label: 'The Beginning',
      title: 'A Lifelong Commitment to Animals',
      paragraphs: [
        'Long before Star Ranch Animal Sanctuary was officially established in 2012, Joyce and Keith Robinson were already known for opening their hearts and their land to animals in crisis. For more than five decades, they have responded to calls for help — taking in abandoned horses, injured dogs, neglected farm animals, and wildlife that needed a second chance.',
        'Their ranch in Concho, Arizona became a place of refuge not because it was easy, but because it was necessary. Animals arrived frightened, hungry, or hurt. Joyce and Keith met each one with patience, steady hands, and the quiet determination that only comes from a lifetime of service.',
      ],
    },
    {
      id: 'sanctuary',
      label: 'Our Sanctuary',
      title: 'More Than a Ranch — A Place of Healing',
      paragraphs: [
        'Star Ranch Animal Sanctuary provides safe shelter, daily food and water, hands-on care, and access to medical treatment when animals need it most. Every resident receives individual attention — whether they stay for a short recovery or need a long-term home.',
        'Joyce and Keith believe that compassion should never have a deadline. Some animals arrive after years of neglect. Others come from families who can no longer care for them. Whatever the circumstance, the sanctuary offers stability, dignity, and hope.',
        'Pricing is not fixed. We ask that you contact us directly so we can understand the situation and provide the right level of assistance.',
      ],
    },
    {
      id: 'wildlife',
      label: 'Wildlife & Rescue',
      title: 'Rescuing Beyond the Barn',
      paragraphs: [
        'The Robinsons\' work extends beyond traditional companion and farm animals. They have rescued wildlife and worked toward successful release when recovery allows — including animals such as vultures that were rehabilitated and returned to the wild.',
        'Whether the need is urgent or ongoing, Joyce and Keith assess each case carefully. They coordinate shelter, nutrition, medical guidance, and — when possible — a path back to freedom for wildlife who belong in nature.',
      ],
    },
    {
      id: 'mission',
      label: 'Our Mission',
      title: 'Rescue. Shelter. Care. Compassion. Second Chances.',
      paragraphs: [
        'Star Ranch Animal Sanctuary exists to help people who need assistance with animal care — and to give animals a safe place when they have nowhere else to go. We serve families, rescuers, and animal lovers across Arizona who believe every creature deserves kindness.',
        'With community support, we continue to expand our ability to respond — providing food, fencing, veterinary care, and the daily labor that keeps the ranch running. Every donation and every act of help makes it possible for us to say yes when an animal needs us most.',
      ],
    },
  ],

  values: [
    {
      title: 'Rescue',
      desc: 'We respond when animals are abandoned, injured, or at risk — offering immediate help and a safe place to land.',
    },
    {
      title: 'Shelter',
      desc: 'Our ranch provides secure, comfortable environments where animals can rest, recover, and feel protected.',
    },
    {
      title: 'Care',
      desc: 'Daily feeding, clean water, monitoring, and medical support ensure every resident is treated with attention and respect.',
    },
    {
      title: 'Compassion',
      desc: 'Joyce and Keith lead with patience and heart — because trust is built one gentle moment at a time.',
    },
  ],

  milestones: [
    { year: '50+ Years', text: 'Rescuing, saving, and advocating for animals' },
    { year: '2012', text: 'Star Ranch Animal Sanctuary officially founded' },
    { year: 'Today', text: 'Shelter, food, medical care & rescue support in Concho, AZ' },
  ],
};

export const getAboutDescription = () =>
  [ABOUT_CONTENT.intro, ...ABOUT_CONTENT.homeParagraphs.slice(0, 2)].join(' ');
