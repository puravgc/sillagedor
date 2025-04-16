"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import LocationPicker from "@/app/components/locationpicker/Location";

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

  const fetchExtendedDetails = async (email: string) => {
    try {
      const res = await fetch(`/api/details?email=${email}`);
      const data = await res.json();

      // If user is found in DB, use those details
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
        // Else, fallback to session name/email
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

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <BounceLoader color="#3b82f6" size={60} />
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Location
            </label>
            <div className="">
              <div className="flex mb-2">
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
              <LocationPicker />
            </div>
          </div>
        </div>

        {/* Buttons */}
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
