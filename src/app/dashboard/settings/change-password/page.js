"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import Keyicon from "../../../../assets/key.svg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InfoModal from "../../../../pop-ups/info";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleDeleteMember = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  setTimeout(() => {
    handleCloseModal();
  }, 1000);
  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings />{" "}
        <div className="mx-6 border rounded-md w-auto pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">
              Change Password
            </h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
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
                    placeholder="Enter your Current Password"
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
                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
                    placeholder="Create New Password"
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
              <div className="relative mt-4 sm:w-1/2 w-auto">
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
              </div>

              <button
                onClick={handleDeleteMember} // Open modal on click
                className="button-background text-white w-auto sm:w-8- font-semibold border rounded-lg mt-11 mx-auto p-2 no-hover px-8 "
              >
                UPDATE
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
