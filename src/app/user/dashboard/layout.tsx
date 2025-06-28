"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const isAuthed = useRequireAuth();
  //   useEffect(() => {
  //     const token = document.cookie
  //       .split('; ')
  //       .find((row) => row.startsWith('user_token='))
  //       ?.split('=')[1];

  //     if (!token) {
  //       router.push('/login');
  //     } else {
  //       setCheckingAuth(false); // token found, allow render
  //     }
  //   }, [router]);

  //   if (checkingAuth) {
  //     return (
  //       <div className="h-screen flex items-center justify-center text-gray-600">
  //         loading...
  //       </div>
  //     );
  //   }

  if (!isAuthed) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-6 h-6 text-red-700" />
      </div>
    );
  }

  return <>{children}</>;
}
