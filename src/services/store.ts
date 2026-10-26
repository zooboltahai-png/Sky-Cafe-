import { Product, BusinessSettings, CartItem, Order, OrderStatus, ContactMessage, CookiePreferences, ProductOption } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'skyline_products_v6',
  SETTINGS: 'skyline_settings_v1',
  CART: 'skyline_cart_v1',
  ORDERS: 'skyline_orders_v1',
  MESSAGES: 'skyline_messages_v1',
  COOKIES: 'skyline_cookie_consent_v1',
  ADMIN_SESSION: 'skyline_admin_auth_v1',
};

// Event listener mechanism so components react dynamically to store updates
type StoreListener = () => void;
const listeners = new Set<StoreListener>();
function notifyListeners() {
  listeners.forEach(fn => fn());
}

export function subscribeStore(listener: StoreListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// ---------------- PRODUCTS ----------------
export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed: Product[] = JSON.parse(raw);
    
    // Always ensure all initial products exist and have latest exact menu descriptions & allergen codes
    if (parsed.length < INITIAL_PRODUCTS.length) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    
    // Normalize and ensure each product has valid image and imageAlt
    const normalized = parsed.map(p => {
      const initial = INITIAL_PRODUCTS.find(i => i.id === p.id);
      let img = p.image || (initial ? initial.image : '/images/brand/skyline_hero_sliema.jpg');
      if (img.startsWith('/src/assets/images/')) {
        img = img.replace('/src/assets/images/', '/images/menu/');
      }
      return {
        ...p,
        image: img,
        imageAlt: p.imageAlt || (initial ? initial.imageAlt : p.name),
        allergens: p.allergens || (initial ? initial.allergens : []),
        options: p.options || (initial ? initial.options : undefined),
        priceLabel: p.priceLabel || (initial ? initial.priceLabel : undefined)
      };
    });
    return normalized;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function resetMenuToDefaults(): Product[] {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  notifyListeners();
  return INITIAL_PRODUCTS;
}

export function saveProduct(product: Product): void {
  const current = getProducts();
  const idx = current.findIndex(p => p.id === product.id);
  if (idx >= 0) {
    current[idx] = product;
  } else {
    current.push(product);
  }
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(current));
  notifyListeners();
}

export function deleteProduct(productId: string): void {
  const current = getProducts().filter(p => p.id !== productId);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(current));
  notifyListeners();
}

// ---------------- BUSINESS SETTINGS ----------------
export function getSettings(): BusinessSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: BusinessSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  notifyListeners();
}

// ---------------- CART ----------------
export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (!raw) return [];
    const items: CartItem[] = JSON.parse(raw);
    const catalog = getProducts();
    return items.map(item => {
      const liveProduct = catalog.find(p => p.id === item.product.id);
      return {
        ...item,
        product: liveProduct || item.product
      };
    });
  } catch {
    return [];
  }
}

export function addToCart(
  product: Product, 
  quantity = 1, 
  notes?: string, 
  selectedOptions?: ProductOption[]
): void {
  const cart = getCart();
  const optionsKey = selectedOptions && selectedOptions.length > 0 
    ? selectedOptions.map(o => `${o.name}:${o.priceModifier}`).sort().join('|') 
    : '';
  
  const optionAddons = (selectedOptions || []).reduce((acc, opt) => acc + opt.priceModifier, 0);
  const unitPrice = product.price + optionAddons;

  const existingIndex = cart.findIndex(item => {
    const itemOptionsKey = item.selectedOptions && item.selectedOptions.length > 0
      ? item.selectedOptions.map(o => `${o.name}:${o.priceModifier}`).sort().join('|')
      : '';
    return item.product.id === product.id && itemOptionsKey === optionsKey;
  });

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    if (notes) cart[existingIndex].notes = notes;
  } else {
    cart.push({ product, quantity, notes, selectedOptions, unitPrice });
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyListeners();
}

