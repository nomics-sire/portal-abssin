
"use client";

import React from "react";

const EmpoweringIdentity: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-4 py-1 rounded-full mb-4">
            Agents. Schools. Teachers. Students
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            Empowering Identity. <br /> Enhancing Access.
          </h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            The Abia State Social Security Identification Number (ABSSIN)
            Portal is your official gateway to personal and business identity
            registration in Abia State. Whether you're an individual, business
            owner, dependent, agent, or government official, the ABSSIN Portal
            provides easy access to secure digital identity services—all in one place.
          </p>
          <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded text-sm">
            Explore More
          </button>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-[320px] md:w-[400px] lg:w-[480px] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/images/education.png"
              alt="Education and Identity"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpoweringIdentity;
