import { createSlice } from "@reduxjs/toolkit";

const rtiSlice = createSlice({
  name: "rti",

  initialState: {
    rtiDetails: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setRTIDetails: (state, action) => {
      state.rtiDetails = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setRTIDetails, setError } = rtiSlice.actions;

export default rtiSlice.reducer;