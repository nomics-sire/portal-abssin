// app/abssin/retrieve/auth/page.tsx
"use client"
import dynamic from "next/dynamic";

// Lazy load the client-side OTP form
const OTPClientForm = dynamic(() => import("../auth/OTPClientForm"), { ssr: false });

export default function AbssinRetrieveAuthPage({ searchParams }: { searchParams: { by?: string; to?: string } }) {
  const method = searchParams.by || "phone";
  const to = searchParams.to || "";

  return <OTPClientForm method={method} to={to} />;
}
