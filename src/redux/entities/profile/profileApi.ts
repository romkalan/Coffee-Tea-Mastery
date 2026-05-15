import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Enrollments"],
    endpoints: (builder) => ({
        getEnrollments: builder.query({
            query: (userId: string) => `enrollments?userId=${userId}`,
            providesTags: ["Enrollments"],
        }),
        createEnrollment: builder.mutation({
            query: (data) => ({
                url: "enrollments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Enrollments"],
        }),
        completeEnrollment: builder.mutation({
            query: ({ id, completedAt }) => ({
                url: `enrollments/${id}`,
                method: "PATCH",
                body: { status: "completed", completedAt },
            }),
            invalidatesTags: ["Enrollments"],
        }),
    }),
});

export const {
    useGetEnrollmentsQuery,
    useCreateEnrollmentMutation,
    useCompleteEnrollmentMutation,
} = profileApi;
