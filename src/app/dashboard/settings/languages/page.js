"use client";
import { useState } from "react";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";

const lang = [
  { language: "English" },
  { language: "French" },
  { language: "Espagnol" },
];

export default function languages() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Language</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>
          </div>
          <div className="flex px-6  flex-col" style={{ marginTop: "18px" }}>
            <div className="flex flex-col gap-2">
              {lang.map((i, key) => (
                <div
                  key={key}
                  className="flex items-center space-x-3 mt-4 sm:w-1/2 w-auto sm:items-center"
                >
                  <input
                    type="radio"
                    name="language"
                    onChange={() => setSelectedLanguage(i.language)}
                    checked={selectedLanguage === i.language}
                  />

                  <p
                    className={`custom-p-color ${
                      selectedLanguage === i.language ? "settings-p" : ""
                    }`}
                  >
                    {i.language}
                  </p>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
