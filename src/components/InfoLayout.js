"use client";
import Layoutsettings from "../pop-ups/layout-settings";
import Layout from "../components/layout/layout";

import { Spinner } from "./ui/spinner";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Pencil, Save, X } from "lucide-react";
import GlobalApi from "@/lib/GlobalApi";
import { toast } from "sonner";

export default function InfoLayout({ heading, content, loading }) {
  const [Role, setRole] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedHeading, setEditedHeading] = useState(heading);
  const pathname = usePathname();

  useEffect(() => {
    setEditedContent(content?.content || "");
    console.log("ccc", content);

    const role = Cookies.get("role");
    setRole(role);
  }, [content]);

  const token = Cookies.get("token");
  console.log("roken", token);

  const [stloading, setloading] = useState(false);

  const handleSave = async () => {
    try {
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
      <div className="flex sm:flex-row flex-col md:h-[80vh] 2xl:h-[88vh] xl:h-[77vh] lg:h-[78vh]">
        <Layoutsettings />{" "}
        <div className="mx-2 mr-6 md:mx-6  max-sm:ml-4 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-6 sm:mt-0 mb-12 sm:mb-0 sm:pb-0 xl:pb-12 shadow-lg max-sm:pb-6">
          {Role === "admin" ? (
            <>
              <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
                <h1 className="text-xl font-semibold text-black">
                  {editedHeading}
                </h1>

                <div className="mt-4 sm:mt-0">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Button
                        className=" flex bg-transparent text-black hover:bg-transparent border  items-center"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center bg-[#544af1] hover:bg-[#544af1]"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        {stloading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center bg-[#544af1] hover:bg-[#544af1]"
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
            </>
          ) : (
            <>
              <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
                <h1 className="text-xl font-semibold text-black">{heading}</h1>
              </div>
              <hr className="custom-hr" />
              <div
                className="px-6 sm:pb-0 pb-12"
                style={{ margin: "0px", marginTop: "15px" }}
              >
                {loading ? (
                  <div className="flex justify-center items-center min-h-[40vh]">
                    <Spinner />
                  </div>
                ) : (
                  <p className="settings-p">{content?.content}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
