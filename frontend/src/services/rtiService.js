import api from "./api";

//  Get all RTIs (with pagination)
export const getRTIs = async (params = {}) => {
  const res = await api.get("/rtis", {
    params,
  });

  return res.data.data;
};

//Get single RTI details
export const getRTIDetails = async (id) => {
  const res = await api.get(`/rtis/${id}`);
  return res.data.data;
};

// Create RTI (with file upload)
export const createRTI = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "document") {
      if (data.document?.[0]) {
        formData.append("document", data.document[0]);
      }
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  const res = await api.post("/rtis", formData);

  return res.data.data;
};

//  Update RTI
export const updateRTI = async (id, data) => {
  const res = await api.put(`/rtis/${id}`, data);
  return res.data.data;
};

//Delete RTI
// export const deleteRTI = async (id) => {
//   const res = await api.delete(`/rtis/${id}`);
//   return res.data;
// };

export const deleteRTI = async (id) => {
  try {
    const res = await api.delete(`/rtis/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE ERROR:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};