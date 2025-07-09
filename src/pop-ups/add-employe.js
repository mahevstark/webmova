"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import InfoModal from "./info"
import GlobalApi from "../lib/GlobalApi"
import { toast } from "sonner"
import Cookies from "js-cookie"
import ImageUpload from "../components/ImageUpload"

export default function AddEmployee({ isOpen, onClose, employee }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [profilePicture, setProfilePicture] = useState("")
  const [resetImageUpload, setResetImageUpload] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[0-9]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Invalid phone number format"
    }
    if (Role === "admin") {
      if (!formData?.password) {
        newErrors.password = "Password is required"
      } else if (formData?.password.length !== 8) {
        newErrors.password = "Password must be 8 charachters long"
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      registerUser()
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    })
    setProfilePicture("")
    setErrors({})
    setResetImageUpload(true)
    // Reset the image upload reset flag after a brief delay
    setTimeout(() => setResetImageUpload(false), 100)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleCancel = () => {
    resetForm()
    onClose()
  }

  const [Role, setRole] = useState("")
  useEffect(() => {
    const role = Cookies.get("role")
    setRole(role)
  }, [])

  const [loading, setloading] = useState(false)

  const registerUser = async () => {
    try {
      setloading(true)
      const token = Cookies.get("token")
      const role = Cookies.get("role")
      setRole(role)
      const data = JSON.parse(localStorage.getItem("userData"))
      const response = await GlobalApi.registerEmp({ ...formData, profilePicture }, token, data?.business?.id, role)
      console.log("rrr for adding employeee", response)
      if (role === "admin") {
        console.log("i am here")
        if (response?.status === 200) {
          employee()
          toast("Employee Added Successfully")
          onClose()
          setloading(false)
          resetForm()
        } else {
          setloading(false)
          toast(response?.message || "User with this Email  or Phone number exists. Please use a different one")
          setloading(false)
          onClose()
          resetForm()
        }
      } else {
        if (response?.success === true) {
          employee()
          toast("Employee Added Successfully")
          onClose()
          setloading(false)
          resetForm()
        } else {
          setloading(false)
          toast(response?.data?.message || "User with this Email or Phone number exists. Please use a different one")
          setloading(false)
          onClose()
          resetForm()
        }
      }
    } catch (error) {
      console.log("error while registering user ", error)
      setloading(false)
      toast("Network Error")
      setloading(false)
      resetForm()
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 cls bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCancel}
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
                  <CardTitle className="text-xl font-semibold text-center">Add Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center mb-4">
                    <ImageUpload setURL={setProfilePicture} initialUrl={profilePicture} reset={resetImageUpload} />
                  </div>
                  <p className="text-sm text-p font-medium mb-4">
                    Fill in the details to add a new employee to your organization.
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
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
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
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
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
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4 px-6 py-4">
                  <button
                    onClick={handleCancel}
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
      <InfoModal open={isModalOpen} onClose={handleCloseModal} title={"Invitation Sent"} />
    </>
  )
}
