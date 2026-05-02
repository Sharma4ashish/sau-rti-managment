import { useEffect, useState } from "react";
import api from "../services/api";
export function useRTIDetails(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/rtis/${id}`);
        console.log("resssssssss",res);
        
        setData(res.data?.data || res);
      } catch (err) {
        console.error(err); 
        setError("Failed to load RTI details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { data, loading, error };
}