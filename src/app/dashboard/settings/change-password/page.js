"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import Keyicon from "../../../../assets/key.svg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InfoModal from "../../../../pop-ups/info";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUser } from "@/app/provider/UserProvider";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newpass, setnewpass] = useState("");
  const [oldpass, setoldpass] = useState("");

  const { user } = useUser();
  const handleDeleteMember = () => {
    updateP();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const [loading, setloading] = useState(false);

  const updateP = async () => {
    try {
      if (!oldpass === "" || newpass === "") {
        toast("All feilds are required");
        return;
      }

      setloading(true);

      const response = await GlobalApi.changePass(user?.id, oldpass, newpass);

      if (response?.success === true) {
        toast("Password changed successfully.");
        setIsModalOpen(true);
        setnewpass("");
        setoldpass("");

        setTimeout(() => {
          handleCloseModal();
        }, 1000);

        setloading(false);
      } else {
        toast(
          response?.message || "Password changing failed. please try again "
        );
        setloading(false);
        setnewpass("");
        setoldpass("");
      }
    } catch (error) {
      setloading(false);
      toast("Network Error.");
      console.log("error while updating password", error);
      setloading(false);
      setnewpass("");
      setoldpass("");
    }
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col 2xl:h-[87vh] xl:h-[77vh] lg:h-[78vh] md:h-[79vh]">
        <Layoutsettings />
        <div className="mx-2 mr-6 md:mx-6  max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-6 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">
              Change Password
            </h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Keep your account secure by updating your password regularly.
              Choose a strong, unique password.
            </p>

            {/* Current Password Field */}
            <div className="flex flex-col gap-3 sm:mt-2 mt-5">
              <div className="relative mt-4 sm:w-1/2 w-auto">
                <label htmlFor="current-password" className="sr-only">
                  Current Password
                </label>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-2 md:px-4 md:py-3 w-auto">
                  <Keyicon />
                  <input
                    id="current-password"
                    name="current-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                    value={oldpass}
                    placeholder="Enter your Current Password"
                    onChange={(e) => {
                      setoldpass(e.target.value);
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

              {/* New Password Field */}
              <div className="relative mt-4 sm:w-1/2 w-auto">
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
                    value={newpass}
                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                    placeholder="Enter New Password"
                    onChange={(e) => {
                      setnewpass(e.target.value);
                    }}
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

              {/* Confirm Password Field */}
              {/* <div className="relative mt-4 sm:w-1/2 w-auto">
                <label htmlFor="confirm-password" className="sr-only">
                  Enter your Password
                </label>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-2 md:px-4 md:py-3 w-full">
                  <Keyicon />
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                    placeholder="Enter your Password"
                    onChange={(e) => {
                      setoldpass(e);
                    }}
                  />
                </span>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div> */}

              <button
                onClick={handleDeleteMember} // Open modal on click
                className="button-background text-white w-auto sm:w-8- font-semibold border rounded-lg mt-11 mx-auto p-2 no-hover px-8 "
              >
                {loading ? "Updating..." : "UPDATE"}
              </button>

              {/* Info Modal */}
              <InfoModal
                open={isModalOpen} // Controls visibility based on isModalOpen state
                onClose={handleCloseModal} // Close modal when InfoModal triggers onClose
                title={"Password Updated"}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
