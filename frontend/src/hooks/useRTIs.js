import { useState, useEffect } from "react";
import api from "../services/api";

export const useRTIs = (page) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRTIs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/rtis?page=${page}&limit=10`);
      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRTIs();
  }, [page]);

  return { data, loading };
};