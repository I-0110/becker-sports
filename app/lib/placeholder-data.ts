// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const admins = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Alex',
    email: 'abecker@beckersports.com',
    password: 'AIL405',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Ivelis',
    email: 'ibecker@beckersports.com',
    password: 'AIL111',
  },
];

const posts = [
  {
    id: '410544b2-4001-4271-9850-fec4b6a6442a',
    admin_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    date: '2025-11-28', 
    title: 'Welcome to Becker Sports!',
    content: 'This is our first post about sports news and updates. Stay tuned for more exciting content!',
    category: 'chiefs',
    image_url: 'https://en.wikipedia.org/wiki/File:American_football.svg',
    video_url: 'https://www.youtube.com/embed/8tokil7vnE4?si=fhdRC8exaUi3yoGa',
    status: 'publish',
  },
  {
    id: '410544b2-4001-4271-9851-fec4b6a6443b',
    admin_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    date: '2025-11-28', 
    title: 'Alex Becker',
    content: 'Meet the guy behind the writing. From Hays, KS, he grew up watching football with his dad and seeing the ups and downs of the Chief for more than 30 years. He studied statistics at K-State. What Alex\'s brings? Neutral stats about players, projects that you might be interesting in reading, and food (while you read his posts).',
    category: 'chiefs',
    image_url: 'https://en.wikipedia.org/wiki/File:American_football.svg',
    video_url: 'https://www.youtube.com/embed/8tokil7vnE4?si=fhdRC8exaUi3yoGa',
    status: 'publish',
  }
]

const subscribers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

export { subscribers, posts, admins };
