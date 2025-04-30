"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoModal from "./info";
import { CalendarIcon, PhoneIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function AddEmployee({ isOpen, onClose, onDelete, setIsOpen }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    permanentAddress: "",
    dob: undefined,
    isAdmin: false,
    role: "STANDARD",
    pin: "",
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

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      isAdmin: checked,
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dob: date,
    });
    if (errors.dob) {
      setErrors({
        ...errors,
        dob: "",
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
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.permanentAddress.trim())
      newErrors.permanentAddress = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.pin) newErrors.pin = "PIN is required";

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

  const [loading, setloading] = useState(false);
  const token = Cookies.get("token");
  const registerUser = async () => {
    try {
      setloading(true);

      const response = await GlobalApi.registerEmp(formData);

      if (response?.success === true) {
      } else {
        setloading(false);
        toast(
          response?.message ||
            "User with this Email or Firstname exists. Please use a different one"
        );
      }
    } catch (error) {
      console.log("error while registering user ", error);
      setloading(false);
      toast("Network Error");
    }
  };

  // const regBus = async (id) => {
  //   try {
  //     let comp = "Example";
  //     const response = await GlobalApi.RegBusn(id, comp);

  //     if (response?.success === true) {
  //       registerEmpl(response?.data?.id);
  //     } else {
  //       setloading(false);
  //     }
  //   } catch (error) {
  //     console.log("error while registering bussiness ", error);
  //     setloading(false);
  //     toast("Network Error");
  //   }
  // };

  // const registerEmpl = async (id) => {
  //   try {
  //     const response = await GlobalApi.registerEmp(formData, token, id);
  //     console.log("rr by me r", response);

  //     if (response?.success === true) {
  //       toast("Employee Created Successfully.");
  //       setloading(false);

  //       handleOpenModal();

  //       setTimeout(() => {
  //         handleCloseModal();
  //         onClose();
  //       }, 2000);
  //     } else {
  //       setloading(false);
  //       toast(
  //         response?.message || "Error while adding Employee. Please try again"
  //       );
  //     }
  //   } catch (error) {
  //     console.log("error while registering user ", error);
  //     setloading(false);
  //     toast("Network Error");
  //   }
  // };

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
                        <PhoneIcon className="h-4 w-4 text-gray-500" />
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full focus:outline-none focus:ring-0 border-0"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
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

                    {/* Permanent Address */}
                    <div>
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
                    </div>

                    <div>
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
                    </div>

                    {/* Date of Birth */}
                    <div>
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
                    </div>

                    {/* Role */}
                    <div>
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
                    </div>
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
