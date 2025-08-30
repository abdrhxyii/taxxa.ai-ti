'use client';

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const updateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

type UserFormData = z.infer<typeof updateUserSchema>;

export default function UserProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: UserFormData) => {
    if (!user?.id) {
      toast.error('User not found. Please log in again.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(`/api/user/edit/${user.id}`, data);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setUser(response.data.user);
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

  const handleReset = () => {
    if (user) {
      reset({
        name: user.name,
        email: user.email
      });
      toast.info('Form reset to original values');
    }
  };

  if (!user) {
    return (
      <div className="w-5/6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to edit your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-5/6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}