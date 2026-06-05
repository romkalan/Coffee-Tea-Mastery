import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useState, useEffect, useCallback } from "react";
import type {TCourse} from "../../types/course.ts";
import type {TService} from "../../types/service.ts";
import type {TNew} from "../../types/new.ts";
import type {TExpert} from "../../types/expert.ts";
import type {TWinner} from "../../types/winner.ts";
import type {TPartner} from "../../types/partners.ts";
import type {TChampionshipStage} from "../../types/championshipStages.ts";
import {courses} from "../../mocks/courses.ts";
import {services} from "../../mocks/services.ts";
import {news} from "../../mocks/news.ts";
import {experts} from "../../mocks/experts.ts";
import {winners} from "../../mocks/winners.ts";
import {partners} from "../../mocks/partners.ts";
import {championshipStages} from "../../mocks/championshipStages.ts";

const IS_MOCK = import.meta.env.VITE_USE_MOCKS === 'true';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
    }),
    tagTypes: ['Courses', 'News', 'Services', 'Experts', 'Winners', 'Partners', 'ChampionshipStages'],
    endpoints: (builder) => ({
        getCourses: builder.query<TCourse[], void>({
            query: () => "courses",
            providesTags: ['Courses'],
        }),
        getCourseById: builder.query<TCourse, string>({
            query: (id) => `courses/${id}`,
            providesTags: ['Courses'],
        }),
        getServices: builder.query<TService[], void>({
            query: () => "services",
            providesTags: ['Services'],
        }),
        getServiceById: builder.query<TService, string>({
            query: (id) => `services/${id}`,
            providesTags: ['Services'],
        }),
        getNews: builder.query<TNew[], void>({
            query: () => "news",
            providesTags: ['News'],
        }),
        getNewById: builder.query<TNew, string>({
            query: (id) => `news/${id}`,
            providesTags: ['News'],
        }),
        getExperts: builder.query<TExpert[], void>({
            query: () => "experts",
            providesTags: ['Experts'],
        }),
        getExpertById: builder.query<TExpert, string>({
            query: (id) => `experts/${id}`,
            providesTags: ['Experts'],
        }),
        getWinners: builder.query<TWinner[], void>({
            query: () => "winners",
            providesTags: ['Winners'],
        }),
        getPartners: builder.query<TPartner[], void>({
            query: () => "partners",
            providesTags: ['Partners'],
        }),
        getChampionshipStages: builder.query<TChampionshipStage[], void>({
            query: () => "championshipStages",
            providesTags: ['ChampionshipStages'],
        }),
    }),
});

type MockState<T> = {
    data: T | undefined;
    isLoading: boolean;
    error: string | null;
};

export type QueryResult<T> = MockState<T> & {
    isError: boolean;
    isSuccess: boolean;
    status: string;
    refetch: () => void;
};

function useMockQuery<T>(
    fetcher: () => T | undefined,
    deps: unknown[] = []
): QueryResult<T> {
    const [state, setState] = useState<MockState<T>>({
        data: undefined,
        isLoading: true,
        error: null,
    });

    const refetch = useCallback(() => {
        setState({data: undefined, isLoading: true, error: null});
        const id = setTimeout(() => {
            try {
                const result = fetcher();
                setState({data: result, isLoading: false, error: result === undefined ? "Not found" : null});
            } catch (e) {
                setState({data: undefined, isLoading: false, error: String(e)});
            }
        }, 150);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        const cleanup = refetch();
        return () => cleanup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        isError: !!state.error,
        isSuccess: !!(state.data && !state.isLoading && !state.error),
        status: state.isLoading ? "pending" : state.error ? "rejected" : "fulfilled",
        refetch,
    };
}

type QueryHook0<T> = () => QueryResult<T>;
type QueryHook1<T> = (id: string | undefined) => QueryResult<T>;

export const useGetCoursesQuery: QueryHook0<TCourse[]> = IS_MOCK
    ? () => useMockQuery(() => courses)
    : (api.useGetCoursesQuery as unknown as QueryHook0<TCourse[]>);

export const useGetCourseByIdQuery: QueryHook1<TCourse> = IS_MOCK
    ? (id: string | undefined) => useMockQuery(() => id ? courses.find(c => c.id === id) : undefined, [id])
    : (api.useGetCourseByIdQuery as unknown as QueryHook1<TCourse>);

export const useGetServicesQuery: QueryHook0<TService[]> = IS_MOCK
    ? () => useMockQuery(() => services)
    : (api.useGetServicesQuery as unknown as QueryHook0<TService[]>);

export const useGetServiceByIdQuery: QueryHook1<TService> = IS_MOCK
    ? (id: string | undefined) => useMockQuery(() => id ? services.find(s => s.id === id) : undefined, [id])
    : (api.useGetServiceByIdQuery as unknown as QueryHook1<TService>);

export const useGetNewsQuery: QueryHook0<TNew[]> = IS_MOCK
    ? () => useMockQuery(() => news)
    : (api.useGetNewsQuery as unknown as QueryHook0<TNew[]>);

export const useGetNewByIdQuery: QueryHook1<TNew> = IS_MOCK
    ? (id: string | undefined) => useMockQuery(() => id ? news.find(n => n.id === id) : undefined, [id])
    : (api.useGetNewByIdQuery as unknown as QueryHook1<TNew>);

export const useGetExpertsQuery: QueryHook0<TExpert[]> = IS_MOCK
    ? () => useMockQuery(() => experts)
    : (api.useGetExpertsQuery as unknown as QueryHook0<TExpert[]>);

export const useGetExpertByIdQuery: QueryHook1<TExpert> = IS_MOCK
    ? (id: string | undefined) => useMockQuery(() => id ? experts.find(e => e.id === id) : undefined, [id])
    : (api.useGetExpertByIdQuery as unknown as QueryHook1<TExpert>);

export const useGetWinnersQuery: QueryHook0<TWinner[]> = IS_MOCK
    ? () => useMockQuery(() => winners)
    : (api.useGetWinnersQuery as unknown as QueryHook0<TWinner[]>);

export const useGetPartnersQuery: QueryHook0<TPartner[]> = IS_MOCK
    ? () => useMockQuery(() => partners)
    : (api.useGetPartnersQuery as unknown as QueryHook0<TPartner[]>);

export const useGetChampionshipStagesQuery: QueryHook0<TChampionshipStage[]> = IS_MOCK
    ? () => useMockQuery(() => championshipStages)
    : (api.useGetChampionshipStagesQuery as unknown as QueryHook0<TChampionshipStage[]>);

export default api;
