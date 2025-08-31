import { Button } from "@workspace/ui/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  console.log("Navbar")

  const router = useRouter()
  const { user, logout } = useAuth();
  const { currency, setCurrency } = useCurrency()
  const { cartCount } = useCart();

  const handleLogout = () => {
    logout()
    router.replace('/signin')
  };

  const handleCart = () => {
    router.push('/cart')
  };

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              {user?.name} 
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">$</SelectItem>
                <SelectItem value="LKR">Rs</SelectItem>
                <SelectItem value="GBP">£</SelectItem>
                <SelectItem value="EUR">€</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCart}
              className="flex items-center space-x-2 relative cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}