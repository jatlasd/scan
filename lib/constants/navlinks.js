import { FileText, Layers, ListPlus, ScanSearch } from "lucide-react";

export const navlinks = [
    { href: "/scan", text: "Scan", icon: <ScanSearch className="h-5 w-5" /> },
    { href: "/ingredients", text: "Ingredients", icon: <ListPlus className="h-5 w-5" /> },
    { href: "/products", text: "Products", icon: <Layers className="h-5 w-5" /> },
    { href: "/drafts", text: "Drafts", icon: <FileText className="h-5 w-5" /> },
]