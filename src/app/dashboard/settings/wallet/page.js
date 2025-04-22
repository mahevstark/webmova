import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import pin from "../../../../assets/pin.png";
import Notification from "../../../../assets/Notification.png";

export default function securewallet() {
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings page="wallet" />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6  items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">
              Secure your Wallets{" "}
            </h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>

            <div className="flex flex-col gap-6 mt-7">
              <span className="flex text-sm gap-10 txt-detail flex-col ">
                <span className="flex gap-3 shadow-lg  py-4 px-2 w-1/2 rounded-md">
                  {" "}
                  <Image src={Notification} alt="" />
                  <p className="txt-detail font-semibold">Change Password</p>
                </span>
                <div className="flex  gap-60">
                  <span className="flex gap-3 shadow-lg  py-4 px-2 w-1/2 rounded-md justify-between">
                    <span className="flex gap-2">
                      <Image src={pin} alt="" />
                      <p className="txt-detail font-semibold">Pin</p>
                    </span>
                    <Switch />
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
