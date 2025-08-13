"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, LogOut, Printer, User, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

interface DecodedToken {
  state_id: string;
  type: string;
  user_cat: string;
  email: string;
  exp: number;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = useRequireAuth("agent_token", "/admin-agent-login");

  const pathname = usePathname();

  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("agent_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setEmail(decoded.email);
        setUserType(
          decoded.user_cat
        );
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  if (!isAuthed) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-red-700" />
      </div>
    );
  }

  const navLinks = [
    {
      name: "Business ABSSIN",
      href: "/agent/dashboard/business-abssin",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "Individual ABSSIN",
      href: "/agent/dashboard",
      icon: <Printer className="w-4 h-4" />,
    },
    {
      name: "Dependant ABSSIN",
      href: "/agent/dashboard/dependant-abssin",
      icon: <Printer className="w-4 h-4" />,
    },
  ];

  const handleLogout = () => {
    document.cookie =
      "agent_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.clear();
    window.location.href = "/admin-agent-login";
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-red-700 text-white flex flex-col justify-between p-6">
        <div>
          <Image
            src="/images/abssinlogo.png"
            alt="ABSSIN Logo"
            width={120}
            height={40}
            className="mb-6"
          />

          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 hover:bg-red-800 rounded px-3 py-2 ${
                  pathname === link.href ? "bg-red-800" : ""
                }`}
              >
                {link.icon}
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

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 h-18 flex items-center justify-end text-sm text-gray-700">
          <div className="flex gap-6 items-center text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-red-700" />
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-red-700" />
              <span className="font-medium">{userType}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
