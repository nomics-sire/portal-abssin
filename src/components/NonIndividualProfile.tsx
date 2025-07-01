"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useApi } from "@/hooks/useApi";
import { useDropdownData } from "@/hooks/useDropdownData";

interface DecodedToken {
  state_id: string;
}

interface UserProfile {
  coy_name: string;
  regist_name: string;
  rcno: string;
  date_of_incorporation: string;
  enterprise_reg_no: string;
  date_of_commencement: string;
  line_of_business: string;
  e_mail: string;
  phone_no: string;
  house_no: string;
  street: string;
  city: string;
  lga: string;
  ward: string;
  category: string;
  sector: string;
  tax_office: string;
}

export default function NonIndividualProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { request } = useApi();
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [originalProfile, setOriginalProfile] = useState<any | null>(null);

  const { states, lgas, sectors, taxStations, cdnCategories } =
    useDropdownData();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_token="))
      ?.split("=")[1];

    if (!token) return;

    const decoded = jwtDecode<DecodedToken>(token);
    const state_id = decoded.state_id;

    const fetchProfile = async () => {
      setProfileLoading(true);

      const { data, error } = await request("user/non-individual", {
        method: "POST",
        body: { id: state_id },
      });

      if (data?.data) {
        setProfile(data.data);
        setOriginalProfile(data.data);
      } else {
        console.error(error || "Unable to load profile");
      }

      setProfileLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  if (profileLoading || !profile) {
    return (
      <div className="text-center py-10 text-gray-600">Loading profile...</div>
    );
  }
  const handleSubmit = async () => {
    if (!profile || !originalProfile) return;

    setSaving(true);

    const payload = {
      //   id: originalProfile.id,
      state_id: originalProfile.state_id,
      coy_name: profile.coy_name,
      regist_name: profile.regist_name,
      rcno: profile.rcno,
      date_of_incorporation: profile.date_of_incorporation,
      date_of_commencement: profile.date_of_commencement,
      line_of_business: profile.line_of_business,
      enterprise_reg_no: profile.enterprise_reg_no,
      e_mail: profile.e_mail,
      phone_no: profile.phone_no,
      house_no: profile.house_no,
      street: profile.street,
      city: profile.city,
      ward: profile.ward,
      category: profile.category,
      sector: profile.sector,
      tax_office: profile.tax_office,
      lga: profile.lga,
    };

    const { data, error } = await request("user/update-non-individual", {
      method: "POST",
      body: payload,
    });
    console.log("payload", payload);

    if (error) {
      console.error("Update error:", error);
      setErrorMsg(error);
      setMessage("");
    } else {
      console.log("Update success:", data);
      setMessage(data?.message || "Profile updated successfully!");
      setErrorMsg("");
    }

    setSaving(false);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto text-gray-800">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-6">User Profile</h1>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className={`mt-6 px-4 py-2 rounded w-full md:w-1/3 my-2 cursor-pointer ${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-700 hover:bg-red-800 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
      {message && (
        <div className="mb-4 text-sm text-green-700 bg-green-100 border border-green-300 rounded px-4 py-2">
          {message}
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2">
          {errorMsg}
        </div>
      )}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {[
          { label: "Company Name", name: "coy_name" },
          { label: "Registration Name", name: "regist_name" },
          {
            label: "Enterprise Registration number",
            name: "enterprise_reg_no",
          },
          { label: "Rc No", name: "rcno" },
          {
            label: "Date of Incorporation",
            name: "date_of_incorporation",
            type: "date",
          },
          {
            label: "Date of Commencement",
            name: "date_of_commencement",
            type: "date",
          },
          { label: "Email", name: "e_mail" },
          { label: "Phone Number", name: "phone_no" },
          { label: "House No", name: "house_no" },
          { label: "Street", name: "street" },
          { label: "City", name: "city" },
          { label: "Ward", name: "ward" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium">{label}</label>
            <input
              name={name}
              type={type || "text"}
              value={(profile as any)[name] || ""}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">LGA</label>
          <select
            name="lga"
            value={profile.lga}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select LGA</option>
            {lgas.map((lga) => (
              <option key={lga.lgaID} value={lga.lgaID.toString()}>
                {lga.lgaName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Sector</label>
          <select
            name="sector"
            value={profile.sector}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Sector</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.sector_name}>
                {s.sector_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Category</label>
          <select
            name="category"
            value={profile.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {cdnCategories.map((cat) => (
              <option key={cat.id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">
            Line of Business
          </label>
          <select
            name="line_of_business"
            value={profile.line_of_business}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            {cdnCategories.map((cat) => (
              <option key={cat.id} value={cat.category_name}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Tax Office</label>
          <select
            name="tax_office"
            value={profile.tax_office}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Tax Office</option>
            {taxStations.map((station) => (
              <option key={station.idstation} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
