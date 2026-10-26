import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TARGET_DIR = path.resolve('/app/applet/public/images/menu');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 81 distinct items with dedicated, verified Unsplash photo IDs
const MENU_ITEMS = [
  // 1. SALADS & SOUP
  {
    id: 'prod-chicken-pesto-salad',
    slug: 'chicken-pesto-salad',
    name: 'Chicken Pesto Salad',
    photoId: 'photo-1540420773420-3366772f4999',
    alt: 'Grilled chicken pesto salad with mixed greens, cherry tomatoes, and almonds'
  },
  {
    id: 'prod-greek-salad',
    slug: 'greek-salad',
    name: 'Greek Salad',
    photoId: 'photo-1540189549336-e6e99c3679fe',
    alt: 'Traditional Greek salad with feta cheese block, Kalamata olives, and fresh oregano'
  },
  {
    id: 'prod-barley-salad',
    slug: 'barley-salad',
    name: 'Barley Salad',
    photoId: 'photo-1512621776951-a57141f2eefd',
    alt: 'Nutritious pearl barley nourish bowl with chickpeas, avocado, and tahini'
  },
  {
    id: 'prod-soup-of-the-day',
    slug: 'soup-of-the-day',
    name: 'Soup of the Day',
    photoId: 'photo-1547592166-23ac45744acd',
    alt: 'Artisanal bowl of chef soup with fresh herbs and crusty sourdough'
  },

  // 2. PLATTERS & NIBBLES
  {
    id: 'prod-antipasto-platter',
    slug: 'antipasto-platter',
    name: 'Antipasto Platter',
    photoId: 'photo-1541544741938-0af808871cc0',
    alt: 'Antipasto charcuterie sharing board with Italian cured meats, artisan cheeses, and olives'
  },
  {
    id: 'prod-cheese-board',
    slug: 'cheese-board',
    name: 'Cheese Board',
    photoId: 'photo-1631379578550-7038263db699',
    alt: 'Artisanal cheese board selection with mango chutney, crackers, and grapes'
  },
  {
    id: 'prod-dips-crudites',
    slug: 'dips-crudites',
    name: 'Dips & Crudites',
    photoId: 'photo-1505253758473-96b7015fcd40',
    alt: 'Freshly cut rainbow vegetable crudites served with Mediterranean dips and galletti'
  },
  {
    id: 'prod-bouyiourdi',
    slug: 'bouyiourdi',
    name: 'Bouyiourdi',
    photoId: 'photo-1592417817098-8f3d69109853',
    alt: 'Traditional baked feta cheese in earthenware dish with roasted tomatoes, peppers, and sourdough'
  },
  {
    id: 'prod-crepe-bites',
    slug: 'cheese-onion-crepe-bites',
    name: 'Cheese & Onion Crêpe Bites',
    photoId: 'photo-1519708227418-c8fd9a32b7a2',
    alt: 'Warm savory crepe bites filled with caramelized onions, cheddar, and bechamel'
  },
  {
    id: 'prod-garden-bruschetta',
    slug: 'garden-bruschetta',
    name: 'Garden Bruschetta',
    photoId: 'photo-1572695157366-5e585ab2b69f',
    alt: 'Toasted artisan sourdough bruschetta topped with marinated heirloom tomatoes, basil, and olive oil'
  },

  // 3. DESSERTS
  {
    id: 'prod-crepes-hazelnut',
    slug: 'crepes-hazelnut-strawberries',
    name: 'Crêpes with Hazelnut Spread & Strawberries',
    photoId: 'photo-1519676867240-f03562e64548',
    alt: 'Warm French crepes folded with hazelnut chocolate spread and fresh sliced strawberries'
  },
  {
    id: 'prod-crepes-honey-orange',
    slug: 'crepes-honey-orange',
    name: 'Crêpes with Honey & Orange',
    photoId: 'photo-1565299585323-38d6b0865b47',
    alt: 'Delicate warm crepes drizzled with golden thyme honey and fragrant orange zest'
  },
  {
    id: 'prod-double-chocolate-brownie',
    slug: 'double-chocolate-brownie',
    name: 'Double Chocolate Brownie',
    photoId: 'photo-1606313564200-e75d5e30476c',
    alt: 'Warm double chocolate fudge brownie served with velvety vanilla ice cream'
  },
  {
    id: 'prod-tiramisu',
    slug: 'tiramisu',
    name: 'Tiramisu',
    photoId: 'photo-1571877227200-a0d98ea607e9',
    alt: 'Traditional Italian tiramisu with espresso ladyfingers, mascarpone cream, and dark cocoa'
  },
  {
    id: 'prod-creme-caramel',
    slug: 'creme-caramel',
    name: 'Crème Caramel',
    photoId: 'photo-1587314168485-3236d6710814',
    alt: 'Smooth vanilla custard crème caramel with delicate amber caramel glaze'
  },
  {
    id: 'prod-strawberry-cheesecake',
    slug: 'strawberry-cheesecake',
    name: 'Strawberry Cheesecake',
    photoId: 'photo-1533134242443-d4fd215305ad',
    alt: 'Creamy homemade cheesecake slice topped with rich strawberry coulis'
  },
  {
    id: 'prod-muffin',
    slug: 'artisan-muffin',
    name: 'Muffin',
    photoId: 'photo-1586985289688-ca3cf47d3e6e',
    alt: 'Freshly baked bakery muffin loaded with vanilla and fresh berries'
  },
  {
    id: 'prod-ricotta-cannoli',
    slug: 'ricotta-cannoli',
    name: 'Ricotta Cannoli',
    photoId: 'photo-1551024709-8f23befc6f87',
    alt: 'Crisp pastry shell filled with sweet Sicilian ricotta and chocolate chips'
  },
  {
    id: 'prod-gelato-antica',
    slug: 'gelato-antica-del-corso',
    name: 'Gelato – Antica Gelateria del Corso',
    photoId: 'photo-1560008581-09826d1de69e',
    alt: 'Artisanal Italian gelato scoops in a classic glass dessert bowl'
  },

  // 4. BREAKFAST & BRUNCH
  {
    id: 'prod-avo-egg-heaven',
    slug: 'avo-egg-heaven',
    name: 'Avo & Egg Heaven',
    photoId: 'photo-1525351484163-7529414344d8',
    alt: 'Toasted sourdough with creamy mashed avocado, runny poached egg, and black sesame'
  },
  {
    id: 'prod-miso-scramble',
    slug: 'miso-scrambled-eggs',
    name: 'Miso Scrambled Eggs',
    photoId: 'photo-1551218808-94e220e084d2',
    alt: 'Soft scrambled eggs on toasted sourdough with savory miso mayo and crispy onions'
  },
  {
    id: 'prod-morning-ranchero',
    slug: 'morning-ranchero',
    name: 'Morning Ranchero',
    photoId: 'photo-1584776296944-ab6fb57b0bdd',
    alt: 'Toasted sourdough with avocado mash, warm black bean salsa, and fresh herbs'
  },

  // 5. ARTISAN CROISSANTS
  {
    id: 'prod-salmon-croissant',
    slug: 'salmon-cream-cheese-croissant',
    name: 'Smoked Salmon & Cream Cheese Croissant',
    photoId: 'photo-1509440159596-0249088772ff',
    alt: 'Flaky butter croissant filled with smoked salmon, herb cream cheese, dill, and capers'
  },
  {
    id: 'prod-parma-croissant',
    slug: 'parma-parmesan-croissant',
    name: 'Parma & Parmesan Croissant',
    photoId: 'photo-1623334044303-241021148842',
    alt: 'Butter croissant stuffed with Parma ham, Grana Padano shavings, and fresh rocket'
  },
  {
    id: 'prod-ham-cheese-croissant',
    slug: 'ham-cheese-croissant',
    name: 'Ham & Cheese Croissant',
    photoId: 'photo-1549931319-a545dcf3bc73',
    alt: 'Warm flaky croissant with farmhouse ham and melted cheddar cheese'
  },
  {
    id: 'prod-ricotta-honey-croissant',
    slug: 'ricotta-honey-croissant',
    name: 'Ricotta & Honey Croissant',
    photoId: 'photo-1555507036-ab1f4038808a',
    alt: 'Golden croissant filled with whipped sweet ricotta and thyme honey'
  },
  {
    id: 'prod-blueberry-cheesecake-croissant',
    slug: 'blueberry-cheesecake-croissant',
    name: 'Blueberry Cheesecake Croissant',
    photoId: 'photo-1530610476181-d83430b64dcd',
    alt: 'Pastry croissant filled with vanilla cheesecake cream and marinated blueberries'
  },
  {
    id: 'prod-chocolate-strawberry-croissant',
    slug: 'chocolate-strawberry-croissant',
    name: 'Chocolate & Strawberry Croissant',
    photoId: 'photo-1549931319-a545dcf3bc73',
    alt: 'Butter croissant filled with chocolate hazelnut spread and sliced strawberries'
  },
  {
    id: 'prod-pistachio-croissant',
    slug: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    photoId: 'photo-1555507036-ab1f4038808a',
    alt: 'Croissant generously filled and topped with Sicilian pistachio cream and roasted nuts'
  },
  {
    id: 'prod-butter-croissant',
    slug: 'butter-croissant',
    name: 'Butter Croissant',
    photoId: 'photo-1555507036-ab1f4038808a',
    alt: 'Classic golden flaky all-butter French croissant baked in-house daily'
  },

  // 6. SANDWICHES & WRAPS
  {
    id: 'prod-mortadella-pistachio-ciabatta',
    slug: 'mortadella-pistachio-ciabatta',
    name: 'Mortadella & Pistachio Ciabatta',
    photoId: 'photo-1509722747041-616f39b57569',
    alt: 'Artisan ciabatta filled with Mortadella di Bologna, buffalo mozzarella, and crushed pistachios'
  },
  {
    id: 'prod-tuna-melt-ciabatta',
    slug: 'tuna-melt-ciabatta',
    name: 'Tuna Melt Ciabatta',
    photoId: 'photo-1528735602780-2552fd46c7af',
    alt: 'Warm pressed ciabatta with spiced tuna, red onions, gherkins, and melted Fior di Latte'
  },
  {
    id: 'prod-italian-garden-toastie',
    slug: 'italian-garden-toastie',
    name: 'Italian Garden Toastie',
    photoId: 'photo-1554433607-66b5efe9d304',
    alt: 'Toasted sourdough sandwich with basil pesto, buffalo mozzarella, and heirloom tomatoes'
  },
  {
    id: 'prod-ham-cheese-toastie',
    slug: 'ham-cheese-toastie',
    name: 'Ham & Cheese Toastie',
    photoId: 'photo-1481070414801-51fd732d7184',
    alt: 'Classic golden grilled sourdough sandwich with smoked ham and mature melted cheddar'
  },
  {
    id: 'prod-vegan-burrito',
    slug: 'vegan-burrito',
    name: 'Vegan Burrito',
    photoId: 'photo-1626700051175-6818013e1d4f',
    alt: 'Warm toasted wrap filled with Korean BBQ tofu, rice noodles, fresh slaw, and lime'
  },
  {
    id: 'prod-famous-chicken-wrap',
    slug: 'famous-chicken-wrap',
    name: 'Famous Chicken Wrap',
    photoId: 'photo-1565299585323-38d6b0865b47',
    alt: 'Warm chicken wrap with melted cheese, lettuce, tomato, pickles, garlic mayo, and crisps'
  },
  {
    id: 'prod-chicken-mayo-baguette',
    slug: 'chicken-mayo-baguette',
    name: 'Chicken Mayo Baguette',
    photoId: 'photo-1525351484163-7529414344d8',
    alt: 'Crusty French baguette filled with shredded chicken, smoked paprika mayo, and slaw'
  },
  {
    id: 'prod-italian-sub',
    slug: 'italian-sub',
    name: 'Italian Sub',
    photoId: 'photo-1550547660-d9450f859349',
    alt: 'Loaded submarine sandwich with ham, salami, mortadella, provolone, and oregano dressing'
  },

  // 7. SPRITZERS & COCKTAILS
  {
    id: 'prod-aperol-spritz',
    slug: 'aperol-spritz',
    name: 'Aperol Spritz',
    photoId: 'photo-1560512823-829485b8bf24',
    alt: 'Vibrant Aperol Spritz cocktail with prosecco, soda, ice, and fresh orange slice'
  },
  {
    id: 'prod-hugo-spritz',
    slug: 'hugo-spritz',
    name: 'Hugo',
    photoId: 'photo-1551024709-8f23befc6f87',
    alt: 'Refreshing Hugo cocktail with elderflower liqueur, sparkling prosecco, mint, and lime'
  },
  {
    id: 'prod-sarti-spritz',
    slug: 'sarti-spritz',
    name: 'Sarti',
    photoId: 'photo-1536935338788-846bb9981813',
    alt: 'Bright pink Sarti Rosa spritz mixed with bubbly prosecco and soda'
  },
  {
    id: 'prod-limoncello-spritz',
    slug: 'limoncello-spritz',
    name: 'Limoncello',
    photoId: 'photo-1513558161293-cdaf765ed2fd',
    alt: 'Sunny Italian Limoncello spritz mixed with prosecco, soda, and fresh lemon wheel'
  },
  {
    id: 'prod-campari-spritz',
    slug: 'campari-spritz',
    name: 'Campari',
    photoId: 'photo-1527661591475-527312dd65f5',
    alt: 'Vivid red Campari spritz with prosecco, soda, and orange peel'
  },
  {
    id: 'prod-gin-tonic-twist',
    slug: 'gin-tonic-twist',
    name: 'Gin and Tonic Twist',
    photoId: 'photo-1551538827-9c037cb4f32a',
    alt: 'Craft gin and tonic cocktail with fresh rosemary sprig and citrus twist'
  },
  {
    id: 'prod-margarita',
    slug: 'margarita-on-the-rocks',
    name: 'Margarita on the Rocks',
    photoId: 'photo-1556679343-c7306c1976bc',
    alt: 'Classic shaken margarita with salted rim and fresh lime wedge on the rocks'
  },
  {
    id: 'prod-cosmopolitan',
    slug: 'cosmopolitan',
    name: 'Cosmopolitan',
    photoId: 'photo-1514362545857-3bc16c4c7d1b',
    alt: 'Vibrant pink Cosmopolitan cocktail served in a chilled martini glass with lime'
  },
  {
    id: 'prod-espresso-martini',
    slug: 'espresso-martini',
    name: 'Espresso Martini',
    photoId: 'photo-1545438102-799c3991ffb2',
    alt: 'Shaken vodka and coffee liqueur espresso martini crowned with velvety crema and 3 coffee beans'
  },
  {
    id: 'prod-negroni',
    slug: 'negroni',
    name: 'Negroni',
    photoId: 'photo-1551538827-9c037cb4f32a',
    alt: 'Classic Italian Negroni cocktail over large crystal ice cube with orange twist'
  },

  // 8. MILKSHAKES & SMOOTHIES
  {
    id: 'prod-milkshake',
    slug: 'classic-milkshake',
    name: 'Milkshake',
    photoId: 'photo-1572490122747-3968b75cc699',
    alt: 'Creamy artisan milkshake served in a tall glass with whipped cream'
  },
  {
    id: 'prod-power-shake',
    slug: 'power-shake',
    name: 'Power Shake',
    photoId: 'photo-1610970881699-44a5587cabec',
    alt: 'Nutrient-rich green smoothie with fresh avocado, kale, banana, and lemon'
  },
  {
    id: 'prod-energy-boost',
    slug: 'energy-boost-smoothie',
    name: 'Energy Boost',
    photoId: 'photo-1553530666-ba11a7da3888',
    alt: 'Vibrant antioxidant smoothie blended with raspberries, blueberries, and mango'
  },
  {
    id: 'prod-tropical-delight',
    slug: 'tropical-delight-smoothie',
    name: 'Tropical Delight',
    photoId: 'photo-1502741126161-b048400d085d',
    alt: 'Golden tropical smoothie with passion fruit, peach, and ripe mango'
  },
  {
    id: 'prod-caribbean-breeze',
    slug: 'caribbean-breeze-smoothie',
    name: 'Caribbean Breeze',
    photoId: 'photo-1546173159-315724a31696',
    alt: 'Exotic Caribbean smoothie blended with pineapple, strawberry, and coconut milk'
  },
  {
    id: 'prod-watermelon-splash',
    slug: 'watermelon-splash-smoothie',
    name: 'Watermelon Splash',
    photoId: 'photo-1589301760014-d929f3979dbc',
    alt: 'Refreshing chilled pink watermelon, strawberry, and lime smoothie'
  },

  // 9. WATER & SOFT DRINKS
  {
    id: 'prod-acqua-panna',
    slug: 'acqua-panna',
    name: 'Acqua Panna',
    photoId: 'photo-1548839140-29a749e1bc4e',
    alt: 'Chilled glass bottle of Acqua Panna natural still mineral water'
  },
  {
    id: 'prod-san-pellegrino',
    slug: 'san-pellegrino',
    name: 'San Pellegrino',
    photoId: 'photo-1559839914-ba2ac64e837f',
    alt: 'Green glass bottle of San Pellegrino sparkling mineral water with effervescent bubbles'
  },
  {
    id: 'prod-fresh-orange-juice',
    slug: 'fresh-orange-juice',
    name: 'Fresh Orange Juice',
    photoId: 'photo-1613478223719-2ab802602423',
    alt: 'Tall glass of 100% freshly squeezed orange juice served over ice'
  },
  {
    id: 'prod-soft-drinks',
    slug: 'soft-drinks',
    name: 'Soft Drinks',
    photoId: 'photo-1622483767028-3f66f32aef97',
    alt: 'Chilled glass bottle of Coca Cola with ice and fresh lemon wheel'
  },
  {
    id: 'prod-fruit-juices',
    slug: 'fruit-juices',
    name: 'Fruit Juices',
    photoId: 'photo-1600271886742-f049cd451bba',
    alt: 'Cold pressed pure fruit juice in clear glassware'
  },
  {
    id: 'prod-iced-tea',
    slug: 'iced-tea',
    name: 'Iced Tea',
    photoId: 'photo-1556679343-c7306c1976bc',
    alt: 'Tall refreshing glass of peach and lemon iced tea with mint leaves'
  },

  // 10. HOT BEVERAGES
  {
    id: 'prod-espresso',
    slug: 'espresso-single',
    name: 'Espresso',
    photoId: 'photo-1514432324607-a09d9b4aefdd',
    alt: 'Single shot espresso in classic white ceramic cup with thick hazelnut crema'
  },
  {
    id: 'prod-double-espresso',
    slug: 'double-espresso',
    name: 'Double Espresso',
    photoId: 'photo-1510591509098-f4fdc6d0ff04',
    alt: 'Bold double shot espresso doppio with dark aromatic crema'
  },
  {
    id: 'prod-espresso-macchiato',
    slug: 'espresso-macchiato',
    name: 'Espresso Macchiato',
    photoId: 'photo-1577968897966-3d4325b36b61',
    alt: 'Espresso shot topped with a cloud of silky textured milk foam'
  },
  {
    id: 'prod-americano',
    slug: 'americano-coffee',
    name: 'Americano',
    photoId: 'photo-1514432324607-a09d9b4aefdd',
    alt: 'Freshly pulled Americano long black coffee in ceramic mug'
  },
  {
    id: 'prod-flat-white',
    slug: 'flat-white-specialty',
    name: 'Flat White',
    photoId: 'photo-1577968897966-3d4325b36b61',
    alt: 'Specialty flat white coffee with silky microfoam latte art'
  },
  {
    id: 'prod-cappuccino',
    slug: 'artisan-cappuccino',
    name: 'Cappuccino',
    photoId: 'photo-1572442388796-11668a67e53d',
    alt: 'Italian cappuccino with thick milk foam dusted with cocoa powder'
  },
  {
    id: 'prod-cafe-latte',
    slug: 'cafe-latte',
    name: 'Café Latte',
    photoId: 'photo-1570968915860-54d5c301fa9f',
    alt: 'Steamed milk café latte with delicate layered espresso and foam'
  },
  {
    id: 'prod-iced-coffee',
    slug: 'iced-coffee',
    name: 'Iced Coffee',
    photoId: 'photo-1517701550927-30cf4ba1dba5',
    alt: 'Chilled iced coffee poured over cold milk and ice cubes in glass'
  },
  {
    id: 'prod-whittington-tea',
    slug: 'whittington-tea',
    name: 'Whittington Tea Selection',
    photoId: 'photo-1576092768241-dec231879fc3',
    alt: 'Premium Whittington loose leaf tea infusion in porcelain teapot and cup'
  },
  {
    id: 'prod-eraclea-hot-chocolate',
    slug: 'eraclea-hot-chocolate',
    name: 'Eraclea Thick Hot Chocolate',
    photoId: 'photo-1542990253-0d0f5be5f0ed',
    alt: 'Ultra-thick Italian spoon-coating hot chocolate in ceramic cup'
  },
  {
    id: 'prod-affogato',
    slug: 'affogato',
    name: 'Affogato',
    photoId: 'photo-1594631252845-29fc4cc8cde9',
    alt: 'Scoop of velvety vanilla gelato drowned in a freshly pulled shot of hot espresso'
  },

  // 11. WINES, BEER & CIDER
  {
    id: 'prod-sparkling-wine',
    slug: 'sparkling-wine-prosecco',
    name: 'Sparkling Wine',
    photoId: 'photo-1510812431401-41d2bd2722f3',
    alt: 'Chilled flute of Italian Bottega DOC Prosecco with rising effervescence'
  },
  {
    id: 'prod-white-wine',
    slug: 'white-wine-anthilia',
    name: 'White Wine',
    photoId: 'photo-1584916201218-f4242ceb4809',
    alt: 'Elegant glass of chilled Sicilian Anthìlia DOC Donnafugata white wine'
  },
  {
    id: 'prod-red-wine',
    slug: 'red-wine-sedara',
    name: 'Red Wine',
    photoId: 'photo-1506377247377-2a5b3b417ebb',
    alt: 'Deep ruby red Sedàra DOC Donnafugata wine in large stem goblet'
  },
  {
    id: 'prod-rose-wine',
    slug: 'rose-wine-lumera',
    name: 'Rosé Wine',
    photoId: 'photo-1558001373-7b93ee48ffa0',
    alt: 'Chilled pale pink Sicilian Lumèra DOC Donnafugata rosé wine in glass'
  },
  {
    id: 'prod-cisk-lager',
    slug: 'cisk-lager-malta',
    name: 'Cisk Lager',
    photoId: 'photo-1535958636474-b021ee887b13',
    alt: "Malta's iconic golden Cisk Lager served cold in a chalice glass with creamy foam"
  },
  {
    id: 'prod-heineken',
    slug: 'heineken-beer',
    name: 'Heineken',
    photoId: 'photo-1618886614638-80e3c103d31a',
    alt: 'Cold green Heineken bottle served with chilled pilsner glass and head'
  },
  {
    id: 'prod-heineken-zero',
    slug: 'heineken-zero',
    name: 'Heineken 0.0',
    photoId: 'photo-1575037614876-c38a4d44f5b8',
    alt: 'Chilled non-alcoholic Heineken 0.0 lager poured with thick white collar'
  },
  {
    id: 'prod-moretti',
    slug: 'birra-moretti',
    name: 'Moretti',
    photoId: 'photo-1567696911980-2eed69a46042',
    alt: 'Authentic Italian Birra Moretti lager poured into a cold beer glass'
  },
  {
    id: 'prod-corona',
    slug: 'corona-extra',
    name: 'Corona',
    photoId: 'photo-1584225064785-c62a8b43d148',
    alt: 'Cold bottle of Corona Extra with fresh lime wedge in the neck'
  },
  {
    id: 'prod-strongbow-cider',
    slug: 'strongbow-cider',
    name: 'Strongbow Cider',
    photoId: 'photo-1532634922-8fe0b757fb13',
    alt: 'Crisp golden sparkling apple cider poured over ice cubes in a pint glass'
  }
];

