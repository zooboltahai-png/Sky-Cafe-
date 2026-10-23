import React, { useState } from 'react';
import { LightboxModal, LightboxImage } from '../components/LightboxModal';
import { Maximize2, Camera } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const galleryItems: LightboxImage[] = [
    {
      src: '/src/assets/images/skyline_hero_sliema_1792764460169.jpg',
      title: 'Waterfront Morning at Triq Ix-Xatt',
      caption: 'The vibrant Sliema promenade with artisan cappuccino and fresh breakfast overlooking Marsamxett harbour.'
    },
    {
      src: '/src/assets/images/food_flat_white_1792772378500.jpg',
      title: 'Specialty Flat White Coffee',
      caption: 'Double shot of locally roasted espresso with velvety steamed microfoam and intricate latte art.'
    },
    {
      src: '/src/assets/images/food_artisan_cappuccino_1792772380261.jpg',
      title: 'Artisan Cappuccino',
      caption: 'Rich espresso with thick velvety milk froth and a light dusting of pure Dutch cocoa powder.'
    },
    {
      src: '/src/assets/images/food_avocado_poached_egg_1792764460074.jpg',
      title: 'Avocado Toast with Poached Egg',
      caption: 'Crisp sourdough bread topped with crushed avocado, golden runny poached egg, microgreens, and olive oil.'
    },
    {
      src: '/src/assets/images/food_salmon_croissant_1792764460900.jpg',
      title: 'Smoked Salmon All-Butter Croissant',
      caption: 'Warm flaky croissant layered with smoked salmon, whipped dill cream cheese, and capers.'
    },
    {
      src: '/src/assets/images/food_ciabatta_mozzarella_1792764462342.jpg',
      title: 'Ciabatta Mozzarella & Basil',
      caption: 'Toasted Italian ciabatta filled with melted fior di latte mozzarella, vine-ripened tomatoes, and fresh basil.'
    },
    {
      src: '/src/assets/images/food_chicken_wrap_fries_1792772381094.jpg',
      title: 'Grilled Chicken Wrap with Fries',
      caption: 'Succulent grilled chicken breast with crisp greens and garlic herb aioli in a toasted wrap with crispy fries.'
    },
    {
      src: '/src/assets/images/food_avocado_croissant_1792772382193.jpg',
      title: 'Avocado Toast Croissant',
      caption: 'Golden butter croissant layered with sliced fresh avocado, sweet vine tomatoes, and toasted sesame.'
    },
    {
      src: '/src/assets/images/food_roasted_tomatoes_feta_1792772382729.jpg',
      title: 'Roasted Tomatoes with Feta Cheese',
      caption: 'Sweet blistered cherry tomatoes on toasted rustic sourdough with Greek feta and oregano herbs.'
    },
    {
      src: '/src/assets/images/food_avocado_black_beans_1792772382665.jpg',
      title: 'Avocado Toast with Black Beans',
      caption: 'Artisan sourdough topped with zesty avocado mash, seasoned black beans, fresh cilantro, and lime.'
    },
    {
      src: '/src/assets/images/food_wild_berry_smoothie_1792772379979.jpg',
      title: 'Wild Berry Antioxidant Smoothie',
      caption: 'Chilled natural smoothie blended with strawberries, blueberries, raspberries, banana, and oat milk.'
    },
    {
      src: '/src/assets/images/food_fresh_orange_juice_1792772380689.jpg',
      title: 'Freshly Squeezed Orange Juice',
      caption: 'Pure sweet Maltese oranges, freshly cold-pressed and served chilled over ice.'
    },
    {
      src: '/src/assets/images/food_chocolate_brownie_1792772403143.jpg',
      title: 'Homemade Chocolate Fudge Brownie',
      caption: 'Decadent Belgian dark chocolate brownie with crackled crust, warm chocolate drizzle, and walnuts.'
    }
  ];

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-800">
            <Camera className="w-4 h-4" />
            <span>Visual Showcase</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Cafe & Food Gallery
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            A glimpse into our freshly prepared dishes, specialty beverages, and the Mediterranean atmosphere along Sliema’s Triq Ix-Xatt.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleOpenLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Hover overlay with maximize icon */}
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="p-3 bg-stone-900/80 rounded-full backdrop-blur-xs">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-editorial text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          images={galleryItems}
          currentIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(newIdx) => setCurrentIndex(newIdx)}
        />

        <div className="p-6 bg-white rounded-xl border border-stone-200 text-center max-w-xl mx-auto space-y-2 text-xs text-stone-500">
          <p className="font-medium text-stone-700">Looking for a specific dish?</p>
          <p>
            Menu items are prepared daily on site at Triq Ix-Xatt. Check our live digital menu for today’s real-time availability.
          </p>
        </div>

      </div>
    </div>
  );
};
