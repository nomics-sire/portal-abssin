
import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-16 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/images/abssinlogo.png" alt="ABSSIN Logo" width={100} height={100} />
            {/* <div className="text-xl font-bold text-red-800">ABSSIN</div> */}
          </div>
          <p className="mb-2">
            Feel free to call us in working hours Mon - Fri [8:00 - 16:00]. Our team will be happy to help answer your queries.
          </p>
          <div className="flex items-center gap-2 mb-3">
            <i className="fas fa-phone text-red-800"></i>
            <span>+1 (333) 000-0000</span>
          </div>
          <div className="flex gap-3">
            {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
              <a key={platform} href="#" className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-800">
                <i className={`fab fa-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-1 md:col-span-1">
          <h3 className="font-semibold mb-2 text-gray-900">Company</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-red-700">Home</a></li>
            <li><a href="#" className="hover:text-red-700">About ABSSIN</a></li>
            <li><a href="#" className="hover:text-red-700">Features</a></li>
            <li><a href="#" className="hover:text-red-700">FAQs</a></li>
            <li><a href="#" className="hover:text-red-700">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-4 pt-4 pb-6 text-center text-xs text-gray-500 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-2">
          <p>Copyright 2025 | All Rights Reserved</p>
          <p>Design by Centrify</p>
          <div className="flex gap-2">
            <a href="#" className="hover:text-red-700">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-red-700">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
