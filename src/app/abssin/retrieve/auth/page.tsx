"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";

export default function AbssinRetrieveAuthPage() {
  const searchParams = useSearchParams();
  const method = searchParams.get("by") || "phone";
  const to = searchParams.get("to") || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any | null>(null);

  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setUserData(null);

    const { data, error } = await request("user/verify-retrieve-abssin-otp", {
      method: "POST",
      body: { code: otp },
    });

    if (error) {
      setError(error);
    } else {
      setMessage(data?.message || "ABSSIN Details Retrieved Successfully.");
      setUserData(data?.data || null);
    }
  };

  const closePopup = () => {
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-gray-800 relative">
      <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-6">
          An OTP has been sent to your {method === "email" ? "email" : "phone"}:{" "}
          <span className="font-medium text-gray-900">{to}</span>
        </p>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">OTP Code</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>

      {userData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">ABSSIN Details</h3>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Name:</strong> {userData.tp_name}
              </li>
              <li>
                <strong>Phone:</strong> {userData.phone_number}
              </li>
              {/* <li><strong>Email:</strong> {userData.email || "N/A"}</li> */}
              <li>
                <strong>Address:</strong> {userData.address}
              </li>
              {/* <li><strong>Tax Office:</strong> {userData.tax_office}</li> */}
              <li>
                <strong>Type of Business:</strong> {userData.type_of_business}
              </li>
              <li>
                <strong>Business Type:</strong> {userData.tp_type}
              </li>
              {/* <li><strong>Created At:</strong> {new Date(userData.createtime).toLocaleString()}</li> */}
            </ul>
            <div className="flex justify-end">
              <Link href={"/"}>
                <button className="mt-auto cursor-pointer px-4 py-2 border w-32 border-red-200 rounded hover:bg-red-600 text-sm bg-red-700 text-white">
                  Home
                </button>
              </Link>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
}
