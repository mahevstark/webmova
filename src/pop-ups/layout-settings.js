"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
} from "lucide-react";

export default function Settings({ page }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard/settings/profile",
      icon: User,
      label: "Profile",
    },
    {
      href: "/dashboard/settings/notification-settings",
      icon: Bell,
      label: "Notification Settings",
    },
    {
      href: "/dashboard/settings/wallet",
      icon: Shield,
      label: "Secure your Wallet",
    },
    {
      href: "/dashboard/settings/change-password",
      icon: Key,
      label: "Change Password",
    },
    {
      href: "/dashboard/settings/privacy-policy",
      icon: Lock,
      label: "Privacy Policy",
    },
    {
      href: "/dashboard/settings/terms",
      icon: ScrollText,
      label: "Terms & Conditions",
    },
    {
      href: "/dashboard/settings/devices",
      icon: LayoutGrid,
      label: "Manage Devices",
    },
    {
      href: "/dashboard/settings/about",
      icon: Info,
      label: "About App",
    },
    {
      href: "/dashboard/settings/help-center",
      icon: HelpCircle,
      label: "Help Center",
    },
    {
      href: "/dashboard/settings/languages",
      icon: Globe,
      label: "Language",
    },
    {
      href: "/dashboard/settings/webApp-settings",
      icon: LayoutGrid,
      label: "WebApp Settings",
    },
    {
      href: "/dashboard/settings/delete-account",
      icon: LogOut,
      label: "Delete Account",
      isDanger: true,
    },
  ];

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
                  ? "layout-active-color bg-[#efd34d] "
                  : "custom-p-color hover:bg-gray-200  ",
                link.isDanger && "text-destructive hover:bg-destructive/10"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {link.label}
              {link.isDanger && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
