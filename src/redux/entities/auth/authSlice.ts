import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/user.ts";
import type { State } from "../../index.ts";

type AuthState = {
    user: TUser | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
};

const stored = localStorage.getItem("coffee_user");
const initialUser: TUser | null = stored ? JSON.parse(stored) : null;

const initialState: AuthState = {
    user: initialUser,
    isLoggedIn: !!initialUser,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    TUser,
    { email: string; password: string },
    { state: State }
>("auth/login", async (credentials) => {
    const res = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(credentials.email)}`
    );
    const users: TUser[] = await res.json();
    if (users.length === 0) {
        throw new Error("Неверный email или пароль");
    }
    const user = users[0];
    if (user.password !== credentials.password) {
        throw new Error("Неверный email или пароль");
    }
    localStorage.setItem("coffee_user", JSON.stringify(user));
    return user;
});

export const registerUser = createAsyncThunk<
    TUser,
    { name: string; email: string; password: string },
    { state: State }
>("auth/register", async (data) => {
    const check = await fetch(
        `http://localhost:3000/users?email=${encodeURIComponent(data.email)}`
    );
    const existing: TUser[] = await check.json();
    if (existing.length > 0) {
        throw new Error("Email уже зарегистрирован");
    }
    const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            role: "student",
        }),
    });
    const user: TUser = await res.json();
    localStorage.setItem("coffee_user", JSON.stringify(user));
    return user;
});

export const updateUser = createAsyncThunk<
    TUser,
    { id: string; name: string; email: string; password: string },
    { state: State }
>("auth/update", async (data) => {
    const res = await fetch(`http://localhost:3000/users/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
        }),
    });
    const user: TUser = await res.json();
    localStorage.setItem("coffee_user", JSON.stringify(user));
    return user;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("coffee_user");
        },
        clearError(state) {
            state.error = null;
        },
        updateUserState(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка входа";
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка регистрации";
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка обновления";
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectUser = (state: State) => state.auth.user;
export const selectIsLoggedIn = (state: State) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: State) => state.auth.loading;
export const selectAuthError = (state: State) => state.auth.error;

export default authSlice.reducer;
