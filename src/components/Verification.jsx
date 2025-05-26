"use client";
import Image from "next/image";
import { React, useState, useRef, useEffect } from "react";
import signinbg from "../assets/signin-bg.png";
import Button from "../components/button/page";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Verification() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [canResend, setCanResend] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputRefs = useRef([]);
    const Router = useRouter();
    const [loading, setloading] = useState(false);
    const searchParams = useSearchParams();
    const reset = searchParams.get("reset");
    console.log('rrr', reset);


    // Timer effect
    useEffect(() => {
        let interval = null;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

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

    // New paste functionality
    const handlePaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();

        // Check if pasted data is numeric and 6 digits
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);

            // Focus on the last input after pasting
            if (inputRefs.current[5]) {
                inputRefs.current[5].focus();
            }


        } else if (/^\d+$/.test(pastedData) && pastedData.length > 0) {
            // Handle partial numeric paste
            const digits = pastedData.split('').slice(0, 6);
            const newOtp = [...otp];

            for (let i = 0; i < digits.length && (index + i) < 6; i++) {
                newOtp[index + i] = digits[i];
            }

            setOtp(newOtp);

            // Focus on next empty field or last filled field
            const nextIndex = Math.min(index + digits.length, 5);
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        } else {
            toast("Please paste a valid 6-digit OTP");
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e, index) => {
        // Handle Ctrl+V for paste
        if (e.ctrlKey && e.key === 'v') {
            // Let the paste event handle it
            return;
        }

        // Handle Ctrl+A for select all
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            // Select all OTP inputs by focusing on first and selecting content
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
                inputRefs.current[0].select();
            }
            return;
        }

        // Handle arrow keys for navigation
        if (e.key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
            e.preventDefault();
            inputRefs.current[index + 1].focus();
        }

        // Handle backspace
        handleBackspace(e, index);
    };

    const handleResendOTP = async () => {
        try {
            // Call your resend OTP API here
            await resendOTPAPI();

            // Reset timer
            setTimer(60);
            setIsTimerActive(true);
            setCanResend(false);
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        }
    };

    const handleVerifyOTP = async () => {
        const otpString = otp.join("");

        if (otpString.length !== 6) {
            toast("Please enter complete OTP");
            return;
        }

        setIsVerifying(true);

        try {
            const email = localStorage.getItem("emailtoSignup");
            console.log(email);


            const response = await GlobalApi.verifyOtp(email, otpString);

            if (response?.success === true) {
                setIsVerifying(false);
                toast("OTP verified");
                reset
                    ? Router.push("/auth/create-password")
                    : Router.push("/auth/create-profile");
            } else {
                toast(response?.message || "Error while validating your OTP");
                setIsVerifying(false);
            }
        } catch (error) {
            console.log("error while validating the otp", error);
            setIsVerifying(false);
        }
    };

    // API functions (to be implemented)
    const resendOTPAPI = async () => {
        try {
            setloading(true);
            const email = localStorage.getItem("emailtoSignup");
            console.log(email);
            const response = await GlobalApi.SendOtp(email, false);

            if (response?.success === true) {
                setloading(false);
                toast("Otp sent");
                localStorage.setItem("emailtoSignup", email);
            } else {
                setloading(false);

                toast(response?.message || "Error while sending OTP");
            }
        } catch (error) {
            console.log("error in sending OTP", error);

            setloading(false);
            toast("Network Error");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
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
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-4 text-center">
                            Enter Verification Code{" "}
                        </h2>
                        <p className="text-center text-sm font-medium p-color leading-6 w-3/2 mx-auto">
                            Secure your account with a one-time code
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
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={(e) => handlePaste(e, index)}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        className="w-full h-full border-0 outline-none focus:ring-0 text-center"
                                        maxLength={1}
                                    />
                                </span>
                            ))}
                        </div>

                        <span>
                            {isTimerActive ? (
                                <p className="text-green-700 font-semibold">
                                    {formatTime(timer)}
                                </p>
                            ) : (
                                <p className="text-red-500 font-semibold">Time expired</p>
                            )}
                            {canResend ? (
                                <button
                                    onClick={handleResendOTP}
                                    className="text-blue-600 mt-1 hover:underline cursor-pointer"
                                >
                                    {loading ? "Sending OTP..." : "Send again"}
                                </button>
                            ) : (
                                <p className="text-gray-400 mt-1">Send again</p>
                            )}
                        </span>

                        <div onClick={handleVerifyOTP}>
                            <Button
                                value={isVerifying ? "Verifying..." : "Verify"}
                                classname="py-3 px-3 w-full "
                                disabled={isVerifying || !isTimerActive}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}