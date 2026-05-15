import {configureStore} from "@reduxjs/toolkit";
import courseReducer from "./entities/course";
import serviceReducer from "./entities/service";
import { authReducer } from "./entities/auth";
import { profileApi } from "./entities/profile";
import api from "./services/api.js";

const store = configureStore({
    reducer: {
        courses: courseReducer,
        services: serviceReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, profileApi.middleware),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
