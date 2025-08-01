"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  Key,
  LayoutGrid,
  Lock,
  LogOut,
  ScrollText,
  Shield,
  User,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslations } from "use-intl";

export default function Settings({ page }) {
  const pathname = usePathname();
  const [Role, setRole] = useState(false);
  let links = [];

  const t = useTranslations("Settings");

  useEffect(() => {
    const role = Cookies.get("role");
    setRole(role);
  }, []);
  if (Role === "admin") {
    links = [
      {
        href: "/dashboard/settings/profile",
        icon: User,
        label: t("profile"),
      },
      // {
      //   href: "/dashboard/settings/notification-settings",
      //   icon: Bell,
      //   label: "Notification Settings",
      // },
      // {
      //   href: "/dashboard/settings/wallet",
      //   icon: Shield,
      //   label: "Secure your Wallet",
      // },
      {
        href: "/dashboard/settings/change-password",
        icon: Key,
        label: t("change-password"),
      },
      {
        href: "/dashboard/settings/privacy-policy",
        icon: Lock,
        label: t("privacy-policy"),
      },
      {
        href: "/dashboard/settings/terms",
        icon: ScrollText,
        label: t("terms"),
      },
      // {
      //   href: "/dashboard/settings/devices",
      //   icon: LayoutGrid,
      //   label: "Manage Devices",
      // },
      {
        href: "/dashboard/settings/about",
        icon: Info,
        label: t("about-app"),
      },
      {
        href: "/dashboard/settings/help-center",
        icon: HelpCircle,
        label: t("help-center"),
      },
      {
        href: "/dashboard/settings/languages",
        icon: Globe,
        label: t("language"),
      },
      {
        href: "/dashboard/settings/webApp-settings",
        icon: LayoutGrid,
        label: t("webapp-settings"),
      },
      {
        href: "/dashboard/settings/service-charges",
        icon: DollarSign,
        label: "Service Charges",
      },
    ];
  } else {
    links = [
      {
        href: "/dashboard/settings/profile",
        icon: User,
        label: t("profile"),
      },
      // {
      //   href: "/dashboard/settings/notification-settings",
      //   icon: Bell,
      //   label: "Notification Settings",
      // },
      // {
      //   href: "/dashboard/settings/wallet",
      //   icon: Shield,
      //   label: "Secure your Wallet",
      // },
      {
        href: "/dashboard/settings/change-password",
        icon: Key,
        label: t("change-password"),
      },
      {
        href: "/dashboard/settings/privacy-policy",
        icon: Lock,
        label: t("privacy-policy"),
      },
      {
        href: "/dashboard/settings/terms",
        icon: ScrollText,
        label: t("terms"),
      },
      // {
      //   href: "/dashboard/settings/devices",
      //   icon: LayoutGrid,
      //   label: "Manage Devices",
      // },
      {
        href: "/dashboard/settings/about",
        icon: Info,
        label: t("about-app"),
      },
      {
        href: "/dashboard/settings/help-center",
        icon: HelpCircle,
        label: t("help-center"),
      },
      // {
      //   href: "/dashboard/settings/languages",
      //   icon: Globe,
      //   label: "Language",
      // },
      // {
      //   href: "/dashboard/settings/webApp-settings",
      //   icon: LayoutGrid,
      //   label: "WebApp Settings",
      // },
      {
        href: "/dashboard/settings/delete-account",
        icon: LogOut,
        label: "Delete Account",
        isDanger: true,
      },
    ];
  }

  return (
    <div className="settings">
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "button-background text-white bg-[#efd34d] "
                  : "custom-p-color hover:bg-gray-200  ",
                link.isDanger && "text-white "
              )}
            >
              <Icon className="w-5 h-5 mr-3 " />
              {link.label}
              {link.isDanger && (
                <ChevronRight className="w-4 h-4 ml-auto text-white" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
