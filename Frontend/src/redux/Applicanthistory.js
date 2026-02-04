import { createSlice } from "@reduxjs/toolkit";

const applicantSlice = createSlice({
  name: "applicant",
  initialState: {
    applicants: [], // ✅ array to hold applicants
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload; // ✅ update the correct state
    },
    clearApplicants: (state) => {
      state.applicants = [];
    },
  },
});

export const { setApplicants, clearApplicants } = applicantSlice.actions;
export default applicantSlice.reducer;
