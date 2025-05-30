"use client";
import Layout from "../../../../../components/layout/layout";
import Layoutsettings from "../../../../../pop-ups/layout-settings";
import { useState, useRef } from "react";
import Button from "../../../../../components/button/page";

export default function deleteaccount() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 border rounded-md w-auto pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Delete Account</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tellus
              eros, imperdiet at scelerisque elementum, blandit eget dui.
              Praesent id vulputate sapien. Duis dapibus posuere erat, eu
              facilisis quam. Donec vitae aliquet tortor, ac pharetra leo. Nulla
              eget risus ut nulla laoreet tincidunt a ut magna. Phasellus libero
              purus, laoreet at lectus eu, vulputate ultrices nulla. Donec
              finibus ligula at erat iaculis efficitur. Aliquam lorem lectus,
              efficitur id hendrerit ac, ultrices nec velit. Quisque sem nisl,
              tincidunt eu euismod at, vestibulum quis odio.
            </p>

            {/* Current Password Field */}
            <div className="space-y-4 mt-14 flex justify-center">
              <div className="flex gap-5 mx-auto pb-6">
                {otp.map((digit, index) => (
                  <span
                    key={index}
                    className="flex items-center w-auto sm:w-11 h-10 border-2 border-color-input rounded-lg p-2"
                  >
                    <input
                      type="tel"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-full h-full border-0 outline-none focus:ring-0 text-center"
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full flex justify-center items-center mt-3">
              {" "}
              <Button
                value="Delete Account"
                classname="py-2 px-4  w-40 mt-9 mx-auto mb-4"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
