"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useApi } from "@/hooks/useApi";
import { useDropdownData } from "@/hooks/useDropdownData";

interface DecodedToken {
  state_id: string;
}

interface UserProfile {
  indv_title: string;
  surname: string;
  first_name: string;
  middle_name: string;
  birth_date: string;
  birth_place: string;
  gender: string;
  marital_status: string;
  house_no: string;
  street: string;
  city: string;
  lga: string;
  ward: string;
  email: string;
  phone_number: string;
  mobile_number: string | null;
  occupation: string;
  category: string;
  sector: string;
  nationality: string;
  state_of_residence: string;
  state_of_origin: string;
  tax_office: string;
  employer_name: string;
  employer_tin: string | null;
}

export default function IndividualProfile() {
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
      setProfileLoading(true); // Start loading

      const { data, error } = await request("user/individual", {
        method: "POST",
        body: { id: state_id },
      });

      if (data?.data) {
        setProfile(data.data); // your editable fields
        setOriginalProfile(data.data); // complete raw payload
      } else {
        console.error(error || "Unable to load profile");
      }

      setProfileLoading(false); // Done loading
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
      indv_title: profile.indv_title,
      surname: profile.surname,
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      birth_date: profile.birth_date,
      birth_place: profile.birth_place,
      gender: profile.gender,
      marital_status: profile.marital_status,
      house_no: profile.house_no,
      street: profile.street,
      city: profile.city,
      ward: profile.ward,
      email: profile.email,
      phone_number: profile.phone_number,
      mobile_number: profile.mobile_number,
      occupation: profile.occupation,
      category: profile.category,
      sector: profile.sector,
      nationality: profile.nationality,
      state_of_residence: profile.state_of_residence,
      state_of_origin: profile.state_of_origin,
      tax_office: profile.tax_office,
      lga: profile.lga,
      employer_name: profile.employer_name,
      employer_tin: profile.employer_tin,
    };

    const { data, error } = await request("user/update-individual", {
      method: "POST",
      body: payload,
    });

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
        <h1 className="text-xl font-bold mb-6">Edit Individual Profile</h1>
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
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">Title</label>
          <select
            name="indv_title"
            value={profile.indv_title}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Title</option>
            <option value="Mrss">Mrss</option>
            <option value="Mrs">Mrs</option>
            <option value="Mr">Mr</option>
          </select>
        </div>
        {[
          { label: "Surname", name: "surname" },
          { label: "First Name", name: "first_name" },
          { label: "Middle Name", name: "middle_name" },
          { label: "Birth Date", name: "birth_date", type: "date" },
          { label: "Birth Place", name: "birth_place" },
          { label: "Marital Status", name: "marital_status" },
          { label: "House No", name: "house_no" },
          { label: "Street", name: "street" },
          { label: "City", name: "city" },
          { label: "Ward", name: "ward" },
          { label: "Email", name: "email" },
          { label: "Phone Number", name: "phone_number" },
          { label: "Mobile Number", name: "mobile_number" },
          { label: "Occupation", name: "occupation" },
          { label: "Nationality", name: "nationality" },
          { label: "Employer Name", name: "employer_name" },
          { label: "Employer TIN", name: "employer_tin" },
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
          <label className="mb-1 text-gray-600 font-medium">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">
            State of Residence
          </label>
          <select
            name="state_of_residence"
            value={profile.state_of_residence}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.idstates} value={s.idstates.toString()}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-600 font-medium">
            State of Origin
          </label>
          <select
            name="state_of_origin"
            value={profile.state_of_origin}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s.idstates} value={s.idstates.toString()}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

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
