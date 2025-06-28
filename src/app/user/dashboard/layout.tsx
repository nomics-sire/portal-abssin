'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';

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

  const handleLogout = () => {
    // Clear cookie
    document.cookie = 'user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Clear local storage
    localStorage.clear();
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex">

      <aside className="w-64 bg-red-700 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-bold mb-6">ABSSIN Portal</h2>
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
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white hover:text-red-100 mt-6 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </aside>

 
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
