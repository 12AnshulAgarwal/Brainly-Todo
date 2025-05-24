import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;

type ContentTypeValue = typeof ContentType[keyof typeof ContentType];

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateContentModal({ open, onClose, onSuccess }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentTypeValue>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear form
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setType(ContentType.Youtube);
      
      // Call success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
      
      // Close modal
      onClose();
      
    } catch (error: any) {
      console.error("Error adding content:", error);
      setError(error.response?.data?.message || "Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {open && (
  <div>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"></div>

    {/* Modal Container */}
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl px-8 py-6">
        {/* Close Icon */}
        <div className="flex justify-end">
          <div onClick={onClose} className="cursor-pointer text-gray-600 hover:text-black">
            <CrossIcon />
          </div>
        </div>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Add New Content</h2>
        <hr className="mb-6 border-t" />

        {/* Input Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              ref={titleRef}
              placeholder="Enter content title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Link</label>
            <input
              ref={linkRef}
              placeholder="Enter content URL"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Type Buttons */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 text-center">Select Content Type</h3>
          <div className="flex justify-center gap-4">
            <button
              className={`px-5 py-2 rounded-md font-medium ${
                type === ContentType.Youtube
                  ? "bg-red-600 text-white"
                  : "border border-gray-300 text-gray-700"
              }`}
              onClick={() => setType(ContentType.Youtube)}
            >
              Youtube
            </button>
            <button
              className={`px-5 py-2 rounded-md font-medium ${
                type === ContentType.Twitter
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300 text-gray-700"
              }`}
              onClick={() => setType(ContentType.Twitter)}
            >
              Twitter
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 border-t pt-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            onClick={addContent}
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition-all ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
            }`}
          >
            {loading ? "Adding..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
