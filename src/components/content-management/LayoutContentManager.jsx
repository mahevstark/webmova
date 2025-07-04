"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '../../lib/utils'
import { ChevronRight, Handshake, HelpCircle, Info, LayoutGrid, MessageSquareText, Phone, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LayoutContentManager({ page }) {
    const pathname = usePathname();
    const t = useTranslations("Content-management");

    const links = [
        {
            href: "/dashboard/hero-section",
            icon: LayoutGrid,
            label: t("sidebar-hero-section"),
        },
        {
            href: "/dashboard/faqs",
            icon: HelpCircle,
            label: t("sidebar-faqs"),
        },
        {
            href: "/dashboard/partners",
            icon: Handshake,
            label: t("sidebar-partners"),
        },
        {
            href: "/dashboard/testimonials",
            icon: MessageSquareText,
            label: t("sidebar-testimonials"),
        },
        {
            href: "/dashboard/manage-about",
            icon: Info,
            label: t("sidebar-about"),
        },
        {
            href: "/dashboard/manage-contact",
            icon: Phone,
            label: t("sidebar-contact"),
        },
        {
            href: "/dashboard/cta-section",
            icon: Rocket,
            label: t("sidebar-cta-section"),
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
                                    ? "button-background text-white bg-[#efd34d] "
                                    : "custom-p-color hover:bg-gray-200  ",
                                link.isDanger && "text-white hover:bg-destructive/10"
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
