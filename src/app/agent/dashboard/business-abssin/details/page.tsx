"use client";

import React, { useState } from "react";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

const BusinessDetails = () => {
  const { states, lgas, sectors, taxStations, cdnCategories, businessTypes } =
    useDropdownData();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { request, loading } = useApi();
  const router = useRouter();

  const [form, setForm] = useState({
    coy_name: "",
    regist_name: "",
    staff_strength: "",
    companytin: "",
    rcno: "",
    enterprise_reg_no: "",
    line_of_business: "",
    type_of_organisation: "",
    date_of_incorporation: "",
    date_of_commencement: "",
    cdn_category_id: "",
    category: "",
    sector: "",
    e_mail: "",
    phone_no: "",
    house_no: "",
    street: "",
    city: "",
    ward: "",
    lga: "",
    state: "",
    tax_office: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const { data, error } = await request("user/create-non-individual", {
      method: "POST",
      body: form,
    });

    if (error) {
      setErrorMessage(error);
    } else if (data?.message) {
      setSuccessMessage(data.message);
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 text-gray-700">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Business Registration Details
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Render text inputs */}
          {[
            ["coy_name", "Company Name"],
            ["regist_name", "Registered Name"],
            ["staff_strength", "Staff Strength"],
            ["companytin", "Company TIN"],
            ["rcno", "RC No"],
            ["enterprise_reg_no", "Enterprise Reg Number"],
            ["type_of_organisation", "Type Of Organisation"],
            ["date_of_incorporation", "Date of Incorporation", false, "date"],
            ["date_of_commencement", "Date of Commencement", false, "date"],
            ["e_mail", "Email"],
            ["phone_no", "Phone Number"],
            ["house_no", "House Number"],
            ["street", "Street"],
            ["city", "City"],
            ["ward", "Ward"],
            ["password", "Password", false, "password"],
          ].map(([name, label, , type = "text"]) => (
            <div key={name as string}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-600">*</span>
              </label>
              <input
                type={type as string}
                name={name as string}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                placeholder={`Enter ${label}`}
                required
              />
            </div>
          ))}

          {/* Select inputs */}
          {[
            ["state", "State", states.map((s) => [s.state, s.state])],
            ["lga", "LGA", lgas.map((l) => [l.lgaID, l.lgaName])],
            ["sector", "Sector", sectors.map((s) => [s.sector_name, s.sector_name])],
            ["tax_office", "Tax Office", taxStations.map((t) => [t.name, t.name])],
            ["cdn_category_id", "CDN Category", cdnCategories.map((c) => [c.id, c.category_name])],
            ["category", "Business Category", cdnCategories.map((c) => [c.category_name, c.category_name])],
            ["line_of_business", "Line of Business", businessTypes.map((b) => [b.business_type, b.business_type])],
          ].map(([name, label, options]) => (
          <div key={Array.isArray(name) ? name.join("-") : name}>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-600">*</span>
              </label>
              <select
                name={name as string}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">{`Select ${label}`}</option>
                {(options as Array<[string | number, string]>).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-red-700 text-white py-2 px-4 rounded text-sm cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
              }`}
            >
              {loading ? "Submitting..." : "Submit Business Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;
