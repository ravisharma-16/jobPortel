import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singlejob : null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setsinglejob : (state,action) =>
    {
     state.singlejob = action.payload;
    }
  },
});

export const { setAllJobs,setsinglejob } = jobslice.actions;
export default jobslice.reducer;
