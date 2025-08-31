'use client';

import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useUserStore } from "@/store/userStore";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const currencySymbols = {
  USD: "$",
  LKR: "Rs",
  GBP: "£",
  EUR: "€",
};

export default function OrderSummary() {
  const router = useRouter()
  const { user } = useUserStore()
  const { currency, convertPrice } = useCurrencyStore()
  const { cartItems, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false);


  const total = cartItems.reduce(
    (sum, item) => sum + convertPrice(item.price) * item.quantity,
    0
  );

  const handleFinalizeOrder = async () => {
    console.log(user, "user cartItems")
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!user?.id) {
      toast.error("Your user data is not there.")
      return;
    }

    setIsProcessing(true);

    const loadingToast = toast.loading('Processing your order...');

    try {
      console.log(cartItems, "cartItems")

      const salesPromises = cartItems.map(item => 
        axios.post('/api/sale', {
          userId: user?.id, 
          productId: item.id,
          quantity: item.quantity.toString(),
        })
      );

      await Promise.all(salesPromises);      
      
      toast.dismiss(loadingToast);
      toast.success('Order placed successfully!')
      clearCart()
      router.push('/product')
      
    } catch (error) {
      console.log(error, "error in the handleFinalizeOrder")
      toast.dismiss(loadingToast);
      toast.error('Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-b pb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Subtotal:</span>
              <span className="text-lg">
                {currencySymbols[currency]}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              {currencySymbols[currency]}
              {total.toFixed(2)}
            </span>
          </div>
          <Button className="w-full text-lg py-6 cursor-pointer" onClick={handleFinalizeOrder}>
            {isProcessing ? 'Processing Order...' : 'Finalize the Order'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}