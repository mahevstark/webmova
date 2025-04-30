"use client";
import Image from "next/image";
import Avatar from "../../assets/Avatar.png";
import React, { useRef } from "react";

export default function Header() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="flex shadow-md justify-between px-10 w-full pt-4 pb-4 border-b mb-8 sticky top-0 bg-white z-10">
      {/* Left section with greeting and subtext */}
      <span>
        <p className="font-semibold text-xl text-gray-800">Hi, Tynisha!</p>
        <p className="text-sm text-gray-500">
          Let’s check your Dashboard today
        </p>
      </span>

      {/* Right section with avatar and name */}
      <span className="flex space-x-3">
        {/* Avatar with rounded-full to create a circular image */}
        {/* <span>
          <Image
            src={Avatar}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
            onClick={handleClick}
          />
        </span> */}
        <span className="flex flex-col">
          <p className="font-bold text-gray-800">Tynisha Obey</p>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }} // Hide the input
          />
          <p className="text-sm text-gray-500">KATRING</p>
        </span>
      </span>
    </div>
  );
}
