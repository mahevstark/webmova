"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import andriod from "../../../../assets/andriod.png";
import contact from "../../../../assets/contact.png";
import chat from "../../../../assets/chat.png";
import site from "../../../../assets/site.png";

import Image from "next/image";
import GlobalApi from "../../../../lib/GlobalApi";
import { useEffect, useState } from "react";
import { Spinner } from "../../../../components/ui/spinner";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

export default function helpcenter() {
  const [loadhelpdata, sethelploaddata] = useState(false);
  const [helpData, setHelpData] = useState({
    email: "",
    phoneNumber: "",
    website: "",
    address: "",
  });

  const [Role, SetRole] = useState(null);

  const getHC = async () => {
    try {
      sethelploaddata(true);
      const response = await GlobalApi.getHelpCenter();

      if (response?.success === true) {
        setHelpData({
          email: response?.data?.email || "",
          phoneNumber: response?.data?.phoneNumber || "",
          website: response?.data?.website || "",
          address: response?.data?.address || "",
        });
        sethelploaddata(false);
      } else {
        setHelpData({
          email: "",
          phoneNumber: "",
          website: "",
          address: "",
        });
        sethelploaddata(false);
      }
    } catch (error) {
      console.log("error while getting help center", error);
      setHelpData({
        email: "",
        phoneNumber: "",
        website: "",
        address: "",
      });
      sethelploaddata(false);
    }
  };

  useEffect(() => {
    getHC();
    const role = Cookies.get("role");
    SetRole(role);
  }, []);

  // Define devices array based on helpData state
  const devices = [
    { name: "Chat to us", field: "email", status: helpData.email, logo: chat },
    {
      name: "Phone",
      field: "phoneNumber",
      status: helpData.phoneNumber,
      logo: contact,
    },
    { name: "Website", field: "website", status: helpData.website, logo: site },
    {
      name: "Address",
      field: "address",
      status: helpData.address,
      logo: andriod,
    },
  ];

  const [isEditing, setIsEditing] = useState(false);

  const [loading, setloading] = useState(false);
  const handleInputChange = (field, value) => {
    setHelpData({
      ...helpData,
      [field]: value,
    });
  };
  const token = Cookies.get("token");
  const saveChanges = async () => {
    try {
      if (
        helpData?.email.trim() === "" ||
        helpData?.phoneNumber === "" ||
        helpData?.website.trim() == "" ||
        helpData?.address.trim() === ""
      ) {
        toast("All feilds are required");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Phone number regex (basic international format: digits only, at least 10 digits)
      const phoneRegex = /^\d{10,}$/;

      // Website regex (basic URL check)
      const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

      // Address check: just non-empty with some length
      if (!emailRegex.test(helpData?.email || "")) {
        toast("Please enter a valid email address");
        return;
      }

      if (!phoneRegex.test(helpData?.phoneNumber || "")) {
        toast("Please enter a valid phone number (at least 10 digits)");
        return;
      }

      if (!websiteRegex.test(helpData?.website || "")) {
        toast("Please enter a valid website URL");
        return;
      }

      setloading(true);
      // Assuming GlobalApi has an updateHelpCenter method
      const response = await GlobalApi.updateHelpCenter(token, helpData);

      if (response?.success === true) {
        toast("Help Center Updated ");
        setIsEditing(false);
        setloading(false);
      } else {
        setIsEditing(false);
        setloading(false);
        toast(response?.message || "Error while updating help Center ");
      }
    } catch (error) {
      console.log("error while updating help center", error);
      setloading(false);

      toast("Network Error. ");
    }
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col 2xl:h-[88vh] xl:h-[84vh] lg:h-[78vh] md:h-[80vh]">
        <Layoutsettings />
        <div className="mx-2 mr-6 md:mx-6  max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-6 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          {Role === "admin" ? (
            <>
              <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
                <h1 className="text-xl font-semibold text-black">
                  Help Center
                </h1>
                <div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border text-gray-700 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveChanges}
                        className="px-4 py-2 bg-[#544af1] text-white rounded-md"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-[#544af1] text-white rounded-md"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              <hr className="custom-hr" />
              <div className="px-6" style={{ marginTop: "13px" }}>
                <p className="settings-p">
                  Add, remove, or update help articles to keep your support
                  content relevant and up to date.
                </p>
              </div>
              <div className="flex px-6 flex-col" style={{ marginTop: "18px" }}>
                <div className="flex flex-col gap-2">
                  {loadhelpdata ? (
                    <div className="mx-auto flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    devices.map((item, key) => (
                      <div
                        key={key}
                        className="flex items-center space-x-3 mt-4 sm:w-1/2 w-auto shadow-lg py-3 px-4 rounded-md"
                      >
                        <span>
                          <Image src={item.logo} alt={"icon"} />
                        </span>
                        <div className="flex sm:items-center justify-between w-full flex-col items-start sm:flex-row">
                          <span className="w-full">
                            <p className="font-semibold txt-detail">
                              {item.name}
                            </p>
                            {isEditing ? (
                              <input
                                type="text"
                                value={item.status}
                                onChange={(e) =>
                                  handleInputChange(item.field, e.target.value)
                                }
                                className="w-full text-sm border border-gray-300 p-1 rounded mt-1"
                              />
                            ) : (
                              <p className="text-sm text-gray-600 font-medium">
                                {item.status || "Not Available"}
                              </p>
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
                <h1 className="text-xl font-semibold text-black">
                  Help Center
                </h1>
              </div>
              <hr className="custom-hr" />
              <div className="px-6" style={{ marginTop: "13px" }}>
                <p className="settings-p">
                  Have questions? We’re here to help. Find quick solutions or
                  contact our support team.
                </p>
              </div>
              <div className="flex px-6 flex-col" style={{ marginTop: "18px" }}>
                <div className="flex flex-col gap-2 mb-12">
                  {loadhelpdata ? (
                    <div className="mx-auto flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    devices.map((item, key) => (
                      <div
                        key={key}
                        className="flex items-center space-x-3 sm:w-1/2 w-auto shadow-lg py-3 px-4 rounded-md "
                      >
                        <span>
                          <Image src={item.logo} alt={"icon"} />
                        </span>
                        <div className="flex sm:items-center justify-between w-full flex-col items-start sm:flex-row  ">
                          <span className="w-full">
                            <p className="font-semibold txt-detail">
                              {item.name}
                            </p>

                            <p className="text-sm text-gray-600 font-medium">
                              {item.status || "Not Available"}
                            </p>
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
