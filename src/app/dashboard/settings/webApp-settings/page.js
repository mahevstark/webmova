"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import GlobalApi from "@/lib/GlobalApi";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function WebAppsettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    stripeSecretKey: "",
    // stripePublicKey: "",
    appName: "",
    email: "",
    mobileNumber: "",
    websiteUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend

    UpdateSettings();
  };
  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const token = Cookies.get("token");
  const [getLoad, setgetLoad] = useState(false);
  const [settings, setSettings] = useState({
    stripesecKey: null,
    appname: null,
    email: null,
    numb: null,
    url: null,
  });
  const getSettings = async () => {
    try {
      setgetLoad(true);

      const response = await GlobalApi.getAppSettings(token);

      if (response?.success === true) {
        setgetLoad(false);
        setFormData({
          stripeSecretKey: response?.data?.appSettings?.appName,
          // stripePublicKey: null,
          appName: response?.data?.appSettings?.appName,
          email: response?.data?.appSettings?.contactEmail,
          mobileNumber: response?.data?.appSettings?.contactPhone,
          websiteUrl: response?.data?.appSettings?.supportUrl,
        });
      } else {
        setFormData({});
        setgetLoad(false);
      }
    } catch (error) {
      console.log("error while getting settings ", error);
      setFormData({});
      setgetLoad(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);
  const [loading, setloading] = useState(false);
  const UpdateSettings = async () => {
    try {
      if (!isFormValid()) {
        toast("All Feilds are required");
      }
      setloading(true);

      const response = await GlobalApi.UpdateAppSettings(token, formData);
      console.log("rr", response);

      if (response?.success === true) {
        setIsEditing(false);
        setloading(false);
        toast("WebApp settings updated successfully");
      } else {
        setloading(false);
        toast(
          response?.message ||
            "Failed to updated WebApp settings. please try again "
        );
      }
    } catch (error) {
      console.log("error while updating App Settings", error);
      setIsEditing(false);
      setloading(false);
      toast("Network Error.");
    }
  };

  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings page="profile" />

        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-0 pb-4 sm:pb-0 shadow-lg">
          {getLoad ? (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <Spinner size={40} />
            </div>
          ) : (
            <>
              {" "}
              <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
                <h1 className="text-xl font-semibold text-black">
                  WebApp Settings
                </h1>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="button-border btn-txt-color text-white font-semibold border rounded-lg mt-4 px-4 p-2 no-hover"
                  >
                    {loading ? "Saving..." : " Save Changes"}
                  </button>
                ) : (
                  <button
                    onClick={toggleEdit}
                    className="button-border btn-txt-color text-white font-semibold border rounded-lg mt-4 px-4 p-2 no-hover"
                  >
                    Edit Settings
                  </button>
                )}
              </div>
              <hr />
              <div className="px-6" style={{ marginTop: "13px" }}>
                <p className="settings-p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas bibendum laoreet massa quis viverra.Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Maecenas bibendum
                  laoreet massa quis viverra.
                </p>

                <div className="space-y-6">
                  <h2 className="font-semibold text-black mt-5">Detail</h2>
                  <div className="">
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm settings-txt">
                          Stripe Secret key :
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="stripeSecretKey"
                            value={formData.stripeSecretKey}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.stripeSecretKey}</p>
                        )}
                      </div>
                      {/* <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm text-muted-foreground">
                          Stripe Public key :
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="stripePublicKey"
                            value={formData.stripePublicKey}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.stripePublicKey}</p>
                        )}
                      </div> */}
                      <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm settings-txt">
                          App Name :
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="appName"
                            value={formData.appName}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.appName}</p>
                        )}
                      </div>
                      <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm settings-txt">Email :</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.email}</p>
                        )}
                      </div>
                      <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm settings-txt">
                          Mobile Number:
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.mobileNumber}</p>
                        )}
                      </div>
                      <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                        <label className="text-sm settings-txt">
                          Support Url :
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                            className="det border rounded px-2 py-1"
                          />
                        ) : (
                          <p className="det">{formData.websiteUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
