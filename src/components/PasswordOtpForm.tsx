'use client';

import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useRouter } from 'next/navigation';

export default function PasswordOtpForm() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { request, loading } = useApi();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const { data, error } = await request('user/forgot-password-otp-verification', {
      method: 'POST',
      body: {
        otp,
        password,
      },
    });

    if (error) {
      setError(error);
    } else {
      setMessage(data?.message || 'Password updated successfully');
      setTimeout(() => router.push('/login'), 1500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-800">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter the OTP sent to your phone/email and set your new password.
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
              OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              minLength={8}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded text-sm cursor-pointer ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-700 hover:bg-red-800'
            }`}
          >
            {loading ? 'Verifying...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
