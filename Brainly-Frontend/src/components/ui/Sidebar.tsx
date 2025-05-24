import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { useState } from "react";

interface SidebarProps {
  onFilterChange?: (filter: "all" | "youtube" | "twitter") => void;
  activeFilter?: "all" | "youtube" | "twitter";
}

export function Sidebar({
  onFilterChange,
  activeFilter = "all",
}: SidebarProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "youtube" | "twitter"
  >(activeFilter);

  const handleFilterClick = (filter: "all" | "youtube" | "twitter") => {
    setSelectedFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className="hidden lg:block h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 pt-4">
      <h1 className="flex text-2xl pt-2 items-center">
        <div className="pr-2">
          <Logo />
        </div>
        Brainly
      </h1>

      <div className="w-full flex flex-col items-center py-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 text-center">
          Filter Content
        </h3>

        <div className="flex-row justify-center gap-2 flex-wrap">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === "all"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterClick("all")}
          >
            All Content
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === "youtube"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterClick("youtube")}
          >
            YouTube
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedFilter === "twitter"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFilterClick("twitter")}
          >
            Twitter
          </button>
        </div>
      </div>
    </div>
  );
}
