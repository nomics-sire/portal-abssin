
import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 p-10">
      <div className="w-full md:w-2/3 bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Have Questions? Reach Out to Us, And We’ll Be Happy to Help</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 p-2 border border-gray-300 text-gray-800 rounded"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-800">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full mt-1 p-2 border border-gray-300 text-gray-800 rounded"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-800">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full mt-1 p-2 border border-gray-300 text-gray-800 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Message</label>
            <textarea
              placeholder="Type your message here..."
              className="w-full mt-1 p-2 border border-gray-300 text-gray-800 rounded h-32"
            />
          </div>
          <button
            type="submit"
            className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/3">
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-800">Office Location</h3>
          <p className='text-gray-800'>Government House Umuahia, Abia State</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-800">Phone Support</h3>
          <p className='text-gray-800'>+1 234 567 890</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-800">Email Support</h3>
          <p className='text-gray-800'>info@abssin</p>
        </div>
        <div className="flex gap-3 mt-4">
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
            <button key={platform} className="text-white bg-red-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-800">
              <i className={`fab fa-${platform}`}></i>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
