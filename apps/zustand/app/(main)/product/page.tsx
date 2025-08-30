'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ProductCard from '@/components/product-card';

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gettheproduct = async () => {
      try {
        const response = await axios.get('/api/product');
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          toast.error(response.data.error || 'Failed to fetch products');
        }
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };
    gettheproduct();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}