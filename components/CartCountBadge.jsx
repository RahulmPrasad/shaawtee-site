'use client';

import { useCart } from '@/context/CartContext';

export default function CartCountBadge() {
  const { itemCount } = useCart();
  return (
    <span className="cart-count" style={{ display: itemCount > 0 ? 'flex' : 'none' }}>
      {itemCount}
    </span>
  );
}
