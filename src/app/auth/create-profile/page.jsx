"use client";
import Image from "next/image";
import { React, useState } from "react";
import signinbg from "../../../assets/signin-bg.png";
import Button from "../../../components/button/page";
import Link from "next/link";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import { useUser } from "@/app/provider/UserProvider";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        permanentAddress: "",
        password: "",
        transactionPIN: ""
    });
    const { setlogin } = useUser();

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        }

        if (!formData.permanentAddress.trim()) {
            newErrors.permanentAddress = "Permanent address is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.transactionPIN) {
            newErrors.transactionPIN = "Transaction PIN is required";
        } else if (formData.transactionPIN.length !== 6) {
            newErrors.transactionPIN = "Transaction PIN must be 6 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Create FormData object
            const submitData = new FormData();
            submitData.append('firstName', formData.firstName);
            submitData.append('lastName', formData.lastName);
            submitData.append('phoneNumber', formData.phoneNumber);
            submitData.append('dob', formData.dob);
            submitData.append('permanentAddress', formData.permanentAddress);
            submitData.append('password', formData.password);
            submitData.append('transactionPIN', formData.transactionPIN);

            // Call your API here
            createProfileAPI(submitData);



        } catch (error) {
            console.log('Failed to create profile:', error);

        }
    };

    const createProfileAPI = async (formData) => {
        try {
            const email = localStorage.getItem("emailtoSignup");
            const response = await GlobalApi.CreateProfile(formData, email);
            console.log('eee', response);

            if (response?.success === true) {
                toast("Profile Created successfully");
                setIsSubmitting(false);

                setlogin(response?.data?.user, response?.data?.token);

                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            } else {
                toast(response?.message || "Failed to create Profile");
                setIsSubmitting(false);

            }
        } catch (error) {
            console.log('error creating profile ', error);
            toast("Network Error");
            setIsSubmitting(false);


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

            <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="text-center pb-6">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-6 text-center">
                            Create Your Profile
                        </h2>
                        <p className="text-center text-sm font-medium p-color leading-6 w-3/2 mx-auto">
                            Complete your profile to get started
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.firstName ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.lastName ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.phoneNumber ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                placeholder="Date of Birth"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.dob ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.dob && (
                                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                            )}
                        </div>

                        <div>
                            <textarea
                                name="permanentAddress"
                                value={formData.permanentAddress}
                                onChange={handleInputChange}
                                placeholder="Permanent Address"
                                rows="3"
                                className={`w-full px-4 py-3 border-2 rounded-lg outline-none focus:ring-0 resize-none ${errors.permanentAddress ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.permanentAddress && (
                                <p className="text-red-500 text-sm mt-1">{errors.permanentAddress}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.password ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="transactionPIN"
                                value={formData.transactionPIN}
                                onChange={handleInputChange}
                                placeholder="4-Digit Transaction PIN"
                                maxLength="6"
                                className={`w-full h-12 px-4 border-2 rounded-lg outline-none focus:ring-0 ${errors.transactionPIN ? 'border-red-500' : 'border-color-input'
                                    }`}
                            />
                            {errors.transactionPIN && (
                                <p className="text-red-500 text-sm mt-1">{errors.transactionPIN}</p>
                            )}
                        </div>

                        <Button
                            value={isSubmitting ? "Creating Profile..." : "Create Profile"}
                            classname="py-3 px-3 w-full mt-6"
                            disabled={isSubmitting}
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}