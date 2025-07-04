"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Activity from "../../assets/Activity.svg";
import Active from "../../assets/active.svg";
import Cookies from "js-cookie";
import { LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "use-intl";

export default function Sidebar({ page }) {
  const t = useTranslations("Dash-layout");
  const menuItems = [
    {
      name: t("dashboard"),
      icon: Activity,
      href: "/",
      activeicon: Active,
      check: "Dashboard",
    },
    {
      name: t("users"),
      icon: Activity,
      href: "/dashboard/users",
      activeicon: Active,
      check: "Employees",
    },
    {
      name: t("transaction-history"),
      icon: Activity,
      href: "/dashboard/transaction-history",
      activeicon: Active,
      check: "transactionhistory",
    },
    // {
    //   name: "Payment Request",
    //   icon: Activity,
    //   href: "/dashboard/payment-request",
    //   activeicon: Active,
    //   check: "paymentrequest",
    // },
    {
      name: t("setting"),
      icon: Activity,
      href: "/dashboard/settings/profile",
      activeicon: Active,
      check: "settings",
    },
    {
      name: t("content-management"),
      icon: Activity,
      href: "/dashboard/hero-section",
      activeicon: Active,
      check: "Content",
    },
  ];

  const place = page;
  const [activeItem, setActiveItem] = useState(page);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const [Role, setRole] = useState(null);
  useEffect(() => {
    const role = Cookies.get("role");
    setRole(role);
  }, []);

  const handlelogout = () => {
    setloading(true);
    const role = Cookies.get("role");
    setTimeout(() => {
      Cookies.remove("userData");
      Cookies.remove("token");
      Cookies.remove("role");
      localStorage.removeItem("emailtoSignup");
      localStorage.removeItem("userData");
      role === "admin"
        ? router.push("/auth/signin?role=admin")
        : router.push("/auth/signin");
      setloading(false);
      setShowLogoutDialog(false);
    }, 1000);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
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

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Logout
              </h3>
            </div>
            <p className="text-gray-500 mb-6">
              Are you sure you want to logout? You will need to sign in again to
              access your account.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlelogout}
                disabled={loading}
                className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 font-medium disabled:opacity-50"
              >
                {loading ? "Signing out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
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
            <h1 className="text-3xl font-bold text-white py-3 cursor-pointer bg-[#544AF1]">
              MOWAPAY
            </h1>
          </Link>
        </div>
        <nav className="flex-1 mt-9">
          <ul>
            {menuItems.map((item) => {
              if (item.name === "Content Management" && Role !== "admin") {
                return null; // Don't render this item for non-admins
              }

              return (
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
                    {item.name === "Employees"
                      ? Role === "admin"
                        ? "Users"
                        : "Users"
                      : item.name}{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4">
          <button
            className="flex bg-red-400 text-white items-center text-sm  px-4 py-3 rounded-xl w-full font-semibold hover:bg-red-500"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-3 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}
