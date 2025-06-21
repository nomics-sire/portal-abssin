'use client';

import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex h-screen">
      {/* Left side (image) */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/images/login-left.png"
          alt="Login visual"
          fill
          className="object-cover"
        />
      </div>

      {/* Right side (form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <Image
            src="/images/abssinlogo.png"
            alt="ABSSIN Logo"
            width={120}
            height={40}
            className="mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Log in to your account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back! Please enter your details.
          </p>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-red-700"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 font-medium">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full border border-gray-300 text-gray-800 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-red-700"
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-red-600 hover:underline">
                  Forgot password
                </a>
              </div>
            </div>

            {/* <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember for 30 days
              </label>
            </div> */}

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded"
            >
              Login
            </button>
{/* 
            <button
              type="button"
              className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded"
            >
              <Image
                src="/images/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-sm">Sign up with Google</span>
            </button> */}
{/* 
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{' '}
              <a href="#" className="text-red-700 hover:underline">
                Sign up
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
