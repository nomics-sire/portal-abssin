'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold text-red-700">ABSSIN</div>
      <ul className="flex gap-6 text-sm font-medium text-gray-700">
        <li><Link href="/">Home</Link></li>
        <li><Link href="#">About ABSSIN</Link></li>
        <li><Link href="#">FAQs</Link></li>
        <li><Link href="#">Contact Us</Link></li>
      </ul>
      <div className="flex gap-2">
        <Link href="/login">
          <button className="border border-red-700 text-red-700 px-4 py-1 rounded hover:bg-red-100">Login</button>
        </Link>
        <Link href="/register">
          <button className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800">Register</button>
        </Link>
      </div>
    </nav>
  );
}
