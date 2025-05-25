import { type ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
}

export function SidebarItem({ text, icon, isActive = false }: SidebarItemProps) {
  return (
    <div className={`flex items-center text-gray-700 py-2 px-2 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-current bg-opacity-10" : "hover:bg-gray-100"
    }`}>
      <div className="pr-2">
        {icon}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}