"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BounceLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  location: [number, number];
};

export default function UserDetails() {
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    location: [0, 0],
  });
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`/api/details?userId=${Cookies.get("session")}`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <BounceLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
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

        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600 mb-1"
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

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600 mb-1"
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

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Location
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Longitude"
                value={user.location[0]}
                onChange={(e) =>
                  setUser({
                    ...user,
                    location: [parseFloat(e.target.value), user.location[1]],
                  })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Latitude"
                value={user.location[1]}
                onChange={(e) =>
                  setUser({
                    ...user,
                    location: [user.location[0], parseFloat(e.target.value)],
                  })
                }
                className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-100 w-full sm:w-auto"
          >
            Change Password
          </Button>
          <Button
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-100 w-full sm:w-auto"
          >
            Update Location
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
