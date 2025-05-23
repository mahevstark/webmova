"use client";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import signinbg from "../../../assets/signin-bg.png";
import Callicon from "../../../assets/call-icon.svg";
import Keyicon from "../../../assets/key.svg";
import Button from "../../../components/button/page";
import GlobalApi from "../../../lib/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function signup() {
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState(null);

    const router = useRouter();

    const singup = async (e) => {
        e.preventDefault();
        try {
            setloading(true);

            if (!email) {
                toast("Email is required");
                return;
            }

            const response = await GlobalApi.SendOtp(email, true);


            if (response?.success === true) {
                setloading(false);
                toast("Otp sent");
                localStorage.setItem('emailtoSignup', email);

                router.push("/auth/verification");

            } else {
                setloading(false);

                toast("Singup Error", {
                    description: response?.message || "Error while Singup",
                });
            }
        } catch (error) {
            console.log("error in singup", error);

            setloading(false);
            toast({
                title: "SigUn Error",
                description: "Network Error",
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side - Image and overlay text */}
            <div className="relative w-full md:w-1/2 bg-gray-900 h-1/2 md:h-full">
                <Image
                    src={signinbg}
                    alt="Calculator app on smartemail"
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
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 text-center">
                        Create New Account
                    </h2>
                    <form className="space-y-4" onSubmit={singup}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <span className="flex items-center gap-2 border border-color-input rounded-md px-3 py-2 md:px-4 md:py-3 w-full">
                                <Callicon />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder:text-gray-400 text-black "
                                    placeholder="Enter Your Email"
                                    value={email || ""}
                                    onChange={(e) => setemail(e.target.value)}
                                />
                            </span>
                        </div>
                        <div className="  text-right text-base  text-black">
                            Have an Account?{" "}
                            <Link
                                href="/auth/signin"
                                className=" text-right text-base  text-black "
                            >
                                Signin now
                            </Link>
                        </div>
                        <Button
                            value={loading ? "Signing in..." : "Sign in"}
                            classname="py-3 px-3 w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
