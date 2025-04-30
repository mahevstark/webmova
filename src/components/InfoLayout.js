// import React from "react";
// import Layoutsettings from '../pop-ups/layout-settings'
// import Layout from '../components/layout/layout'

// export default function InfoLayout({ heading, content }) {
//   return (
//   <Layout 	page={"settings"}
//   >

// <div className="flex sm:flex-row flex-col ">
//       <Layoutsettings />{" "}
//       <div className="mx-6 mt-12 border rounded-md py-4 w-auto sm:w-full  space-y-8  sm:mt-0  sm:mb-8 pb-4 sm:pb-0 shadow-lg h-screen">
//         <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
//           <h1 className="text-xl font-semibold text-black">{heading}</h1>
//         </div>
//         <hr className="custom-hr" />
//         <div className="px-6 sm:pb-0 pb-12" style={{margin:'0px', marginTop:'15px'}}>
//           <p className="settings-p">
//            {content}
//           </p>
//         </div>
//       </div>
//     </div>
//   </Layout>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Layoutsettings from "../pop-ups/layout-settings";
import Layout from "../components/layout/layout";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { Spinner } from "./ui/spinner";
import GlobalApi from "@/lib/GlobalApi";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function InfoLayout({ heading, content, loading }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedHeading, setEditedHeading] = useState(heading);
  const pathname = usePathname();

  useEffect(() => {
    setEditedContent(content?.content || "");
    // const currentPage = {
    //   id: content?.id,
    //   heading,
    //   path: pathname,
    // };

    // const existing = Cookies.get("pagesInfo");
    // const pagesInfo = existing ? JSON.parse(existing) : {};

    // pagesInfo[pathname] = currentPage;

    // Cookies.set("pagesInfo", JSON.stringify(pagesInfo), { expires: 7 });
  }, [content]);

  const token = Cookies.get("token");
  const [stloading, setloading] = useState(false);

  const handleSave = async () => {
    try {
      // const pagesInfo = Cookies.get("pagesInfo");
      // const parsedPages = pagesInfo ? JSON.parse(pagesInfo) : {};
      // const page = parsedPages[pathname];

      // console.log("page", page);
      setloading(true);
      let response;
      content?.id
        ? (response = await GlobalApi.EditStaticPaga(
            {
              id: content?.id,
              heading: editedHeading,
              content: editedContent,
              slug: pathname.includes("privacy-policy")
                ? "privacy-policy"
                : pathname.includes("terms")
                ? "terms-and-conditions"
                : "about-app",
            },
            token
          ))
        : (response = await GlobalApi.createStaticpage({
            title: editedHeading,
            content: editedContent,
            slug: pathname.includes("privacy-policy")
              ? "privacy-policy"
              : pathname.includes("terms")
              ? "terms-and-conditions"
              : "about-app",
          }));

      if (response?.success === true) {
        setIsEditing(false);
        toast("success", {
          description: `${
            pathname.includes("privacy-policy")
              ? "privacy-policy"
              : pathname.includes("terms")
              ? "terms-and-conditions"
              : "about-app"
          } updated successfully`,
        });
        setloading(false);
      } else {
        setIsEditing(false);
        setloading(false);
        toast("error", {
          description:
            response?.message ||
            `${
              pathname.includes("privacy-policy")
                ? "privacy-policy"
                : pathname.includes("terms")
                ? "terms-and-conditions"
                : "about-app"
            } updating failed`,
        });
      }
    } catch (error) {
      console.log("error in updating static page", error);
      setIsEditing(false);
      setloading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content?.content || "");
    setEditedHeading(heading);
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings />{" "}
        <div className="mx-6 mt-12 border rounded-md py-4 w-auto sm:w-full space-y-8 sm:mt-0 sm:mb-8 pb-4 sm:pb-0 shadow-lg">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">
              {editedHeading}
            </h1>

            <div className="mt-4 sm:mt-0">
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {stloading ? "Saving..." : "Save"}
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  {content?.id ? "Edit" : "Create"}
                </Button>
              )}
            </div>
          </div>
          <hr className="custom-hr" />
          <div
            className="px-6 sm:pb-0 pb-12"
            style={{ margin: "0px", marginTop: "15px" }}
          >
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black settings-p resize-none"
              />
            ) : loading ? (
              <div className="flex justify-center items-center min-h-[40vh]">
                <Spinner />
              </div>
            ) : (
              <p className="settings-p">{editedContent}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
