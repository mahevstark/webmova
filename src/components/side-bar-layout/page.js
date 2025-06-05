"use client";
import { useState } from "react";
import Link from "next/link";
import Activity from "../../assets/Activity.svg";
import Active from "../../assets/active.svg";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider/UserProvider";

export default function Sidebar({ page }) {
  const place = page;
  const [activeItem, setActiveItem] = useState(page);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  console.log(user, "---------------user-----------");

  const menuItems = [
    {
      name: "Dashboard",
      icon: Activity,
      href: "/",
      activeicon: Active,
      check: "Dashboard",
    },
    {
       name: user?.role === "STANDARD" ? "User" : "Employees", // 👈 Conditional name
      icon: Activity,
      href: "/dashboard/users",
      activeicon: Active,
      check: "Employees",
    },
    {
      name: "Transaction History",
      icon: Activity,
      href: "/dashboard/transaction-history",
      activeicon: Active,
      check: "transactionhistory",
    },
    ...(user?.role === "STANDARD"
      ? [
          {
            name: "Payment Request",
            icon: Activity,
            href: "/dashboard/payment-request",
            activeicon: Active,
            check: "paymentrequest",
          },
        ]
      : []),
    {
      name: "Setting",
      icon: Activity,
      href: "/dashboard/settings/profile",
      activeicon: Active,
      check: "settings",
    },
  ];

  const handlelogout = () => {
    setloading(true);

    setTimeout(() => {
      Cookies.remove("userData");
      Cookies.remove("token");
      localStorage.removeItem("emailtoSignup");
      localStorage.removeItem("userData");
      router.push("/auth/signin");
    }, 1000);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative max-sm:absolute md:relative lg:relative xl:relative flex items-start">
      {/* Toggle button for small screens */}
      <button
        className="text-2xl mt-4 ml-1 lg:hidden  block"
        onClick={toggleSidebar}
      >
        &#61;
      </button>

      {/* Backdrop (visible only when sidebar is open on small screens) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r h-full w-80 min-h-screen z-50 flex flex-col text-center p-5 fixed lg:sticky lg:top-0 lg:h-screen transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close Button */}

        <div className="mt-3">
          <Link href="/">
            <h1 className="text-3xl font-bold text-gray-800 cursor-pointer">
              MOWA
            </h1>
          </Link>
        </div>
        <nav className="flex-1 mt-9">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mt-1">
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-4 rounded-lg text-sm ${
                    activeItem === item.check
                      ? "text-white button-background font-semibold"
                      : "custom-p-color hover:bg-gray-200 font-semibold"
                  }`}
                  onClick={() => {
                    setActiveItem(item.check);
                    setSidebarOpen(false); // Close sidebar after click on mobile
                  }}
                >
                  {activeItem === item.check ? (
                    <item.icon className="mr-3" />
                  ) : (
                    <item.activeicon className="mr-3" />
                  )}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <Link href="/auth/signin">
            <button
              className="flex bg-red-400 text-white items-center text-sm  px-4 py-3 rounded-xl w-full font-semibold"
              onClick={() => {
                handlelogout();
              }}
            >
              <LogOut className="mr-3 w-5" />
              {loading ? "Signing out..." : "Logout"}
            </button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
