"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export default function LoginAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const alertParam = searchParams.get("alert");

    if (alertParam === "login") {
      toast.error("Please login first");

      // Remove the alert param from the URL
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("alert");
      router.replace(`?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#333",
        },
      }}
    />
  );
}
