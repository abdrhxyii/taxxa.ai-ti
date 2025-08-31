import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
}

const currencySymbols= {
  USD: "$",
  LKR: "Rs",
  GBP: "£",
  EUR: "€",
};

export default function ProductCard({ id, title, price }: ProductCardProps) {
  console.log("ProductCard")

  const { currency, convertPrice } = useCurrencyStore();
  // const addToCart = useCartStore(state => state.addToCart);
  const { addToCart } = useCartStore()
  
  const handleAddToCart = () => {
    addToCart({ id, title, price, quantity: 1 });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-2xl font-bold text-green-600">{currencySymbols[currency]}{convertPrice(price).toFixed(2)}</p>
          <Button onClick={handleAddToCart} className="w-full cursor-pointer">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}