import React, { useState, useEffect } from 'react';
import { 
  Lock, LogOut, ShoppingBag, Utensils, Settings as SettingsIcon, 
  MessageSquare, DollarSign, Clock, CheckCircle2, AlertCircle, Plus, Trash2, Edit3, Save, RotateCcw, Image as ImageIcon 
} from 'lucide-react';
import { 
  isAdminAuthenticated, loginAdmin, logoutAdmin, 
  getOrders, updateOrderStatus, getProducts, saveProduct, deleteProduct, resetMenuToDefaults,
  getSettings, saveSettings, getContactMessages, updateMessageStatus, 
  subscribeStore 
} from '../services/store';
import { Order, OrderStatus, Product, BusinessSettings, ContactMessage, ProductCategory } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'settings' | 'messages'>('orders');

  // Store data
  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [settings, setSettings] = useState<BusinessSettings>(getSettings());
  const [messages, setMessages] = useState<ContactMessage[]>(getContactMessages());

  // Editing state for menu
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);

  // Settings form
  const [tempSettings, setTempSettings] = useState<BusinessSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setIsAuthenticated(isAdminAuthenticated());
      setOrders(getOrders());
      setProducts(getProducts());
      const s = getSettings();
      setSettings(s);
      setTempSettings(s);
      setMessages(getContactMessages());
    };
    return subscribeStore(update);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const success = loginAdmin(pinInput);
    if (success) {
      setIsAuthenticated(true);
      setPinInput('');
    } else {
      setAuthError('Invalid administrator PIN. Default initial setup PIN is 1234.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // Metrics
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;

  // Menu item save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    saveProduct(editingProduct);
    setEditingProduct(null);
    setIsNewProduct(false);
  };

  const handleToggleProductAvailability = (p: Product) => {
    saveProduct({ ...p, available: !p.available });
  };

  // Settings save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(tempSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // If not authenticated, render Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] bg-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 max-w-md w-full shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-stone-900 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-editorial text-2xl font-bold text-stone-900">
              Skyline Cafe Management
            </h1>
            <p className="text-xs text-stone-500">
              Enter the owner PIN to access orders, menu pricing, and cafe settings.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="adminPin" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Owner PIN *
              </label>
              <input
                id="adminPin"
                type="password"
                required
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              <span className="text-[11px] text-stone-400 mt-1 block text-center">
                Default initial PIN is 1234 (configurable in Settings).
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Protected Management Portal
            </span>
            <h1 className="font-editorial text-3xl font-bold text-stone-900">
              Skyline Cafe Malta — Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-stone-500">
              Owner Session Active
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Total Orders</span>
            <span className="text-2xl font-bold text-stone-900 tabular-nums mt-1 block">{orders.length}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Pending / Preparing</span>
            <span className="text-2xl font-bold text-amber-700 tabular-nums mt-1 block">{pendingOrders}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Gross Sales Value</span>
            <span className="text-2xl font-bold text-stone-900 tabular-nums mt-1 block">€{totalRevenue.toFixed(2)}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">Customer Inquiries</span>
            <span className="text-2xl font-bold text-stone-900 tabular-nums mt-1 block">{messages.length}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-300 pb-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'menu' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Menu & Prices ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Business Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 ${
              activeTab === 'messages' ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Messages ({messages.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-editorial text-xl font-bold text-stone-900">Takeaway Orders</h2>
            
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-stone-200 text-center text-stone-500 text-sm">
                No orders have been submitted yet. Place a test order from the website to see it appear here.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-200">
                {orders.map((o) => (
                  <div key={o.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-stone-900">{o.id}</span>
                        <span className="text-xs text-stone-500">
                          {new Date(o.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} · {new Date(o.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                      
                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Status:</span>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                          className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-stone-800"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready_for_pickup">Ready for Pickup</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-stone-50 p-3 rounded-lg border border-stone-100">
                      <div>
                        <span className="font-bold text-stone-900 block">Customer:</span>
                        <span>{o.customerName} ({o.customerPhone})</span>
                        <span className="block text-stone-500">{o.customerEmail}</span>
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block">Requested Pickup:</span>
                        <span className="font-medium text-amber-900">{o.pickupTime}</span>
                        {o.specialInstructions && (
                          <span className="block text-stone-500 mt-0.5">Notes: {o.specialInstructions}</span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900 block">Payment:</span>
                        <span>Pay at Counter · <strong className="tabular-nums">€{o.total.toFixed(2)}</strong></span>
                        <span className="block text-stone-500 capitalize">Payment: {o.paymentStatus}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="text-xs text-stone-700 pl-1 space-y-1">
                      <span className="font-semibold text-stone-500">Ordered Items:</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {o.items.map((it, idx) => (
                          <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-medium">
                            {it.quantity}× {it.name} (€{(it.price * it.quantity).toFixed(2)})
                            {it.notes && ` [${it.notes}]`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU & PRICES */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-editorial text-xl font-bold text-stone-900">Menu & Pricing Manager</h2>
                <p className="text-xs text-stone-500">Update prices in EUR (€), change photos, toggle item availability, or add new dishes.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all menu products to verified business defaults? Custom changes will be overwritten.')) {
                      resetMenuToDefaults();
                    }
                  }}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  title="Restore verified business photos and prices"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
                  <span>Restore Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now().toString(36)}`,
                      name: '',
                      category: 'breakfast-brunch',
                      description: '',
                      price: 8.50,
                      image: '/images/menu/food_avocado_poached_egg_1792764460074.jpg',
                      imageAlt: '',
                      allergens: [],
                      dietary: ['Vegetarian'],
                      available: true,
                      isHighlight: false
                    });
                    setIsNewProduct(true);
                  }}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>
            </div>

            {/* Editing modal / form */}
            {editingProduct && (
              <form onSubmit={handleSaveProduct} className="bg-white p-6 rounded-xl border-2 border-stone-900 shadow-md space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-editorial text-lg font-bold text-stone-900">
                    {isNewProduct ? 'Create New Dish' : `Edit: ${editingProduct.name}`}
                  </h3>
                  <span className="text-xs font-mono text-stone-400">ID: {editingProduct.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900"
                    >
                      <option value="breakfast-brunch">Breakfast & Brunch</option>
                      <option value="croissants">Artisan Croissants</option>
                      <option value="sandwiches-wraps">Sandwiches & Wraps</option>
                      <option value="salads-soup">Salads & Soup</option>
                      <option value="platters-nibbles">Platters & Nibbles</option>
                      <option value="desserts">Desserts & Gelato</option>
                      <option value="coffee-hot">Coffee & Hot Drinks</option>
                      <option value="smoothies-shakes">Smoothies & Shakes</option>
                      <option value="cold-drinks">Water & Soft Drinks</option>
                      <option value="cocktails-spritzers">Spritzers & Cocktails</option>
                      <option value="wine-beer">Wines & Beers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">Price (€ EUR) *</label>
                    <input
                      type="number"
                      step="0.10"
                      min="0"
                      required
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900"
                  />
                </div>

                {/* Image Selection & Live Preview */}
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-800" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800">Product Photograph & Alt Text</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    {/* Live Preview */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-stone-500 block">Live Preview</span>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 border border-stone-300 relative">
                        <img
                          src={editingProduct.image}
                          alt={editingProduct.imageAlt || editingProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                          }}
                        />
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="md:col-span-2 space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Image Path / URL *</label>
                        <input
                          type="text"
                          required
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          className="w-full p-2 bg-white border border-stone-300 rounded text-xs font-mono text-stone-800"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-stone-700 mb-1">Accessible Alt Description *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sourdough toast topped with crushed avocado and poached egg"
                          value={editingProduct.imageAlt || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, imageAlt: e.target.value })}
                          className="w-full p-2 bg-white border border-stone-300 rounded text-xs text-stone-800"
                        />
                      </div>

                      {/* Quick Presets */}
                      <div className="pt-1">
                        <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">Quick Select Verified Photo Preset:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { name: 'Flat White', path: '/images/menu/food_flat_white_1792772378500.jpg', alt: 'Specialty flat white coffee with fine microfoam latte art' },
                            { name: 'Cappuccino', path: '/images/menu/food_artisan_cappuccino_1792772380261.jpg', alt: 'Artisan cappuccino dusted with Dutch cocoa powder' },
                            { name: 'Berry Smoothie', path: '/images/menu/food_wild_berry_smoothie_1792772379979.jpg', alt: 'Chilled wild berry antioxidant smoothie with fresh berries' },
                            { name: 'Orange Juice', path: '/images/menu/food_fresh_orange_juice_1792772380689.jpg', alt: 'Freshly squeezed chilled orange juice with ice' },
                            { name: 'Poached Egg Toast', path: '/images/menu/food_avocado_poached_egg_1792764460074.jpg', alt: 'Sourdough toast with avocado, poached egg, and microgreens' },
                            { name: 'Salmon Croissant', path: '/images/menu/food_salmon_croissant_1792764460900.jpg', alt: 'Croissant with smoked salmon, cream cheese, and capers' },
                            { name: 'Ciabatta Mozzarella', path: '/images/menu/food_ciabatta_mozzarella_1792764462342.jpg', alt: 'Toasted ciabatta with melted mozzarella, tomato, and basil' },
                            { name: 'Fudge Brownie', path: '/images/menu/food_chocolate_brownie_1792772403143.jpg', alt: 'Dark chocolate fudge brownie with chocolate drizzle and walnuts' },
                            { name: 'Avocado Croissant', path: '/images/menu/food_avocado_croissant_1792772382193.jpg', alt: 'Butter croissant filled with fresh avocado and sliced tomatoes' },
                            { name: 'Roasted Tomatoes Feta', path: '/images/menu/food_roasted_tomatoes_feta_1792772382729.jpg', alt: 'Roasted cherry tomatoes with Greek feta cheese on sourdough' },
                            { name: 'Black Beans Toast', path: '/images/menu/food_avocado_black_beans_1792772382665.jpg', alt: 'Sourdough toast with avocado and seasoned black beans' },
                            { name: 'Chicken Wrap & Fries', path: '/images/menu/food_chicken_wrap_fries_1792772381094.jpg', alt: 'Grilled chicken tortilla wrap with crispy french fries' }
                          ].map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setEditingProduct({ ...editingProduct, image: preset.path, imageAlt: preset.alt })}
                              className="px-2 py-1 bg-white hover:bg-stone-200 border border-stone-200 rounded text-[11px] text-stone-700 cursor-pointer"
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.available}
                      onChange={(e) => setEditingProduct({ ...editingProduct, available: e.target.checked })}
                      className="h-4 w-4 accent-stone-900"
                    />
                    <span className="font-bold">Available in Stock</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isHighlight || false}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isHighlight: e.target.checked })}
                      className="h-4 w-4 accent-stone-900"
                    />
                    <span className="font-bold">Show in Homepage Highlights</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsNewProduct(false);
                    }}
                    className="px-4 py-2 border border-stone-300 rounded text-xs font-bold text-stone-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-100">
              {products.map((p) => (
                <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded object-cover bg-stone-100 shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/brand/skyline_hero_sliema.jpg';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-stone-900 text-sm">{p.name}</h4>
                        {p.isHighlight && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                            Highlight
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-500 capitalize">{p.category.replace('-', ' ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="font-bold text-sm text-stone-900 tabular-nums">
                      €{p.price.toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleProductAvailability(p)}
                      className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        p.available
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {p.available ? 'In Stock' : 'Sold Out'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct({ ...p });
                        setIsNewProduct(false);
                      }}
                      className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                      title="Edit dish"
                      aria-label={`Edit ${p.name}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                      title="Delete dish"
                      aria-label={`Delete ${p.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h2 className="font-editorial text-xl font-bold text-stone-900">Business & Fulfillment Controls</h2>
                <p className="text-xs text-stone-500">Configure opening hours, takeaway rules, and security PIN.</p>
              </div>

              {settingsSaved && (
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Settings Updated</span>
                </div>
              )}
            </div>

            {/* Fulfilment Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Takeaway Ordering</span>
                  <input
                    type="checkbox"
                    checked={tempSettings.takeawayEnabled}
                    onChange={(e) => setTempSettings({ ...tempSettings, takeawayEnabled: e.target.checked })}
                    className="h-5 w-5 accent-stone-900 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-stone-500">
                  Allows customers to place pickup orders online. If turned off, ordering displays a pause banner.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-stone-900">Doorstep Delivery Service</span>
                  <input
                    type="checkbox"
                    checked={tempSettings.deliveryEnabled}
                    onChange={(e) => setTempSettings({ ...tempSettings, deliveryEnabled: e.target.checked })}
                    className="h-5 w-5 accent-stone-900 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-stone-500">
                  Unverified by business. Leave disabled unless courier partnership has been confirmed by owner.
                </p>
              </div>
            </div>

            {/* Pricing / Fees & Security */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Takeaway Packaging Fee (€ EUR)
                </label>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  value={tempSettings.takeawayPackagingFee}
                  onChange={(e) => setTempSettings({ ...tempSettings, takeawayPackagingFee: parseFloat(e.target.value) || 0 })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 tabular-nums"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Public Phone Number
                </label>
                <input
                  type="text"
                  value={tempSettings.phone}
                  onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Admin Dashboard PIN
                </label>
                <input
                  type="text"
                  value={tempSettings.adminPin}
                  onChange={(e) => setTempSettings({ ...tempSettings, adminPin: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded text-sm text-stone-900 font-mono tracking-widest text-center"
                />
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
                Daily Operating Hours
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map((day) => (
                  <div key={day}>
                    <label className="block font-bold uppercase text-stone-600 mb-1">{day}</label>
                    <input
                      type="text"
                      value={tempSettings.openingHours[day]}
                      onChange={(e) => setTempSettings({
                        ...tempSettings,
                        openingHours: {
                          ...tempSettings.openingHours,
                          [day]: e.target.value
                        }
                      })}
                      className="w-full p-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h2 className="font-editorial text-xl font-bold text-stone-900">Customer Messages</h2>
            
            {messages.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-stone-200 text-center text-stone-500 text-sm">
                No customer inquiries received yet. Messages submitted via the Contact page will be archived here.
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-200">
                {messages.map((m) => (
                  <div key={m.id} className="p-5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-stone-900">{m.id}</span>
                        <span className="text-xs text-stone-500">
                          {new Date(m.createdAt).toLocaleDateString('en-GB')} at {new Date(m.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === 'new' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                        }`}>
                          {m.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={m.status}
                          onChange={(e) => updateMessageStatus(m.id, e.target.value as any)}
                          className="bg-stone-50 border border-stone-300 rounded px-2 py-1 text-xs"
                        >
                          <option value="new">Mark New</option>
                          <option value="read">Mark Read</option>
                          <option value="replied">Mark Replied</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600">
                      <strong>From:</strong> {m.name} &lt;{m.email}&gt; {m.phone && `· Tel: ${m.phone}`}
                    </div>

                    <div className="text-xs font-bold text-stone-900">
                      Subject: {m.subject}
                    </div>

                    <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100 leading-relaxed whitespace-pre-wrap">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
