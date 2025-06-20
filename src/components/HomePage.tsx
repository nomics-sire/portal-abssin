"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FAQSection from "./FAQSection";
import ConnectManageBanner from "./ConnectManageBanner";
import ContactForm from "./ContactForm";
import EmpoweringIdentity from "./EmpoweringIdentity";
import RoleBasedFeatures from "./RoleBasedFeatures";

const slides = [
  {
    src: "/images/slide1.jpg",
    title: "Abia State Social Identity Management System",
    subtitle:
      "The ABSSIN Portal is Abia State's official digital gateway for identity and social service integration. Whether you're an individual, a business, an agent, or a government official, the ABSSIN Portal provides easy access to secure identity registration, verification, and management.",
    buttons: [
      { label: "Get Started", type: "primary" },
      { label: "Retrieve ABSSIN", type: "secondary" },
    ],
    banner: "Welcome to ABSSIN Portal",
  },
  {
    src: "/images/slide2.png",
    title: "Your Identity. Your Access. Your Future.",
    subtitle:
      "Manage your ABSSIN anytime, anywhere. This portal puts identity registration and retrieval in your hands.",
    buttons: [
      { label: "Register Now", type: "primary" },
      { label: "Learn How It Works", type: "secondary" },
    ],
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  const goToPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-[80vh] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div key={index} className="absolute inset-0 w-full h-full">
            <Image
              src={slide.src}
              alt={`Slide ${index}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-6 text-white">
          <div className="text-center max-w-3xl">
            {slides[current].banner && (
              <div className="mb-2 inline-block bg-red-700 text-xs px-4 py-1 rounded-full">
                {slides[current].banner}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {slides[current].title}
            </h1>
            <p className="text-sm md:text-base mb-6">
              {slides[current].subtitle}
            </p>
            <div className="flex justify-center gap-4">
              {slides[current].buttons.map((btn, i) => (
                <button
                  key={i}
                  className={`px-6 py-2 text-sm rounded ${
                    btn.type === "primary"
                      ? "bg-red-700 text-white hover:bg-red-800"
                      : "border border-white hover:bg-white hover:text-black"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white"
        >
          <ChevronRight />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-6 rounded-full ${
                i === current ? "bg-red-700" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-4 py-1 rounded-full mb-2">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            What You Can Do on the ABSSIN Portal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Create Individual ABSSIN",
                description:
                  "Easily register to get your unique ABSSIN using your BVN, NIN, or by entering your details manually. You’ll receive instant confirmation via SMS once your registration is complete.",
                icon: "🧍‍♂️",
              },
              {
                title: "Create Dependent ABSSIN",
                description:
                  "Register dependents such as children or minors by providing their personal details and a photo. Each dependent will be assigned a unique ABSSIN linked to their guardian.",
                icon: "👨‍👩‍👧",
              },
              {
                title: "Create Business ABSSIN",
                description:
                  "Register your business and generate a unique ABSSIN by providing your personal ABSSIN and business details. A confirmation will be sent via SMS upon successful registration.",
                icon: "🏢",
              },
              {
                title: "Retrieve ABSSIN",
                description:
                  "Easily recover your ABSSIN using your registered phone number or email. Get instant access to your identification details without re-registering.",
                icon: "📲",
              },
              {
                title: "Generate ABSSIN Slip",
                description:
                  "Quickly download or print your official ABSSIN slip by entering your ABSSIN number. The slip serves as proof of registration for verification and official use.",
                icon: "🧾",
              },
              {
                title: "Download Slip",
                description:
                  "Enter your ABSSIN to instantly download a digital copy of your identification slip for printing or record-keeping.",
                icon: "⬇️",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-6 text-left flex flex-col justify-between"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-800 mb-4">
                  {feature.description}
                </p>
                <button className="mt-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <EmpoweringIdentity />
      <RoleBasedFeatures />
      <FAQSection />

      <ConnectManageBanner />
      <ContactForm />
      {/* <Footer /> */}
    </>
  );
}
