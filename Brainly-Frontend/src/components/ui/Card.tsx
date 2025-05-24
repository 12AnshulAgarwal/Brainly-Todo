import { DeleteIcon } from "../../icons/DeleteIcon";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"; // For Twitter/X icon

// TypeScript declaration for Twitter widget
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  contentId?: string | number;
  onDelete?: (contentId: string | number) => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (type === "twitter") {
      // Remove existing script if it exists
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      }
      
      // Trigger widget loading after script is loaded
      const loadWidgets = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load();
        }
      };
      
      if (window.twttr) {
        loadWidgets();
      } else {
        // Wait for script to load
        setTimeout(loadWidgets, 1000);
      }
    }
  }, [type, link]); // Added link dependency to reload when link changes

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!onDelete || !contentId) return;
    
    if (window.confirm("Are you sure you want to delete this content?")) {
      setIsDeleting(true);
      try {
        await onDelete(contentId);
      } catch (error) {
        console.error("Error deleting content:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center min-w-0 flex-1">
            <div className="flex-shrink-0 mr-3">
              {type === "youtube" ? (
                <FontAwesomeIcon 
                  icon={faYoutube} 
                  className="text-red-600 text-xl" 
                />
              ) : (
                <FontAwesomeIcon 
                  icon={faXTwitter} 
                  className="text-blue-500 text-xl" 
                />
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
              title="Open link"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`p-1 transition-colors duration-200 ${
                  isDeleting 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-gray-500 hover:text-red-600"
                }`}
                title="Delete content"
              >
                <DeleteIcon size="sm" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-96 bg-gray-50 flex items-center justify-center">
        {type === "youtube" && (
          <iframe
            className="w-full h-full rounded-md"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <div className="w-full h-full overflow-y-auto overflow-x-hidden p-2 bg-white rounded-md border border-gray-100">
            <div className="text-xs text-gray-500 mb-2 text-center">
              ↕️ Scroll to view full tweet
            </div>
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={link.replace("x.com", "twitter.com")}>
                Loading Tweet...
              </a>
            </blockquote>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 capitalize">
            {type === "youtube" ? "YouTube Video" : "Twitter Post"}
          </span>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
