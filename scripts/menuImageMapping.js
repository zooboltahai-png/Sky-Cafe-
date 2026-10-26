import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const MENU_IMAGE_MAPPING = [
  // 1. SALADS & SOUP
  {
    id: 'prod-chicken-pesto-salad',
    slug: 'chicken-pesto-salad',
    name: 'Chicken Pesto Salad',
    photoId: 'photo-1540420773420-3366772f4999' // Grilled chicken salad with greens
  },
  {
    id: 'prod-greek-salad',
    slug: 'greek-salad',
    name: 'Greek Salad',
    photoId: 'photo-1540189549336-e6e99c3679fe' // Fresh Greek salad with block of feta, olives, cucumbers
  },
  {
    id: 'prod-barley-salad',
    slug: 'barley-salad',
    name: 'Barley Salad',
    photoId: 'photo-1512621776951-a57141f2eefd' // Nourish grain and chickpea bowl with greens
  },
  {
    id: 'prod-soup-of-the-day',
    slug: 'soup-of-the-day',
    name: 'Soup of the Day',
    photoId: 'photo-1547592166-23ac45744acd' // Artisanal bowl of warm soup with rustic bread
  },

  // 2. PLATTERS & NIBBLES
  {
    id: 'prod-antipasto-platter',
    slug: 'antipasto-platter',
    name: 'Antipasto Platter',
    photoId: 'photo-1541544741938-0af808871cc0' // Charcuterie sharing board with cured meats and olives
  },
  {
    id: 'prod-cheese-board',
    slug: 'cheese-board',
    name: 'Cheese Board',
    photoId: 'photo-1631379578550-7038263db699' // Gourmet cheese selection with crackers and fruits
  },
  {
    id: 'prod-dips-crudites',
    slug: 'dips-crudites',
    name: 'Dips & Crudites',
    photoId: 'photo-1505253758473-96b7015fcd40' // Crisp fresh vegetable crudités with Mediterranean dips
  },
  {
    id: 'prod-bouyiourdi',
    slug: 'bouyiourdi',
    name: 'Bouyiourdi',
    photoId: 'photo-1592417817098-8f3d69109853' // Baked feta with blistered tomatoes and olive oil
  },
  {
    id: 'prod-crepe-bites',
    slug: 'cheese-onion-crepe-bites',
    name: 'Cheese & Onion Crêpe Bites',
    photoId: 'photo-1519708227418-c8fd9a32b7a2' // Savory crepe rolls with melted cheese
  },
  {
    id: 'prod-garden-bruschetta',
    slug: 'garden-bruschetta',
    name: 'Garden Bruschetta',
    photoId: 'photo-1572695157366-5e585ab2b69f' // Toasted sourdough with diced tomatoes, garlic, basil
  },

  // 3. DESSERTS
  {
    id: 'prod-crepes-hazelnut',
    slug: 'crepes-hazelnut-strawberries',
    name: 'Crêpes with Hazelnut Spread & Strawberries',
    photoId: 'photo-1519676867240-f03562e64548' // Warm crepes with hazelnut spread and sliced strawberries
  },
  {
    id: 'prod-crepes-honey-orange',
    slug: 'crepes-honey-orange',
    name: 'Crêpes with Honey & Orange',
    photoId: 'photo-1565299585323-38d6b0865b47' // Delicate crepes drizzled with golden honey and orange zest
  },
  {
    id: 'prod-double-chocolate-brownie',
    slug: 'double-chocolate-brownie',
    name: 'Double Chocolate Brownie',
    photoId: 'photo-1606313564200-e75d5e30476c' // Warm fudge brownie with vanilla ice cream
  },
  {
    id: 'prod-tiramisu',
    slug: 'tiramisu',
    name: 'Tiramisu',
    photoId: 'photo-1571877227200-a0d98ea607e9' // Classic Italian tiramisu with cocoa and mascarpone
  },
  {
    id: 'prod-creme-caramel',
    slug: 'creme-caramel',
    name: 'Crème Caramel',
    photoId: 'photo-1587314168485-3236d6710814' // Smooth flan custard with delicate caramel glaze
  },
  {
    id: 'prod-strawberry-cheesecake',
    slug: 'strawberry-cheesecake',
    name: 'Strawberry Cheesecake',
    photoId: 'photo-1533134242443-d4fd215305ad' // New York cheesecake slice with strawberry glaze
  },
  {
    id: 'prod-muffin',
    slug: 'artisan-muffin',
    name: 'Muffin',
    photoId: 'photo-1586985289688-ca3cf47d3e6e' // Golden bakery muffin
  },
  {
    id: 'prod-ricotta-cannoli',
    slug: 'ricotta-cannoli',
    name: 'Ricotta Cannoli',
    photoId: 'photo-1551024709-8f23befc6f87' // Crisp Sicilian cannoli filled with sweet ricotta
  },
  {
    id: 'prod-gelato-antica',
    slug: 'gelato-antica-del-corso',
    name: 'Gelato – Antica Gelateria del Corso',
    photoId: 'photo-1560008581-09826d1de69e' // Artisanal Italian gelato scoops in bowl
  },

  // 4. BREAKFAST & BRUNCH
  {
    id: 'prod-avo-egg-heaven',
    slug: 'avo-egg-heaven',
    name: 'Avo & Egg Heaven',
    photoId: 'photo-1525351484163-7529414344d8' // Poached egg on avocado sourdough toast
  },
  {
    id: 'prod-miso-scramble',
    slug: 'miso-scrambled-eggs',
    name: 'Miso Scrambled Eggs',
    photoId: 'photo-1551218808-94e220e084d2' // Soft scrambled eggs on toasted sourdough with sesame
  },
  {
    id: 'prod-morning-ranchero',
    slug: 'morning-ranchero',
    name: 'Morning Ranchero',
    photoId: 'photo-1584776296944-ab6fb57b0bdd' // Sourdough with avocado mash and black bean salsa
  },

  // 5. ARTISAN CROISSANTS
  {
    id: 'prod-salmon-croissant',
    slug: 'salmon-cream-cheese-croissant',
    name: 'Smoked Salmon & Cream Cheese Croissant',
    photoId: 'photo-1555507036-ab1f4038808a' // Croissant with salmon and herb cream cheese
  },
  {
    id: 'prod-parma-croissant',
    slug: 'parma-parmesan-croissant',
    name: 'Parma & Parmesan Croissant',
    photoId: 'photo-1623334044303-241021148842' // Flaky croissant with Parma prosciutto and shaved grana
  },
  {
    id: 'prod-ham-cheese-croissant',
    slug: 'ham-cheese-croissant',
    name: 'Ham & Cheese Croissant',
    photoId: 'photo-1549931319-a545dcf3bc73' // Toasted golden croissant with ham and melted cheese
  },
  {
    id: 'prod-ricotta-honey-croissant',
    slug: 'ricotta-honey-croissant',
    name: 'Ricotta & Honey Croissant',
    photoId: 'photo-1509440159596-0249088772ff' // Sweet ricotta and honey filled croissant
  },
  {
    id: 'prod-blueberry-cheesecake-croissant',
    slug: 'blueberry-cheesecake-croissant',
    name: 'Blueberry Cheesecake Croissant',
    photoId: 'photo-1530610476181-d83430b64dcd' // Croissant with blueberry and cream filling
  },
  {
    id: 'prod-chocolate-strawberry-croissant',
    slug: 'chocolate-strawberry-croissant',
    name: 'Chocolate & Strawberry Croissant',
    photoId: 'photo-1584776296944-ab6fb57b0bdd' // Croissant with chocolate spread and strawberries
  },
  {
    id: 'prod-pistachio-croissant',
    slug: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    photoId: 'photo-1621236378699-8597fee6a1ce' // Flaky croissant with rich pistachio cream and roasted nuts
  },
  {
    id: 'prod-butter-croissant',
    slug: 'butter-croissant',
    name: 'Butter Croissant',
    photoId: 'photo-1555507036-ab1f4038808a' // Classic golden all-butter French croissant
  },

  // 6. SANDWICHES & WRAPS
  {
    id: 'prod-mortadella-pistachio-ciabatta',
    slug: 'mortadella-pistachio-ciabatta',
    name: 'Mortadella & Pistachio Ciabatta',
    photoId: 'photo-1509722747041-616f39b57569' // Italian ciabatta filled with mortadella and bufala
  },
  {
    id: 'prod-tuna-melt-ciabatta',
    slug: 'tuna-melt-ciabatta',
    name: 'Tuna Melt Ciabatta',
    photoId: 'photo-1528735602780-2552fd46c7af' // Toasted ciabatta with spiced tuna and melted mozzarella
  },
  {
    id: 'prod-italian-garden-toastie',
    slug: 'italian-garden-toastie',
    name: 'Italian Garden Toastie',
    photoId: 'photo-1528735602780-2552fd46c7af' // Pesto, bufala mozzarella and tomato toastie
  },
  {
    id: 'prod-ham-cheese-toastie',
    slug: 'ham-cheese-toastie',
    name: 'Ham & Cheese Toastie',
    photoId: 'photo-1528735602780-2552fd46c7af' // Golden grilled sourdough with ham and melted cheddar
  },
  {
    id: 'prod-vegan-burrito',
    slug: 'vegan-burrito',
    name: 'Vegan Burrito',
    photoId: 'photo-1626700051175-6818013e1d4f' // Warm BBQ tofu and veggie wrap
  },
  {
    id: 'prod-famous-chicken-wrap',
    slug: 'famous-chicken-wrap',
    name: 'Famous Chicken Wrap',
    photoId: 'photo-1626700051175-6818013e1d4f' // Warm seasoned chicken wrap with crisps
  },
  {
    id: 'prod-chicken-mayo-baguette',
    slug: 'chicken-mayo-baguette',
    name: 'Chicken Mayo Baguette',
    photoId: 'photo-1509722747041-616f39b57569' // Crusty French baguette with smoked paprika chicken mayo
  },
  {
    id: 'prod-italian-sub',
    slug: 'italian-sub',
    name: 'Italian Sub',
    photoId: 'photo-1550547660-d9450f859349' // Loaded Italian deli sub with cold cuts, provolone, lettuce
  },

  // 7. SPRITZERS & COCKTAILS
  {
    id: 'prod-aperol-spritz',
    slug: 'aperol-spritz',
    name: 'Aperol Spritz',
    photoId: 'photo-1560512823-829485b8bf24' // Classic vibrant orange Aperol spritz in wine glass
  },
  {
    id: 'prod-hugo-spritz',
    slug: 'hugo-spritz',
    name: 'Hugo',
    photoId: 'photo-1514362545857-3bc16c4c7d1b' // Sparkling elderflower spritz with fresh mint and lime
  },
  {
    id: 'prod-sarti-spritz',
    slug: 'sarti-spritz',
    name: 'Sarti',
    photoId: 'photo-1536935338788-846bb9981813' // Sparkling pink citrus spritz with prosecco
  },
  {
    id: 'prod-limoncello-spritz',
    slug: 'limoncello-spritz',
    name: 'Limoncello',
    photoId: 'photo-1513558161293-cdaf765ed2fd' // Sunny yellow Italian limoncello cocktail with lemon garnish
  },
  {
    id: 'prod-campari-spritz',
    slug: 'campari-spritz',
    name: 'Campari',
    photoId: 'photo-1551024709-8f23befc6f87' // Deep ruby red Campari spritz with orange slice
  },
  {
    id: 'prod-gin-tonic-twist',
    slug: 'gin-tonic-twist',
    name: 'Gin and Tonic Twist',
    photoId: 'photo-1527661591475-527312dd65f5' // Premium craft gin and tonic with rosemary sprig
  },
  {
    id: 'prod-margarita',
    slug: 'margarita-on-the-rocks',
    name: 'Margarita on the Rocks',
    photoId: 'photo-1556679343-c7306c1976bc' // Shaken margarita with salted rim and fresh lime
  },
  {
    id: 'prod-cosmopolitan',
    slug: 'cosmopolitan',
    name: 'Cosmopolitan',
    photoId: 'photo-1551024709-8f23befc6f87' // Bright pink cosmopolitan cocktail in martini glass
  },
  {
    id: 'prod-espresso-martini',
    slug: 'espresso-martini',
    name: 'Espresso Martini',
    photoId: 'photo-1545438102-799c3991ffb2' // Shaken espresso martini with rich crema and coffee beans
  },
  {
    id: 'prod-negroni',
    slug: 'negroni',
    name: 'Negroni',
    photoId: 'photo-1551024709-8f23befc6f87' // Classic crimson Negroni over clear ice with orange twist
  },

  // 8. MILKSHAKES & SMOOTHIES
  {
    id: 'prod-milkshake',
    slug: 'classic-milkshake',
    name: 'Milkshake',
    photoId: 'photo-1572490122747-3968b75cc699' // Tall chilled milkshake topped with whipped cream
  },
  {
    id: 'prod-power-shake',
    slug: 'power-shake',
    name: 'Power Shake',
    photoId: 'photo-1610970881699-44a5587cabec' // Green detox smoothie with avocado and kale
  },
  {
    id: 'prod-energy-boost',
    slug: 'energy-boost-smoothie',
    name: 'Energy Boost',
    photoId: 'photo-1553530666-ba11a7da3888' // Vibrant raspberry and mango red berry smoothie
  },
  {
    id: 'prod-tropical-delight',
    slug: 'tropical-delight-smoothie',
    name: 'Tropical Delight',
    photoId: 'photo-1502741126161-b048400d085d' // Golden passion fruit, mango, and peach smoothie
  },
  {
    id: 'prod-caribbean-breeze',
    slug: 'caribbean-breeze-smoothie',
    name: 'Caribbean Breeze',
    photoId: 'photo-1546173159-315724a31696' // Tropical pineapple and coconut cream smoothie
  },
  {
    id: 'prod-watermelon-splash',
    slug: 'watermelon-splash-smoothie',
    name: 'Watermelon Splash',
    photoId: 'photo-1589301760014-d929f3979dbc' // Refreshing chilled pink watermelon and lime smoothie
  },

  // 9. WATER & SOFT BEVERAGES
  {
    id: 'prod-acqua-panna',
    slug: 'acqua-panna',
    name: 'Acqua Panna',
    photoId: 'photo-1548839140-29a749e1bc4e' // Glass bottle of still natural mineral water with tumbler
  },
  {
    id: 'prod-san-pellegrino',
    slug: 'san-pellegrino',
    name: 'San Pellegrino',
    photoId: 'photo-1559839914-ba2ac64e837f' // Green glass bottle of sparkling water with bubbles
  },
  {
    id: 'prod-fresh-orange-juice',
    slug: 'fresh-orange-juice',
    name: 'Fresh Orange Juice',
    photoId: 'photo-1613478223719-2ab802602423' // Tall glass of freshly squeezed orange juice with ice
  },
  {
    id: 'prod-soft-drinks',
    slug: 'soft-drinks',
    name: 'Soft Drinks',
    photoId: 'photo-1622483767028-3f66f32aef97' // Cold glass bottle with ice and citrus
  },
  {
    id: 'prod-fruit-juices',
    slug: 'fruit-juices',
    name: 'Fruit Juices',
    photoId: 'photo-1600271886742-f049cd451bba' // Clear glass of cold-pressed juice
  },
  {
    id: 'prod-iced-tea',
    slug: 'iced-tea',
    name: 'Iced Tea',
    photoId: 'photo-1556679343-c7306c1976bc' // Chilled iced tea with lemon and fresh mint
  },

  // 10. HOT BEVERAGES & COFFEE
  {
    id: 'prod-espresso',
    slug: 'espresso-single',
    name: 'Espresso',
    photoId: 'photo-1514432324607-a09d9b4aefdd' // Single shot espresso with rich crema in white cup
  },
  {
    id: 'prod-double-espresso',
    slug: 'double-espresso',
    name: 'Double Espresso',
    photoId: 'photo-1510591509098-f4fdc6d0ff04' // Bold double shot espresso doppio
  },
  {
    id: 'prod-espresso-macchiato',
    slug: 'espresso-macchiato',
    name: 'Espresso Macchiato',
    photoId: 'photo-1577968897966-3d4325b36b61' // Espresso topped with cloud of silky foam
  },
  {
    id: 'prod-americano',
    slug: 'americano-coffee',
    name: 'Americano',
    photoId: 'photo-1514432324607-a09d9b4aefdd' // Hot Americano long black in ceramic mug
  },
  {
    id: 'prod-flat-white',
    slug: 'flat-white-specialty',
    name: 'Flat White',
    photoId: 'photo-1577968897966-3d4325b36b61' // Specialty flat white with silky microfoam
  },
  {
    id: 'prod-cappuccino',
    slug: 'artisan-cappuccino',
    name: 'Cappuccino',
    photoId: 'photo-1572442388796-11668a67e53d' // Italian cappuccino with dusted froth
  },
  {
    id: 'prod-cafe-latte',
    slug: 'cafe-latte',
    name: 'Café Latte',
    photoId: 'photo-1570968915860-54d5c301fa9f' // Steamed milk café latte with latte art
  },
  {
    id: 'prod-iced-coffee',
    slug: 'iced-coffee',
    name: 'Iced Coffee',
    photoId: 'photo-1517701550927-30cf4ba1dba5' // Chilled iced latte over ice cubes
  },
  {
    id: 'prod-whittington-tea',
    slug: 'whittington-tea',
    name: 'Whittington Tea Selection',
    photoId: 'photo-1576092768241-dec231879fc3' // Porcelain teapot and cup with aromatic loose leaf tea
  },
  {
    id: 'prod-eraclea-hot-chocolate',
    slug: 'eraclea-hot-chocolate',
    name: 'Eraclea Thick Hot Chocolate',
    photoId: 'photo-1542990253-0d0f5be5f0ed' // Ultra thick velvety Italian hot chocolate
  },
  {
    id: 'prod-affogato',
    slug: 'affogato',
    name: 'Affogato',
    photoId: 'photo-1594631252845-29fc4cc8cde9' // Vanilla gelato scoop drowned in hot espresso
  },

  // 11. WINES, BEER & CIDER
  {
    id: 'prod-sparkling-wine',
    slug: 'sparkling-wine-prosecco',
    name: 'Sparkling Wine',
    photoId: 'photo-1510812431401-41d2bd2722f3' // Flutes of Italian Prosecco with rising fine bubbles
  },
  {
    id: 'prod-white-wine',
    slug: 'white-wine-anthilia',
    name: 'White Wine',
    photoId: 'photo-1510812431401-41d2bd2722f3' // Chilled glass of Sicilian Anthìlia white wine
  },
  {
    id: 'prod-red-wine',
    slug: 'red-wine-sedara',
    name: 'Red Wine',
    photoId: 'photo-1510812431401-41d2bd2722f3' // Ruby red Sicilian Sedàra Donnafugata wine in goblet
  },
  {
    id: 'prod-rose-wine',
    slug: 'rose-wine-lumera',
    name: 'Rosé Wine',
    photoId: 'photo-1510812431401-41d2bd2722f3' // Pale salmon pink chilled rosé wine in stem glass
  },
  {
    id: 'prod-cisk-lager',
    slug: 'cisk-lager-malta',
    name: 'Cisk Lager',
    photoId: 'photo-1608270119277-3e1986c7504a' // Cold golden lager with frothy head in glass chalice
  },
  {
    id: 'prod-heineken',
    slug: 'heineken-beer',
    name: 'Heineken',
    photoId: 'photo-1608270119277-3e1986c7504a' // Cold premium lager beer in pilsner glass
  },
  {
    id: 'prod-heineken-zero',
    slug: 'heineken-zero',
    name: 'Heineken 0.0',
    photoId: 'photo-1608270119277-3e1986c7504a' // Non-alcoholic cold lager with frothy collar
  },
  {
    id: 'prod-moretti',
    slug: 'birra-moretti',
    name: 'Moretti',
    photoId: 'photo-1608270119277-3e1986c7504a' // Birra Moretti golden Italian lager
  },
  {
    id: 'prod-corona',
    slug: 'corona-extra',
    name: 'Corona',
    photoId: 'photo-1584225064785-c62a8b43d148' // Chilled bottle of Corona with fresh lime wedge
  },
  {
    id: 'prod-strongbow-cider',
    slug: 'strongbow-cider',
    name: 'Strongbow Cider',
    photoId: 'photo-1527661591475-527312dd65f5' // Sparkling golden apple cider over ice
  }
];

export { MENU_IMAGE_MAPPING };
