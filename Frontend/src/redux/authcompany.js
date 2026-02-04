import { createSlice } from "@reduxjs/toolkit";

const companyauth = createSlice({
  name: "company",
  initialState: {
    singlecompany: null,
    companies: [], 
    getalljobs:[],
  },
  reducers: {
    setsinglecompany: (state, action) => {
      state.singlecompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setallJobs: (state, action) => {
      state.getalljobs = action.payload;
    },
  },
});

export const { setsinglecompany, setCompanies ,setallJobs} = companyauth.actions;
export default companyauth.reducer;
