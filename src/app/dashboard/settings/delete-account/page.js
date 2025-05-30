"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import Keyicon from "../../../../assets/key.svg";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../../../components/button/page";
import Link from "next/link";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function deleteaccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(false);
  const deleteAc = async () => {
    try {
      if (!password) {
        toast("Password is required.");
        return;
      }
      if (!checked) {
        toast("Accept Terms and Conditions before Deleting your Account.");
        return;
      }
      setloading(true);
      const response = await GlobalApi.deleteAccount(
        token,
        password,
        phoneNumber,
        userId
      );
      if (response?.success === true) {
        toast("Account deleted successfully");
        setloading(false);
      } else {
        setloading(false);
      }
    } catch (error) {
      setloading(false);
    }
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col  2xl:h-[84vh] xl:h-[77vh] lg:h-[87vh] md:h-[84vh] ">
        <Layoutsettings />{" "}
        <div className="mx-2 mr-6 md:mx-6  max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-6 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Delete Account</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              We're sorry to see you go. If you're sure you want to delete your
              MOWA, please be aware that this action is permanent and cannot be
              undone. All of your personal information, including your MOWA and
              settings, will be permanently deleted.
            </p>{" "}
            <p className="settings-p mt-3">
              If you're having trouble with your account or have concerns,
              please reach out to us at [contact email or support page] before
              proceeding with the account deletion. We'd love to help you
              resolve any issues and keep you as a valued MOWA
            </p>
            {/* Current Password Field */}
            <div className="flex flex-col gap-3 sm:mt-2 mt-5">
              <p className="settings-p   mt-4 ">Current Password</p>
              <div className="relative 2xl:w-1/4 xl:w-2/6 md:w-2/4 lg:w-3/4 w-auto">
                <label htmlFor="current-password" className="sr-only">
                  Current Password
                </label>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-2 md:px-4 md:py-3 w-auto">
                  <input
                    id="current-password"
                    name="current-password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-black "
                    placeholder="Current Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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

              <div className="flex gap-2 ">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setchecked(e);
                  }}
                />
                <p className="text-sm" style={{ color: "#717171" }}>
                  I accept{" "}
                  <span className="text-[#544af1]">
                    <Link href="/dashboard/settings/privacy-policy">
                      Privacy policy
                    </Link>
                  </span>{" "}
                  &
                  <span className="text-[#544af1]">
                    <Link href="/dashboard/settings/terms">Terms of use</Link>
                  </span>
                </p>
              </div>
            </div>
            <div className="mx-auto w-full flex justify-center items-center mt-3">
              {" "}
              <button
                onClick={deleteAc}
                className="py-2 px-4 w-40 mt-9 mx-auto mb-4 button-background rounded-lg  text-white font-medium "
              >
                {loading ? "Almost there..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
