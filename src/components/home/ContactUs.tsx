"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const ContactUs: React.FC = () => {
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
            Contact Us
          </h1>
          <nav className="text-sm text-gray-600 mb-8">
            <span className="text-gray-400">Home</span> /
            <span className="text-red-700 font-medium ml-1">Contact Us</span>
          </nav>
        </div>
      </div>
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      
            <div className="bg-red-100 rounded-lg p-6 shadow-md flex flex-col items-center">
              <svg
                className="w-6 h-6 text-red-700 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 2a1 1 0 00-1 1c0 10.493 8.507 19 19 19a1 1 0 001-1v-4a1 1 0 00-1.09-1c-1.423.13-2.865-.21-4.01-1.01l-2.02 2.02a16.978 16.978 0 01-7.9-7.9l2.02-2.02c-.8-1.145-1.14-2.587-1.01-4.01A1 1 0 007 2H3z" />
              </svg>
              <p className="text-gray-800">+1 (333) 000-0000</p>
            </div>

 
            <div className="bg-red-700 text-white rounded-lg p-6 shadow-md flex flex-col items-center">
              <svg
                className="w-6 h-6 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              <p className="font-semibold text-center">
                Block 34, Olofinjana Crescent,
                <br /> Ikoyi, Lagos
              </p>
            </div>

            <div className="bg-red-100 rounded-lg p-6 shadow-md flex flex-col items-center">
              <svg
                className="w-6 h-6 text-red-700 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.24l7.39 6.42a1 1 0 001.22 0L20 8.24V18H4z" />
              </svg>
              <p className="text-gray-800">info@abssin.com</p>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
      <Footer />
    </>
  );
};

export default ContactUs;
