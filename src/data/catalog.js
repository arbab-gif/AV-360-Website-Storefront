// Sample catalog data for the storefront.
// Image values are Unsplash photo IDs — see src/lib/images.js.

export const categories = [
  { id: 'chairs', name: 'Chairs', image: '1739796089365-3280112c6329', alt: 'White wooden event chairs on a lawn' },
  { id: 'tables', name: 'Tables', image: '1759753935176-ba90f7a23ff1', alt: 'Table with a white cloth and wooden chairs' },
  { id: 'lounge', name: 'Lounge', image: '1769812343786-c8cdbd73f3cd', alt: 'Green velvet sofas set up as a lounge area' },
  { id: 'linens', name: 'Linens', image: '1596433904500-97b901c5d274', alt: 'Folded linen cloths on a wooden table' },
  { id: 'tableware', name: 'Tableware', image: '1614548539644-ef528186523a', alt: 'White plates with cutlery' },
  { id: 'glassware', name: 'Glassware', image: '1613927602450-f85e91e3d2d3', alt: 'Rows of clear wine glasses' },
  { id: 'lighting', name: 'Lighting', image: '1464047736614-af63643285bf', alt: 'Warm string lights glowing' },
  { id: 'decor', name: 'Décor', image: '1569387006778-d468606c407b', alt: 'White flowers in a glass vase on a table' },
  { id: 'backdrops', name: 'Backdrops', image: '1575495029254-f0b4c1581af3', alt: 'Wall covered in white flowers' },
  { id: 'tents', name: 'Tents', image: '1768179123386-a86a85f1c35c', alt: 'White tent in a green field' },
  { id: 'staging', name: 'Staging', image: '1686216607642-dfc241092ab0', alt: 'Stage with steps and a red carpet' },
  { id: 'audio', name: 'Audio', image: '1561314105-e6ac04c2984a', alt: 'Black PA speaker system' },
  { id: 'video', name: 'Video', image: '1530020722985-452e278c5114', alt: 'People watching a large projection screen' },
];

