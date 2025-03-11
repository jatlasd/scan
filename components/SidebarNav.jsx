"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navlinks } from "@/lib/constants/navlinks";

const SidebarNav = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r shadow-lg">
      <div className="border-sidebar-border bg-sidebar-primary/5 flex h-16 items-center justify-center border-b">
        <span className="text-sidebar-foreground text-xl font-bold">
          Your Logo
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navlinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${pathname === item.href || pathname.startsWith(item.href) ? 'bg-primary/50 hover:bg-primary/60' : 'hover:bg-sidebar-primary/10'} text-sidebar-foreground/80 ring-offset-background  hover:text-sidebar-foreground focus-visible:ring-sidebar-ring flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
          >
            <span className="text-sidebar-foreground/70 mr-3">{item.icon}</span>
            {item.text}
          </Link>
        ))}
      </nav>

      <div className="border-sidebar-border bg-sidebar-primary/5 border-t p-4">
        <div className="flex items-center">
          <div className="bg-sidebar-accent h-9 w-9 rounded-full" />
          <div className="ml-3">
            <p className="text-sidebar-foreground text-sm font-medium">
              User Name
            </p>
            <p className="text-sidebar-foreground/60 text-xs">
              user@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
