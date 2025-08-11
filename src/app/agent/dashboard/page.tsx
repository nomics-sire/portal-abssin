"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import IndividualProfile from "@/components/IndividualProfile";
import NonIndividualProfile from "@/components/NonIndividualProfile";

interface DecodedToken {
  type: string;
}

const UserDashboardPage = () => {
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("agent_token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserType(decoded.type);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);
  return (
    <>
      {/* {userType === "INDIVIDUAL" ? (
        <IndividualProfile />
      ) : userType === "NON_INDIVIDUAL" ? (
        <NonIndividualProfile />
      ) : (
        <div className="text-center py-10 text-red-600">Unknown user type.</div>
      )} */}
      Agent Dashboard
    </>
  );
};

export default UserDashboardPage;
