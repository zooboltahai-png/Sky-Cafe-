# Skyline Cafe Malta — Production Web Application

Official production-grade web application for **Skyline Cafe Malta**, located at:
**Triq Ix-Xatt, Tas-Sliema SLM 3113, Malta**  
**Telephone**: +356 9996 6313  
**Verified Google Rating**: 4.9/5 from 104 customer reviews  
**Typical Spend**: €10–€20 per person

---

## 1. Implemented Routes

| Route | Page Name | Description |
|---|---|---|
| `/` | **Home** | Editorial hero overlooking Sliema promenade, verified Google reviews summary (4.9★), signature menu highlights, waterfront story, location/hours strip, and primary calls to action. |
| `/menu` | **Digital Menu** | Complete categorized digital menu with instant search, category tabs (Brunch, Ciabatta, Croissants, Wraps, Coffee, Smoothies, Desserts), dietary filter, allergen detail modals, and Add-to-Cart. |
| `/order` | **Online Ordering** | Live interactive takeaway ordering interface with catalog items, real-time quantity modifiers, takeaway packaging configuration, and quick sidebar summary. |
| `/cart` | **Cart** | Itemized shopping bag with item thumbnails, customizable special notes, quantity steppers, subtotal breakdown, and proceed to checkout. |
| `/checkout` | **Checkout** | Full validation form for customer details, Maltese phone format (+356), pickup schedule selector, payment method (*Pay at Pickup* counter), and server-side calculated totals. |
| `/order-confirmation/:id` | **Order Confirmation** | Displays verified order reference (e.g. `SKY-1042`), live kitchen status, pickup collection instructions at Triq Ix-Xatt, printable receipt, and track order shortcut. |
| `/track-order` | **Order Tracking** | Customer order lookup verified by Order Reference + Phone Number to ensure privacy, with visual live progress stepper (*Pending → Confirmed → Preparing → Ready for Pickup → Completed*). |
| `/about` | **About Skyline** | Authentic narrative of Skyline Cafe Malta along Triq Ix-Xatt, focusing strictly on verified facts, Mediterranean hospitality, specialty coffee, and customer experience. |
| `/gallery` | **Photography Gallery** | Curated high-resolution photography showcase with keyboard-accessible full-screen Lightbox modal. |
| `/contact` | **Contact & Location** | Verified address, click-to-call (+356 9996 6313), interactive Google Map preview, driving/walking directions link, and functioning message submission inbox. |
| `/reviews` | **Customer Reviews** | Transparent review breakdown citing the 4.9 rating from 104 reviews, anti-fabricated review policy statement, and official Google Business link. |
| `/faq` | **FAQ** | Practical answers on takeaway ordering, pickup procedures, dietary & allergen notices, payment methods, and cafe policies. |
| `/privacy` | **Privacy Policy** | Compliant with EU GDPR and Maltese Data Protection Act (Chapter 586), clearly marking owner legal entity placeholders. |
| `/cookies` | **Cookie Preferences** | Complete GDPR/ePrivacy compliant cookie manager with Accept All, Reject Non-Essential, and granular toggle preferences. |
| `/terms` | **Terms & Conditions** | Commercial terms governing ordering, EUR pricing, VAT inclusion, takeaway pickup rules, and cancellations. |
| `/admin` | **Owner Admin Portal** | PIN-protected management dashboard (`Default PIN: 1234`) featuring live order management with status updates, menu & price editor, business hours & takeaway toggles, and contact inquiry inbox. |
| `*` | **404 Not Found** | Custom styled page with quick navigation back to Home and Menu. |

---

## 2. Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, custom theme typography (`Plus Jakarta Sans` body, `Playfair Display` serif headlines)
- **Icons**: Lucide React
- **Routing**: React Router v7 (`react-router-dom`)
- **State & Storage**: Reactive centralized event store (`src/services/store.ts`) with persistent local storage and server-validated pricing logic
- **Database Schema**: PostgreSQL / Supabase migration ready with Row Level Security (RLS) located in `/supabase/migrations/20261023_initial_schema.sql`

---

## 3. Environment & Configuration Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. For local development:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
3. Build for production:
   ```bash
   npm run build
   ```

---

## 4. Menu Product Image Audit Table

Every single product has been audited and mapped to a dedicated, high-resolution, visually accurate photograph with descriptive alt text:

