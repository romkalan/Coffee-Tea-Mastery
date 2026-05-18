import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {TCourse} from "../../types/course.ts";
import type {TService} from "../../types/service.ts";
import type {TNew} from "../../types/new.ts";
import type {TExpert} from "../../types/expert.ts";
import type {TWinner} from "../../types/winner.ts";
import type {TPartner} from "../../types/partners.ts";
import type {TChampionshipStage} from "../../types/championshipStages.ts";

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
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

export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useGetServicesQuery,
    useGetServiceByIdQuery,
    useGetNewsQuery,
    useGetNewByIdQuery,
    useGetExpertsQuery,
    useGetExpertByIdQuery,
    useGetWinnersQuery,
    useGetPartnersQuery,
    useGetChampionshipStagesQuery,
} = api;

export default api;
