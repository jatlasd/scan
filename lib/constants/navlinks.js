import { FileText, IdCard, Layers, LayoutDashboard, ListPlus, ScanSearch, Settings } from "lucide-react";

export const navlinks = [
    { href: "/dashboard", text: "Dashboard", icon: <LayoutDashboard className="h-5 w-5"/>},
    { href: "/profile", text: "Profile", icon: <IdCard className="h-5 w-5" /> },
    { href: "/lookup", text: "Product Lookup", icon: <ScanSearch className="h-5 w-5" /> },
    { href: "/drafts", text: "Drafts", icon: <FileText className="h-5 w-5" /> },
    { href: "/settings", text: "Settings", icon: <Settings className="h-5 w-5"/>}
]