"use client";

import React, { useState } from "react";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import Navbar from "@/components/home/Navbar";

export default function BusinessDetailsForm() {
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
    <>
      <Navbar />
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
            {[
              //   ["companyName", "Company Name *"],
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
            ].map(([name, label, isSelect, type = "text"]) => (
              <div key={name as string}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                  {name === "coy_name" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "companytin" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "regist_name" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "staff_strength" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "enterprise_reg_no" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "type_of_organisation" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "date_of_incorporation" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "date_of_commencement" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "e_mail" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "phone_no" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "house_no" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "street" && (
                    <span className="text-red-600"> *</span>
                  )}
                  {name === "city" && <span className="text-red-600"> *</span>}
                  {name === "ward" && <span className="text-red-600"> *</span>}
                  {name === "rcno" && <span className="text-red-600"> *</span>}
                  {name === "password" && (
                    <span className="text-red-600"> *</span>
                  )}
                </label>
                <input
                  type={typeof type === "string" ? type : "text"}
                  name={name as string}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder={`Enter ${label}`}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-600"> *</span>
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.idstates} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LGA <span className="text-red-600"> *</span>
              </label>
              <select
                name="lga"
                value={form.lga}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select LGA</option>
                {lgas.map((lga) => (
                  <option key={lga.lgaID} value={lga.lgaID.toString()}>
                    {lga.lgaName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector <span className="text-red-600"> *</span>
              </label>
              <select
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Sector</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.sector_name}>
                    {s.sector_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Office <span className="text-red-600"> *</span>
              </label>
              <select
                name="tax_office"
                value={form.tax_office}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Tax Station</option>
                {taxStations.map((t) => (
                  <option key={t.idstation} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CDN Category <span className="text-red-600"> *</span>
              </label>
              <select
                name="cdn_category_id"
                value={form.cdn_category_id}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Category</option>
                {cdnCategories.map((c) => (
                  <option key={c.id} value={c.id.toString()}>
                    {c.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Category <span className="text-red-600"> *</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Category</option>
                {cdnCategories.map((b) => (
                  <option key={b.id} value={b.category_name}>
                    {b.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Line of Business <span className="text-red-600"> *</span>
              </label>
              <select
                name="line_of_business"
                value={form.line_of_business}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Select Line</option>
                {businessTypes.map((b) => (
                  <option key={b.id} value={b.business_type}>
                    {b.business_type}
                  </option>
                ))}
              </select>
            </div>

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
          </form>
        </div>
      </div>
    </>
  );
}
