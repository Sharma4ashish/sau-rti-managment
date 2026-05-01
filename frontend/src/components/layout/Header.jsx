import { Bell, Search, Menu } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              RTI Management
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Management System
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search (hide on small) */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search RTI..."
              className="border rounded-full py-2 px-4 pr-10 w-64 text-sm"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* Bell */}
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="w-8 h-8 rounded-full bg-blue-500" />
        </div>
      </div>
    </header>
  );
}

export default Header;