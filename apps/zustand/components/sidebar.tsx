'use client';

import { Package, User } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleProductsClick = () => {
    router.push('/product');
  };

  const handleProfileClick = () => {
    router.push('/my-profile');
  };

  const handleAddProdctClick = () => {
    router.push('/product/add');
  };

  return (
    <div className="w-64 bg-primary text-white border-r h-screen fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold  mb-8">Zustand Menu</h2>
        
        <nav className="space-y-2">
          
          <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={handleProfileClick}
          >
            <User className="mr-3 h-4 w-4" />
            My Profile
          </Button>

                    <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={handleProductsClick}
          >
            <Package className="mr-3 h-4 w-4" />
            Products
          </Button>

                    <Button
            variant="ghost"
            className="w-full justify-start text-left"
            onClick={handleAddProdctClick}
          >
            <Package className="mr-3 h-4 w-4" />
            Add product
          </Button>
        </nav>
      </div>
    </div>
  );
}