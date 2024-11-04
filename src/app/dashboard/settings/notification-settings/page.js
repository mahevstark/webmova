import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import { Switch } from "@/components/ui/switch";


export default function notificationsettings() {
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
          <div className="flex px-6  items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Notification Setting </h1>
          </div>
          <hr className="custom-hr" />
       <div className="px-6">
       <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>

          <div className="flex flex-col gap-6 mt-7">
          <span className="flex text-sm items-center gap-28">
                <p className="settings-p font-semibold">Dummy Notification Type</p>
                
                <Switch  />
              </span>

              <span className="flex text-sm items-center gap-28">
                <p className="settings-p font-semibold">Dummy Notification Type</p>
                
                <Switch  />
              </span>
              <span className="flex text-sm items-center gap-28">
                <p className="settings-p font-semibold">Dummy Notification Type</p>
                
                <Switch  />
              </span>
              <span className="flex text-sm items-center gap-28">
                <p className="settings-p font-semibold">Dummy Notification Type</p>
                
                <Switch  />
              </span>
          </div>
       </div>
          </div>
        </div>
      
    </Layout>
  );
}
