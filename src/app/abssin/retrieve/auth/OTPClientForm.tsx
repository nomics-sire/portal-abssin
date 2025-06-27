// app/abssin/retrieve/auth/OTPClientForm.tsx

'use client';

import { useState } from "react";
import { useApi } from "@/hooks/useApi";

interface Props {
  method: string;
  to: string;
}

export default function OTPClientForm({ method, to }: Props) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [abssinData, setAbssinData] = useState<any>(null);

  const { request, loading } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setAbssinData(null);

    const { data, error } = await request("user/verify-retrieve-abssin-otp", {
      method: "POST",
      body: { code: otp },
    });

    if (error) {
      setError(error);
    } else {
      setMessage(data?.message || "ABSSIN Details Retrieved Successfully.");
      setAbssinData(data?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-gray-800">
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

        {abssinData && (
          <div className="mt-6 bg-gray-100 p-4 rounded text-sm">
            <h3 className="text-lg font-semibold mb-2">ABSSIN Details</h3>
            <ul className="space-y-1">
              <li><strong>Name:</strong> {abssinData.tp_name}</li>
              <li><strong>Phone:</strong> {abssinData.phone_number}</li>
              <li><strong>Email:</strong> {abssinData.email || "N/A"}</li>
              <li><strong>Address:</strong> {abssinData.address}</li>
              <li><strong>State ID:</strong> {abssinData.state_id}</li>
              <li><strong>Tax Office:</strong> {abssinData.tax_office}</li>
              <li><strong>Type:</strong> {abssinData.tp_type}</li>
              <li><strong>Business Type:</strong> {abssinData.type_of_business}</li>
              <li><strong>Created By:</strong> {abssinData.enter_by}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
