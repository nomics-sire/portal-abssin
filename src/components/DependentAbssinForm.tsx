"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useDropdownData } from "@/hooks/useDropdownData";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface School {
  id: number;
  school_name: string;
  adress: string;
  lga: string;
  category: string;
}

const DependentAbssinForm: React.FC = () => {
  const { request, loading } = useApi();
  const { states, lgas } = useDropdownData();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    surname: "",
    birth_date: "",
    gender: "",
    lga: "",
    state_of_origin: "",
    student_school_id: "",
    selected_school_id: "",
    guardian_phone_number: "",
    guardian_abssin: "",
    school_address: "",
    agent_email: "",
    image: "",
  });

  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      const { data } = await request("user/school-list", {
        method: "GET",
      });
      if (data?.response_data) {
        setSchools(data.response_data);
      }
    };
    fetchSchools();
  }, []);

  const openCamera = async () => {
    setCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0);
      const base64Image = canvas.toDataURL("image/jpeg");
      setFormData({ ...formData, image: base64Image });
      setCameraOpen(false);

      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitting(true);

    const { data, error } = await request("user/create-infant", {
      method: "POST",
      body: formData,
    });
    setSubmitting(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage(data?.message);
      // router.push("/");
      //   setSuccessMessage(data?.message || "Dependent ABSSIN registered successfully.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Dependent ABSSIN Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "first_name",
            "middle_name",
            "surname",
            "birth_date",
            "guardian_phone_number",
            "guardian_abssin",
            "agent_email",
            "student_school_id",
          ].map((field) => {
            const label =
              field === "agent_email"
                ? "Guardian Email"
                : field === "student_school_id"
                ? "Student School ID"
                : field.replace(/_/g, " ");

            const type = field === "birth_date" ? "date" : "text";

            return (
              <div key={field} className="flex flex-col">
                <label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-700 mb-1 capitalize"
                >
                  {label}
                </label>
                <input
                  id={field}
                  type={type}
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 text-sm rounded"
                  required={field !== "middle_name"}
                />
              </div>
            );
          })}

          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 text-sm rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="state_of_origin"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              State of Origin
            </label>
            <select
              id="state_of_origin"
              name="state_of_origin"
              value={formData.state_of_origin}
              onChange={handleChange}
              className="w-full border px-3 py-2 text-sm rounded"
              required
            >
              <option value="">Select State of Origin</option>
              {states.map((s) => (
                <option key={s.idstates} value={s.state}>
                  {s.state}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="lga"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              LGA
            </label>
            <select
              id="lga"
              name="lga"
              value={formData.lga}
              onChange={handleChange}
              className="w-full border px-3 py-2 text-sm rounded"
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

          <div className="flex flex-col">
            <label
              htmlFor="selected_school_id"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Select School
            </label>
            <select
              id="selected_school_id"
              name="selected_school_id"
              value={formData.selected_school_id}
              onChange={(e) => {
                const selected = schools.find(
                  (s) => s.id.toString() === e.target.value
                );
                setFormData({
                  ...formData,
                  selected_school_id: e.target.value,
                  school_address: selected?.adress || "",
                  lga: selected?.lga || "",
                });
              }}
              className="w-full border px-3 py-2 text-sm rounded"
              required
            >
              <option value="">Select School</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.school_name}
                </option>
              ))}
            </select>
          </div>

          {/* School Address */}
          <div className="flex flex-col">
            <label
              htmlFor="school_address"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              School Address
            </label>
            <input
              id="school_address"
              type="text"
              name="school_address"
              value={formData.school_address}
              readOnly
              className="w-full border px-3 py-2 text-sm rounded bg-gray-100"
            />
          </div>
        </div>

        {/* Image Capture and Submit */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={openCamera}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Capture Image
          </button>

          {formData.image && (
            <div className="mt-2 flex justify-center">
              <Image
                src={formData.image}
                alt="Captured"
                width={200}
                height={200}
                className="rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Camera Modal */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <video ref={videoRef} autoPlay className="w-80 h-64 rounded" />
            <div className="flex justify-between mt-2">
              <button
                onClick={captureImage}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Capture
              </button>
              <button
                onClick={() => setCameraOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DependentAbssinForm;
