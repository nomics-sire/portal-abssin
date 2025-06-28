'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isAuthed = useRequireAuth();
  const pathname = usePathname();

  if (!isAuthed) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-red-700" />
      </div>
    );
  }

  const navLinks = [
    { name: 'Profile', href: '/user/dashboard/profile' },
    { name: 'Print ABSSIN', href: '/user/dashboard/print-abssin' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-red-400 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">ABSSIN Portal</h2>
        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:bg-red-800 rounded px-3 py-2 ${
                pathname === link.href ? 'bg-red-800' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
