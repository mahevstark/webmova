"use client";
import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../../../../components/ui/spinner";
export default function profile() {
  let userData = {};

  const router = useRouter();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    address: "",
  });

  const [loading, setloading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side data loading after hydration
  useEffect(() => {
    setIsClient(true);

    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUser({
          fname: parsedUserData.firstName || "",
          lname: parsedUserData.lastName || "",
          email: parsedUserData.email || "",
          dob: parsedUserData.dob || "",
          address: parsedUserData.permanentAddress || "",
          id: parsedUserData?.id,
        });
      }
    } catch (error) {
      console.log("Failed to parse userData:", error);
    }
  }, []);

  const handleEditProfile = () => {
    router.push(`/dashboard/settings/profile/${user?.id}`);
  };

  // Show loading state during hydration if needed
  if (!isClient) {
    return (
      <Layout page="settings">
        <div className="flex sm:flex-row flex-col 2xl:h-[87vh] xl:h-[77vh] lg:h-[80vh] md:h-[79vh] ">
          <Layoutsettings page="profile" />
          <div className="mx-2   mr-6 md:mx-6 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg ">
            <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
              <h1 className="text-xl font-semibold text-black">Profile</h1>
            </div>
            <hr />
            <div className="px-6" style={{ marginTop: "13px" }}>
              <Spinner />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page="settings ">
      <div className="flex 2xl:h-[87vh] xl:h-[77vh] lg:h-[80vh] md:h-[79vh] sm:flex-row flex-col   ">
        <Layoutsettings page="profile" />
        <div className="mx-2  mr-6 md:mx-6  max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-2 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Profile</h1>

            <button
              onClick={handleEditProfile}
              variant="outline"
              className="bg-[#544af1] hover:bg-[#544af1] text-white font-semibold border rounded-lg mt-4 px-4 p-2 no-hover"
            >
              Edit Profile
            </button>
          </div>
          <hr />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Keep your personal information current to enjoy a more
              personalized and secure experience.
            </p>

            <div className="space-y-6">
              <h2 className="font-semibold text-black mt-5">Detail</h2>
              <div className="">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt font-semibold">
                      First Name:
                    </label>
                    <p className="det">{user?.fname || "Not set"}</p>
                  </div>
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt font-semibold">
                      Last Name:
                    </label>
                    <p className="det">{user?.lname || "Not set"}</p>
                  </div>
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt font-semibold">
                      Email:
                    </label>
                    <p className="det">{user?.email || "Not set"}</p>
                  </div>
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt font-semibold">
                      DOB:
                    </label>
                    <p className="det">{user?.dob || "Not set"}</p>
                  </div>
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt font-semibold">
                      Address:
                    </label>
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
