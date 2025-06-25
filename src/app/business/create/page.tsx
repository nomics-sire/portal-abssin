"use client";

import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

export default function CreateBusinessABSSIN() {
  const [abssin, setAbssin] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [tpDetails, setTpDetails] = useState<{ message: string; tp_name: string } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { request, loading } = useApi();
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setTpDetails(null);
    setApiError(null);

    const { data, error } = await request("user/verify-abssin", {
      method: "POST",
      body: { id: abssin },
    });

    if (error) {
      setApiError(error );
      return;
    }
    
    if (data?.status) {
      setSuccessMessage("ABSSIN verified successfully!");
      setTpDetails({
        message: data.message,
        tp_name: data.tp_name,
      });
    }
     setTimeout(() => {
    router.push("/business/create/auth");
  }, 1000); 

  };

  return (
    <div className="min-h-screen px-4 py-20 bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Business ABSSIN</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your personal ABSSIN to begin registering your business.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ABSSIN Number</label>
            <input
              type="text"
              name="abssin"
              value={abssin}
              onChange={(e) => setAbssin(e.target.value)}
              placeholder="Enter your ABSSIN"
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
            {loading ? "Verifying..." : "Continue"}
          </button>

          {apiError && (
            <p className="text-sm text-red-600 mt-2 text-center">{apiError}</p>
          )}

          {successMessage && (
            <div className="text-sm text-green-700 mt-2 text-center space-y-1">
              <p>{successMessage}</p>
              {tpDetails && (
                <>
                  <p>{tpDetails.message}</p>
                  <p>
                    <strong>Name:</strong> {tpDetails.tp_name}
                  </p>
                </>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
