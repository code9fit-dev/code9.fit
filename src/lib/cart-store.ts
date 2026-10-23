export interface CartItem {
  type: 'program' | 'coach';
  slug: string;
  name: string;
  price?: number;
}

export interface Cart {
  items: CartItem[];
}

const CART_KEY = 'c9-cart';

export function getCart(): Cart {
  if (typeof window === 'undefined') return { items: [] };
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : { items: [] };
}

export function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const exists = cart.items.some(i => i.type === item.type && i.slug === item.slug);
  if (!exists) {
    cart.items.push(item);
    saveCart(cart);
  }
}

export function removeFromCart(type: 'program' | 'coach', slug: string): void {
  const cart = getCart();
  cart.items = cart.items.filter(i => !(i.type === type && i.slug === slug));
  saveCart(cart);
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_KEY);
}
