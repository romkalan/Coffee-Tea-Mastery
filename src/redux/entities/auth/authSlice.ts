import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/user.ts";
import type { State } from "../../index.ts";
import { users as mockUsers } from "../../../mocks/users.ts";

const REGISTERED_USERS_KEY = "coffee_registered_users";

function getAllUsers(): TUser[] {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    const custom: TUser[] = stored ? JSON.parse(stored) : [];
    return [...mockUsers, ...custom];
}

function saveCustomUser(user: TUser) {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    const custom: TUser[] = stored ? JSON.parse(stored) : [];
    const idx = custom.findIndex(u => u.id === user.id);
    if (idx >= 0) {
        custom[idx] = user;
    } else {
        custom.push(user);
    }
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(custom));
}

function isCustomUser(id: string): boolean {
    return !mockUsers.some(u => u.id === id);
}

function updateStoredUser(user: TUser) {
    localStorage.setItem("coffee_user", JSON.stringify(user));
    if (isCustomUser(user.id)) {
        saveCustomUser(user);
    }
}

function generateId(): string {
    const all = getAllUsers();
    const maxNum = all.reduce((max, u) => {
        const num = parseInt(u.id.replace("u", ""), 10);
        return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    return `u${maxNum + 1}`;
}

type AuthState = {
    user: TUser | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
};

const stored = localStorage.getItem("coffee_user");
const parsedStored: TUser | null = stored ? JSON.parse(stored) : null;
if (parsedStored && !Array.isArray(parsedStored.courses)) {
    parsedStored.courses = [];
}

const initialState: AuthState = {
    user: parsedStored,
    isLoggedIn: !!parsedStored,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    TUser,
    { email: string; password: string },
    { state: State }
>("auth/login", async (credentials) => {
    const all = getAllUsers();
    const user = all.find(u => u.email === credentials.email);
    if (!user || user.password !== credentials.password) {
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
    const all = getAllUsers();
    if (all.some(u => u.email === data.email)) {
        throw new Error("Email уже зарегистрирован");
    }
    const newUser: TUser = {
        id: generateId(),
        name: data.name,
        email: data.email,
        password: data.password,
        role: "student",
        courses: [],
    };
    localStorage.setItem("coffee_user", JSON.stringify(newUser));
    saveCustomUser(newUser);
    return newUser;
});

export const updateUser = createAsyncThunk<
    TUser,
    { id: string; name: string; email: string; password: string },
    { state: State }
>("auth/update", async (data) => {
    const all = getAllUsers();
    const existing = all.find(u => u.id === data.id);
    if (!existing) throw new Error("Пользователь не найден");
    const updated: TUser = {
        ...existing,
        name: data.name,
        email: data.email,
        password: data.password,
    };
    updateStoredUser(updated);
    return updated;
});

export const completeCourse = createAsyncThunk<
    TUser,
    { courseId: string; completedAt: string },
    { state: State }
>("auth/completeCourse", async (data, { getState }) => {
    const state = getState() as State;
    const currentUser = state.auth.user;
    if (!currentUser) throw new Error("Пользователь не авторизован");
    const updatedCourses = currentUser.courses.map(c =>
        c.courseId === data.courseId
            ? { ...c, status: "completed" as const, completedAt: data.completedAt }
            : c
    );
    const updated: TUser = { ...currentUser, courses: updatedCourses };
    updateStoredUser(updated);
    return updated;
});

export const enrollCourse = createAsyncThunk<
    TUser,
    { courseId: string },
    { state: State }
>("auth/enrollCourse", async (data, { getState }) => {
    const state = getState() as State;
    const currentUser = state.auth.user;
    if (!currentUser) throw new Error("Пользователь не авторизован");
    const newCourse = {
        courseId: data.courseId,
        status: "enrolled" as const,
        enrolledAt: new Date().toISOString(),
    };
    const updatedCourses = [...(currentUser.courses || []), newCourse];
    const updated: TUser = { ...currentUser, courses: updatedCourses };
    updateStoredUser(updated);
    return updated;
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
            })
            .addCase(completeCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(completeCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(completeCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка обновления курса";
            })
            .addCase(enrollCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enrollCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(enrollCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка записи на курс";
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export const selectUser = (state: State) => state.auth.user;
export const selectIsLoggedIn = (state: State) => state.auth.isLoggedIn;
export const selectAuthLoading = (state: State) => state.auth.loading;
export const selectAuthError = (state: State) => state.auth.error;

export default authSlice.reducer;
