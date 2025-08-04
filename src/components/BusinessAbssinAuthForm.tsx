"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const BusinessAbssinAuthForm = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await request("user/verify-abssin-otp", {
      method: "POST",
      body: { code: token },
    });

    if (error) {
      setMessage(error);
      setVerified(false);
      return;
    }

    if (data?.status) {
      setVerified(true);
      setMessage("Token verified successfully. You can now continue.");
      router.push("/business/create/details");
    } else {
      setVerified(false);
      setMessage("Invalid token.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Enter Signup Token
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        A token was sent to your registered phone number. Enter it to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token
          </label>
          <input
            type="text"
            name="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter token"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
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
          {loading ? "Verifying..." : "Verify Token"}
        </button>

        {message && (
          <p
            className={`text-sm text-center mt-2 ${
              verified ? "text-green-700" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default BusinessAbssinAuthForm;
