"use client";

import React, { Suspense } from "react";
import AbssinOtpForm from "@/components/AbssinOtpForm";
import Navbar from "@/components/home/Navbar";

const AbssinRetrieveAuthPage = () => {
  return (
    <Suspense>
      <Navbar />
      <AbssinOtpForm />
    </Suspense>
  );
};

export default AbssinRetrieveAuthPage;
