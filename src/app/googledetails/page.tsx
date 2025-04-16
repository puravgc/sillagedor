"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input"; // Adjust imports based on your setup
import { Button } from "@/components/ui/button"; // Adjust imports based on your setup
import LocationPicker from "@/app/components/locationpicker/Location"; // Make sure this component is set up correctly
import { BounceLoader } from "react-spinners";

const Page = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setEmail(session.user?.email || "");
      setFirstName(session.user?.firstName || "");
      setLastName(session.user?.lastName || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          location: selectedLocation,
        }),
      });

      if (res.ok) {
        // Handle success (e.g., show a success message)
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div>
          <BounceLoader />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div>
          <BounceLoader />
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-gray-200"
      style={{
        backgroundImage: "url('your-background-image-url.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg border border-gray-400 shadow-2xl backdrop-blur-md bg-opacity-50 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Fill Your Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 p-2 border rounded-lg w-full"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-2 p-2 border rounded-lg w-full"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <LocationPicker setSelectedLocation={setSelectedLocation} />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Submiting..." : "Submit Details"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
