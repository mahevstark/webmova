"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import andriod from "../../../../assets/andriod.png";
import contact from "../../../../assets/contact.png";
import chat from "../../../../assets/chat.png";
import site from "../../../../assets/site.png";

import Image from "next/image";
import GlobalApi from "@/lib/GlobalApi";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import Cookies from "js-cookie";

export const dynamic = "force-dynamic";

export default function helpcenter() {
  const [loadhelpdata, sethelploaddata] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [helpData, setHelpData] = useState({
    email: "",
    phoneNumber: "",
    website: "",
    address: "",
  });

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
  }, []);

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
      setloading(true);
      // Assuming GlobalApi has an updateHelpCenter method
      const response = await GlobalApi.updateHelpCenter(token, helpData);
      console.log("in upd", response);
      if (response?.success === true) {
        setIsEditing(false);
        setloading(false);
      } else {
        setIsEditing(false);
        setloading(false);
      }
    } catch (error) {
      console.log("error while updating help center", error);
      setloading(false);
    }
  };

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

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings />
        <div className="mx-6 w-auto pt-4 border rounded-md sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Help Center</h1>
            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveChanges}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Add, remove, or update help articles to keep your support content
              relevant and up to date.
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
                        <p className="font-semibold txt-detail">{item.name}</p>
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
                            {item.status}
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
