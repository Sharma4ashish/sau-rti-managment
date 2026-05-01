// components/layout/Topbar.jsx
import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">RTI Management</h1>
        <p className="text-xs text-gray-500">RTI Management</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-1 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-1.5 text-gray-400" size={18} />
        </div>

        <Bell className="text-gray-500 cursor-pointer" size={20} />

        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
          <img src="https://via.placeholder.com/32" alt="Profile" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;