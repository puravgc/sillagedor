"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import LocationPicker from "@/app/components/locationpicker/Location";
import toast, { Toaster } from "react-hot-toast";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  location: [number, number];
};

export default function UserDetails() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    location: [0, 0],
  });
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);

  const fetchExtendedDetails = async (email: string) => {
    try {
      const res = await fetch(`/api/details?email=${email}`);
      const data = await res.json();
      console.log(data);

      if (data && data.firstName) {
        setUser({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || email,
          location:
            Array.isArray(data.location) && data.location.length === 2
              ? data.location
              : [0, 0],
        });
      } else {
        const nameParts = session?.user?.name?.split(" ") || [];
        setUser({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: email,
          location: [0, 0],
        });
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    const email = session?.user?.email;
    if (email) {
      fetchExtendedDetails(email);
    } else {
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    if (selectedLocation) {
      setUser((prev) => ({
        ...prev,
        location: selectedLocation,
      }));
    }
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <BounceLoader color="#3b82f6" size={60} />
      </div>
    );
  }

  const updateUser = async () => {
    try {
      const response = await fetch("/api/updateuser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          location: user.location,
        }),
      });
      fetchExtendedDetails(user.email);
      toast.success("Successfully Updated");
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-250 px-4">
      <Toaster />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="w-full max-w-2xl bg-white rounded-2xl p-8 border shadow-2xl"
      >
        <div className="w-full flex justify-center">
          <CiUser className="h-24 w-24" />
        </div>

        {/* --- FORM --- */}
        <div className="space-y-6 mt-6">
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-600 mb-1 block"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-600 mb-1 block"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600 mb-1 block"
            >
              Email
            </label>
            <input
              disabled
              id="email"
              type="email"
              value={user.email}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Location
            </label>
            <div className="flex gap-2 mb-2">
              <input
                disabled
                type="text"
                placeholder="Latitude"
                value={user.location[0]?.toFixed(5) || ""}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                disabled
                type="text"
                placeholder="Longitude"
                value={user.location[1]?.toFixed(5) || ""}
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <LocationPicker setSelectedLocation={setSelectedLocation} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex mt-5">
          <Button className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-700">
            Change Password
          </Button>
        </div>
        <div className="w-full flex justify-start mt-6">
          <Button className="w-1/2" onClick={updateUser}>
            Update
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
