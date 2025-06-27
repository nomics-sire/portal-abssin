"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

const RetrieveAbssinPage: React.FC = () => {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      retrieve_by: method,
      retrieve_value: value,
    };

    const { data, error } = await request("user/retrieve-abssin", {
      method: "POST",
      body: payload,
    });

    if (error) {
      setError(error);
    } else {
      setMessage(data?.message || "OTP sent successfully.");
      // Navigate to OTP input page with query parameters
      router.push(`/abssin/retrieve/auth?by=${method}&to=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-gray-800">
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Retrieve ABSSIN</h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMethod("phone")}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              method === "phone"
                ? "bg-red-700 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            By Phone
          </button>
          <button
            onClick={() => setMethod("email")}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              method === "email"
                ? "bg-red-700 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            By Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {method === "phone" ? "Phone Number" : "Email Address"}
            </label>
            <input
              type={method === "phone" ? "tel" : "email"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter your ${method}`}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-700 text-white py-2 px-4 rounded text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
            }`}
          >
            {loading ? "Retrieving..." : "Retrieve ABSSIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RetrieveAbssinPage;