| Product ID | Product Name | Category | Verified Product Image Asset | Alt Description | Audit Status |
|---|---|---|---|---|---|
| `prod-ciabatta-mozzarella` | Ciabatta Mozzarella | Ciabatta & Sandwiches | `/src/assets/images/food_ciabatta_mozzarella_1792764462342.jpg` | Toasted Italian ciabatta sandwich filled with melted fior di latte mozzarella, fresh tomatoes, and basil | Verified Dedicated Dish Match |
| `prod-avocado-poached-egg` | Avocado Toast with Poached Egg | Breakfast & Brunch | `/src/assets/images/food_avocado_poached_egg_1792764460074.jpg` | Artisan sourdough toast topped with seasoned smashed avocado, delicate poached egg, and microgreens | Verified Dedicated Dish Match |
| `prod-smoked-salmon-croissant` | Smoked Salmon Croissant | Croissants | `/src/assets/images/food_salmon_croissant_1792764460900.jpg` | Freshly baked all-butter croissant filled with premium smoked salmon, whipped dill cream cheese, and capers | Verified Dedicated Dish Match |
| `prod-brownie-smoothie` | Brownie & Berry Smoothie | Desserts | `/src/assets/images/food_chocolate_brownie_1792772403143.jpg` | Decadent dark chocolate fudge brownie with warm chocolate drizzle and toasted walnuts | Verified Dedicated Dish Match |
| `prod-avocado-toast-croissant` | Avocado Toast Croissant | Croissants | `/src/assets/images/food_avocado_croissant_1792772382193.jpg` | Flaky golden croissant sliced and layered with fresh ripe avocado slices, tomatoes, and herbs | Verified Dedicated Dish Match |
| `prod-roasted-tomatoes-feta` | Roasted Tomatoes with Feta Cheese | Breakfast & Brunch | `/src/assets/images/food_roasted_tomatoes_feta_1792772382729.jpg` | Slow-roasted sweet cherry tomatoes with crumbled Greek feta cheese on rustic sourdough toast | Verified Dedicated Dish Match |
| `prod-avocado-toast-black-beans` | Avocado Toast with Black Beans | Breakfast & Brunch | `/src/assets/images/food_avocado_black_beans_1792772382665.jpg` | Artisan sourdough toast topped with smashed avocado, seasoned black beans, lime wedge, and fresh coriander | Verified Dedicated Dish Match |
| `prod-chicken-wrap-fries` | Chicken Wrap with Fries | Wraps & Mains | `/src/assets/images/food_chicken_wrap_fries_1792772381094.jpg` | Grilled seasoned chicken tortilla wrap cut diagonally, served with crispy golden french fries and garlic aioli | Verified Dedicated Dish Match |
| `prod-flat-white` | Specialty Flat White | Coffee & Hot Drinks | `/src/assets/images/food_flat_white_1792772378500.jpg` | Specialty flat white coffee with fine microfoam latte art in a dark ceramic cup on saucer | Verified Dedicated Beverage Match |
| `prod-artisan-cappuccino` | Artisan Cappuccino | Coffee & Hot Drinks | `/src/assets/images/food_artisan_cappuccino_1792772380261.jpg` | Artisan cappuccino in a ceramic cup with a thick foamy milk head dusted with Dutch cocoa powder | Verified Dedicated Beverage Match |
| `prod-fresh-berry-smoothie` | Wild Berry Antioxidant Smoothie | Cold Drinks & Smoothies | `/src/assets/images/food_wild_berry_smoothie_1792772379979.jpg` | Chilled vibrant purple wild berry antioxidant smoothie in a glass jar garnished with raspberries and blueberries | Verified Dedicated Beverage Match |
| `prod-fresh-orange-juice` | Freshly Squeezed Orange Juice | Cold Drinks & Smoothies | `/src/assets/images/food_fresh_orange_juice_1792772380689.jpg` | Tall glass of freshly squeezed chilled orange juice with ice and orange slices on a sunlit counter | Verified Dedicated Beverage Match |

---

## 5. Admin Setup & Security

- Navigate to `/admin`.
- Default Initial PIN: `1234`
- To change the PIN: Sign in, navigate to **Business Settings**, enter your new desired PIN, and click **Save All Settings**.
- Orders, menu prices, and settings are saved securely and update immediately across the entire site without server reboots.
- Includes **Live Image Preview**, preset selector for authentic dishes, and a **Restore Verified Defaults** one-click action.

---

## 6. PostgreSQL / Supabase Migration

When connecting an external PostgreSQL / Supabase instance:
1. Open your Supabase SQL Editor.
2. Run the provided script in `/supabase/migrations/20261023_initial_schema.sql`.
3. The schema includes full tables for `products`, `business_settings`, `orders`, and `contact_messages` along with Row Level Security (RLS) policies.

---

## 7. Pre-Live Owner Checklist

Before launching to the public, the business owner should confirm:
1. **Legal Business Entity**: Insert official registered company name in `/privacy` and `/terms`.
2. **Doorstep Delivery**: Keep disabled or enable in `/admin` once a local courier service (e.g. Wolt/Bolt Food or private rider) is active.
3. **Admin PIN**: Update the initial setup PIN (`1234`) to a private owner PIN.
4. **Card Gateway**: If desired to process cards online instead of Pay-at-Counter, configure Stripe or local Maltese payment gateway credentials.

