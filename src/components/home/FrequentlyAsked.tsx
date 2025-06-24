"use client";

import React from "react";
import Image from "next/image";
import EmpoweringIdentity from "./EmpoweringIdentity";
import RoleBasedFeatures from "./RoleBasedFeatures";
import FAQSection from "./FAQSection";
import Footer from "./Footer";

const FrequentlyAsked: React.FC = () => {
  return (
    <>
      <div className="min-h-[40vh] bg-white pt-20 px-4 relative overflow-hidden">
        <Image
          src="/images/about-hero.png"
          alt="Background Design"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="z-0"
        />
       <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            FAQS
          </h1>
          <nav className="text-sm text-gray-600 mb-8">
            <span className="text-gray-400">Home</span> /
            <span className="text-red-700 font-medium ml-1">FAQS</span>
          </nav>
        </div>
      </div>
      <FAQSection />
      <EmpoweringIdentity />
      <RoleBasedFeatures />
      <Footer />
    </>
  );
};

export default FrequentlyAsked;
