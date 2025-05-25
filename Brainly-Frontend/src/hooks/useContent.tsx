import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
  const [contents, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContent(response.data.content);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteContent = useCallback(async (contentId: string | number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Refresh the content list after successful deletion
      await fetchContent();
    } catch (error: any) {
      console.error("Error deleting content:", error);
      throw error; // Re-throw to handle in component
    }
  }, [fetchContent]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { contents, refresh: fetchContent, deleteContent, loading };
}
