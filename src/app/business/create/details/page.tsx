"use client";

import React, { useState } from "react";

export default function BusinessDetailsForm() {
  const [form, setForm] = useState({
    companyName: "",
    registeredName: "",
    staffStrength: "",
    companyTin: "",
    rcNo: "",
    enterpriseRegNumber: "",
    lineOfBusiness: "",
    typeOfOrg: "",
    dateIncorporation: "",
    dateCommencement: "",
    cdnCategory: "",
    businessCategory: "",
    sector: "",
    email: "",
    phone: "",
    houseNumber: "",
    street: "",
    city: "",
    ward: "",
    lga: "",
    state: "",
    taxOffice: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting business data:", form);
    // TODO: Replace with API call to submit form
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Business Registration Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            ["companyName", "Company Name"],
            ["registeredName", "Registered Name"],
            ["staffStrength", "Staff Strength"],
            ["companyTin", "Company TIN"],
            ["rcNo", "RC No"],
            ["enterpriseRegNumber", "Enterprise Reg Number"],
            ["lineOfBusiness", "Line Of Business", true],
            ["typeOfOrg", "Type Of Organisation"],
            ["dateIncorporation", "Date of Incorporation", false, "date"],
            ["dateCommencement", "Date of Commencement", false, "date"],
            ["cdnCategory", "CDN Category", true],
            ["businessCategory", "Business Category", true],
            ["sector", "Sector", true],
            ["email", "Email"],
            ["phone", "Phone Number"],
            ["houseNumber", "House Number"],
            ["street", "Street"],
            ["city", "City"],
            ["ward", "Ward"],
            ["lga", "LGA", true],
            ["state", "State", true],
            ["taxOffice", "Tax Office", true],
            ["password", "Password", false, "password"],
          ].map(([name, label, isSelect, type = "text"]) => (
            <div key={name as string}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>

              {isSelect ? (
                <select
                  name={name as string}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Option1">Option 1</option>
                  <option value="Option2">Option 2</option>
                  {/* TODO: replace with actual values */}
                </select>
              ) : (
                <input
                  type={typeof type === "string" ? type : "text"}
                  name={name as string}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder={`Enter ${label}`}
                  required
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 text-sm"
            >
              Submit Business Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
