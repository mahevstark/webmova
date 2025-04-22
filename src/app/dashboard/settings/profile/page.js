import Link from "next/link";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
export default function profile() {
  return (
    <Layout page="settings">
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings page="profile" />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full  space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-0 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6   items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">Profile</h1>
            <Link href="/dashboard/settings/profile/2">
              <button
                variant="outline"
                className="button-border btn-txt-color  text-white font-semibold border rounded-lg mt-4 px-4 p-2 no-hover"
              >
                Edit Profile
              </button>
            </Link>
          </div>
          <hr />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              bibendum laoreet massa quis viverra.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Maecenas bibendum laoreet massa quis
              viverra.
            </p>

            <div className="space-y-6">
              <h2 className=" font-semibold text-black mt-5 ">Detail</h2>
              <div className="">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">First Name:</label>
                    <p className="det">Jahanzaib</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm text-muted-foreground">
                      Last Name:
                    </label>
                    <p className="det">Shoaib</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">
                      Contact Number:
                    </label>
                    <p className="det">+12345678900</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">Mail:</label>
                    <p className="det">abc@gmail.com</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">DOB:</label>
                    <p className="det">19-10-1998</p>
                  </div>
                  <div className=" flex gap-3 sm:items-center sm:flex-row flex-col items-start">
                    <label className="text-sm settings-txt">Address:</label>
                    <p className="det">110 E. Cherry Hill Rd.West Islip</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
