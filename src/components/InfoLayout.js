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

import { useState } from "react";
import Layoutsettings from "../pop-ups/layout-settings";
import Layout from "../components/layout/layout";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";

export default function InfoLayout({ heading, content }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedHeading, setEditedHeading] = useState(heading);

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    // For now, we're just updating the local state
    setIsEditing(false);
    // You might want to add an API call here to save the changes
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(content);
    setEditedHeading(heading);
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col">
        <Layoutsettings />{" "}
        <div className="mx-6 mt-12 border rounded-md py-4 w-auto sm:w-full space-y-8 sm:mt-0 sm:mb-8 pb-4 sm:pb-0 shadow-lg">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            {isEditing ? (
              <input
                type="text"
                value={editedHeading}
                onChange={(e) => setEditedHeading(e.target.value)}
                className="text-xl font-semibold text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-black w-full sm:w-auto"
              />
            ) : (
              <h1 className="text-xl font-semibold text-black">
                {editedHeading}
              </h1>
            )}
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
                    Save
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
                  Edit
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
                className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-black settings-p"
              />
            ) : (
              <p className="settings-p">{editedContent}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
