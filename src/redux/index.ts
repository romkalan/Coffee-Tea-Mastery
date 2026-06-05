import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./entities/auth";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
