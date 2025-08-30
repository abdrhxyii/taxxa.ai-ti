'use client';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}