
"use client";

import React from "react";

const features = [
  {
    title: "For Agents",
    description:
      "Easily add schools, create teacher profiles, and manage student data.",
    icon: "/images/staff.png",
  },

  {
    title: "For Admin",
    description:
      "Gain complete oversight of schools, teachers, and students.",
    icon: "/images/admin.png",
  },
];

const RoleBasedFeatures: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-4 py-1 rounded-full mb-2">
          Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Features That Work for Everyone
        </h2>
        <p className="text-gray-600 mb-12 text-sm md:text-base">
          No matter your role, the ABSSIN Portal is built to make your
          workflow smarter, faster, and more organized.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {features.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-6 ${
                index !== features.length - 1
                  ? "md:border-r md:border-dashed md:border-red-300"
                  : ""
              }`}
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleBasedFeatures;
