"use client";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import signinbg from "../../../assets/signin-bg.png";
import Keyicon from "../../../assets/key.svg";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function createpassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setloading] = useState(false);
  const ResetPass = async () => {
    try {
      if (!password || !confirmpassword) {
        toast("Password is necessary");
        return;
      }

      if (password.length < 6) {
        toast("Password must be at least 6 characters");
        return;
      }
      setloading(true);
      const email = localStorage.getItem("emailtoSignup");
      console.log(email);
      const response = await GlobalApi.ResetPassword(email, password);

      if (response?.success == true) {
        toast("Success");
        setloading(false);
        localStorage.removeItem("emailtoSignup");
      } else {
        toast(response?.message || "Error while reset password");

        setloading(false);
      }
    } catch (error) {
      console.log("error while reset pass", error);
      toast("Network Error");
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side - Image and overlay text */}
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

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <div className="text-center   pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-6 text-center">
              Create Password
            </h2>
            <p className="text-center text-sm font-medium p-color leading-6 w-3/4 mx-auto">
              Donec porta gravida rutrum. Etiam ultrices odio non dui facilisis,
              sollicitudin tincidunt{" "}
            </p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              ResetPass();
            }}
          >
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <span className="flex items-center gap-2 border border-color-input rounded-md px-3 py-2 md:px-4 md:py-3 w-full">
                <Keyicon />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </span>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="relative mt-4 sm:w-auto w-auto">
              <label htmlFor="new-password" className="sr-only">
                Create New Password
              </label>
              <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-2 md:px-4 md:py-3 w-full">
                <Keyicon />
                <input
                  id="new-password"
                  name="new-password"
                  type={showNewPassword ? "text" : "password"}
                  required
                  className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                  value={confirmpassword}
                  onChange={(e) => {
                    setconfirmpassword(e.target.value);
                  }}
                  placeholder="Re-Enter Password"
                />
              </span>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <button className="py-3 px-3 w-full mt-6 button-background rounded-lg text-white font-medium uppercase">
              {loading ? "Almost there..." : "Reset"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
