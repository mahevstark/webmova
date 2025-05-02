// "use client";
// import Layout from "../../../../components/layout/layout";
// import Layoutsettings from "../../../../pop-ups/layout-settings";
// import Keyicon from "../../../../assets/key.svg";
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import Button from "../../../../components/button/page";
// import Link from "next/link";

// export default function deleteaccount() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <Layout page={"settings"}>
//       <div className="flex sm:flex-row flex-col ">
//         <Layoutsettings />{" "}
//         <div className="mx-6 w-auto pt-4 border rounded-md sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
//           <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
//             <h1 className="text-xl font-semibold text-black">Delete Account</h1>
//           </div>
//           <hr className="custom-hr" />
//           <div className="px-6" style={{ marginTop: "13px" }}>
//             <p className="settings-p">
//               We're sorry to see you go. If you're sure you want to delete your
//               MOWA, please be aware that this action is permanent and cannot be
//               undone. All of your personal information, including your MOWA and
//               settings, will be permanently deleted.
//             </p>{" "}
//             <p className="settings-p mt-3">
//               If you're having trouble with your account or have concerns,
//               please reach out to us at [contact email or support page] before
//               proceeding with the account deletion. We'd love to help you
//               resolve any issues and keep you as a valued MOWA
//             </p>
//             {/* Current Password Field */}
//             <div className="flex flex-col gap-3 sm:mt-2 mt-5">
//               <p className="settings-p   mt-4 ">Password</p>
//               <div className="relative sm:w-2/5 w-auto">
//                 <label htmlFor="current-password" className="sr-only">
//                   Current Password
//                 </label>
//                 <span className="flex items-center gap-2 border border-color-input rounded-lg px-3 py-2 md:px-4 md:py-3 w-auto">
//                   <input
//                     id="current-password"
//                     name="current-password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     className="w-full focus:outline-none focus:ring-0 border-0 placeholder-gray-400 text-gray-400"
//                     placeholder="Enter your Current Password"
//                   />
//                 </span>
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>

//               <div className="flex gap-2 ">
//                 <input type="checkbox" />
//                 <p className="text-sm" style={{ color: "#717171" }}>
//                   I accept{" "}
//                   <span className="btn-txt">
//                     <Link href="/dashboard/settings/privacy-policy">
//                       Privacy policy
//                     </Link>
//                   </span>{" "}
//                   &
//                   <span className="btn-txt">
//                     <Link href="/dashboard/settings/terms">Terms of use</Link>
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto w-full flex justify-center items-center mt-3">
//               {" "}
//               <Link href="/dashboard/settings/delete-account/2">
//                 {" "}
//                 <Button
//                   value="Delete Account"
//                   classname="py-2 px-4 w-40 mt-9 mx-auto mb-4"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

import React from "react";

const deleteaccount = () => {
  return <div></div>;
};

export default deleteaccount;
