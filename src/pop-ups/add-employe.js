"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import InfoModal from "./info";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "../../lib/utils";
import GlobalApi from "../lib/GlobalApi";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function AddEmployee({ isOpen, onClose, employee }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    if (Role === "admin") {
      if (!formData?.password) {
        newErrors.password = "Password is required";
      } else if (formData?.password.length !== 8) {
        newErrors.password = "Password must be 8 charachters long";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      registerUser();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [Role, setRole] = useState("");

  useEffect(() => {
    const role = Cookies.get("role");
    setRole(role);
  }, []);

  const [loading, setloading] = useState(false);
  const registerUser = async () => {
    try {
      setloading(true);
      const token = Cookies.get("token");
      const role = Cookies.get("role");
      setRole(role);
      const data = JSON.parse(localStorage.getItem("userData"));
      const response = await GlobalApi.registerEmp(
        formData,
        token,
        data?.business?.id,
        role
      );
      console.log("rrr for adding employeee", response);

      if (role === "admin") {
        console.log("i am here");

        if (response?.status === 200) {
          employee();
          toast("Employee Added Successfully");
          onClose();
          setloading(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
        } else {
          setloading(false);
          toast(
            response?.message ||
              "User with this Email Firstname or Phonenumber exists. Please use a different one"
          );
          setloading(false);
          onClose();
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
        }
      } else {
        if (response?.success === true) {
          employee();
          toast("Employee Added Successfully");
          onClose();
          setloading(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
        } else {
          setloading(false);
          toast(
            response?.data?.message ||
              "User with this Email Firstname or Phonenumber exists. Please use a different one"
          );
          setloading(false);
          onClose();
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.log("error while registering user ", error);
      setloading(false);
      toast("Network Error");
      setloading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 cls bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
          style={{ zIndex: 50 }}
        >
          <div
            className="bg-white rounded-lg overflow-hidden relative"
            style={{ width: "90%", maxWidth: "480px", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto" style={{ maxHeight: "90vh" }}>
              <Card className="shadow-none border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-center">
                    Add Employee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-p font-medium mb-4">
                    Fill in the details to add a new employee to your
                    organization.
                  </p>

                  <div className="space-y-4">
                    {/* First Name */}
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="first Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="flex items-center gap-2 border border-input rounded-md px-3 py-2 md:px-4 md:py-2 w-full">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full focus:outline-none focus:ring-0 border-0"
                          placeholder="Phone Number"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {Role === "admin" && (
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    )}
                    {/* Password

                    {/* Permanent Address */}
                    {/* <div>
                      <Label htmlFor="permanentAddress">
                        Permanent Address
                      </Label>
                      <Input
                        id="permanentAddress"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleInputChange}
                        className={
                          errors.permanentAddress ? "border-red-500" : ""
                        }
                      />
                      {errors.permanentAddress && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.permanentAddress}
                        </p>
                      )}
                    </div> */}

                    {/* <div>
                      <Label htmlFor="pin">Transaction PIN</Label>
                      <Input
                        id="pin"
                        name="pin"
                        value={formData.pin}
                        onChange={handleInputChange}
                        className={errors.pin ? "border-red-500" : ""}
                      />
                      {errors.pin && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.pin}
                        </p>
                      )}
                    </div> */}

                    {/* Date of Birth */}
                    {/* <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            id="dob"
                            className={cn(
                              "w-full flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm",
                              !formData.dob && "text-muted-foreground",
                              errors.dob && "border-red-500"
                            )}
                          >
                            {formData.dob
                              ? format(formData.dob, "PPP")
                              : "Select date"}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dob}
                            onSelect={handleDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dob && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.dob}
                        </p>
                      )}
                    </div> */}

                    {/* Role */}
                    {/* <div>
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={handleRoleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="STANDARD">Standard</SelectItem>
                          <SelectItem value="EMPLOYEE">Employee</SelectItem>
                          <SelectItem value="BUSINESS">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div> */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 px-6 py-4">
                  <button
                    onClick={onClose}
                    className="btn-border btn-txt-color w-full text-gray-700 font-semibold border rounded-lg p-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="button-background bg-blue-600 text-white w-full font-semibold border rounded-lg p-2 hover:bg-blue-700"
                  >
                    {loading ? "Almost there..." : "Add"}
                  </button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      )}
      <InfoModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={"Invitation Sent"}
      />
    </>
  );
}
