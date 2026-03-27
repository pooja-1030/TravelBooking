/* ——— Rich Mock Travel Data ——— */

import baliImg from '../assets/images/bali.png'
import parisImg from '../assets/images/paris.png'
import dubaiImg from '../assets/images/dubai.png'
import tokyoImg from '../assets/images/tokyo.png'
import adventureImg from '../assets/images/adventure.png'
import heroImg from '../assets/images/hero.png'

export { heroImg }

export const CITIES = {
  bali: {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    badge: 'Popular',
    rating: 4.8,
    reviewCount: 2847,
    price: 899,
    priceRange: '$800 – $2,500',
    heroImage: baliImg,
    images: [
      baliImg,
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80',
    ],
    shortDesc: 'The Island of Gods — Bali',
    description: 'Bali is a living postcard, an Indonesian paradise that feels like a fantasy. Soak up the sun on a private beach, stroll through lush rice paddies, explore ancient temples, or surf world-class waves. With its warm hospitality, delicious cuisine, and spiritual atmosphere, Bali offers an unforgettable travel experience that blends relaxation with adventure.',
    bestTimeToVisit: 'April – October (Dry Season)',
    avgCost: '$80–$200/day',
    travelType: ['adventure', 'relax', 'culture', 'budget'],
    highlights: ['Ubud Rice Terraces', 'Uluwatu Temple', 'Seminyak Beach', 'Mount Batur Sunrise Trek'],
    culture: 'Rich Hindu-Balinese culture with daily offerings, traditional dances, and ornate temple ceremonies.',
    weather: 'Tropical climate with warm temperatures year-round. Dry season (Apr-Oct) is ideal for outdoor activities.',
    attractions: [
      { name: 'Tegallalang Rice Terraces', desc: 'Iconic green rice paddies with stunning valley views and scenic jungle swings', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
      { name: 'Uluwatu Temple', desc: 'Clifftop temple with dramatic ocean sunset views and traditional Kecak fire dance', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80' },
      { name: 'Mount Batur', desc: 'Active volcano with breathtaking sunrise treks and natural hot springs', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80' },
      { name: 'Tirta Empul Temple', desc: 'Sacred water temple for traditional purification rituals dating back to 926 AD', img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=400&q=80' },
      { name: 'Nusa Penida Island', desc: 'Stunning limestone cliffs, crystal-clear waters, and the famous Kelingking Beach', img: 'https://images.unsplash.com/photo-1570789210967-2cac24f04879?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'The Mulia Resort & Villas',
        stars: 5,
        price: 320,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        location: 'Nusa Dua, Bali',
        rooms: [
          { id: 'r1', name: 'Standard Ocean View', price: 320, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Ocean View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r2', name: 'Deluxe Suite', price: 550, available: 1, amenities: ['WiFi', 'AC', 'Breakfast', 'Private Pool', 'Butler Service'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r3', name: 'Presidential Villa', price: 980, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Private Pool', 'Butler', 'Spa Access'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Hanging Gardens of Bali',
        stars: 5,
        price: 450,
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        location: 'Ubud, Bali',
        rooms: [
          { id: 'r4', name: 'Jungle Villa', price: 450, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Infinity Pool', 'Jungle View'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
          { id: 'r5', name: 'Riverside Suite', price: 680, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Private Pool', 'River View', 'Yoga Deck'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Alila Villas Uluwatu',
        stars: 5,
        price: 280,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80',
        location: 'Uluwatu, Bali',
        rooms: [
          { id: 'r6', name: 'Pool Villa', price: 280, available: 5, amenities: ['WiFi', 'AC', 'Breakfast', 'Clifftop View'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r7', name: 'Cliff Edge Cabana', price: 420, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Private Pool', 'Ocean View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'Ubud Village Resort',
        stars: 4,
        price: 95,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
        location: 'Ubud, Bali',
        rooms: [
          { id: 'r8', name: 'Garden Room', price: 95, available: 8, amenities: ['WiFi', 'AC', 'Breakfast'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r9', name: 'Deluxe Pool Access', price: 145, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Pool Access'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Locavore', cuisine: 'Modern Indonesian', rating: 4.9, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Babi Guling', 'Seafood Tasting', 'Volcanic Salt Dessert'] },
      { name: 'Nook', cuisine: 'Local / Western Fusion', rating: 4.7, priceRange: '$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Nasi Campur', 'Smoothie Bowls', 'Avocado Toast'] },
      { name: 'Motel Mexicola', cuisine: 'Mexican', rating: 4.6, priceRange: '$$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Tacos', 'Margaritas', 'Guacamole'] },
      { name: 'Warung Babi Guling Ibu Oka', cuisine: 'Traditional Balinese', rating: 4.8, priceRange: '$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Suckling Pig', 'Lawar', 'Sate Lilit'] },
      { name: 'Sardine', cuisine: 'Seafood', rating: 4.7, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Grilled Barramundi', 'Prawn Curry', 'Tuna Tartare'] },
    ],
    transport: {
      flights: 'Ngurah Rai International Airport (DPS) is the main gateway, served by major international airlines.',
      trains: 'No rail service in Bali. Inter-island ferries connect to Java.',
      local: ['Gojek/Grab (Scooter Taxis)', 'Private Car Charters ($40-60/day)', 'Scooter Rentals ($5/day)', 'Shuttle buses between tourist areas'],
      cost: 'Local transport averages $5-$20 per day depending on distance.'
    },
    packages: [
      { id: 'p1', name: 'Ubud Bliss Retreat', duration: '3 Days', hotel: 'Hanging Gardens of Bali', activities: ['Rice Terrace Trek', 'Monkey Forest', 'Spa Day', 'Yoga Session'], meals: 'Breakfast + 2 Dinners', price: 1200 },
      { id: 'p2', name: 'Ultimate Bali Adventure', duration: '5 Days', hotel: 'Multiple Resorts', activities: ['Mt. Batur Trek', 'White Water Rafting', 'Temple Tours', 'Snorkeling'], meals: 'All Inclusive', price: 2200 },
      { id: 'p3', name: 'Complete Bali Experience', duration: '7 Days', hotel: 'The Mulia + Hanging Gardens', activities: ['Mt. Batur Trek', 'Scuba Diving', 'Temple Tours', 'Nusa Penida Day Trip', 'Cooking Class', 'Spa Day'], meals: 'All Inclusive', price: 3800 },
    ],
    reviews: [
      { name: 'Elena R.', avatar: 'ER', rating: 5, comment: 'Bali changed my life! The culture, the food, the people — everything was perfect. I cannot wait to return.' },
      { name: 'Mark T.', avatar: 'MT', rating: 4.5, comment: 'Amazing beaches and villas. Traffic in Seminyak was heavy, but Ubud was incredibly peaceful.' },
      { name: 'Priya S.', avatar: 'PS', rating: 5, comment: 'The temple ceremonies were breathtaking. Locals were so welcoming. Best honeymoon destination!' },
      { name: 'Jake W.', avatar: 'JW', rating: 4, comment: 'Great surfing at Uluwatu. Food was incredible and cheap. Would have loved more time in the north.' },
    ],
    budget: { stay: 45, food: 25, travel: 10, activities: 20, total: 2000 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  paris: {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    badge: 'Romantic',
    rating: 4.9,
    reviewCount: 4125,
    price: 1249,
    priceRange: '$1,000 – $3,500',
    heroImage: parisImg,
    images: [
      parisImg,
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&q=80',
      'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800&q=80',
      'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&q=80',
    ],
    shortDesc: 'The City of Light — Paris',
    description: 'Paris captivates visitors with its iconic landmarks, world-renowned museums, charming cafes, and exquisite cuisine. From the Eiffel Tower to the Louvre, every corner tells a story of art, history, and romance. Stroll along the Seine, explore Montmartre, and indulge in croissants at a sidewalk cafe — Paris is a timeless destination that never disappoints.',
    bestTimeToVisit: 'April – June, September – October',
    avgCost: '$150–$350/day',
    travelType: ['culture', 'food', 'luxury', 'romantic'],
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Champs-Elysees', 'Montmartre & Sacre-Coeur'],
    culture: 'Birthplace of Impressionism, haute couture, and existentialist philosophy. A living museum of art and architecture.',
    weather: 'Mild continental climate. Spring and fall are ideal with pleasant temperatures and fewer crowds.',
    attractions: [
      { name: 'Eiffel Tower', desc: 'The iconic 330m iron lattice tower and universal symbol of Paris, offering panoramic city views', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80' },
      { name: 'Louvre Museum', desc: 'World\'s largest art museum with 35,000+ works including the Mona Lisa and Venus de Milo', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80' },
      { name: 'Notre-Dame Cathedral', desc: 'Gothic masterpiece on the Ile de la Cite, currently being restored to its former glory', img: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&q=80' },
      { name: 'Sacre-Coeur Basilica', desc: 'Hilltop church in Montmartre with panoramic views of Paris and artistic neighborhood', img: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&q=80' },
      { name: 'Palace of Versailles', desc: 'Opulent royal chateau with spectacular gardens, Hall of Mirrors, and rich French history', img: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'The Ritz Paris',
        stars: 5,
        price: 850,
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1542314831-c6a4d142915f?w=600&q=80',
        location: 'Place Vendome, Paris',
        rooms: [
          { id: 'r1', name: 'Superior Room', price: 850, available: 2, amenities: ['WiFi', 'AC', 'Marble Bath', 'City View'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r2', name: 'Prestige Suite', price: 1500, available: 1, amenities: ['WiFi', 'AC', 'Living Area', 'Butler Service', 'Terrace'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
          { id: 'r3', name: 'Coco Chanel Suite', price: 3200, available: 1, amenities: ['WiFi', 'AC', 'Full Kitchen', 'Butler', 'Private Terrace', 'Spa Access'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Hotel Plaza Athenee',
        stars: 5,
        price: 620,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
        location: 'Avenue Montaigne, Paris',
        rooms: [
          { id: 'r4', name: 'Classic Room', price: 620, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Eiffel View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r5', name: 'Deluxe Suite', price: 1100, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Living Room', 'Minibar'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Le Marais Boutique Hotel',
        stars: 4,
        price: 180,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        location: 'Le Marais, Paris',
        rooms: [
          { id: 'r6', name: 'Boutique Double', price: 180, available: 6, amenities: ['WiFi', 'AC', 'Courtyard View'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r7', name: 'Superior Room', price: 250, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Balcony'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'Hotel Lutetia',
        stars: 5,
        price: 520,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'Saint-Germain-des-Pres, Paris',
        rooms: [
          { id: 'r8', name: 'Classic Room', price: 520, available: 5, amenities: ['WiFi', 'AC', 'Breakfast', 'Art Deco Design'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r9', name: 'Junior Suite', price: 780, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Lounge', 'Spa Access'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Le Jules Verne', cuisine: 'Fine French', rating: 4.8, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Foie Gras', 'Truffle Risotto', 'Souffle au Chocolat'] },
      { name: 'Bistrot Paul Bert', cuisine: 'Classic French', rating: 4.7, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Steak Frites', 'Souffle', 'Creme Brulee'] },
      { name: "L'As du Fallafel", cuisine: 'Middle Eastern', rating: 4.8, priceRange: '$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Falafel Sandwich', 'Shawarma', 'Hummus Plate'] },
      { name: 'Le Comptoir du Pantheon', cuisine: 'French Bistro', rating: 4.6, priceRange: '$$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Croque Monsieur', 'French Onion Soup', 'Tarte Tatin'] },
      { name: 'Pierre Herme', cuisine: 'Patisserie', rating: 4.9, priceRange: '$$', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', dishes: ['Ispahan Macaron', 'Croissants', 'Eclairs'] },
      { name: 'Chez Janou', cuisine: 'Provencal', rating: 4.5, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Chocolate Mousse', 'Ratatouille', 'Duck Confit'] },
    ],
    transport: {
      flights: 'Charles de Gaulle (CDG) and Orly (ORY) are the main airports, both well-connected to the city center.',
      trains: 'Eurostar connects London, Thalys connects Brussels/Amsterdam. TGV for domestic high-speed rail.',
      local: ['Paris Metro (16 lines)', 'RER Trains', 'Velib Bike Sharing', 'Buses', 'Uber/Bolt'],
      cost: 'A single Metro ticket is EUR2.10. Day pass (Mobilis) from EUR8.45. Taxis and Uber widely available.'
    },
    packages: [
      { id: 'p1', name: 'Romance in Paris', duration: '3 Days', hotel: 'Le Marais Boutique Hotel', activities: ['Seine Cruise', 'Louvre Tour', 'Eiffel Tower Dinner'], meals: 'Breakfast + 1 Dinner', price: 1450 },
      { id: 'p2', name: 'Art & Culture Explorer', duration: '5 Days', hotel: 'Hotel Lutetia', activities: ['Louvre & Orsay Tour', 'Montmartre Walk', 'Wine Tasting', 'Versailles Day Trip'], meals: 'Breakfast + 2 Dinners', price: 2800 },
      { id: 'p3', name: 'Ultimate Paris Experience', duration: '7 Days', hotel: 'Hotel Plaza Athenee', activities: ['Versailles Trip', 'Montmartre Walk', 'Wine Tasting', 'Seine Cruise', 'Cooking Class', 'Shopping Tour'], meals: 'All Inclusive', price: 4500 },
    ],
    reviews: [
      { name: 'Sophie L.', avatar: 'SL', rating: 5, comment: 'Magical city! The food, the architecture, everything is just as you dream it to be. Pure romance.' },
      { name: 'James K.', avatar: 'JK', rating: 4, comment: 'Beautiful, but the crowds at the Louvre were intense. Buy skip-the-line tickets in advance!' },
      { name: 'Maria G.', avatar: 'MG', rating: 5, comment: 'The pastries alone are worth the trip. Every cafe felt like a scene from a movie.' },
      { name: 'Tom B.', avatar: 'TB', rating: 4.5, comment: 'Montmartre at sunset was unforgettable. The Metro makes getting around incredibly easy.' },
    ],
    budget: { stay: 50, food: 30, travel: 10, activities: 10, total: 3200 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  dubai: {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    badge: 'Luxury',
    rating: 4.7,
    reviewCount: 3560,
    price: 1099,
    priceRange: '$900 – $4,000',
    heroImage: dubaiImg,
    images: [
      dubaiImg,
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80',
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=80',
    ],
    shortDesc: 'Where the Future Meets the Desert — Dubai',
    description: 'Dubai is where the future meets the desert. Home to the world\'s tallest building, largest shopping mall, and most luxurious hotels, this city pushes boundaries at every turn. Experience thrilling desert safaris, shop at gold souks, dine at sky-high restaurants, and relax on pristine beaches — all within one extraordinary destination.',
    bestTimeToVisit: 'November – March (Winter)',
    avgCost: '$120–$400/day',
    travelType: ['luxury', 'adventure', 'shopping'],
    highlights: ['Burj Khalifa', 'Dubai Marina', 'Palm Jumeirah', 'Desert Safari'],
    culture: 'A blend of traditional Bedouin heritage and ultra-modern cosmopolitan lifestyle. Visit the historic Al Fahidi District.',
    weather: 'Hot desert climate. Winters (Nov-Mar) are pleasant at 20-30C. Summers can exceed 45C.',
    attractions: [
      { name: 'Burj Khalifa', desc: 'The world\'s tallest structure at 828 meters with observation decks on floors 124 and 148', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
      { name: 'Palm Jumeirah', desc: 'Iconic man-made island with luxury resorts, beaches, and the famous Atlantis hotel', img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&q=80' },
      { name: 'Dubai Mall', desc: 'World\'s largest mall with 1,200+ shops, aquarium, ice rink, and fountain show', img: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&q=80' },
      { name: 'Desert Safari', desc: 'Thrilling dune bashing, camel rides, and traditional Bedouin camp dinner under the stars', img: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&q=80' },
      { name: 'Dubai Marina', desc: 'Stunning waterfront promenade with skyscrapers, yacht tours, and vibrant nightlife', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Burj Al Arab Jumeirah',
        stars: 5,
        price: 1200,
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        location: 'Jumeirah Beach, Dubai',
        rooms: [
          { id: 'r1', name: 'Deluxe Suite', price: 1200, available: 2, amenities: ['WiFi', 'AC', 'Butler Service', 'Ocean View', 'Jacuzzi'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
          { id: 'r2', name: 'Royal Suite', price: 3500, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Private Cinema', 'Helipad Access'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Atlantis The Royal',
        stars: 5,
        price: 550,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        location: 'Palm Jumeirah, Dubai',
        rooms: [
          { id: 'r3', name: 'Sea View Room', price: 550, available: 5, amenities: ['WiFi', 'AC', 'Breakfast', 'Beach Access', 'Pool'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r4', name: 'Terrace Suite', price: 950, available: 2, amenities: ['WiFi', 'AC', 'All Meals', 'Private Terrace', 'Waterpark Access'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Armani Hotel Dubai',
        stars: 5,
        price: 380,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'Burj Khalifa, Downtown Dubai',
        rooms: [
          { id: 'r5', name: 'Classic Room', price: 380, available: 6, amenities: ['WiFi', 'AC', 'Breakfast', 'Armani Amenities'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r6', name: 'Fountain Suite', price: 720, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Fountain View', 'Lounge Access'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'Rove Downtown',
        stars: 3,
        price: 85,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        location: 'Downtown Dubai',
        rooms: [
          { id: 'r7', name: 'Rover Room', price: 85, available: 10, amenities: ['WiFi', 'AC', 'City View'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r8', name: 'Super Rover Room', price: 120, available: 6, amenities: ['WiFi', 'AC', 'Breakfast', 'Pool Access'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'At.mosphere', cuisine: 'Fine Dining', rating: 4.8, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Wagyu Beef', 'Lobster Thermidor', 'Gold-Leaf Dessert'] },
      { name: 'Pierchic', cuisine: 'Seafood', rating: 4.7, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Oysters', 'Grilled Hammour', 'Seafood Tower'] },
      { name: 'Ravi Restaurant', cuisine: 'Pakistani', rating: 4.6, priceRange: '$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Butter Chicken', 'Biryani', 'Seekh Kebab'] },
      { name: 'Al Mallah', cuisine: 'Lebanese Street Food', rating: 4.5, priceRange: '$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Shawarma', 'Manakeesh', 'Fresh Juices'] },
      { name: 'Nobu Dubai', cuisine: 'Japanese Fusion', rating: 4.8, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Black Cod Miso', 'Yellowtail Sashimi', 'Rock Shrimp'] },
    ],
    transport: {
      flights: 'Dubai International Airport (DXB) is one of the world\'s busiest hubs. Al Maktoum (DWC) is the secondary airport.',
      trains: 'No intercity rail. Dubai is well-connected by road to other emirates.',
      local: ['Dubai Metro (Red & Green lines)', 'Dubai Tram', 'RTA Buses', 'Taxis & Uber/Careem', 'Water Taxis & Abras'],
      cost: 'Metro fares from AED 3-7.50 (~$0.80-$2). Taxis start at AED 12 (~$3.25).'
    },
    packages: [
      { id: 'p1', name: 'Dubai Highlights', duration: '3 Days', hotel: 'Rove Downtown', activities: ['Burj Khalifa Visit', 'Dubai Mall', 'Desert Safari'], meals: 'Breakfast + 1 Dinner', price: 999 },
      { id: 'p2', name: 'Luxury Dubai Escape', duration: '5 Days', hotel: 'Atlantis The Royal', activities: ['Burj Khalifa', 'Desert Safari', 'Dubai Marina Yacht', 'Gold Souk Tour', 'Waterpark'], meals: 'Half Board', price: 2800 },
      { id: 'p3', name: 'Ultimate Dubai Experience', duration: '7 Days', hotel: 'Armani Hotel + Atlantis', activities: ['Burj Khalifa', 'Desert Safari', 'Abu Dhabi Day Trip', 'Helicopter Tour', 'Spa Day', 'Shopping Tour'], meals: 'All Inclusive', price: 4200 },
    ],
    reviews: [
      { name: 'Ahmed K.', avatar: 'AK', rating: 5, comment: 'Dubai exceeded every expectation. The Burj Khalifa at sunset was absolutely magical.' },
      { name: 'Lisa M.', avatar: 'LM', rating: 4.5, comment: 'Incredible luxury hotels and world-class dining. The desert safari was the highlight!' },
      { name: 'Chen W.', avatar: 'CW', rating: 4, comment: 'Amazing architecture and shopping. Can get quite hot even in winter, bring sunscreen.' },
      { name: 'Sarah J.', avatar: 'SJ', rating: 5, comment: 'The gold souk was mesmerizing. The blend of old and new Dubai is fascinating.' },
    ],
    budget: { stay: 40, food: 25, travel: 15, activities: 20, total: 2800 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  tokyo: {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    badge: 'Trending',
    rating: 4.85,
    reviewCount: 3890,
    price: 1189,
    priceRange: '$1,000 – $3,000',
    heroImage: tokyoImg,
    images: [
      tokyoImg,
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80',
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&q=80',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80',
    ],
    shortDesc: 'Where Tradition Meets Tomorrow — Tokyo',
    description: 'Tokyo is a city of contrasts — ancient temples beside neon-lit skyscrapers, zen gardens steps from bustling streets. Experience the world\'s best street food in Shibuya, find peace at Meiji Shrine, witness the controlled chaos of Shibuya Crossing, and explore the quirky wonderland of Akihabara. Tokyo offers an endless journey of discovery.',
    bestTimeToVisit: 'March – May (Cherry Blossom), October – November',
    avgCost: '$100–$300/day',
    travelType: ['culture', 'food', 'adventure', 'technology'],
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Meiji Shrine', 'Akihabara District'],
    culture: 'A fascinating blend of ancient Shinto/Buddhist traditions and cutting-edge pop culture, anime, and technology.',
    weather: 'Four distinct seasons. Cherry blossom season (late March-April) and autumn foliage (Nov) are peak times.',
    attractions: [
      { name: 'Senso-ji Temple', desc: 'Tokyo\'s oldest and most significant Buddhist temple with vibrant Nakamise shopping street', img: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&q=80' },
      { name: 'Shibuya Crossing', desc: 'The world\'s busiest pedestrian intersection, iconic symbol of Tokyo\'s energy', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80' },
      { name: 'Meiji Shrine', desc: 'Serene Shinto shrine surrounded by a 170-acre forest in the heart of the city', img: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80' },
      { name: 'Tsukiji Outer Market', desc: 'Famous market for the freshest sushi, street food, and authentic Japanese cuisine', img: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&q=80' },
      { name: 'TeamLab Borderless', desc: 'Immersive digital art museum with stunning interactive light installations', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Aman Tokyo',
        stars: 5,
        price: 580,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1542314831-c6a4d142915f?w=600&q=80',
        location: 'Otemachi, Central Tokyo',
        rooms: [
          { id: 'r1', name: 'Deluxe Room', price: 580, available: 3, amenities: ['WiFi', 'AC', 'Onsen Access', 'City View', 'Minibar'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r2', name: 'Corner Suite', price: 980, available: 1, amenities: ['WiFi', 'AC', 'Onsen', 'Panoramic View', 'Butler'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Park Hyatt Tokyo',
        stars: 5,
        price: 420,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80',
        location: 'Shinjuku, Tokyo',
        rooms: [
          { id: 'r3', name: 'Park Room', price: 420, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Mt. Fuji View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r4', name: 'Deluxe Suite', price: 750, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Living Area', 'Spa Access'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Shinjuku Granbell Hotel',
        stars: 4,
        price: 120,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        location: 'Shinjuku, Tokyo',
        rooms: [
          { id: 'r5', name: 'Standard Double', price: 120, available: 8, amenities: ['WiFi', 'AC', 'Smart TV'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r6', name: 'Superior Room', price: 180, available: 5, amenities: ['WiFi', 'AC', 'Breakfast', 'City View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'The Tokyo Station Hotel',
        stars: 5,
        price: 350,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'Marunouchi, Tokyo',
        rooms: [
          { id: 'r7', name: 'Classic Room', price: 350, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Historic Building'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r8', name: 'Royal Suite', price: 680, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Concierge', 'Lounge Access'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Sukiyabashi Jiro', cuisine: 'Sushi (Omakase)', rating: 4.95, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', dishes: ['20-piece Omakase', 'Otoro Tuna', 'Uni Sushi'] },
      { name: 'Ichiran Ramen', cuisine: 'Ramen', rating: 4.7, priceRange: '$', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', dishes: ['Tonkotsu Ramen', 'Extra Chashu', 'Matcha Pudding'] },
      { name: 'Tsuta', cuisine: 'Michelin Ramen', rating: 4.8, priceRange: '$$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Shoyu Soba', 'Truffle Ramen', 'Gyoza'] },
      { name: 'Gonpachi Nishi-Azabu', cuisine: 'Japanese Izakaya', rating: 4.6, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Yakitori', 'Tempura', 'Soba Noodles'] },
      { name: 'Nakajima', cuisine: 'Traditional Japanese', rating: 4.7, priceRange: '$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Sardine Set Lunch', 'Grilled Fish', 'Miso Soup'] },
      { name: 'Afuri', cuisine: 'Yuzu Ramen', rating: 4.6, priceRange: '$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Yuzu Shio Ramen', 'Vegan Ramen', 'Karaage'] },
    ],
    transport: {
      flights: 'Narita (NRT) for international, Haneda (HND) for domestic and some international. Both connect via express trains.',
      trains: 'Shinkansen (bullet train) connects major cities. Japan Rail Pass offers unlimited travel.',
      local: ['JR Yamanote Line (Circle)', 'Tokyo Metro (13 lines)', 'Suica/Pasmo IC Cards', 'Taxis', 'Bicycle Rentals'],
      cost: 'Subway rides Y170-320 (~$1.20-$2.20). 72-hour Metro pass Y1,500 (~$10). Taxis from Y410 (~$2.80).'
    },
    packages: [
      { id: 'p1', name: 'Tokyo Essentials', duration: '3 Days', hotel: 'Shinjuku Granbell Hotel', activities: ['Senso-ji Temple', 'Shibuya Crossing', 'Tsukiji Market Walk'], meals: 'Breakfast', price: 1100 },
      { id: 'p2', name: 'Culture & Cuisine Tour', duration: '5 Days', hotel: 'Park Hyatt Tokyo', activities: ['Meiji Shrine', 'Akihabara Tour', 'Cooking Class', 'TeamLab Visit', 'Mt. Fuji Day Trip'], meals: 'Breakfast + 3 Dinners', price: 2500 },
      { id: 'p3', name: 'Complete Japan (Tokyo + Kyoto)', duration: '7 Days', hotel: 'Aman Tokyo + Kyoto Ryokan', activities: ['All Tokyo Highlights', 'Shinkansen to Kyoto', 'Bamboo Forest', 'Tea Ceremony', 'Geisha District'], meals: 'All Inclusive', price: 4800 },
    ],
    reviews: [
      { name: 'Yuki T.', avatar: 'YT', rating: 5, comment: 'My hometown through fresh eyes! The food scene alone deserves a month-long trip.' },
      { name: 'Alex P.', avatar: 'AP', rating: 5, comment: 'The perfect blend of chaos and calm. Shibuya at night to Meiji Shrine in the morning — incredible.' },
      { name: 'Rachel N.', avatar: 'RN', rating: 4.5, comment: 'Cherry blossom season was breathtaking. Get a rail pass — it pays for itself in two days.' },
      { name: 'David L.', avatar: 'DL', rating: 4, comment: 'Amazing tech and culture. Language barrier was minimal. Everyone was so helpful and polite.' },
    ],
    budget: { stay: 40, food: 30, travel: 15, activities: 15, total: 2600 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  santorini: {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    badge: 'Top Rated',
    rating: 4.9,
    reviewCount: 2156,
    price: 1350,
    priceRange: '$1,100 – $3,200',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
      'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
      'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80',
      'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=800&q=80',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    ],
    shortDesc: 'Whitewashed Paradise Above the Aegean — Santorini',
    description: 'Santorini is the crown jewel of the Greek islands. Famous for its dramatic caldera views, whitewashed buildings with blue domes, and spectacular sunsets from Oia, this volcanic island offers romance, luxury, and natural beauty in equal measure. Explore ancient ruins at Akrotiri, taste volcanic wines, and swim in crystal-clear waters.',
    bestTimeToVisit: 'June – September',
    avgCost: '$120–$350/day',
    travelType: ['relax', 'luxury', 'culture', 'romantic'],
    highlights: ['Oia Sunset', 'Caldera Views', 'Red Beach', 'Akrotiri Ruins'],
    culture: 'Ancient Minoan heritage, volcanic wine tradition, and quintessential Greek island life with whitewashed architecture.',
    weather: 'Mediterranean climate with hot, dry summers and mild winters. Nearly guaranteed sunshine June-September.',
    attractions: [
      { name: 'Oia Village', desc: 'Iconic hilltop village famous for the world\'s most photographed sunsets', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80' },
      { name: 'Red Beach', desc: 'Dramatic red volcanic cliffs meeting crystal-clear turquoise waters', img: 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&q=80' },
      { name: 'Akrotiri Archaeological Site', desc: 'Ancient Minoan city preserved under volcanic ash, the "Pompeii of the Aegean"', img: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=400&q=80' },
      { name: 'Fira Town', desc: 'Vibrant capital perched on the caldera edge with museums, shops, and nightlife', img: 'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?w=400&q=80' },
      { name: 'Santo Wines Winery', desc: 'Taste unique volcanic wines with panoramic caldera views at sunset', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Canaves Oia Suites',
        stars: 5,
        price: 520,
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        location: 'Oia, Santorini',
        rooms: [
          { id: 'r1', name: 'Superior Suite', price: 520, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Caldera View', 'Plunge Pool'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
          { id: 'r2', name: 'Infinity Suite', price: 890, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Infinity Pool', 'Sunset View'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Andronis Luxury Suites',
        stars: 5,
        price: 480,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        location: 'Oia, Santorini',
        rooms: [
          { id: 'r3', name: 'Classic Suite', price: 480, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Caldera View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r4', name: 'Villa with Pool', price: 1200, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Private Pool', 'Butler', 'Jacuzzi'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Santo Maris Oia',
        stars: 5,
        price: 350,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'Oia, Santorini',
        rooms: [
          { id: 'r5', name: 'Junior Suite', price: 350, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Sea View'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r6', name: 'Pool Suite', price: 550, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Private Pool', 'Sea View'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'Fira Backpackers Place',
        stars: 2,
        price: 55,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        location: 'Fira, Santorini',
        rooms: [
          { id: 'r7', name: 'Dorm Bed', price: 55, available: 12, amenities: ['WiFi', 'Shared Kitchen', 'Rooftop Terrace'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r8', name: 'Private Room', price: 95, available: 4, amenities: ['WiFi', 'AC', 'Private Bath'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Ambrosia', cuisine: 'Fine Greek', rating: 4.9, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Octopus Carpaccio', 'Lamb Kleftiko', 'Baklava'] },
      { name: 'Oia 1800', cuisine: 'Mediterranean', rating: 4.8, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Grilled Calamari', 'Moussaka', 'Santorini Salad'] },
      { name: 'Lucky\'s Souvlakis', cuisine: 'Greek Street Food', rating: 4.6, priceRange: '$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Gyros', 'Souvlaki', 'Greek Fries'] },
      { name: 'Kapari Wine Restaurant', cuisine: 'Greek & Wine', rating: 4.7, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Fava Dip', 'Grilled Fish', 'Local Wine Flight'] },
      { name: 'Melitini', cuisine: 'Traditional Cycladic', rating: 4.5, priceRange: '$$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Tomato Fritters', 'Stuffed Peppers', 'Cheese Pie'] },
    ],
    transport: {
      flights: 'Santorini (Thira) Airport (JTR) has seasonal flights from European cities. Ferries from Athens (5-8 hours).',
      trains: 'No trains on the island. High-speed ferries from Piraeus (Athens) take ~5 hours.',
      local: ['Local Buses (KTEL)', 'ATV/Quad Rentals ($25/day)', 'Car Rentals ($35/day)', 'Taxis', 'Donkey Rides in Fira'],
      cost: 'Bus tickets EUR 1.80-2.50. ATV rental ~EUR 25/day. Taxis are metered but limited.'
    },
    packages: [
      { id: 'p1', name: 'Romantic Santorini Escape', duration: '3 Days', hotel: 'Santo Maris Oia', activities: ['Oia Sunset Tour', 'Caldera Cruise', 'Wine Tasting'], meals: 'Breakfast + 1 Dinner', price: 1500 },
      { id: 'p2', name: 'Island Explorer', duration: '5 Days', hotel: 'Andronis Luxury Suites', activities: ['Oia Sunset', 'Red Beach', 'Akrotiri Tour', 'Volcano Hike', 'Wine Tour'], meals: 'Half Board', price: 2800 },
      { id: 'p3', name: 'Ultimate Greek Island', duration: '7 Days', hotel: 'Canaves Oia + Mykonos', activities: ['All Santorini Highlights', 'Ferry to Mykonos', 'Beach Hopping', 'Delos Island Tour'], meals: 'All Inclusive', price: 4200 },
    ],
    reviews: [
      { name: 'Anna P.', avatar: 'AP', rating: 5, comment: 'The most beautiful place I have ever seen. The sunset from Oia literally made me cry.' },
      { name: 'Marco R.', avatar: 'MR', rating: 5, comment: 'Perfect honeymoon spot. The caldera views from our suite were out of this world.' },
      { name: 'Jenny C.', avatar: 'JC', rating: 4, comment: 'Stunning island but very crowded in August. Visit in June or September for better experience.' },
      { name: 'Robert H.', avatar: 'RH', rating: 4.5, comment: 'The volcanic wine tasting was a unique experience. Food was excellent everywhere we ate.' },
    ],
    budget: { stay: 45, food: 25, travel: 10, activities: 20, total: 3000 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  maldives: {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    badge: 'Exclusive',
    rating: 4.95,
    reviewCount: 1870,
    price: 1899,
    priceRange: '$1,500 – $5,000',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
      'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    ],
    shortDesc: 'Paradise on Earth — Maldives',
    description: 'The Maldives is the epitome of paradise — a collection of 1,190 coral islands scattered across the Indian Ocean. With overwater villas, underwater restaurants, pristine white sand beaches, and some of the world\'s best snorkeling and diving, it\'s the ultimate luxury escape for couples and honeymooners seeking total serenity.',
    bestTimeToVisit: 'November – April (Dry Season)',
    avgCost: '$200–$600/day',
    travelType: ['relax', 'luxury', 'romantic'],
    highlights: ['Overwater Villas', 'Coral Reef Diving', 'Bioluminescent Beach', 'Underwater Restaurant'],
    culture: 'Island culture influenced by South Asian, East African, and Arab traditions. Friendly locals and laid-back lifestyle.',
    weather: 'Tropical, warm year-round (28-32C). Dry season (Nov-Apr) has calm seas and sunshine. Wet season has occasional rain.',
    attractions: [
      { name: 'Underwater Restaurant (Ithaa)', desc: 'Dine 5 meters below the ocean surface surrounded by coral reef marine life', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80' },
      { name: 'Banana Reef', desc: 'One of the most famous and biodiverse dive sites in the world', img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&q=80' },
      { name: 'Vaadhoo Island', desc: 'Bioluminescent plankton creates a magical sea of stars on the beach at night', img: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=400&q=80' },
      { name: 'Male Friday Mosque', desc: 'Historic coral stone mosque from the 17th century in the capital city', img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=400&q=80' },
      { name: 'Manta Point', desc: 'Swim alongside magnificent manta rays in their natural feeding grounds', img: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Soneva Fushi',
        stars: 5,
        price: 1100,
        rating: 4.98,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        location: 'Baa Atoll, Maldives',
        rooms: [
          { id: 'r1', name: 'Beach Villa', price: 1100, available: 2, amenities: ['WiFi', 'AC', 'All Meals', 'Private Beach', 'Butler'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
          { id: 'r2', name: 'Overwater Villa', price: 1800, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Glass Floor', 'Private Pool', 'Butler'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'St. Regis Maldives',
        stars: 5,
        price: 800,
        rating: 4.95,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        location: 'Dhaalu Atoll, Maldives',
        rooms: [
          { id: 'r3', name: 'Garden Villa', price: 800, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Private Pool', 'Garden'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r4', name: 'Overwater Suite', price: 1400, available: 2, amenities: ['WiFi', 'AC', 'All Meals', 'Private Pool', 'Butler', 'Spa Credit'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Baros Maldives',
        stars: 5,
        price: 550,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'North Male Atoll, Maldives',
        rooms: [
          { id: 'r5', name: 'Deluxe Villa', price: 550, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Beach Access'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r6', name: 'Water Villa', price: 850, available: 2, amenities: ['WiFi', 'AC', 'Half Board', 'Over-Water Deck', 'Snorkeling Access'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Ithaa Undersea Restaurant', cuisine: 'Fine Dining', rating: 4.9, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Lobster Thermidor', 'Maldivian Tuna Tartare', 'Champagne Pairing'] },
      { name: 'Lighthouse Restaurant', cuisine: 'Japanese-Peruvian', rating: 4.8, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Nikkei Ceviche', 'Wagyu Tataki', 'Sashimi Platter'] },
      { name: 'Sea Fire Salt', cuisine: 'Grill & Seafood', rating: 4.7, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Grilled Reef Fish', 'Lobster Tail', 'Coconut Crème Brulee'] },
      { name: 'Senses Poolside', cuisine: 'International', rating: 4.5, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Maldivian Fish Curry', 'Club Sandwich', 'Tropical Smoothies'] },
      { name: 'Male Fish Market', cuisine: 'Local Maldivian', rating: 4.4, priceRange: '$', img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80', dishes: ['Mas Huni', 'Garudhiya', 'Roshi Bread'] },
    ],
    transport: {
      flights: 'Velana International Airport (MLE) in Male is the main gateway. Seaplane transfers to resort islands.',
      trains: 'No rail system. Inter-atoll travel is by speedboat or domestic flights.',
      local: ['Seaplane Transfers ($300-600 round trip)', 'Speedboat Transfers', 'Dhoni (Traditional Boat)', 'Resort Golf Carts', 'Bicycle'],
      cost: 'Seaplane transfer $300-600. Speedboat transfers vary. Resort islands are walkable or use golf carts.'
    },
    packages: [
      { id: 'p1', name: 'Paradise Getaway', duration: '3 Days', hotel: 'Baros Maldives', activities: ['Snorkeling Tour', 'Sunset Cruise', 'Spa Treatment'], meals: 'Half Board', price: 2200 },
      { id: 'p2', name: 'Luxury Island Escape', duration: '5 Days', hotel: 'St. Regis Maldives', activities: ['Scuba Diving', 'Dolphin Cruise', 'Private Beach Dinner', 'Spa Day', 'Fishing Trip'], meals: 'All Inclusive', price: 4500 },
      { id: 'p3', name: 'Ultimate Maldives Romance', duration: '7 Days', hotel: 'Soneva Fushi', activities: ['Diving Course', 'Bioluminescent Beach', 'Private Island Picnic', 'Underwater Restaurant', 'Sunset Dolphin Cruise', 'Couples Spa'], meals: 'All Inclusive', price: 8500 },
    ],
    reviews: [
      { name: 'Emma S.', avatar: 'ES', rating: 5, comment: 'Absolute paradise. Waking up over crystal-clear water every morning was surreal.' },
      { name: 'Raj P.', avatar: 'RP', rating: 5, comment: 'Best honeymoon possible. The overwater villa and underwater restaurant were unforgettable.' },
      { name: 'Kate M.', avatar: 'KM', rating: 4.5, comment: 'Incredibly beautiful but expensive. Worth every penny for a once-in-a-lifetime trip.' },
      { name: 'Mike D.', avatar: 'MD', rating: 5, comment: 'The diving was world-class. Saw manta rays, whale sharks, and countless reef fish.' },
    ],
    budget: { stay: 55, food: 20, travel: 10, activities: 15, total: 5000 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },

  switzerland: {
    id: 'switzerland',
    name: 'Switzerland',
    country: 'Switzerland',
    badge: 'Scenic',
    rating: 4.8,
    reviewCount: 2340,
    price: 1599,
    priceRange: '$1,200 – $3,500',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=800&q=80',
      'https://images.unsplash.com/photo-1504218727796-db522606b16f?w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
      'https://images.unsplash.com/photo-1548585744-e3aaf7f1b7c3?w=800&q=80',
    ],
    shortDesc: 'Nature\'s Masterpiece in the Heart of Europe — Switzerland',
    description: 'Switzerland is a masterpiece of nature and precision. From the towering peaks of the Matterhorn to the crystal-clear waters of Lake Geneva, every view is picture-perfect. Take scenic train rides through mountain passes, ski world-class slopes, explore charming medieval cities, and indulge in the finest chocolate and cheese in the world.',
    bestTimeToVisit: 'June – September (Summer), December – March (Skiing)',
    avgCost: '$150–$400/day',
    travelType: ['adventure', 'luxury', 'nature'],
    highlights: ['Matterhorn', 'Lake Geneva', 'Jungfraujoch', 'Lucerne Old Town'],
    culture: 'A unique blend of German, French, and Italian influences. Known for precision, chocolate, cheese, and banking.',
    weather: 'Alpine climate varies by altitude. Summers are warm (20-28C), winters are cold with excellent snow conditions.',
    attractions: [
      { name: 'Matterhorn', desc: 'One of the most iconic and photographed peaks in the Alps at 4,478m', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
      { name: 'Jungfraujoch', desc: 'The "Top of Europe" at 3,454 meters with ice palace and panoramic views', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80' },
      { name: 'Lake Geneva', desc: 'Stunning alpine lake surrounded by vineyards, castles, and the Jet d\'Eau fountain', img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=400&q=80' },
      { name: 'Lucerne Old Town', desc: 'Medieval covered Chapel Bridge, baroque churches, and Mount Pilatus cable car', img: 'https://images.unsplash.com/photo-1504218727796-db522606b16f?w=400&q=80' },
      { name: 'Glacier Express', desc: 'Scenic 8-hour train journey through 291 bridges and 91 tunnels between Zermatt and St. Moritz', img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80' },
    ],
    hotels: [
      {
        id: 'h1',
        name: 'The Chedi Andermatt',
        stars: 5,
        price: 650,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
        location: 'Andermatt, Switzerland',
        rooms: [
          { id: 'r1', name: 'Deluxe Room', price: 650, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Mountain View', 'Spa Access'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
          { id: 'r2', name: 'Chedi Suite', price: 1200, available: 1, amenities: ['WiFi', 'AC', 'All Meals', 'Fireplace', 'Private Terrace', 'Butler'], img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80' },
        ]
      },
      {
        id: 'h2',
        name: 'Burgenstock Resort',
        stars: 5,
        price: 480,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        location: 'Lake Lucerne, Switzerland',
        rooms: [
          { id: 'r3', name: 'Lake View Room', price: 480, available: 4, amenities: ['WiFi', 'AC', 'Breakfast', 'Lake View', 'Infinity Pool'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
          { id: 'r4', name: 'Alpine Suite', price: 850, available: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Panoramic View', 'Spa Credit'], img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
        ]
      },
      {
        id: 'h3',
        name: 'Hotel Victoria-Jungfrau',
        stars: 5,
        price: 350,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        location: 'Interlaken, Switzerland',
        rooms: [
          { id: 'r5', name: 'Classic Room', price: 350, available: 5, amenities: ['WiFi', 'AC', 'Breakfast', 'Jungfrau View'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r6', name: 'Junior Suite', price: 520, available: 3, amenities: ['WiFi', 'AC', 'Breakfast', 'Balcony', 'Spa Access'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
      {
        id: 'h4',
        name: 'Zermatt Youth Hostel',
        stars: 2,
        price: 65,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80',
        location: 'Zermatt, Switzerland',
        rooms: [
          { id: 'r7', name: 'Dorm Bed', price: 65, available: 16, amenities: ['WiFi', 'Breakfast', 'Shared Kitchen', 'Locker'], img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80' },
          { id: 'r8', name: 'Private Twin', price: 120, available: 4, amenities: ['WiFi', 'Breakfast', 'Matterhorn View'], img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
        ]
      },
    ],
    restaurants: [
      { name: 'Chez Vrony', cuisine: 'Swiss Alpine', rating: 4.8, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', dishes: ['Raclette', 'Rosti with Egg', 'Apple Strudel'] },
      { name: 'Restaurant Stucki', cuisine: 'Modern Swiss', rating: 4.7, priceRange: '$$$$', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80', dishes: ['Zurich Veal', 'Truffle Fondue', 'Swiss Meringue'] },
      { name: 'Brasserie Lipp', cuisine: 'Swiss-French', rating: 4.5, priceRange: '$$$', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=80', dishes: ['Cheese Fondue', 'Filet de Perche', 'Tarte au Vin'] },
      { name: 'Sternen Grill', cuisine: 'Street Food', rating: 4.6, priceRange: '$', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', dishes: ['Bratwurst', 'Cervelat', 'Burli Bread'] },
      { name: 'Sprüngli', cuisine: 'Chocolatier & Cafe', rating: 4.9, priceRange: '$$', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', dishes: ['Luxemburgerli', 'Hot Chocolate', 'Truffle Collection'] },
    ],
    transport: {
      flights: 'Zurich (ZRH) and Geneva (GVA) are the main international airports.',
      trains: 'Swiss Federal Railways (SBB) is world-class. Swiss Travel Pass offers unlimited travel on trains, buses, and boats.',
      local: ['Swiss Federal Railways (SBB)', 'PostBus Network', 'Tram Systems', 'Cable Cars & Funiculars', 'Rental E-Bikes'],
      cost: 'Swiss Travel Pass from CHF 232 (3 days). Single train tickets can be expensive — passes save significantly.'
    },
    packages: [
      { id: 'p1', name: 'Swiss Highlights', duration: '3 Days', hotel: 'Hotel Victoria-Jungfrau', activities: ['Jungfraujoch Visit', 'Lake Cruise', 'Chocolate Tasting'], meals: 'Breakfast', price: 1800 },
      { id: 'p2', name: 'Alps & Lakes Adventure', duration: '5 Days', hotel: 'Burgenstock Resort', activities: ['Matterhorn View', 'Glacier Express', 'Paragliding', 'Cheese Farm Visit', 'Lucerne Walking Tour'], meals: 'Half Board', price: 3200 },
      { id: 'p3', name: 'Grand Tour of Switzerland', duration: '7 Days', hotel: 'Multiple 5-Star Hotels', activities: ['Glacier Express', 'Jungfraujoch', 'Lake Geneva Cruise', 'Bern Old Town', 'Chocolate Factory', 'Mountain Hiking', 'Wine Tasting'], meals: 'All Inclusive', price: 5500 },
    ],
    reviews: [
      { name: 'Hans M.', avatar: 'HM', rating: 5, comment: 'The Glacier Express was the most scenic journey of my life. Every minute was postcard-worthy.' },
      { name: 'Laura B.', avatar: 'LB', rating: 4.5, comment: 'Expensive but worth it. The Swiss Travel Pass is essential — buy it!' },
      { name: 'Pierre D.', avatar: 'PD', rating: 5, comment: 'Paragliding over Interlaken with the Alps below was an adrenaline rush I will never forget.' },
      { name: 'Amy T.', avatar: 'AT', rating: 4, comment: 'The hiking trails are incredibly well-maintained. Chocolate and cheese were amazing as expected.' },
    ],
    budget: { stay: 40, food: 25, travel: 20, activities: 15, total: 3800 },
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80',
  },
}

export const CITY_LIST = Object.values(CITIES)

export const CATEGORIES = [
  { name: 'Adventure', icon: '🧗', img: adventureImg },
  { name: 'Relax', icon: '🏖️', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80' },
  { name: 'Food', icon: '🍜', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' },
  { name: 'Culture', icon: '🏛️', img: 'https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=400&q=80' },
  { name: 'Luxury', icon: '💎', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80' },
]

export const FEATURES = [
  { icon: '✈️', title: 'Flights', desc: 'Compare & book flights from 500+ airlines worldwide with best prices guaranteed.' },
  { icon: '🏨', title: 'Hotels', desc: 'Over 1M+ hotels from boutique stays to luxury resorts at exclusive member rates.' },
  { icon: '🚗', title: 'Car Rentals', desc: 'Rent from top providers — economy to luxury vehicles at every destination.' },
  { icon: '🎒', title: 'Packages', desc: 'Curated all-inclusive travel packages for hassle-free perfect vacations.' },
]

export const TESTIMONIALS = [
  {
    text: '"Best trip I\'ve ever booked! The whole experience was seamless from start to finish. Will definitely be using Wanderlust for every future trip."',
    name: 'Sarah Mitchell',
    role: 'Adventure Traveler',
    initials: 'SM',
  },
  {
    text: '"Super easy booking process and the deals were unbeatable. Our family vacation to Bali was planned in under 10 minutes!"',
    name: 'David Chen',
    role: 'Family Traveler',
    initials: 'DC',
  },
  {
    text: '"The curated recommendations were spot-on. Found a hidden gem in Greece that became the highlight of our honeymoon."',
    name: 'Emily Rodriguez',
    role: 'Honeymooner',
    initials: 'ER',
  },
]

export const DEAL_CARDS = CITY_LIST.slice(0, 5).map(c => ({
  title: `${c.name} Escape`,
  desc: `5 nights all inclusive`,
  original: `$${Math.round(c.price * 1.4).toLocaleString()}`,
  current: `$${c.price.toLocaleString()}`,
  badge: '-30%',
  img: c.heroImage,
  cityId: c.id,
}))
