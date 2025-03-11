import { FileText, Layers, LayoutDashboard, ListPlus, ScanSearch, Settings } from "lucide-react";

export const navlinks = [
    { href: "/dashboard", text: "Dashboard", icon: <LayoutDashboard className="h-5 w-5"/>},
    { href: "/scan", text: "Scan", icon: <ScanSearch className="h-5 w-5" /> },
    { href: "/ingredients", text: "Ingredients", icon: <ListPlus className="h-5 w-5" /> },
    { href: "/products", text: "Products", icon: <Layers className="h-5 w-5" /> },
    { href: "/drafts", text: "Drafts", icon: <FileText className="h-5 w-5" /> },
    { href: "/settings", text: "Settings", icon: <Settings className="h-5 w-5"/>}
]