"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PiSignOutThin } from "react-icons/pi";

export default function SignOutModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    Cookies.remove("session");
    signOut();
  };

  return (
    <>
      {/* Sign Out Button */}
      <PiSignOutThin
        size={24}
        className="cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      />

      {/* Sign Out Confirmation Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-gray-500">
              You will be signed out of your account.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
