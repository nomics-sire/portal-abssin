"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About ABSSIN", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/abssinlogo.png"
            alt="ABSSIN Logo"
            width={100}
            height={100}
          />
        </Link>

        <nav className="flex gap-6 text-sm text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-2 py-1 rounded ${
                pathname === link.href
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "hover:text-red-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Link href="/login">
            <button className="border border-red-700 text-red-700 px-4 py-2 rounded hover:bg-red-700 hover:text-white text-sm">
              Login
            </button>
          </Link>
          <button className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 text-sm">
            Register
          </button>
        </div>
      </div>
    </header>
  );
}
