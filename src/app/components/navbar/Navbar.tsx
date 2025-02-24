"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PiShoppingCartThin } from "react-icons/pi";
import { IoMenuOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LoginModal from "@/app/components/loginmodal/LoginModal";

export default function Navbar() {
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/collections"
            className="text-gray-700 hover:text-black relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-black relative group"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-black relative group"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-5 font-light">
            <CiSearch size={24} className=" cursor-pointer" />
            <CiUser
              size={24}
              className=" cursor-pointer"
              onClick={() => setIsLoginOpen(true)}
            />
            <PiShoppingCartThin size={24} className=" cursor-pointer" />
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
