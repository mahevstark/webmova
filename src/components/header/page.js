"use client";
import React, { useRef } from "react";
import { useUser } from "@/app/provider/UserProvider";
import Avatar from "../../assets/Avatar.png";
import Image from "next/image";
import { User } from "lucide-react";

export default function Header() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const { user } = useUser();

  return (
    <div className="flex shadow-md justify-between px-10 w-full pt-4 pb-4 border-b mb-8 md:sticky top-0 bg-white z-10 flex-wrap">
      {/* Left section with greeting and subtext */}
      <span>
        <p className="font-semibold text-xl text-gray-800">
          Hi, {user?.firstName || "Bussiness User"} {user?.lastName}
        </p>
        <p className="text-sm text-gray-500">
          Let’s check your Dashboard today
        </p>
      </span>

      {/* Right section with avatar and name */}
      <span className="flex space-x-3 items-center">
        {/* Avatar with rounded-full to create a circular image */}
        <span className="border rounded-full p-2 border-black">
          <User />
        </span>
        <span className="flex flex-col max-sm:hidden">
          <p className="font-bold text-gray-800">
            {user?.firstName || "Bussiness User"} {user?.lastName}
          </p>
          <input ref={fileInputRef} type="file" style={{ display: "none" }} />
          <p className="text-sm text-gray-500">{user?.email}</p>
        </span>
      </span>
    </div>
  );
}
