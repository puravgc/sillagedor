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
} from "@/components/ui/dialog"; // ShadCN Dialog components
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import LocationPicker from "../locationpicker/Location";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    [number, number] | null
  >(null);
  console.log(selectedLocation);
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setIsSignUp(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl font-semibold">
            {isSignUp ? "Sign Up" : "Login"}
          </DialogTitle>
        </div>

        {/* Google login button */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaGoogle />
            <p>Login with Google</p>
          </Button>
        </div>

        <div className="space-y-4 mt-6">
          {isSignUp && (
            <div className="flex gap-4">
              <div className="w-1/2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="w-1/2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
