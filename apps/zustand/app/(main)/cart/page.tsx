'use client';

import CartItems from '@/components/cart-items';
import OrderSummary from '@/components/cart-summary';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const [total, setTotal] = useState(174.97);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-2 gap-6">
        <CartItems />
        <OrderSummary total={total} />
      </div>
    </div>
  );
}