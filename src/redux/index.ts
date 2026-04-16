import {configureStore} from "@reduxjs/toolkit";
import courseReducer from "./entities/course";
import serviceReducer from "./entities/service";
import api from "./services/api.js";

const store = configureStore({
    reducer: {
        courses: courseReducer,
        services: serviceReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
