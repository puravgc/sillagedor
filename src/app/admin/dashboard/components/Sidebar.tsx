"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Sidebar({ selectedPage }: { selectedPage: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSelectedPage = (page: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="w-64 bg-gray-100 p-6 border-r">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <button
            className={`w-full text-left p-2 rounded ${
              selectedPage === "add"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedPage("add")}
          >
            Add Product
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left p-2 rounded ${
              selectedPage === "view"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedPage("view")}
          >
            View Products
          </button>
        </li>
      </ul>
    </aside>
  );
}
