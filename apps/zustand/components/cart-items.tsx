'use client';

import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

const currencySymbols= {
  USD: "$",
  LKR: "Rs",
  GBP: "£",
  EUR: "€",
};

export default function CartItems() {
  console.log("cartItems rendered with")
  const { currency, convertPrice } = useCurrencyStore()
  const { cartItems, updateQuantity } = useCartStore()

  const total = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-green-600 font-semibold">
                  {currencySymbols[currency]}
                  {convertPrice(item.price).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-green-600">
                {currencySymbols[currency]}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}