export const items = [
  // Chairs
  { id: 'ivory-chiavari-chair', name: 'Ivory Chiavari Chair', category: 'chairs', detail: 'Ivory · Seat cushion included', image: '1525299917518-9cb5c095c978', alt: 'White wooden chair with flowers tied to the back' },
  { id: 'oak-cross-back-chair', name: 'Oak Cross-Back Chair', category: 'chairs', detail: 'Natural wood · Seat pad included', image: '1737131167348-e3c04cc80a7e', alt: 'Two wooden cross-back chairs with white flowers' },
  { id: 'white-folding-chair', name: 'White Folding Chair', category: 'chairs', detail: 'Metal frame · Folds flat', image: '1576528418822-5ddc2568621b', alt: 'White metal folding chair' },
  // Tables
  { id: 'round-banquet-table', name: 'Round Banquet Table', category: 'tables', detail: '60" round · Seats 8–10', image: '1768851142314-c4ebf49ad45b', alt: 'Round table set with gold plates and glasses' },
  { id: 'farm-table', name: 'Wooden Farm Table', category: 'tables', detail: '8 ft long · Seats 8', image: '1696805966408-5f92fdb79ae7', alt: 'Long wooden table with chairs and place settings' },
  { id: 'white-cocktail-table', name: 'White Cocktail Table', category: 'tables', detail: '30" round · Standing height', image: '1618106494700-4b0049e83ed8', alt: 'Tall cocktail table with a white cover under a tent' },
  // Lounge
  { id: 'velvet-sofa-set', name: 'Velvet Sofa Set', category: 'lounge', detail: 'Green velvet · 2 sofas', image: '1769812343786-c8cdbd73f3cd', alt: 'Green velvet sofas with white flowers' },
  { id: 'green-sofa', name: 'Green Sofa', category: 'lounge', detail: 'Seats 3', image: '1555041469-a586c61ea9bc', alt: 'Green fabric sofa' },
  { id: 'accent-armchair', name: 'Accent Armchair', category: 'lounge', detail: 'Cream fabric · Seats 1', image: '1634148740767-a0f5d1421059', alt: 'Cream armchair next to a vase of flowers' },
  // Linens
  { id: 'ivory-table-linen', name: 'Ivory Tablecloth', category: 'linens', detail: 'Fits 60" round tables', image: '1596433904500-97b901c5d274', alt: 'Folded linen cloths on a wooden table' },
  { id: 'linen-napkins', name: 'Linen Napkins', category: 'linens', detail: 'Ivory · Pack of 10', image: '1572319663329-ac47c4efdef0', alt: 'Folded napkin on a table' },
  { id: 'table-runner', name: 'Table Runner', category: 'linens', detail: 'Natural linen · 10 ft', image: '1758810741067-c20b49078b10', alt: 'Long table with a runner and flowers' },
  // Tableware
  { id: 'ceramic-dinner-plate', name: 'Dinner Plate', category: 'tableware', detail: 'Matte white · 11"', image: '1705948730553-3ea0c89ae6fb', alt: 'White plate with a dark rim' },
  { id: 'gold-rim-charger', name: 'Gold-Rim Charger', category: 'tableware', detail: 'Clear glass · 13"', image: '1759124650154-da57bce8d7fe', alt: 'Clear plate with a gold rim and a black napkin' },
  { id: 'gold-flatware', name: 'Gold Flatware Set', category: 'tableware', detail: 'Fork, knife, spoon', image: '1760594308373-3e9b009aeae8', alt: 'Gold fork, knife and spoon' },
  // Glassware
  { id: 'crystal-glassware-set', name: 'Wine Glass Set', category: 'glassware', detail: 'Crystal · Set of 12', image: '1613927602450-f85e91e3d2d3', alt: 'Rows of clear wine glasses' },
  { id: 'champagne-coupe', name: 'Champagne Coupe', category: 'glassware', detail: 'Crystal · Set of 12', image: '1578425144925-a3638eb650aa', alt: 'Champagne coupe glass filled with champagne' },
  { id: 'red-wine-glass', name: 'Red Wine Glass', category: 'glassware', detail: 'Clear glass · Set of 12', image: '1558670426-931963635470', alt: 'Wine glasses on a table' },
  // Lighting
  { id: 'warm-string-lights', name: 'String Lights', category: 'lighting', detail: 'Warm white · 50 ft', image: '1694726361295-6a188bc577b3', alt: 'Warm string lights at night' },
  { id: 'gold-candle-holder-set', name: 'Candle Holder Set', category: 'lighting', detail: 'Brass · Set of 5', image: '1769812343176-8c960e415ab2', alt: 'Brass candle holder with lit candles' },
  { id: 'metal-lantern', name: 'Metal Lantern', category: 'lighting', detail: 'Black · 12" tall', image: '1596093019686-550d740a2870', alt: 'Black lantern with a lit candle' },
  // Décor
  { id: 'floral-ceremony-arch', name: 'Flower Arch', category: 'decor', detail: 'About 7 ft tall', image: '1677677402907-05f2883e3f66', alt: 'Round arch covered in flowers' },
  { id: 'white-centerpiece', name: 'White Centerpiece', category: 'decor', detail: 'Fresh flowers · Glass vase', image: '1569387006778-d468606c407b', alt: 'White flowers in a glass vase' },
  { id: 'table-flower-vase', name: 'Table Flower Vase', category: 'decor', detail: 'Small vase · Set of 5', image: '1690974549891-54c691419401', alt: 'Small vase of flowers next to wine glasses' },
  // Backdrops
  { id: 'neutral-fabric-backdrop', name: 'Fabric Backdrop', category: 'backdrops', detail: 'Ivory · 10 × 8 ft', image: '1746399565180-0dfbfba51c2b', alt: 'Ivory fabric hanging as a backdrop' },
  { id: 'flower-wall', name: 'Flower Wall', category: 'backdrops', detail: 'White flowers · 8 × 8 ft', image: '1575495029254-f0b4c1581af3', alt: 'Wall covered in white flowers' },
  { id: 'draped-arch', name: 'Draped Arch', category: 'backdrops', detail: 'White fabric and flowers', image: '1763129636444-b590bec06c4f', alt: 'Arch with white fabric and flowers on a beach' },
  // Tents
  { id: 'outdoor-canopy', name: 'Outdoor Canopy', category: 'tents', detail: '20 × 20 ft · Seats 40', image: '1695393386569-cf141ff2c552', alt: 'White canopy on a lawn' },
  { id: 'sailcloth-frame-tent', name: 'Large Frame Tent', category: 'tents', detail: '40 × 60 ft · Seats 150', image: '1675376616537-c8aa9ddc9977', alt: 'Large white tent next to trees' },
  { id: 'pole-tent', name: 'Pole Tent', category: 'tents', detail: '30 × 30 ft · Seats 80', image: '1768179123386-a86a85f1c35c', alt: 'White pole tent in a field' },
  // Staging
  { id: 'stage-platform', name: 'Stage Platform', category: 'staging', detail: '16 × 8 ft · With steps', image: '1686216607642-dfc241092ab0', alt: 'Stage with steps and a red carpet' },
  { id: 'stage-drape', name: 'Stage Drape', category: 'staging', detail: 'Blue velvet · 20 ft wide', image: '1767294273267-0d4ef6712668', alt: 'Dark stage with blue curtains' },
  { id: 'stage-lights', name: 'Stage Light Kit', category: 'staging', detail: '8 moving lights', image: '1670028514318-0ac718c0590d', alt: 'Stage lights shining over a crowd' },
  // Audio
  { id: 'pa-speaker', name: 'PA Speaker System', category: 'audio', detail: '2 speakers · Up to 200 guests', image: '1561314105-e6ac04c2984a', alt: 'Black PA speaker system' },
  { id: 'microphone-stand', name: 'Microphone and Stand', category: 'audio', detail: 'Wireless mic', image: '1527261834078-9b37d35a4a32', alt: 'Microphone on a black stand' },
  { id: 'audio-mixer', name: 'Audio Mixer', category: 'audio', detail: '12 channels', image: '1594623930572-300a3011d9ae', alt: 'Audio mixer with lit buttons' },
  // Video
  { id: 'projector', name: 'Projector', category: 'video', detail: 'HD · Bright room ready', image: '1535016120720-40c646be5580', alt: 'Projector shining light' },
  { id: 'projection-screen', name: 'Projection Screen', category: 'video', detail: '12 ft wide', image: '1530020722985-452e278c5114', alt: 'People watching a large projection screen' },
  { id: 'presentation-display', name: 'Presentation Screen', category: 'video', detail: '75" TV with stand', image: '1505373877841-8d25f7d46678', alt: 'Person presenting in front of a large screen' },
];