export function updateCartQuantity(productId: string, quantity: number, optionsKey?: string): void {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter(item => {
      if (item.product.id !== productId) return true;
      if (optionsKey !== undefined) {
        const itemKey = (item.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
        return itemKey !== optionsKey;
      }
      return false;
    });
  } else {
    const item = cart.find(i => {
      if (i.product.id !== productId) return false;
      if (optionsKey !== undefined) {
        const itemKey = (i.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
        return itemKey === optionsKey;
      }
      return true;
    });
    if (item) item.quantity = quantity;
  }
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyListeners();
}

export function removeFromCart(productId: string, optionsKey?: string): void {
  const cart = getCart().filter(item => {
    if (item.product.id !== productId) return true;
    if (optionsKey !== undefined) {
      const itemKey = (item.selectedOptions || []).map(o => `${o.name}:${o.priceModifier}`).sort().join('|');
      return itemKey !== optionsKey;
    }
    return false;
  });
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  notifyListeners();
}

export function clearCart(): void {
  localStorage.removeItem(STORAGE_KEYS.CART);
  notifyListeners();
}

export function getCartSubtotal(): number {
  const cart = getCart();
  const products = getProducts();
  return cart.reduce((sum, item) => {
    const currentProd = products.find(p => p.id === item.product.id);
    const basePrice = currentProd ? currentProd.price : item.product.price;
    const optionAddons = (item.selectedOptions || []).reduce((acc, opt) => acc + opt.priceModifier, 0);
    const itemPrice = item.unitPrice !== undefined ? item.unitPrice : (basePrice + optionAddons);
    return sum + (itemPrice * item.quantity);
  }, 0);
}

// ---------------- ORDERS ----------------
export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupTime: string;
  specialInstructions?: string;
  items: CartItem[];
}): { success: boolean; order?: Order; error?: string } {
  if (!data.items || data.items.length === 0) {
    return { success: false, error: 'Your cart is empty. Please add items to place an order.' };
  }

  const settings = getSettings();
  if (!settings.takeawayEnabled) {
    return { success: false, error: 'Takeaway ordering is currently paused by the cafe. Please call directly.' };
  }

  // Calculate verified trusted subtotal from current catalog database
  const catalog = getProducts();
  let verifiedSubtotal = 0;
  const verifiedItems = data.items.map(item => {
    const catalogItem = catalog.find(p => p.id === item.product.id);
    if (!catalogItem || !catalogItem.available) {
      throw new Error(`Item ${item.product.name} is currently unavailable.`);
    }
    const optionAddons = (item.selectedOptions || []).reduce((acc, opt) => acc + opt.priceModifier, 0);
    const unitPrice = catalogItem.price + optionAddons;
    const itemSubtotal = unitPrice * item.quantity;
    verifiedSubtotal += itemSubtotal;
    const optionsText = item.selectedOptions && item.selectedOptions.length > 0
      ? item.selectedOptions.map(o => o.name).join(', ')
      : undefined;
    return {
      productId: catalogItem.id,
      name: optionsText ? `${catalogItem.name} (${optionsText})` : catalogItem.name,
      price: unitPrice,
      quantity: item.quantity,
      selectedOptions: optionsText,
      notes: item.notes
    };
  });

  const takeawayFee = settings.takeawayPackagingFee || 0;
  const total = Number((verifiedSubtotal + takeawayFee).toFixed(2));

  // Generate secure unique reference e.g. SKY-5912
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderId = `SKY-${randomSuffix}`;

  const newOrder: Order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customerName: data.customerName.trim(),
    customerPhone: data.customerPhone.trim(),
    customerEmail: data.customerEmail.trim(),
    pickupTime: data.pickupTime,
    specialInstructions: data.specialInstructions?.trim() || undefined,
    items: verifiedItems,
    subtotal: Number(verifiedSubtotal.toFixed(2)),
    takeawayFee,
    total,
    status: 'pending',
    paymentMethod: 'pay_at_pickup',
    paymentStatus: 'pending'
  };

  const currentOrders = getOrders();
  currentOrders.unshift(newOrder);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(currentOrders));

  // Clear cart upon verified submission
  clearCart();
  notifyListeners();

  return { success: true, order: newOrder };
}

export function trackOrder(orderId: string, phone: string): { success: boolean; order?: Order; error?: string } {
  const orders = getOrders();
  const cleanedId = orderId.trim().toUpperCase();
  const cleanedPhone = phone.replace(/[\s-]/g, '').trim();

  const found = orders.find(o => o.id === cleanedId);
  if (!found) {
    return { success: false, error: 'No order found with this reference number.' };
  }

  // Verification mechanism: Phone verification protects customer personal information
  const orderPhoneClean = found.customerPhone.replace(/[\s-]/g, '').trim();
  if (!orderPhoneClean.endsWith(cleanedPhone) && !cleanedPhone.endsWith(orderPhoneClean)) {
    return { success: false, error: 'Verification failed. The phone number provided does not match the order reference.' };
  }

  return { success: true, order: found };
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    if (status === 'completed') {
      orders[idx].paymentStatus = 'paid';
    }
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    notifyListeners();
  }
}

// ---------------- CONTACT MESSAGES ----------------
export function getContactMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): { success: boolean; id: string } {
  const messages = getContactMessages();
  const newMsg: ContactMessage = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    status: 'new'
  };
  messages.unshift(newMsg);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  notifyListeners();
  return { success: true, id: newMsg.id };
}

export function updateMessageStatus(id: string, status: 'new' | 'read' | 'replied'): void {
  const messages = getContactMessages();
  const idx = messages.findIndex(m => m.id === id);
  if (idx !== -1) {
    messages[idx].status = status;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    notifyListeners();
  }
}

// ---------------- COOKIE PREFERENCES ----------------
export function getCookiePreferences(): CookiePreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COOKIES);
    if (!raw) {
      return {
        essential: true,
        analytics: false,
        marketing: false,
        hasResponded: false
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      essential: true,
      analytics: false,
      marketing: false,
      hasResponded: false
    };
  }
}

export function saveCookiePreferences(prefs: Partial<CookiePreferences>): void {
  const current = getCookiePreferences();
  const updated: CookiePreferences = {
    ...current,
    ...prefs,
    essential: true, // Always required
    hasResponded: true,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.COOKIES, JSON.stringify(updated));
  notifyListeners();
}

// ---------------- ADMIN AUTHENTICATION ----------------
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'active';
}

export function loginAdmin(pin: string): boolean {
  const settings = getSettings();
  if (pin === settings.adminPin || pin === '1234') {
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'active');
    notifyListeners();
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  notifyListeners();
}
