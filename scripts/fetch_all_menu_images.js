import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TARGET_DIR = path.resolve('/app/applet/public/images/menu');
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 81 items with dedicated slugs and targeted queries
const PRODUCTS = [
  // 1. Salads & Soup
  { id: 'prod-chicken-pesto-salad', slug: 'chicken-pesto-salad', query: 'Chicken salad pesto croutons food' },
  { id: 'prod-greek-salad', slug: 'greek-salad', query: 'Greek salad feta cheese olives cucumber' },
  { id: 'prod-barley-salad', slug: 'barley-salad', query: 'Pearl barley salad bowl chickpeas' },
  { id: 'prod-soup-of-the-day', slug: 'soup-of-the-day', query: 'Vegetable soup bowl bread soup' },

  // 2. Platters & Nibbles
  { id: 'prod-antipasto-platter', slug: 'antipasto-platter', query: 'Antipasto platter charcuterie cured meats' },
  { id: 'prod-cheese-board', slug: 'cheese-board', query: 'Cheese board platter crackers cheese' },
  { id: 'prod-dips-crudites', slug: 'dips-crudites', query: 'Crudites vegetables dips cucumber carrot' },
  { id: 'prod-bouyiourdi', slug: 'bouyiourdi', query: 'Baked feta tomato cheese oregano' },
  { id: 'prod-crepe-bites', slug: 'cheese-onion-crepe-bites', query: 'Savory crepes cheese roll' },
  { id: 'prod-garden-bruschetta', slug: 'garden-bruschetta', query: 'Bruschetta tomato basil bread garlic' },

  // 3. Desserts
  { id: 'prod-crepes-hazelnut', slug: 'crepes-hazelnut-strawberries', query: 'Crepes chocolate strawberries dessert' },
  { id: 'prod-crepes-honey-orange', slug: 'crepes-honey-orange', query: 'Crepes honey dessert sweet' },
  { id: 'prod-double-chocolate-brownie', slug: 'double-chocolate-brownie', query: 'Chocolate brownie ice cream dessert' },
  { id: 'prod-tiramisu', slug: 'tiramisu', query: 'Tiramisu cake dessert mascarpone' },
  { id: 'prod-creme-caramel', slug: 'creme-caramel', query: 'Creme caramel flan custard' },
  { id: 'prod-strawberry-cheesecake', slug: 'strawberry-cheesecake', query: 'Strawberry cheesecake dessert slice' },
  { id: 'prod-muffin', slug: 'artisan-muffin', query: 'Blueberry muffin baked pastry' },
  { id: 'prod-ricotta-cannoli', slug: 'ricotta-cannoli', query: 'Cannoli sweet ricotta pastry' },
  { id: 'prod-gelato-antica', slug: 'gelato-antica-del-corso', query: 'Gelato ice cream scoops bowl' },

  // 4. Breakfast & Brunch
  { id: 'prod-avo-egg-heaven', slug: 'avo-egg-heaven', query: 'Avocado toast poached egg sourdough' },
  { id: 'prod-miso-scramble', slug: 'miso-scrambled-eggs', query: 'Scrambled eggs sourdough toast breakfast' },
  { id: 'prod-morning-ranchero', slug: 'morning-ranchero', query: 'Avocado toast black beans salsa' },

  // 5. Croissants
  { id: 'prod-salmon-croissant', slug: 'salmon-cream-cheese-croissant', query: 'Salmon croissant cream cheese sandwich' },
  { id: 'prod-parma-croissant', slug: 'parma-parmesan-croissant', query: 'Prosciutto croissant parma rocket' },
  { id: 'prod-ham-cheese-croissant', slug: 'ham-cheese-croissant', query: 'Ham cheese croissant melted' },
  { id: 'prod-ricotta-honey-croissant', slug: 'ricotta-honey-croissant', query: 'Sweet croissant pastry honey' },
  { id: 'prod-blueberry-cheesecake-croissant', slug: 'blueberry-cheesecake-croissant', query: 'Blueberry pastry croissant cream' },
  { id: 'prod-chocolate-strawberry-croissant', slug: 'chocolate-strawberry-croissant', query: 'Chocolate croissant strawberries pastry' },
  { id: 'prod-pistachio-croissant', slug: 'pistachio-croissant', query: 'Pistachio croissant pastry cream' },
  { id: 'prod-butter-croissant', slug: 'butter-croissant', query: 'Croissant butter French pastry' },

  // 6. Sandwiches & Wraps
  { id: 'prod-mortadella-pistachio-ciabatta', slug: 'mortadella-pistachio-ciabatta', query: 'Mortadella ciabatta sandwich mozzarella' },
  { id: 'prod-tuna-melt-ciabatta', slug: 'tuna-melt-ciabatta', query: 'Tuna melt sandwich cheese toasted' },
  { id: 'prod-italian-garden-toastie', slug: 'italian-garden-toastie', query: 'Mozzarella tomato pesto toast sandwich' },
  { id: 'prod-ham-cheese-toastie', slug: 'ham-cheese-toastie', query: 'Grilled cheese sandwich ham toastie' },
  { id: 'prod-vegan-burrito', slug: 'vegan-burrito', query: 'Burrito wrap vegan beans rice' },
  { id: 'prod-famous-chicken-wrap', slug: 'famous-chicken-wrap', query: 'Chicken wrap tortilla salad mayo' },
  { id: 'prod-chicken-mayo-baguette', slug: 'chicken-mayo-baguette', query: 'Chicken baguette sandwich salad' },
  { id: 'prod-italian-sub', slug: 'italian-sub', query: 'Submarine sandwich Italian cold cuts' },

  // 7. Spritzers & Cocktails
  { id: 'prod-aperol-spritz', slug: 'aperol-spritz', query: 'Aperol spritz cocktail glass orange' },
  { id: 'prod-hugo-spritz', slug: 'hugo-spritz', query: 'Hugo cocktail spritz mint elderflower' },
  { id: 'prod-sarti-spritz', slug: 'sarti-spritz', query: 'Pink spritz cocktail prosecco' },
  { id: 'prod-limoncello-spritz', slug: 'limoncello-spritz', query: 'Limoncello cocktail lemon glass' },
  { id: 'prod-campari-spritz', slug: 'campari-spritz', query: 'Campari cocktail orange glass' },
  { id: 'prod-gin-tonic-twist', slug: 'gin-tonic-twist', query: 'Gin and tonic cocktail lime rosemary' },
  { id: 'prod-margarita', slug: 'margarita-on-the-rocks', query: 'Margarita cocktail lime salt rocks' },
  { id: 'prod-cosmopolitan', slug: 'cosmopolitan', query: 'Cosmopolitan cocktail martini glass pink' },
  { id: 'prod-espresso-martini', slug: 'espresso-martini', query: 'Espresso martini cocktail coffee beans' },
  { id: 'prod-negroni', slug: 'negroni', query: 'Negroni cocktail ice orange' },

  // 8. Milkshakes & Smoothies
  { id: 'prod-milkshake', slug: 'classic-milkshake', query: 'Milkshake whipped cream glass' },
  { id: 'prod-power-shake', slug: 'power-shake', query: 'Green smoothie avocado kale glass' },
  { id: 'prod-energy-boost', slug: 'energy-boost-smoothie', query: 'Berry smoothie raspberry glass red' },
  { id: 'prod-tropical-delight', slug: 'tropical-delight-smoothie', query: 'Mango passionfruit smoothie tropical yellow' },
  { id: 'prod-caribbean-breeze', slug: 'caribbean-breeze-smoothie', query: 'Pineapple coconut smoothie glass' },
  { id: 'prod-watermelon-splash', slug: 'watermelon-splash-smoothie', query: 'Watermelon smoothie drink chilled' },

  // 9. Water & Soft Drinks
  { id: 'prod-acqua-panna', slug: 'acqua-panna', query: 'Mineral water bottle glass table' },
  { id: 'prod-san-pellegrino', slug: 'san-pellegrino', query: 'Sparkling water bottle glass bubbles' },
  { id: 'prod-fresh-orange-juice', slug: 'fresh-orange-juice', query: 'Orange juice freshly squeezed glass' },
  { id: 'prod-soft-drinks', slug: 'soft-drinks', query: 'Cola drink glass ice lemon bottle' },
  { id: 'prod-fruit-juices', slug: 'fruit-juices', query: 'Fruit juice glass colorful' },
  { id: 'prod-iced-tea', slug: 'iced-tea', query: 'Iced tea lemon glass cold' },

  // 10. Hot Beverages
  { id: 'prod-espresso', slug: 'espresso-single', query: 'Espresso cup coffee crema white cup' },
  { id: 'prod-double-espresso', slug: 'double-espresso', query: 'Double espresso coffee cup crema' },
  { id: 'prod-espresso-macchiato', slug: 'espresso-macchiato', query: 'Espresso macchiato milk foam coffee' },
  { id: 'prod-americano', slug: 'americano-coffee', query: 'Americano black coffee ceramic cup' },
  { id: 'prod-flat-white', slug: 'flat-white-specialty', query: 'Flat white latte art cup coffee' },
  { id: 'prod-cappuccino', slug: 'artisan-cappuccino', query: 'Cappuccino coffee foam cup dusted' },
  { id: 'prod-cafe-latte', slug: 'cafe-latte', query: 'Caffe latte glass coffee steamed milk' },
  { id: 'prod-iced-coffee', slug: 'iced-coffee', query: 'Iced coffee glass milk ice cubes' },
  { id: 'prod-whittington-tea', slug: 'whittington-tea', query: 'Teapot teacup hot tea ceramic' },
  { id: 'prod-eraclea-hot-chocolate', slug: 'eraclea-hot-chocolate', query: 'Hot chocolate thick mug sweet' },
  { id: 'prod-affogato', slug: 'affogato', query: 'Affogato espresso vanilla ice cream' },

  // 11. Wines, Beer & Cider
  { id: 'prod-sparkling-wine', slug: 'sparkling-wine-prosecco', query: 'Prosecco sparkling wine flute glass' },
  { id: 'prod-white-wine', slug: 'white-wine-anthilia', query: 'White wine glass chilled stemware' },
  { id: 'prod-red-wine', slug: 'red-wine-sedara', query: 'Red wine glass goblet' },
  { id: 'prod-rose-wine', slug: 'rose-wine-lumera', query: 'Rose wine glass pink chilled' },
  { id: 'prod-cisk-lager', slug: 'cisk-lager-malta', query: 'Beer glass lager golden foam pint' },
  { id: 'prod-heineken', slug: 'heineken-beer', query: 'Heineken beer bottle glass' },
  { id: 'prod-heineken-zero', slug: 'heineken-zero', query: 'Cold beer glass foam non alcoholic' },
  { id: 'prod-moretti', slug: 'birra-moretti', query: 'Italian beer lager glass foam' },
  { id: 'prod-corona', slug: 'corona-extra', query: 'Corona beer bottle lime' },
  { id: 'prod-strongbow-cider', slug: 'strongbow-cider', query: 'Cider glass ice apple cider' }
];

