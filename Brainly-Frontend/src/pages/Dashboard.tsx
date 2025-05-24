import "../App.css";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { useState, useMemo } from "react";
import { Sidebar } from "../components/ui/Sidebar";
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
      {/* Navbar */}
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          onFilterChange={handleFilterChange}
          activeFilter={contentFilter}
        />

        {/* Main Content */}
        <div className="flex-1 ml-72 p-6">
          <CreateContentModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSuccess={handleContentAdded}
          />
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
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
            
            <div className="flex gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No content found
              </h3>
              <p className="text-gray-600 mb-6">
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
