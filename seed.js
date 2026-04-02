const mongoose = require('mongoose');
require('dotenv').config();
const Artist = require('./models/Artist');
const Testimonial = require('./models/Testimonial');
const Blog = require('./models/Blog');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artist_management';

const artists = [
  {
    name: 'Arjun Kapoor',
    category: 'Actor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop',
    bio: 'Award-winning actor known for his versatile performances in Bollywood. With over a decade of experience, Arjun has captivated audiences worldwide with his powerful on-screen presence and dedication to his craft.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: true,
  },
  {
    name: 'Priya Sharma',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop',
    bio: 'Digital content creator and lifestyle influencer with 5M+ followers across platforms. Known for authentic brand partnerships and engaging content that resonates with Gen-Z audiences.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: true,
  },
  {
    name: 'Vikram Singh',
    category: 'Musician',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop',
    bio: 'Multi-platinum recording artist and composer. Vikram blends traditional Indian melodies with contemporary beats, creating music that transcends borders and connects with audiences globally.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: true,
  },
  {
    name: 'Ananya Desai',
    category: 'Creator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop',
    bio: 'Award-winning content creator specializing in fashion and beauty. With a unique storytelling approach, Ananya has built a loyal community of millions who trust her creative vision.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', facebook: 'https://facebook.com' },
    featured: true,
  },
  {
    name: 'Rohan Mehta',
    category: 'Actor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop',
    bio: 'Rising star in the Indian film industry with critically acclaimed performances. Rohan brings depth and authenticity to every role, making him one of the most sought-after young actors today.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: false,
  },
  {
    name: 'Meera Nair',
    category: 'Influencer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop',
    bio: 'Travel and lifestyle influencer who has collaborated with 100+ global brands. Meera\'s authentic voice and stunning visuals have made her a top choice for premium brand campaigns.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: true,
  },
  {
    name: 'Aditya Patel',
    category: 'Musician',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop',
    bio: 'Independent music producer and DJ known for electrifying live performances. Aditya has headlined major festivals and his tracks have been streamed over 50 million times worldwide.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: false,
  },
  {
    name: 'Kavya Reddy',
    category: 'Creator',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=600&fit=crop',
    bio: 'Tech and gaming content creator with a massive online presence. Kavya\'s engaging reviews and tutorials have made her a leading voice in the Indian tech content space.',
    socialLinks: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', twitter: 'https://twitter.com' },
    featured: true,
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'Brand Starter Inc.',
    message: 'Working with this agency was a game-changer for our brand. They connected us with the perfect influencer who truly understood our vision and delivered exceptional results.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    company: 'Global Media Co.',
    message: 'The professionalism and dedication of this team is unmatched. They handled every aspect of our campaign flawlessly and exceeded all our KPIs.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    company: 'TechVenture Labs',
    message: 'Incredible talent roster and seamless collaboration process. The team made our product launch campaign a massive success with their strategic approach.',
    rating: 4,
  },
  {
    name: 'Lisa Chen',
    company: 'Fashion Forward',
    message: 'Their understanding of the influencer landscape is remarkable. Every artist they recommended was a perfect fit for our brand identity.',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    company: 'EventPro Solutions',
    message: 'From booking to execution, the agency handled everything with precision. Our event was a resounding success thanks to their curated talent.',
    rating: 4,
  },
  {
    name: 'Neha Gupta',
    company: 'Digital Dreams Agency',
    message: 'We have been working with them for over two years now and the results keep getting better. They truly understand the digital ecosystem.',
    rating: 5,
  },
];

const blogs = [
  {
    title: 'The Rise of Influencer Marketing in 2026',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    content: 'Influencer marketing has evolved dramatically over the past few years. In 2026, we are witnessing a paradigm shift in how brands connect with their audiences through authentic voices. The industry has moved beyond simple sponsored posts to create meaningful, long-term partnerships that deliver real value.\n\nBrands are now investing in micro and nano influencers who bring highly engaged, niche audiences. This shift reflects a deeper understanding that authenticity trumps reach. The most successful campaigns this year have been those that allow creators to maintain their unique voice while seamlessly integrating brand messages.\n\nAs we look ahead, the integration of AI tools and advanced analytics is making it easier than ever to measure ROI and optimize campaigns in real-time. The future of influencer marketing is data-driven, authentic, and incredibly exciting.',
    excerpt: 'Discover how influencer marketing has transformed in 2026 and what it means for brands looking to connect authentically with their audience.',
    author: 'Admin',
  },
  {
    title: 'How to Choose the Right Talent for Your Brand',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    content: 'Selecting the right talent for your brand campaign is arguably the most critical decision in influencer marketing. The alignment between a creator\'s audience, content style, and your brand values can make or break a campaign.\n\nStart by defining your campaign objectives clearly. Are you looking for brand awareness, direct sales, or community building? Each goal requires a different type of talent. Next, analyze potential partners\' audience demographics, engagement rates, and content quality.\n\nDon\'t just look at follower counts. A creator with 50,000 highly engaged followers can often deliver better results than one with millions of passive followers. Look for authentic engagement, consistent content quality, and a genuine connection with their audience.',
    excerpt: 'A comprehensive guide to selecting the perfect talent partner that aligns with your brand values and campaign objectives.',
    author: 'Admin',
  },
  {
    title: 'Behind the Scenes: Managing Top Artists',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    content: 'Managing top-tier talent requires a unique blend of business acumen, emotional intelligence, and creative understanding. At our agency, we pride ourselves on providing comprehensive management that goes beyond simple booking.\n\nOur approach involves understanding each artist\'s career aspirations, personal brand, and growth trajectory. We create customized strategies that align brand partnerships with the artist\'s authentic identity, ensuring every collaboration feels natural and genuine.\n\nFrom contract negotiations to campaign execution, our team handles every detail with precision. We believe that the best partnerships are built on trust, transparency, and mutual respect between brands and talent.',
    excerpt: 'Get an exclusive look at what goes into managing some of the industry\'s most sought-after artists and creators.',
    author: 'Admin',
  },
  {
    title: 'The Future of Brand Collaborations',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop',
    content: 'Brand collaborations are entering a new era defined by creativity, technology, and authentic storytelling. The traditional advertising model is giving way to collaborative content creation where brands and artists co-create experiences.\n\nWe\'re seeing innovative formats emerge—from virtual events and AR experiences to long-form documentary-style content that tells compelling brand stories. These collaborations go beyond simple endorsements to create lasting cultural impact.\n\nThe most exciting development is the rise of equity partnerships, where talent becomes invested stakeholders in the brands they represent. This model creates deeper alignment and more authentic advocacy that resonates with audiences.',
    excerpt: 'Explore the evolving landscape of brand-artist collaborations and discover what the future holds for creative partnerships.',
    author: 'Admin',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Artist.deleteMany({});
    await Testimonial.deleteMany({});
    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Artist.insertMany(artists);
    await Testimonial.insertMany(testimonials);
    await Blog.insertMany(blogs);
    console.log('🌱 Seed data inserted successfully');

    await mongoose.connection.close();
    console.log('✅ Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
