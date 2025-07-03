"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [abssin, setAbssin] = useState("");
  const [verifyVia, setVerifyVia] = useState<"phone" | "email">("phone");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { data, error } = await request("user/forgot-password", {
      method: "POST",
      body: {
        state_id: abssin,
        verify_via: verifyVia,
      },
    });

    if (error) {
      setError(error);
    } else {
      setMessage(data?.message || "OTP sent successfully");
      router.push("/forgot-password/auth")
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-800">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
                <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">OTP Verification</h2>
          <button
            onClick={() => router.back()}
            className="text-sm text-red-700 hover:underline"
            type="button"
          >
            Go back
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Enter your ABSSIN and choose how you want to receive your OTP.
        </p>

        {message && (
          <div className="mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded px-4 py-2">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ABSSIN
            </label>
            <input
              type="text"
              value={abssin}
              onChange={(e) => setAbssin(e.target.value)}
              placeholder="Enter your ABSSIN"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send OTP via
            </label>
            <select
              value={verifyVia}
              onChange={(e) =>
                setVerifyVia(e.target.value as "phone" | "email")
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="phone">Phone</option>
              <option value="email">Email</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded text-sm ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-800"
            }`}
          >
            {loading ? "Submitting..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
