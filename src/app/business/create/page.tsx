'use client';

import Navbar from "@/components/home/Navbar";
import VerifyBusinessAbssinForm from "@/components/VerifyBusinessAbssinForm";


export default function CreateBusinessABSSIN() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-20 bg-gray-50">
        <VerifyBusinessAbssinForm />
      </div>
    </>
  );
}
