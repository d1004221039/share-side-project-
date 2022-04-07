import { configureStore } from "@reduxjs/toolkit";
// ...
import counterReducer from "../features/counter/Slice";
import { dataApi } from "../server/dataAPI";

export const store = configureStore({
  reducer: {
    counterReducer,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getMiddleware) => {
    return getMiddleware().concat(dataApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
