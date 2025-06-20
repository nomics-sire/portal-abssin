"use client";

import React from "react";
import Image from "next/image";
import ConnectManageBanner from "./ConnectManageBanner";
import EmpoweringIdentity from "./EmpoweringIdentity";
import RoleBasedFeatures from "./RoleBasedFeatures";

const AboutABSSIN: React.FC = () => {
  return (
    <>
      <div className="min-h-[40vh] bg-white pt-20 px-4 relative overflow-hidden">
        {/* Top Decorative Circles */}
        {/* <div className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-[#fbe9e7] -z-10 translate-x-[-50%] translate-y-[-50%]" />
      <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#ffd600] -z-10 translate-x-[50%] translate-y-[-50%] rotate-45" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full border-[30px] border-[#960000] -z-10 translate-x-[70%] translate-y-[-50%]" /> */}

        {/* Bottom Left Images */}
        <div className="absolute bottom-0 left-0 -z-10">
        <Image
          src="/images/Ellipse-145.png"
          alt="Light curve"
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-[220px] md:w-[280px]"
        />
        <Image
          src="/images/Ellipse-144.png"
          alt="Yellow curve"
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-[180px] md:w-[240px]"
        />
      </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About ABSSIN
          </h1>
          <nav className="text-sm text-gray-600 mb-8">
            <span className="text-gray-400">Home</span> /
            <span className="text-red-700 font-medium ml-1">About ABSSIN</span>
          </nav>
        </div>
      </div>
      <ConnectManageBanner />
      <EmpoweringIdentity />
      <RoleBasedFeatures />
    </>
  );
};

export default AboutABSSIN;
