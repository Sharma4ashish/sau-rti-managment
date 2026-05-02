// components/layout/SidebarItem.jsx
import { Link } from "react-router-dom";

function SidebarItem({ to, icon: Icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-lg ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon size={20} />
      {label}
    </Link>
  );
}

export default SidebarItem;