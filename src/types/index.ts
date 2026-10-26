export type ProductCategory = 
  | 'all'
  | 'breakfast-brunch'
  | 'croissants'
  | 'sandwiches-wraps'
  | 'salads-soup'
  | 'platters-nibbles'
  | 'desserts'
  | 'coffee-hot'
  | 'smoothies-shakes'
  | 'cold-drinks'
  | 'cocktails-spritzers'
  | 'wine-beer'
  // Legacy aliases for backward compatibility
  | 'ciabatta-sandwiches'
  | 'cold-smoothies'
  | 'wraps';

export interface ProductOption {
  name: string;
  priceModifier: number; // e.g. +3.00 for Parma Ham
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in EUR
  priceLabel?: string; // e.g. "from €9.50" or "€2.75 / €3.95"
  currency?: 'EUR';
  image: string;
  imageAlt?: string;
  allergens?: string[]; // exact codes from menu, e.g. ["Tn", "M", "G"]
  options?: ProductOption[];
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free Option' | 'Contains Nuts' | 'Pescatarian' | string)[];
  available: boolean;
  sortOrder?: number;
  isHighlight?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: ProductOption[];
  unitPrice?: number;
  notes?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: string;
  notes?: string;
}

export interface Order {
  id: string; // e.g. "SKY-8924"
  createdAt: string; // ISO string
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  pickupTime: string;
  specialInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  takeawayFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'pay_at_pickup';
  paymentStatus: 'pending' | 'paid';
}

export interface BusinessSettings {
  name: string;
  tagline: string;
  phone: string;
  address: string;
  locality: string;
  postalCode: string;
  country: string;
  currency: string;
  googleRating: number;
  googleReviewCount: number;
  typicalSpend: string;
  takeawayEnabled: boolean;
  deliveryEnabled: boolean; // default false (unverified by business)
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  minimumOrderAmount: number;
  takeawayPackagingFee: number;
  adminPin: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  hasResponded: boolean;
  updatedAt?: string;
}
