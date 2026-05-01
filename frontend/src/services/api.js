
const BASE_URL = "http://localhost:8000/api/v1/rtis";

export const rtiService = {
  getRTIs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();

    const res = await fetch(`${BASE_URL}?${query}`);
    if (!res.ok) throw new Error("Failed to fetch RTIs");

    return res.json();
  },

  getRTIById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch RTI");

    return res.json();
  },

  createRTI: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create RTI");

    return res.json();
  },
};