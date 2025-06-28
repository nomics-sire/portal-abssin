"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

export default function Login() {
  const [abssin, setAbssin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await request("user/login", {
      method: "POST",
      body: {
        email: abssin,
        password,
      },
    });

    if (error) {
      setError(error);
    } else {
      localStorage.setItem("user_token", data.token);
      localStorage.setItem("user_type", data.type);
      localStorage.setItem("user_state_id", data.state_id);
      document.cookie = `user_token=${data.token}; path=/; secure; samesite=strict`;
      router.push("/user/dashboard");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login-left.png"
          alt="Login visual"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <Image
            src="/images/abssinlogo.png"
            alt="ABSSIN Logo"
            width={120}
            height={40}
            className="mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Log in to your account
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back! Please enter your details.
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 font-medium">
                ABSSIN
              </label>
              <input
                type="text"
                placeholder="Enter your ABSSIN"
                className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-red-700"
                value={abssin}
                onChange={(e) => setAbssin(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-red-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-red-600 hover:underline">
                  Forgot password
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
