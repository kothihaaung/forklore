import { useEffect, useState } from "react";
import axios from "axios";
import { Photo } from "@/models/photo";

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get<Photo[]>("http://192.168.1.100:3000/api/v1/photos");
        setPhotos(res.data);
      } catch (err) {
        console.error("Failed to fetch photos:", err);
        setError("Failed to load photos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
}
