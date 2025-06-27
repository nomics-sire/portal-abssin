"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useDropdownData } from "@/hooks/useDropdownData"; // Update the path as necessary
import Image from "next/image";

interface School {
  id: number;
  school_name: string;
  adress: string;
  lga: string;
  category: string;
}

const DependentAbssinForm: React.FC = () => {
  const { request, loading } = useApi();
  const { states } = useDropdownData();

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
    guardian_phone_number: "",
    guardian_abssin: "",
    school_name: "",
    school_address: "",
    agent_email: "",
    image: "",
  });

  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch schools on mount
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

  // Handle camera
  const openCamera = async () => {
    setCameraOpen(true);
    if (navigator.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
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
    console.log("formdata", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow text-gray-800">
      <h2 className="text-xl font-semibold mb-4">
        Dependent ABSSIN Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {[
  "first_name",
  "middle_name",
  "surname",
  "birth_date",
  "guardian_phone_number",
  "guardian_abssin",
  "agent_email",
].map((field) => {
  const label =
    field === "agent_email"
      ? "Guardian Email"
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
        required
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
              htmlFor="student_school_id"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              School
            </label>
            <select
              id="student_school_id"
              name="student_school_id"
              value={formData.student_school_id}
              onChange={(e) => {
                const selected = schools.find(
                  (s) => s.id.toString() === e.target.value
                );
                setFormData({
                  ...formData,
                  student_school_id: e.target.value,
                  school_name: selected?.school_name || "",
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

        {/* Camera Capture & Image Display */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={openCamera}
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {/* Camera Preview */}
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