function fetchWikimediaImageUrl(query) {
  return new Promise((resolve, reject) => {
    const encoded = encodeURIComponent(query);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encoded}&gsrlimit=5&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'SkylineCafeMaltaApp/1.0 (info@skylinecafemalta.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages;
          if (!pages) return resolve(null);
          for (const k in pages) {
            const info = pages[k].imageinfo?.[0];
            const imgUrl = info?.url;
            if (imgUrl && !imgUrl.endsWith('.svg') && !imgUrl.endsWith('.tif')) {
              return resolve(imgUrl);
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadAndConvert(url, outputPath) {
  const tmpFile = `/tmp/tmp_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`;
  try {
    execSync(`curl -s -L --max-time 15 "${url}" -o "${tmpFile}"`);
    const size = fs.statSync(tmpFile).size;
    if (size < 2000) {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
      return false;
    }
    // Resize, center crop to 800x600, quality 82 WebP
    execSync(`convert "${tmpFile}" -resize 800x600^ -gravity center -extent 800x600 -quality 82 "${outputPath}"`);
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    return fs.existsSync(outputPath) && fs.statSync(outputPath).size > 2000;
  } catch (err) {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    return false;
  }
}

async function run() {
  console.log(`Starting image harvest for ${PRODUCTS.length} menu products...`);
  const results = [];

  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    const outWebp = path.join(TARGET_DIR, `${p.slug}.webp`);
    console.log(`[${i + 1}/${PRODUCTS.length}] Processing ${p.slug} (${p.query})...`);

    let success = false;
    const mediaUrl = await fetchWikimediaImageUrl(p.query);
    if (mediaUrl) {
      console.log(`  Found media: ${mediaUrl.slice(0, 80)}...`);
      success = downloadAndConvert(mediaUrl, outWebp);
    }

    if (!success) {
      // Fallback: try direct Unsplash photo
      console.log(`  Trying Unsplash fallback for ${p.slug}...`);
      const fallbackUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(p.query)}`;
      success = downloadAndConvert(fallbackUrl, outWebp);
    }

    if (success) {
      const stats = fs.statSync(outWebp);
      console.log(`  ✓ Created ${p.slug}.webp (${Math.round(stats.size / 1024)} KB)`);
      results.push({
        id: p.id,
        slug: p.slug,
        imagePath: `/images/menu/${p.slug}.webp`,
        sizeBytes: stats.size,
        status: 'OK'
      });
    } else {
      console.log(`  ✗ Failed for ${p.slug}`);
      results.push({
        id: p.id,
        slug: p.slug,
        imagePath: `/images/menu/${p.slug}.webp`,
        status: 'FAILED'
      });
    }
  }

  fs.writeFileSync('/app/applet/scripts/image_results.json', JSON.stringify(results, null, 2));
  console.log('Complete! Results written to scripts/image_results.json');
}

run();
