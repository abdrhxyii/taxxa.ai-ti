'use client';

import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

interface OrderSummaryProps {
  total: number;
}

export default function OrderSummary({ total }: OrderSummaryProps) {
  const handleFinalizeOrder = () => {
    console.log("Order finalized with total:", total);
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
              <span className="text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-bold text-green-600">${total.toFixed(2)}</span>
          </div>
          
          <Button 
            className="w-full text-lg py-6" 
            onClick={handleFinalizeOrder}
          >
            Finalize the Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}