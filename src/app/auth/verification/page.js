"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import signinbg from "../../../assets/signin-bg.png";
import Button from "../../../components/button/page";
import Link from "next/link";

export default function Verification() {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); 
    setOtp(newOtp);

    
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative w-full md:w-1/2 bg-gray-900 h-1/2 md:h-full">
        <Image
          src={signinbg}
          alt="Calculator app on smartphone"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-50 px-6 pb-6 pt-4 md:px-11 md:pb-10 md:pt-7 flex flex-col justify-between">
          <div className="text-white text-xl md:text-3xl font-bold">MOWA</div>
          <div className="text-white w-full md:w-[502px]">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
              Lorem ipsum dolor sit amet, consectetur.
            </h1>
            <p className="text-base md:text-lg">
              Praesent gravida tincidunt blandit. Ut porta aliquet nulla. Nullam
              vel metus semper, ullamcorper ipsum sed, lacinia mauris.
              Suspendisse potenti.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md text-center flex items-center justify-center flex-col">
          <div className="text-center pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-6 text-center">
              Verify your Number{" "}
            </h2>
            <p className="text-center text-sm font-medium p-color leading-6 w-3/4 mx-auto">
              Donec porta gravida rutrum. Etiam ultrices odio non dui facilisis,
              sollicitudin tincidunt{" "}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex gap-5 mx-auto pb-6">
              {otp.map((digit, index) => (
                <span
                  key={index}
                  className="flex items-center w-11 h-10 border-2 border-color-input rounded-lg p-2"
                >
                  <input
                    type="tel"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-full h-full border-0 outline-none focus:ring-0 text-center"
                  />
                </span>
              ))}
            </div>

            <span>
              <p className="text-green-700 font-semibold">00:54</p>
              <p className="text-gray-400 mt-1">Send again</p>
            </span>

            <Link href="/auth/create-password">
              <Button value="Verify" classname="py-3 px-3 w-full mt-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
