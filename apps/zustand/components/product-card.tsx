import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

interface ProductCardProps {
  title: string;
  price: number;
}

export default function ProductCard({ title, price }: ProductCardProps) {
  const handleAddToCart = () => {
    console.log(`Added ${title} to the cart`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-2xl font-bold text-green-600">${price}</p>
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}