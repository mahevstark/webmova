"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import andriod from "../../../../assets/andriod.png";
import contact from "../../../../assets/contact.png";
import chat from "../../../../assets/chat.png";
import site from "../../../../assets/site.png";


import Image from "next/image";

const devices = [
  { name: "Chat to us", status: "abc@gmail.com", logo: chat },
  { name: "Phone ", status: "+13123232323", logo: contact },
  { name: "Website ", status: "www.mowa.com", logo: site },
  
];

export default function helpcenter() {
  return (
    <Layout 	page={"settings"}
>
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto pt-4 border rounded-md sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Help Center</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{marginTop:'13px'}}>
            <p className="settings-p" >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>
          </div>
          <div className="flex px-6  flex-col" style={{ marginTop: "18px" }}>
            <div className="flex flex-col gap-2">
              {devices.map((i, key) => (
                <div
                  key={key}
                  className="flex items-center space-x-3 mt-4 sm:w-1/2 w-auto shadow-lg py-3 px-4 rounded-md"
                >
                  <span>
                    <Image src={i.logo} alt={"anc"} />
                  </span>
                  <div className="flex sm:items-center justify-between  w-full flex-col items-start sm:flex-row">
                    <span>
                      <p className=" font-semibold txt-detail">{i.name}</p>
                      <p className="text-sm text-gray-600 font-medium">
                        {i.status}
                      </p>
                    </span>

                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
