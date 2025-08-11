"use client";

import BusinessAbssinAuthForm from "@/components/BusinessAbssinAuthForm";
import Navbar from "@/components/home/Navbar";


export default function BusinessAuthPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-20 bg-gray-50">
        <BusinessAbssinAuthForm />
      </div>
    </>
  );
}
