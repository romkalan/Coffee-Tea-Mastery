import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    tagTypes: ['Courses', 'News', 'Services'],
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: (courseId) => ({
                url: "courses",
                params: {courseId}
            })
        }),
        getServices: builder.query({
            query: (serviceId) => ({
                url: "services",
                params: {serviceId}
            })
        }),
    }),
});

export const {
    useGetCoursesQuery,
    useGetServicesQuery
} = api;

export default api;
