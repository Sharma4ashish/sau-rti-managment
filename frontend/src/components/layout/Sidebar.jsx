// components/layout/Sidebar.jsx
import {
  FileText,
  Scale,
  Calendar,
  File,
  BarChart,
  Settings,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col hidden md:flex">
      <div className="h-16 bg-blue-900 flex items-center justify-center text-white font-bold text-xl">
        SAU  
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {/* <p className="text-gray-500 font-semibold mb-4 text-sm">Dashboard</p> */}
        <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />

        <SidebarItem to="/" icon={FileText} label="RTI Management" active />

        <SidebarItem icon={Scale} label="Legal Cases" />
        <SidebarItem icon={Calendar} label="Hearings Calendar" />
        <SidebarItem icon={File} label="Documents" />
        <SidebarItem icon={BarChart} label="Reports & Analytics" />

          <SidebarItem icon={Settings} label="Notifications & Settings" />
          <SidebarItem icon={LogOut} label="Logout" />
      </nav>
    </aside>
  );
}

export default Sidebar;