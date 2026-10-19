// The cabinet on the homepage, in shelf order. `kind` defaults to an illustrated exhibit.
// `remark` is what the curator says on hover; `details` become the placard's label rows.
export const exhibits = [
  {
    id: 'playkit', title: 'PlayKit', status: 'Live', tone: 'live',
    image: '/images/poker-helper-v1.webp', backdrop: '#e7e1f4',
    remark: 'This one started because nobody had chips.',
    details: [
      ['Medium', 'TypeScript · WebRTC data channels · Cloudflare Workers & Durable Objects'],
      ['Built to learn', 'WebRTC, with one host browser in charge of the game'],
      ['Contains', 'Poker chips, chess clock, scorekeeper, tournaments, Undercover, and Imposter. Friends can join supported games on their own phones.'],
    ],
    quote: 'My friends and I had cards, but no chips or cash.',
    links: [
      { label: 'Try PlayKit', href: 'https://playkit.oakkarphyo.com', primary: true },
      { label: 'What I learned about WebRTC', href: '/writing/playkit-webrtc' },
      { label: 'Code', href: 'https://github.com/okhay-p/playkit' },
    ],
  },
  {
    id: 'home-server', title: 'Home server', status: 'Personal setup', tone: 'live',
    image: '/images/home-server-v1.webp', backdrop: '#dde7d2',
    remark: 'My old laptop works the night shift now.',
    details: [
      ['Medium', 'One old laptop · Hermes · Codex · OpenCode · T3 · Tailscale'],
      ['Purpose', 'Long agent tasks keep running while my everyday laptop is off'],
      ['Access', 'Tailscale when I’m out; Hermes over Discord and Telegram for research and server setup'],
    ],
    quote: 'An old laptop now runs long agent tasks so my everyday laptop doesn’t have to.',
    links: [],
  },
  {
    id: 'akashalearn', title: 'AkashaLearn', status: 'Archived', tone: 'archived',
    image: '/images/akashalearn-v1.webp', backdrop: '#e7e1f4',
    remark: 'Retired. But it taught me Go.',
    details: [
      ['Medium', 'Go API · React client · LLM integration'],
      ['Built to learn', 'Go, and experimenting with LLMs in a real app'],
      ['Condition', 'No longer maintained. The app is offline; the code is public.'],
    ],
    quote: 'I built an AI lesson app to learn Go and experiment with LLM integration.',
    links: [
      { label: 'API code', href: 'https://github.com/okhay-p/akasha-api', primary: true },
      { label: 'Client code', href: 'https://github.com/okhay-p/akasha-client' },
    ],
  },
  {
    id: 'polygons', title: 'A past life in polygons', status: 'Before code', tone: 'archived',
    image: '/images/instagram-creative-card-v1.webp', backdrop: '#f3e0cd',
    remark: 'Before code, I made little 3D worlds.',
    details: [
      ['Medium', '3D models and animation'],
      ['On view', 'A miniature gallery inspired by my old renders'],
      ['Archive', '@noooidea.creative on Instagram'],
    ],
    quote: 'I used to make 3D models and animations. Some of that past life lives on Instagram.',
    links: [{ label: 'See the renders', href: 'https://www.instagram.com/noooidea.creative/', primary: true }],
  },
  {
    id: 'webrtc-note', kind: 'note', title: 'Game night taught me WebRTC.', plaque: 'Learning note', status: 'Learning note', tone: 'live',
    remark: 'I write down what I learn.',
    details: [
      ['Medium', 'Writing and diagrams'],
      ['Covers', 'Signaling, offers and answers, ICE, STUN and TURN, and why one browser owns the game'],
      ['Honest limit', 'PlayKit uses STUN without TURN, so some networks can’t connect yet'],
    ],
    quote: 'Connecting our phones became a way to learn how browsers find each other.',
    links: [
      { label: 'Read the note', href: '/writing/playkit-webrtc', primary: true },
      { label: 'All learning notes', href: '/writing' },
    ],
  },
  {
    id: 'next', kind: 'empty', title: 'Reserved', status: 'Empty on purpose', tone: 'soon',
    remark: 'Next project goes here. Probably.',
    details: [
      ['Medium', 'To be decided'],
      ['Status', 'Currently learning & building'],
    ],
    quote: 'This shelf is empty on purpose.',
    links: [
      { label: 'Follow on GitHub', href: 'https://github.com/okhay-p', primary: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oakkarphyo/' },
    ],
  },
];
