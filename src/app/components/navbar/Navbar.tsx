"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { PiShoppingCartThin } from "react-icons/pi";
import { IoMenuOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { PiSignOutThin } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LoginModal from "@/app/components/loginmodal/LoginModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignOutModal from "../signoutmodal/SignOutModal";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <header className="">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex justify-center items-center">
          <Image src={"/logo.png"} height={65} width={65} alt="logo" />
          <Link href="/" className="text-xl">
            Sillage D'or
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-10">
            <CiSearch size={24} className=" cursor-pointer" />
            <CiUser
              size={24}
              className=" cursor-pointer"
              onClick={() => {
                if (session || Cookies.get("session")) {
                  router.push("/details");
                } else {
                  setIsLoginOpen(true);
                }
              }}
            />
            <PiShoppingCartThin size={24} className=" cursor-pointer" />
            {(session || Cookies.get("session")) && <SignOutModal />}
          </div>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2 md:hidden">
                <IoMenuOutline className="h-6 w-6 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-black">
              <DropdownMenuItem asChild>
                <Link href="/collections">Collections</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-center">
        <hr className=" w-[90%] border-gray-400" />
      </div>
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}
