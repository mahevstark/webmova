"use client";
import Image from "next/image";
import { useState } from "react";
import signinbg from "../../../assets/signin-bg.png";
import Callicon from "../../../assets/call-icon.svg";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function forgotpassword() {
  const [phonenumber, setphonenumber] = useState("");
  const [loading, setloading] = useState(false);

  const Router = useRouter();
  const forgotpasswod = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await GlobalApi.SendOtp(phonenumber, false);

      if (response?.success === true) {
        setloading(false);
        toast("Otp sent");
        localStorage.setItem("emailtoSignup", phonenumber);

        Router.push("/auth/verification?reset=true");
      } else {
        setloading(false);

        toast(response?.message || "Error while Singup");
      }
    } catch (error) {
      console.log("error in forget pass", error);

      setloading(false);
      toast("Network Error");
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
              Forget Password
            </h2>
            <p className="text-center text-sm font-medium p-color leading-6 w-3/4 mx-auto">
              Donec porta gravida rutrum. Etiam ultrices odio non dui facilisis,
              sollicitudin tincidunt{" "}
            </p>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <span className="flex items-center gap-2 border border-color-input rounded-md px-3 py-2 md:px-4 md:py-3 w-full">
                <Callicon />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full focus:outline-none text-black focus:ring-0 border-0 placeholder:text-gray-400"
                  placeholder="Enter Your Email"
                  value={phonenumber}
                  onChange={(e) => {
                    setphonenumber(e.target.value);
                  }}
                />
              </span>
            </div>{" "}
            <button
              onClick={forgotpasswod}
              className="py-3 px-3 w-full mt-6 button-background rounded-lg text-white font-medium uppercase"
            >
              {loading ? "Almost there..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
