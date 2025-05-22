"use client";
import Layout from "../../../../../components/layout/layout";
import Layoutsettings from "../../../../../pop-ups/layout-settings";
import GlobalApi from "@/lib/GlobalApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
export default function editprofile() {
  const router = useParams();
  const id = router.id;
  let userData = {};
  const rout = useRouter();

  try {
    userData = JSON.parse(localStorage.getItem("userData") || "{}");
    console.log("uu", userData);
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

  const isValid = () => {
    for (let key in user) {
      if (!user[key] || user[key].trim() === "") {
        return false;
      }
    }
    return true;
  };
  const token = Cookies.get("token");

  const updateUserData = async () => {
    try {
      if (!isValid) {
        toast("All feilds are required.");
        return;
      }

      setloading(true);

      const response = await GlobalApi.UpdateProfile(id, user, token);

      if (response?.success === true) {
        setloading(false);
        const existingUserData = JSON.parse(
          localStorage.getItem("userData") || "{}"
        );
        const updatedUserData = {
          ...existingUserData,
          firstName: user.fname,
          lastName: user.lname,
          email: user.email,
          dob: user.dob,
          permanentAddress: user.address,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));

        toast("Profile Updated Successfully.");
        rout.push("/dashboard/settings/profile");
      } else {
        setloading(false);
        toast(response?.message || "Profile Updation Failed. please try again");
      }
    } catch (error) {
      setloading(false);
      console.log("error updating user profile data", error);
      toast("Network Error.");
    }
  };
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6  items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Edit Profile</h1>
          </div>
          <hr />
          <div className="px-6">
            <p className="settings-p">
              Update your personal information to keep your account details
              current and personalized.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div>
                <p className="text-sm mb-3 settings-p">First Name</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  {/* <Image src={msg} alt="" /> */}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none text-black focus:ring-0 border-0 placeholder:text-gray-400"
                    placeholder="Enter your First Name"
                    value={user.fname}
                    onChange={(e) =>
                      setUser({ ...user, fname: e.target.value })
                    }
                  />
                </span>
              </div>
              <div>
                <p className="text-sm mb-3 settings-p">Last Name</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  {/* <Image src={msg} alt="" /> */}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-black placeholder:text-gray-400"
                    placeholder="Enter your Last Name"
                    value={user.lname}
                    onChange={(e) =>
                      setUser({ ...user, lname: e.target.value })
                    }
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Email</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  {/* <Image src={msg} alt="" /> */}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-black placeholder:text-gray-400"
                    placeholder="Enter your Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Date of Birth</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 ">
                  {/* <Image src={msg} alt="" /> */}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-black placeholder:text-gray-400"
                    placeholder="DD/MM/YYYY"
                    value={user.dob}
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Permanent Address</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  {/* <Image src={msg} alt="" /> */}
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-black placeholder:text-gray-400"
                    placeholder="Enter your Permanent Address"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                  />
                </span>
              </div>
              <div className="mx-auto">
                {" "}
                <button
                  className="py-2 text-white px-12 w-auto mt-9 mx-auto mb-4 button-background rounded-lg"
                  onClick={updateUserData}
                >
                  {loading ? "Updating...." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
