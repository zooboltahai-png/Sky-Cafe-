export type ProductCategory = 
  | 'all'
  | 'breakfast-brunch'
  | 'ciabatta-sandwiches'
  | 'croissants'
  | 'coffee-hot'
  | 'cold-smoothies'
  | 'wraps'
  | 'desserts';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number; // in EUR
  image: string;
  imageAlt: string;
  allergens?: string[];
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free Option' | 'Contains Nuts' | 'Pescatarian')[];
  available: boolean;
  isHighlight?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
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
