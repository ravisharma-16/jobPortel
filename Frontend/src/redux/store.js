
// import { configureStore } from "@reduxjs/toolkit";
// import authslice from './auth'
// import  jobslice  from "./job.redux";



// const store = configureStore({
//     reducer: {
//         auth: authslice,  
//         job : jobslice
//     } 
// });

// export default store;



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authslice from "./auth";
import jobslice from "./job.redux";
import companyauth from './authcompany'
import applicantSlice from './Applicanthistory'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ✅ combine reducers correctly
const rootReducer = combineReducers({
  auth: authslice,
  job: jobslice,
  company : companyauth,
  applicant : applicantSlice,
});

// ✅ wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export persistor for <PersistGate>
export const persistor = persistStore(store);

export default store;
