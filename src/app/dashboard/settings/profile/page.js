"use client";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import Cookies from "js-cookie";
import { useState } from "react";
import GlobalApi from "@/lib/GlobalApi";
export default function profile() {
  let userData = {};

  try {
    userData = JSON.parse(Cookies.get("userData") || "{}");
  } catch (error) {
    console.log("Failed to parse userData cookie:", error);
  }

  const [user, setUser] = useState({
    fname: userData?.firstName || "",
    lname: userData?.lastName || "",
    email: userData?.email || "",
    dob: userData?.dob || "",
    address: userData?.permanentAddress || "",
  });
  const [loading, setloading] = useState(false);

  const updateUserData = async () => {
    try {
      setloading(true);
      const response = await GlobalApi.UpdateProfile(userData?.id, user, token);
      if (response?.success === true) {
        setloading(false);
      } else {
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log("error updating user profile data");
    }
  };
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings page="profile" />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg ">
          <div className="flex px-6   items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Profile</h1>
            <Link href={`/dashboard/settings/profile/${userData?.id}`}>
              <button
                variant="outline"
                className="button-border btn-txt-color  text-white font-semibold border rounded-lg mt-4 px-4 p-2 no-hover"
              >
                Edit Profile
              </button>
            </Link>
          </div>
          <hr />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>

            <div className="space-y-6">
              <h2 className=" font-semibold text-black mt-5 ">Detail</h2>
              <div className="">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">First Name:</label>
                    <p className="det">{user?.fname || "Not set"}</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm text-muted-foreground">
                      Last Name:
                    </label>
                    <p className="det">{user?.lname || "Not set"}</p>
                  </div>
                  {/* <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">
                      Contact Number:
                    </label>
                    <p className="det">{userData?.phoneNumber || "Not set"}</p>
                  </div> */}
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">Email:</label>
                    <p className="det">{user?.email || "Not set"}</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">DOB:</label>
                    <p className="det">{user?.dob || "Not set"}</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">Address:</label>
                    <p className="det">{user?.address || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
