"use client";
import React, { useRef } from "react";
import { useUser } from "@/app/provider/UserProvider";

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
          Hi, {user?.firstName} {user?.lastName}
        </p>
        <p className="text-sm text-gray-500">
          Let’s check your Dashboard today
        </p>
      </span>

      {/* Right section with avatar and name */}
      <span className="flex space-x-3">
        {/* Avatar with rounded-full to create a circular image */}
        <span>
          {/* <Image
            src={Avatar}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
            onClick={handleClick}
          /> */}
        </span>
        <span className="flex flex-col max-sm:hidden">
          <p className="font-bold text-gray-800">
            {user?.firstName} {user?.lastName}
          </p>
          <input ref={fileInputRef} type="file" style={{ display: "none" }} />
          <p className="text-sm text-gray-500">{user?.email}</p>
        </span>
      </span>
    </div>
  );
}