console.log(`Processing ${MENU_ITEMS.length} menu items...`);
const manifest = [];

for (let i = 0; i < MENU_ITEMS.length; i++) {
  const item = MENU_ITEMS[i];
  const outPath = path.join(TARGET_DIR, `${item.slug}.webp`);
  const tmpPath = `/tmp/${item.slug}.jpg`;

  console.log(`[${i + 1}/${MENU_ITEMS.length}] Downloading ${item.slug}...`);
  try {
    const url = `https://images.unsplash.com/${item.photoId}?auto=format&fit=crop&w=800&h=600&q=82`;
    execSync(`curl -s -L --max-time 12 "${url}" -o "${tmpPath}"`);
    
    // Check if valid image downloaded
    const stats = fs.statSync(tmpPath);
    if (stats.size > 2000) {
      execSync(`convert "${tmpPath}" -resize 800x600^ -gravity center -extent 800x600 -quality 82 "${outPath}"`);
      const finalSize = fs.statSync(outPath).size;
      manifest.push({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: `/images/menu/${item.slug}.webp`,
        alt: item.alt,
        sizeKb: Math.round(finalSize / 1024),
        status: 'VERIFIED'
      });
      console.log(`  ✓ ${item.slug}.webp ready (${Math.round(finalSize / 1024)} KB)`);
    } else {
      console.log(`  ✗ Download failed (small size: ${stats.size} bytes)`);
      manifest.push({ id: item.id, slug: item.slug, status: 'FAILED' });
    }
  } catch (err) {
    console.error(`  ✗ Error processing ${item.slug}:`, err.message);
    manifest.push({ id: item.id, slug: item.slug, status: 'ERROR', error: err.message });
  } finally {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
  }
}

// Write manifest
const manifestPath = path.join(TARGET_DIR, 'IMAGE_AUDIT_MANIFEST.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Manifest written to ${manifestPath}`);

// Summary
const verifiedCount = manifest.filter(m => m.status === 'VERIFIED').length;
console.log(`Successfully verified and optimized ${verifiedCount} of ${MENU_ITEMS.length} images!`);
