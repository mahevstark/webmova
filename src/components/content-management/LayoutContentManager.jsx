"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from '../../lib/utils'

import { ChevronRight, Handshake, HelpCircle, Info, LayoutGrid, MessageSquareText, Phone, Rocket } from "lucide-react";

export default function LayoutContentManager({ page }) {
    const pathname = usePathname();

    const links = [
        {
            href: "/dashboard/hero-section",
            icon: LayoutGrid,
            label: "Hero Section",
        },

        {
            href: "/dashboard/faqs",
            icon: HelpCircle,
            label: "Faqs",
        },
        {
            href: "/dashboard/partners",
            icon: Handshake,
            label: "Partners",
        },
        {
            href: "/dashboard/testimonials",
            icon: MessageSquareText,
            label: "Testimonials",
        },
        {
            href: "/dashboard/manage-about",
            icon: Info,
            label: "About",
        },
        {
            href: "/dashboard/manage-contact",
            icon: Phone,
            label: "Contact",
        },
        {
            href: "/dashboard/cta-section",
            icon: Rocket,
            label: "CTA Section",
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
