"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import LocationPicker from "../locationpicker/Location";
import { useSession, signIn, signOut } from "next-auth/react";
import Cookies from "js-cookie";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { data: session } = useSession();

  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setloading] = useState(false);
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (isSignUp) {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            location: selectedLocation,
          }),
        });
        if (!res.ok) throw new Error("Failed to signup");
        const data = await res.json();
        setIsSignUp(false);
        setloading(false);
      } catch (error) {
        console.error(error);
        setloading(false);
      }
    } else {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (!res.ok) throw new Error("Failed to login");
        const data = await res.json();
        setloading(false);
      } catch (error) {
        console.error(error);
        setloading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold text-center w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </DialogTitle>
        </div>

        <div className="mt-6 flex justify-center" onClick={handleGoogleLogin}>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaGoogle />
            <p>Login with Google</p>
          </Button>
        </div>

        <form className="space-y-4 mt-6" onSubmit={handleLoginSubmit}>
          {isSignUp && (
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email">{isSignUp ? "Email" : "Email"}</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {isSignUp && (
            <div>
              <LocationPicker setSelectedLocation={setSelectedLocation} />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          <div className="flex justify-between mt-4 text-sm">
            {!isSignUp ? (
              <p
                onClick={handleSignUpClick}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                Don't have an account? Sign up
              </p>
            ) : (
              <p
                onClick={handleLoginClick}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                Already have an account? Login
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
