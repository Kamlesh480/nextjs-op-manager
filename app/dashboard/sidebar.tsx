'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"

const sidebarItems = [
    { name: 'Manage Items', href: '/dashboard/manage-items' },
    { name: 'Manage Traveler', href: '/dashboard/manage-traveler' },
];

export function Sidebar() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname);

    return (
        <div className="flex flex-col w-64 bg-gray-800 text-white">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-xl font-semibold">Dashboard</span>
            </div>
            <nav className="flex-1">
                <ul>
                    {sidebarItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center px-6 py-3 text-sm font-medium",
                                    activeTab === item.href
                                        ? "bg-gray-700 text-white"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                )}
                                onClick={() => setActiveTab(item.href)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}