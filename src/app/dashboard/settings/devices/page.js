"use client";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import andriod from "../../../../assets/andriod.png";
import apple from "../../../../assets/apple.png";
import Image from "next/image";

const devices = [
  { name: "Device Name", status: "Current Device", devicelogo: andriod },
  {
    name: "Device Name",
    status: "Last login 6 hours ago",
    action: "Logout",
    devicelogo: apple,
  },
];

export default function manage() {
  return (
    <Layout 	page={"settings"}
>
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto  border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Manage Devices</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{marginTop:'13px'}}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>
          </div>
          <div className="flex px-6  flex-col" style={{ marginTop: "18px" }}>
            <h1 className="text-lg font-semibold text-black ">Your Devices</h1>
            <div className="flex flex-col gap-2">
              {devices.map((i, key) => (
                <div
                  key={key}
                  className="flex items-center space-x-3 mt-4 sm:w-1/2 w-auto"
                >
                  <span>
                    <Image src={i.devicelogo} alt={"anc"} />
                  </span>
                  <div className="flex sm:items-center justify-between  w-full flex-col items-start sm:flex-row">
                    <span>
                      <p className=" font-semibold txt-detail">{i.name}</p>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        {i.status}
                      </p>
                    </span>

                    <span>
                      {i.action ? (
                        <p className="txt-detail cursor-pointer font-semibold sm:mt-0 mt-5">
                          {i.action}
                        </p>
                      ) : null}
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
