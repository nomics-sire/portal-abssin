"use client";

import { useState } from "react";

export default function CreateIndividualABSSIN() {
  const [validationType, setValidationType] = useState<"bvn" | "nin" | "none" | null>(null);
  const [formData, setFormData] = useState({
    idNumber: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", { validationType, formData });
    // handle submission logic here
  };

  return (
    <div className="min-h-screen px-4 py-20 bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Individual ABSSIN</h1>
        <p className="text-sm text-gray-600 mb-6">
          Select a validation method to begin your registration.
        </p>


        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <button
            onClick={() => setValidationType("bvn")}
            className={`flex-1 px-3 py-1.5 rounded border text-sm cursor-pointer text-gray-700 ${
              validationType === "bvn"
                ? "bg-red-700 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            BVN
          </button>
          <button
            onClick={() => setValidationType("nin")}
            className={`flex-1 px-3 py-1.5 rounded border cursor-pointer text-sm text-gray-700 ${
              validationType === "nin"
                ? "bg-red-700 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            NIN
          </button>
          <button
            onClick={() => setValidationType("none")}
            className={`flex-1 px-3 py-1.5 rounded border cursor-pointer text-sm text-gray-700 ${
              validationType === "none"
                ? "bg-red-700 text-white"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            No ID
          </button>
        </div>

        {(validationType === "bvn" || validationType === "nin") && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {validationType === "bvn" ? "BVN Number" : "NIN Number"}
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder={`Enter your ${validationType.toUpperCase()}`}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 text-sm"
            >
              Continue
            </button>
          </form>
        )}


        {validationType === "none" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 text-sm"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
