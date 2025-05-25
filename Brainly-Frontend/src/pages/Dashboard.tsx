import "../App.css";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { useState, useMemo } from "react";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentFilter, setContentFilter] = useState<"all" | "youtube" | "twitter">("all");
  const { contents, refresh, deleteContent, loading } = useContent();
  const navigate = useNavigate();

  const filteredContents = useMemo(() => {
    if (contentFilter === "all") return contents;
    return contents.filter((content: any) => content.type === contentFilter);
  }, [contents, contentFilter]);

  const handleFilterChange = (filter: "all" | "youtube" | "twitter") => {
    setContentFilter(filter);
  };

  const handleContentAdded = () => {
    refresh();
  };

  const handleDeleteContent = async (contentId: string | number) => {
    try {
      await deleteContent(contentId);
    } catch (error: any) {
      console.error("Dashboard: Delete failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete content. Please try again.";
      alert(`Delete failed: ${errorMessage}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Bar */}
      <div className="lg:hidden bg-white border-b p-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 text-center">
          Filter Content
        </h3>
        <div className="flex gap-3 justify-center">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              contentFilter === "all" 
                ? "bg-purple-100 text-purple-700 border border-purple-200" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All Content
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              contentFilter === "youtube" 
                ? "bg-red-100 text-red-700 border border-red-200" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("youtube")}
          >
            YouTube
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              contentFilter === "twitter" 
                ? "bg-blue-100 text-blue-700 border border-blue-200" 
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => handleFilterChange("twitter")}
          >
            Twitter
          </button>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200">
          <div className="p-6">
            {/* Logo/Brand */}
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Brainly</span>
            </div>

            {/* Filter Section */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Filter Content
              </h3>
              <div className="space-y-2">
                <button 
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    contentFilter === "all" 
                      ? "bg-purple-100 text-purple-700 border border-purple-200 shadow-sm" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => handleFilterChange("all")}
                >
                  All Content
                </button>
                <button 
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    contentFilter === "youtube" 
                      ? "bg-red-100 text-red-700 border border-red-200 shadow-sm" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => handleFilterChange("youtube")}
                >
                  YouTube
                </button>
                <button 
                  className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    contentFilter === "twitter" 
                      ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => handleFilterChange("twitter")}
                >
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 p-4 lg:p-6">
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSuccess={handleContentAdded}
          />
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                {contentFilter === "all" 
                  ? "All Content" 
                  : contentFilter === "youtube" 
                    ? "YouTube Videos" 
                    : "Twitter Posts"
                }
              </h1>
              <p className="text-gray-600 mt-1">
                {loading ? "Loading..." : `${filteredContents.length} ${filteredContents.length === 1 ? 'item' : 'items'}`}
              </p>
            </div>
            
            <div className="flex gap-3 justify-center sm:justify-end">
              <Button
                onClick={() => setModalOpen(true)}
                startIcon={<PlusIcon size={"lg"} />}
                size="sm"
                variant="primary"
                text="Add Content"
              />
              <Button
                onClick={handleLogout}
                size="sm"
                variant="secondary"
                text="Logout"
              />
            </div>
          </div>

          {/* Content Grid */}
          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredContents.map((content: any, index: number) => (
                <Card 
                  key={content._id || content.id || index}
                  type={content.type} 
                  link={content.link} 
                  title={content.title}
                  contentId={content._id || content.id}
                  onDelete={handleDeleteContent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 lg:py-16">
              <div className="text-gray-400 text-4xl lg:text-6xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No content found
              </h3>
              <p className="text-gray-600 mb-6 text-sm lg:text-base">
                {contentFilter === "all" 
                  ? "Start by adding your first YouTube video or Twitter post." 
                  : `No ${contentFilter} content available. Add some content to get started.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;