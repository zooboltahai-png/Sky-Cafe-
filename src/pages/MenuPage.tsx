import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Check, Info, Filter, ArrowRight, LayoutGrid, List, FileText, Sparkles, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, addToCart, subscribeStore } from '../services/store';
import { Product, ProductCategory, ProductOption } from '../types';
import { OfficialMenuViewer } from '../components/OfficialMenuViewer';

export const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  
  // Modal for product options / additions
  const [activeItemModal, setActiveItemModal] = useState<Product | null>(null);
  const [modalSelectedOptions, setModalSelectedOptions] = useState<ProductOption[]>([]);

  useEffect(() => {
    const update = () => {
      setProducts(getProducts());
    };
    update();
    return subscribeStore(update);
  }, []);

  // When active product modal opens, initialize default options
  const handleOpenItemModal = (product: Product) => {
    setActiveItemModal(product);
    if (product.options && product.options.length > 0) {
      const defaultOpt = product.options.find(o => o.isDefault) || product.options[0];
      setModalSelectedOptions([defaultOpt]);
    } else {
      setModalSelectedOptions([]);
    }
  };

  const handleAddToCart = (product: Product, quantity = 1, options?: ProductOption[]) => {
    addToCart(product, quantity, undefined, options);
    setAddedItemMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleModalAddToCart = () => {
    if (!activeItemModal) return;
    handleAddToCart(activeItemModal, 1, modalSelectedOptions);
    setActiveItemModal(null);
  };

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'salads-soup', label: 'Salads & Soup' },
    { key: 'platters-nibbles', label: 'Platters & Nibbles' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'breakfast-brunch', label: 'Breakfast & Brunch' },
    { key: 'croissants', label: 'Croissants' },
    { key: 'sandwiches-wraps', label: 'Sandwiches & Wraps' },
    { key: 'cocktails-spritzers', label: 'Spritzers & Cocktails' },
    { key: 'smoothies-shakes', label: 'Milkshakes & Smoothies' },
    { key: 'cold-drinks', label: 'Water & Soft Drinks' },
    { key: 'coffee-hot', label: 'Hot Beverages' },
    { key: 'wine-beer', label: 'Wines, Beer & Cider' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' 
      || product.category === selectedCategory
      || (selectedCategory === 'sandwiches-wraps' && (product.category === 'ciabatta-sandwiches' || product.category === 'wraps'))
      || (selectedCategory === 'smoothies-shakes' && product.category === 'cold-smoothies');
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDietary = dietaryFilter === 'all' || 
                           (product.dietary && product.dietary.includes(dietaryFilter as any));
    return matchesCategory && matchesSearch && matchesDietary;
  });

  // Calculate modal total
  const modalCalculatedPrice = activeItemModal
    ? activeItemModal.price + modalSelectedOptions.reduce((acc, opt) => acc + opt.priceModifier, 0)
    : 0;

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-burgundy">
            Mediterranean Cafe & Eatery · Sliema Waterfront, Malta
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Menu & Refreshments
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Freshly prepared breakfast, artisan sourdough, stuffed croissants, Mediterranean platters, and specialty espresso roasted with care along Triq Ix-Xatt.
          </p>

          {/* Quick Jump Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#digital-menu"
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold tracking-wide hover:bg-stone-800 transition-colors shadow-xs"
            >
              <span>Explore Digital Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#official-printed-menu"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-brand-burgundy border border-stone-300 rounded-xl text-xs font-bold tracking-wide hover:bg-stone-100 transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-brand-burgundy" />
              <span>View Official Printed Menu (5 Scans)</span>
            </a>
          </div>
        </div>

        {/* 1. OFFICIAL PRINTED MENU VIEWER (Dedicated Section) */}
        <div id="official-printed-menu">
          <OfficialMenuViewer />
        </div>

        {/* 2. STRUCTURED DIGITAL MENU */}
        <div id="digital-menu" className="space-y-6 pt-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-burgundy">
                Full Cafe Catalog
              </span>
              <h2 className="font-editorial text-3xl font-bold text-stone-900 mt-1">
                Interactive Digital Menu
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Browse all dishes, filter by dietary requirements, customize additions, or place an order for pickup.
              </p>
            </div>

            {/* Layout Toggle (Grid vs List) */}
            <div className="flex items-center gap-2 bg-stone-200/70 p-1 rounded-xl self-start md:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label="Grid layout view"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-stone-900 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label="Compact list layout view"
              >
                <List className="w-3.5 h-3.5" />
                <span>Compact List</span>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes (e.g. Avocado, Ciabatta, Miso)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                />
              </div>

              {/* Dietary selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="text-xs text-stone-600 whitespace-nowrap">Dietary:</span>
                <select
                  value={dietaryFilter}
                  onChange={(e) => setDietaryFilter(e.target.value)}
                  aria-label="Filter menu items by dietary requirement"
                  className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="all">All Items</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Pescatarian">Pescatarian</option>
                </select>
              </div>

            </div>

            {/* Category horizontal scrolling tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar overscroll-x-contain touch-pan-x">
              {categories.map((cat) => {
                const count = cat.key === 'all' 
                  ? products.length 
                  : products.filter(p => p.category === cat.key || 
                      (cat.key === 'sandwiches-wraps' && (p.category === 'ciabatta-sandwiches' || p.category === 'wraps')) ||
                      (cat.key === 'smoothies-shakes' && p.category === 'cold-smoothies')
                    ).length;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      selectedCategory === cat.key
                        ? 'bg-brand-burgundy text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 bg-stone-50 border border-stone-200'
                    }`}
                  >
                    {cat.label} {count > 0 && <span className="opacity-70 text-[10px] ml-1">({count})</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allergen Disclaimer Notice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <span className="font-bold block">Official Menu Allergen Information</span>
              <p>
                Allergen codes are reproduced from the supplied menu. Please contact the cafe to confirm allergen information before ordering.
              </p>
              <div className="text-[11px] text-amber-800/90 pt-1 font-mono">
                <span className="font-semibold text-amber-900">Legend: </span>
                G = Gluten · D = Dairy · E = Eggs · F = Fish · Tn = Tree Nuts · Se = Sesame · So = Soya · M = Milk · Mu = Mustard · Hon / Ho = Honey · L = Lactose · C = Celery · N = Nuts
              </div>
            </div>
          </div>

          {/* Results Count Strip */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <span>Showing <strong className="text-stone-800">{filteredProducts.length}</strong> items</span>
            {(selectedCategory !== 'all' || searchQuery || dietaryFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietaryFilter('all');
                }}
                className="text-brand-burgundy font-semibold hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* PRODUCTS LISTING */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <p className="text-stone-500 text-sm">No dishes match your filter criteria.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setDietaryFilter('all');
                }}
                className="mt-3 text-xs font-semibold text-brand-burgundy hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* ================= GRID VIEW ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => {
                const isAdded = !!addedItemMap[item.id];
                const hasOptions = item.options && item.options.length > 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image with verified real food photography */}
                      <div className="relative aspect-[4/3] bg-stone-200 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.imageAlt || item.name}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={300}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                          }}
                        />
                        
                        {/* Price Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-stone-900/90 backdrop-blur-xs text-white text-xs font-bold rounded-lg tabular-nums shadow-sm">
                          {item.priceLabel || `€${item.price.toFixed(2)}`}
                        </div>

                        {!item.available && (
                          <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-white bg-stone-900 px-3 py-1.5 rounded-lg">
                              Sold Out
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span className="uppercase font-semibold tracking-wider text-[11px] text-brand-burgundy">
                            {item.category.replace('-', ' ')}
                          </span>
                          {item.dietary && item.dietary.length > 0 && (
                            <span className="text-emerald-700 font-semibold text-[11px]">
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

                        {/* Allergen Codes */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="pt-1.5 flex items-center gap-1.5 text-[11px] text-stone-500">
                            <span className="font-semibold text-stone-600">Allergens:</span>
                            <span className="px-1.5 py-0.5 bg-stone-100 rounded font-mono text-stone-700 font-medium">
                              {item.allergens.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => handleOpenItemModal(item)}
                        className="text-xs text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2 cursor-pointer"
                      >
                        {hasOptions ? 'Customise / View' : 'View Details'}
                      </button>

                      {hasOptions ? (
                        <button
                          type="button"
                          onClick={() => handleOpenItemModal(item)}
                          disabled={!item.available}
                          className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-burgundy hover:bg-brand-burgundy/90 text-white transition-all cursor-pointer active:scale-98"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Select Options</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                          className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : item.available
                              ? 'bg-stone-900 hover:bg-stone-800 text-white active:scale-98'
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
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ================= COMPACT LIST VIEW ================= */
            <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-2xs">
              {filteredProducts.map((item) => {
                const isAdded = !!addedItemMap[item.id];
                const hasOptions = item.options && item.options.length > 0;
                return (
                  <div 
                    key={item.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <h3 className="font-editorial text-base sm:text-lg font-bold text-stone-900">
                          {item.name}
                        </h3>
                        {item.allergens && item.allergens.length > 0 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded">
                            {item.allergens.join(', ')}
                          </span>
                        )}
                        {item.dietary && item.dietary.length > 0 && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            · {item.dietary[0]}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900 tabular-nums block">
                          {item.priceLabel || `€${item.price.toFixed(2)}`}
                        </span>
                      </div>

                      {hasOptions ? (
                        <button
                          type="button"
                          onClick={() => handleOpenItemModal(item)}
                          disabled={!item.available}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-brand-burgundy hover:bg-brand-burgundy/90 text-white transition-all cursor-pointer"
                        >
                          Options
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : item.available
                              ? 'bg-stone-900 hover:bg-stone-800 text-white'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Added' : 'Add'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* PRODUCT DETAILS & OPTIONS MODAL */}
        {activeItemModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveItemModal(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image banner (verified food photo) */}
              <div className="relative aspect-[16/9] bg-stone-200 overflow-hidden">
                <img
                  src={activeItemModal.image}
                  alt={activeItemModal.imageAlt || activeItemModal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setActiveItemModal(null)}
                  className="absolute top-3 right-3 p-2 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-burgundy">
                      {activeItemModal.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-stone-900">
                      {activeItemModal.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-stone-900 tabular-nums">
                      €{modalCalculatedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {activeItemModal.description}
                </p>

                {/* Selectable Options / Additions */}
                {activeItemModal.options && activeItemModal.options.length > 0 && (
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                      Customise / Select Option:
                    </span>
                    <div className="space-y-2">
                      {activeItemModal.options.map((option, idx) => {
                        const isSelected = modalSelectedOptions.some(o => o.name === option.name);
                        return (
                          <label
                            key={idx}
                            className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-white border-brand-burgundy shadow-2xs font-semibold text-brand-burgundy'
                                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="productOption"
                                checked={isSelected}
                                onChange={() => setModalSelectedOptions([option])}
                                className="accent-brand-burgundy"
                              />
                              <span>{option.name}</span>
                            </div>
                            <span className="tabular-nums">
                              {option.priceModifier > 0 
                                ? `+€${option.priceModifier.toFixed(2)}` 
                                : 'included'}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Allergen Notice in Modal */}
                {activeItemModal.allergens && activeItemModal.allergens.length > 0 && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1">
                    <div className="flex items-center gap-1 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>Allergens: {activeItemModal.allergens.join(', ')}</span>
                    </div>
                    <p className="text-stone-500">
                      Please inform cafe staff of severe allergies before ordering.
                    </p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveItemModal(null)}
                    className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleModalAddToCart}
                    disabled={!activeItemModal.available}
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors"
                  >
                    Add to Cart · €{modalCalculatedPrice.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Reminder bar */}
        <div className="p-6 bg-stone-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-editorial text-xl font-bold">Ready to pick up in Sliema?</h3>
            <p className="text-xs text-stone-400 mt-1">
              Select your pickup time and collect your order fresh at our Sliema cafe counter.
            </p>
          </div>
          <Link
            to="/cart"
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Review Cart & Checkout →
          </Link>
        </div>

      </div>
    </div>
  );
};
