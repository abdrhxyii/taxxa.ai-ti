'use client';

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';

const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.string().min(1, 'Price is required'),
});

type ProductFormData = z.infer<typeof createProductSchema>;

export default function MyProductPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/product", data);

      if (response.data.success) {
        toast.success("Product created successfully!");
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        if (Array.isArray(error.response.data.error)) {
          error.response.data.error.forEach((err: any) => {
            toast.error(err.message);
          });
        } else {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-5/6">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter product title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                placeholder="Enter product price"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}