import SidebarNav from "@/components/SidebarNav";
import { checkUser } from "@/lib/checkUser";
import React from "react";

const AuthLayout = async ({ children }) => {
  let user = await checkUser();
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <main className="bg-background flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AuthLayout;
