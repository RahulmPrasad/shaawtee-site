'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findVariant } from '@/lib/shopify';

const CartContext = createContext(null);
const CART_KEY = 'shaawtee_cart';

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
    } catch {
      setCart([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const addItem = useCallback((product, { size, color, qty = 1 }) => {
    const cartId = `${product.id}-${size}-${color.toLowerCase().replace(/\s+/g, '-')}`;
    const variant = findVariant(product, { size, color });
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) => (i.cartId === cartId ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          price: product.price,
          meta: product.meta,
          variantId: variant?.id ?? null,
          size,
          color,
          qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((cartId) => {
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const changeQty = useCallback((cartId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.cartId === cartId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const itemCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const value = useMemo(
    () => ({ cart, addItem, removeItem, changeQty, clearCart, itemCount, subtotal }),
    [cart, addItem, removeItem, changeQty, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
