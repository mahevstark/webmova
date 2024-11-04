import Layout from "../../../../../components/layout/layout";
import Layoutsettings from "../../../../../pop-ups/layout-settings";
import msg from "../../../../../assets/msg.png";
import Image from "next/image";
import Button from "../../../../../components/button/page";
import Link from "next/link";
export default function editprofile() {
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6  items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Edit Profile</h1>
          </div>
          <hr />
          <div className="px-6">
            <p className="settings-p" style={{ marginTop: "13px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <div>
                <p className="text-sm mb-3 settings-p">First Name</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  <Image src={msg} alt="" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                    placeholder="Enter your First Name"
                  />
                </span>
              </div>
              <div>
                <p className="text-sm mb-3 settings-p">Last Name</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  <Image src={msg} alt="" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                    placeholder="Enter your Last Name"
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Email</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  <Image src={msg} alt="" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                    placeholder="Enter your Email"
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Date of Birth</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 ">
                  <Image src={msg} alt="" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                    placeholder="DD/MM/YYYY"
                  />
                </span>
              </div>

              <div>
                <p className="text-sm mb-3 settings-p">Permanent Address</p>
                <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-1 md:px-4 md:py-2 sm:w-96 w-auto">
                  <Image src={msg} alt="" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full focus:outline-none focus:ring-0 border-0 text-gray-400"
                    placeholder="Enter your Permanent Address"
                  />
                </span>
              </div>
              <div className="mx-auto">
                {" "}
               <Link href="/dashboard/settings/profile"> <Button
                  value="UPDATE"
                  classname="py-2 px-12 w-auto mt-9 mx-auto mb-4"
                /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
