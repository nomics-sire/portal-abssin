"use client";

import Image from "next/image";
import { FC } from "react";

const ConnectManageBanner: FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg">

        <Image
          src="/images/connect-manage.jpg" 
          alt="Connect and manage"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 text-white">
          <div className="text-center max-w-2xl">
            <span className="inline-block bg-white text-red-700 text-xs font-semibold px-4 py-1 rounded-full mb-4">
              All in just a few clicks
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect & Manage</h2>
            <p className="text-sm md:text-base mb-6">
              Easily register new schools with comprehensive details, create and manage teacher
              profiles with subject specializations, and assign teachers to specific classes or
              departments—all in just a few clicks. Keep track of student records including personal
              information, academic history, class enrollment, and guardian contacts, in real time.
            </p>
            <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded text-sm">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectManageBanner;
