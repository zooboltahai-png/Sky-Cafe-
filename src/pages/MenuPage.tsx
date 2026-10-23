import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Check, Info, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, addToCart, subscribeStore } from '../services/store';
import { Product, ProductCategory } from '../types';

export const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const [activeItemModal, setActiveItemModal] = useState<Product | null>(null);

  useEffect(() => {
    const update = () => {
      setProducts(getProducts());
    };
    update();
    return subscribeStore(update);
  }, []);

  const handleAddToCart = (product: Product, quantity = 1) => {
    addToCart(product, quantity);
    setAddedItemMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'breakfast-brunch', label: 'Breakfast & Brunch' },
    { key: 'ciabatta-sandwiches', label: 'Ciabatta' },
    { key: 'croissants', label: 'Croissants' },
    { key: 'wraps', label: 'Wraps & Mains' },
    { key: 'coffee-hot', label: 'Coffee & Hot' },
    { key: 'cold-smoothies', label: 'Cold Drinks' },
    { key: 'desserts', label: 'Desserts' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = dietaryFilter === 'all' || 
                           (product.dietary && product.dietary.includes(dietaryFilter as any));
    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 pb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Freshly Made Daily in Sliema
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Digital Cafe Menu
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every dish is made to order with authentic Mediterranean ingredients. All prices include applicable VAT. Typical spend €10–€20 per guest.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search menu (e.g. Avocado, Ciabatta)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>

            {/* Dietary Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-stone-500 shrink-0" />
              <span className="text-xs text-stone-600 whitespace-nowrap">Dietary:</span>
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                aria-label="Filter menu items by dietary requirement"
                className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="all">All Diets</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Pescatarian">Pescatarian</option>
              </select>
            </div>

          </div>

          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <p className="text-stone-500 text-sm">No items match your selected filters.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-3 text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => {
              const isAdded = !!addedItemMap[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with Fallback */}
                    <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/src/assets/images/skyline_hero_sliema_1792764460169.jpg';
                        }}
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-stone-900/85 backdrop-blur-xs text-white text-xs font-bold rounded tabular-nums">
                        €{item.price.toFixed(2)}
                      </div>
                      {!item.available && (
                        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="text-xs font-bold uppercase tracking-wider text-white bg-stone-900 px-3 py-1 rounded">
                            Sold Out Today
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="uppercase font-medium tracking-wide">
                          {item.category.replace('-', ' ')}
                        </span>
                        {item.dietary && item.dietary.length > 0 && (
                          <span className="text-amber-800 font-medium">
                            {item.dietary.join(', ')}
                          </span>
                        )}
                      </div>

                      <h3 className="font-editorial text-xl font-bold text-stone-900 leading-snug">
                        {item.name}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Allergens info trigger */}
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="pt-1 text-[11px] text-stone-400 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                          <span>Allergens: {item.allergens.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setActiveItemModal(item)}
                      className="text-xs text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2 cursor-pointer"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className={`flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : item.available
                          ? 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.98]'
                          : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : item.available ? (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add · €{item.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>Sold Out</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Details Modal */}
        {activeItemModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-modal-title"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
              <div className="aspect-[16/9] relative bg-stone-100">
                <img
                  src={activeItemModal.image}
                  alt={activeItemModal.imageAlt || activeItemModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/src/assets/images/skyline_hero_sliema_1792764460169.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-3 right-3 p-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-amber-800 tracking-wider">
                    {activeItemModal.category.replace('-', ' ')}
                  </span>
                  <span className="text-lg font-bold text-stone-900 tabular-nums">
                    €{activeItemModal.price.toFixed(2)}
                  </span>
                </div>

                <h3 id="menu-modal-title" className="font-editorial text-2xl font-bold text-stone-900">
                  {activeItemModal.name}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {activeItemModal.description}
                </p>

                {activeItemModal.allergens && activeItemModal.allergens.length > 0 && (
                  <div className="p-3 bg-stone-50 rounded-lg text-xs text-stone-600 space-y-1">
                    <span className="font-bold text-stone-800 block">Allergen Notice:</span>
                    <span>Contains: {activeItemModal.allergens.join(', ')}. If you have severe allergies, please notify cafe staff directly before ordering.</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveItemModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(activeItemModal);
                      setActiveItemModal(null);
                    }}
                    disabled={!activeItemModal.available}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-lg"
                  >
                    Add to Cart · €{activeItemModal.price.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Reminder bar on mobile if items in cart */}
        <div className="mt-12 p-6 bg-stone-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-editorial text-xl font-bold">Ready to collect?</h3>
            <p className="text-xs text-stone-400 mt-1">
              Select your pickup time and collect your order fresh at our Sliema cafe counter.
            </p>
          </div>
          <Link
            to="/cart"
            className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap"
          >
            Review Cart & Checkout →
          </Link>
        </div>

      </div>
    </div>
  );
};