// Occasions show the items that suit that kind of event.
export const occasions = [
  {
    id: 'weddings',
    name: 'Weddings',
    image: '1763560836989-d3636e2f82d8',
    alt: 'Outdoor wedding with a white flower arch',
    items: [
      'ivory-chiavari-chair', 'oak-cross-back-chair', 'round-banquet-table', 'farm-table', 'velvet-sofa-set',
      'ivory-table-linen', 'linen-napkins', 'table-runner', 'ceramic-dinner-plate', 'gold-rim-charger', 'gold-flatware',
      'crystal-glassware-set', 'champagne-coupe', 'warm-string-lights', 'gold-candle-holder-set', 'floral-ceremony-arch',
      'white-centerpiece', 'table-flower-vase', 'neutral-fabric-backdrop', 'flower-wall', 'draped-arch',
      'sailcloth-frame-tent', 'pole-tent', 'pa-speaker', 'microphone-stand',
    ],
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    image: '1755704282977-340323fa52df',
    alt: 'Birthday party table with flowers',
    items: [
      'white-folding-chair', 'round-banquet-table', 'white-cocktail-table', 'green-sofa', 'linen-napkins',
      'ceramic-dinner-plate', 'champagne-coupe', 'warm-string-lights', 'table-flower-vase', 'flower-wall',
      'neutral-fabric-backdrop', 'outdoor-canopy', 'pa-speaker', 'microphone-stand', 'projector', 'projection-screen',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    image: '1762765684665-6b6855bb6fe6',
    alt: 'Long tables set for a dinner in a large hall',
    items: [
      'white-folding-chair', 'round-banquet-table', 'white-cocktail-table', 'accent-armchair', 'ivory-table-linen',
      'ceramic-dinner-plate', 'red-wine-glass', 'stage-platform', 'stage-drape', 'stage-lights', 'pa-speaker',
      'microphone-stand', 'audio-mixer', 'projector', 'projection-screen', 'presentation-display', 'sailcloth-frame-tent',
    ],
  },
  {
    id: 'parties',
    name: 'Parties',
    image: '1621112904887-419379ce6824',
    alt: 'Friends at an outdoor dinner party at night',
    items: [
      'oak-cross-back-chair', 'farm-table', 'white-cocktail-table', 'green-sofa', 'accent-armchair', 'table-runner',
      'red-wine-glass', 'champagne-coupe', 'warm-string-lights', 'metal-lantern', 'table-flower-vase',
      'outdoor-canopy', 'pole-tent', 'pa-speaker', 'audio-mixer', 'stage-lights',
    ],
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
export const occasionById = Object.fromEntries(occasions.map((o) => [o.id, o]));
export const itemById = Object.fromEntries(items.map((i) => [i.id, i]));

// Banner carousel photos, shown in this order.
export const bannerSlides = [
  { image: '1771154140881-78acf32cdafe', alt: 'Event room with stage lights, hanging bulbs and dressed tables' },
  { image: '1510076857177-7470076d4098', alt: 'Hall with white drapes and walls of warm string lights' },
  { image: '1574482211311-45a2169db57c', alt: 'Outdoor dinner under trees strung with lights at night' },
  { image: '1712314947761-a8d718bd8c32', alt: 'Ballroom with chandeliers, flowers and round tables' },
  { image: '1780888207019-dd9121069a81', alt: 'Open barn with bistro lights and white chairs' },
];
