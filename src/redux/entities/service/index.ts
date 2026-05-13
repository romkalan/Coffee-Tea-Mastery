import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {TService} from "../../../types/service.ts";

interface ServiceState {
    entities: Record<string, TService>;
    ids: string[];
    loading: boolean;      // Добавляем для отслеживания загрузки
    error: string | null;  // Добавляем для ошибок
}

const initialState: ServiceState = {
    entities: {},
    ids: [],
    loading: false,
    error: null,
};

export const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        addService: (state, action: PayloadAction<TService>) => {
            const service = action.payload;
            state.entities[service.id] = service;
            if (!state.ids.includes(service.id)) {
                state.ids.push(service.id);
            }
        },
        addServices: (state, action: PayloadAction<TService[]>) => {
            action.payload.forEach(service => {
                state.entities[service.id] = service;
                if (!state.ids.includes(service.id)) {
                    state.ids.push(service.id);
                }
            });
        },
        removeService: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            delete state.entities[id];
            state.ids = state.ids.filter(serviceId => serviceId !== id);
        },
        clearServices: (state) => {
            state.entities = {};
            state.ids = [];
        },
    },
});

export const {
    setLoading,
    setError ,
    addService,
    addServices,
    removeService,
    clearServices
} = serviceSlice.actions;

// Селекторы для доступа к данным
export const selectServicesState = (state: { services: ServiceState }) => state.services;

export const selectAllServices = (state: { services: ServiceState }) => {
    return state.services.ids.map(id => state.services.entities[id]);
};

export const selectServiceById = (id: string) => (state: { services: ServiceState }) => {
    return state.services.entities[id];
};

export const selectServicesLoading = (state: { services: ServiceState }) => {
    return state.services.loading;
};

export const selectServicesError = (state: { services: ServiceState }) => {
    return state.services.error;
};

export default serviceSlice.reducer;
