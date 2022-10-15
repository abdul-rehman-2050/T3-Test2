// components/layout.js

import TopNav from "../TopNav";
import Footer from "../Footer";
import SideBar from "../SideBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <SideBar />
    
    
      <div className="flex h-screen w-full flex-col overflow-y-hidden">
        <TopNav />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
