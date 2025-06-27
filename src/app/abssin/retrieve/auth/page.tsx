"use client";

import React, { Suspense } from "react";
import AbssinOtpForm from "@/components/AbssinOtpForm";

const AbssinRetrieveAuthPage = () => {
  return (
    <Suspense>
      <AbssinOtpForm />
    </Suspense>
  );
};

export default AbssinRetrieveAuthPage;
