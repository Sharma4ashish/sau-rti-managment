import { useState, useEffect } from "react";
import { getRTIs, deleteRTI } from "../services/rtiService";

export const useRTIs = ({ page, limit, filters = {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRTIs = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page,
        limit,
        ...(filters.date && { date: filters.date }),
        ...(filters.department && { department: filters.department }),
        ...(filters.status && { status: filters.status }),
      };

      const result = await getRTIs(params);
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch RTIs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRTIs();
  }, [page, limit, JSON.stringify(filters)]);



  const deleteItem = async (id) => {
    try {
      await deleteRTI(id);

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          data: prev.data.filter((item) => item._id !== id),
        };
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return { data, loading, error, refetch: fetchRTIs, deleteItem };
};


// export const useRTIs = ({ page, limit, filters={} }) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchRTIs = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const params = {
//         page,
//         limit,
//         ...(filters.date && { date: filters.date }),
//         ...(filters.department && { department: filters.department }),
//         ...(filters.status && { status: filters.status }),
//       };

//       const result = await getRTIs(params);
//       setData(result);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch RTIs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//   fetchRTIs();
// }, [page, limit, JSON.stringify(filters)]);

//   return { data, loading, error, refetch: fetchRTIs };
// };