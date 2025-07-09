"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff, MailIcon } from "lucide-react";
import signinbg from "../../assets/signin-bg.png";
import Callicon from "../../assets/call-icon.svg";
import Keyicon from "../../assets/key.svg";
import Button from "../../components/button/page";
import GlobalApi from "../../lib/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUser } from "../../app/provider/UserProvider";
import { useSearchParams } from "next/navigation";

export default function signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [phone, setphone] = useState(null);
  const [pass, setpass] = useState(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const isAdmin = role === "admin";

  const { setlogin } = useUser();
  const checkType = (str) => {
    if (!str || typeof str !== "string") return "Unknown";
    const value = str.trim();

    // Email: RFC 5322 Official Standard (simplified)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Phone: E.164 international format, e.g. +1234567890 (10-15 digits)
    const phoneRegex = /^\d{10,15}$/;

    if (emailRegex.test(value)) return "Email";
    if (phoneRegex.test(value)) return "Phone";
    return "Unknown";
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (!phone || !pass) {
        setloading(false);
        toast("Please fill all fields");
        return;
      }


      const role = checkType(phone) === "Email" ? "admin" : "businessUser";
      console.log("role to sign in", role); 
      const response = await GlobalApi.login(phone, pass, role);
      console.log("response", response);

      // Enhanced security: check role and isAdmin from backend response
      const userRole = response?.data?.user?.role || response?.data?.role;
      const isAdminFlag = response?.data?.user?.isAdmin ?? response?.data?.isAdmin;

      console.log("userRole", userRole);
      console.log("isAdminFlag", isAdminFlag);

      if (response?.status === 200) {
        if (userRole === "STANDARD" && isAdminFlag === true) {
          setlogin(response?.data?.user, response?.data?.token, "admin");
          setloading(false);
          toast("Login Success");
        } else if (userRole === "BUSINESS" && isAdminFlag === false) {
          setlogin(response?.data?.data?.user || response?.data?.user, response?.data?.data?.token || response?.data?.token, "businessUser");
          setloading(false);
          toast("Login Success");
        } else {
          setloading(false);
          toast("Access Denied: Role mismatch or insufficient privileges", { description: "Please check your credentials or contact support." });
          return;
        }
      } else {
        setloading(false);
        toast("Login Error", {
          description: response?.message,
        });
      }
    } catch (error) {
      console.log("error in login", error);

      setloading(false);
      toast({
        title: "Sigin Error",
        description: "Network Error",
      });
    }
  };

  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token]);

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
          <div className="text-white w-full 2xl:w-[502px] lg:w-[440px]">
            <h1 className="2xl:text-4xl  lg:text-2xl xl:text-4xl font-bold mb-2 md:mb-4">
              Mowapay — Simplify Your Payments, Amplify Your Life.
            </h1>
            <p className="2xl:text-lg xl:text-lg md:text-lg">
              Mowapay is your all-in-one payment solution designed to make
              transactions hassle-free.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">
            Welcome Back
          </h2>
          <form className="space-y-4" onSubmit={login}>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <span className="flex items-center gap-2 border border-color-input rounded-md px-3 py-2 md:px-4 md:py-3 w-full">
                {isAdmin ? (
                  <MailIcon className="text-gray-400" />
                ) : (
                  <Callicon />
                )
                }
                <input
                  id="phone"
                  name="phone"
                  type={isAdmin ? "email" : "tel"}
                  required
                  className="w-full focus:outline-none text-black focus:ring-0 border-0 placeholder:text-gray-400"
                  placeholder={
                    isAdmin ? "Enter your Email" : "Enter Your Phone Number (e.g. 1234567890)"
                  }
                  value={phone || ""}
                  onChange={(e) => setphone(e.target.value)}
                />
              </span>
            </div>
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
                  className="w-full focus:outline-none  focus:ring-0 border-0 placeholder-gray-400 text-black"
                  placeholder="Enter your Password"
                  value={pass || ""}
                  onChange={(e) => setpass(e.target.value)}
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
            <div className="flex flex-col gap-1">
              {!isAdmin && (
                <div className="  text-right text-sm  text-black">
                  Forgot Password?{" "}
                  <Link
                    href="/auth/forgot-password"
                    className=" text-right text-sm font-semibold  text-[#544af1] "
                  >
                    Reset Now
                  </Link>
                </div>
              )}
            </div>
            <Button
              value={loading ? "Signing in..." : "Sign in"}
              classname="py-3 px-3  w-full font-semibold text-base"
            />
            {!isAdmin && (
              <div className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-[#544af1] font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
