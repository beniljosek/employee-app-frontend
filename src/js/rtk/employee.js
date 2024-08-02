import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
    reducerPath: 'employee',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        getEmployees: builder.query({
            query: () => '/employee',
            providesTags: ['employees']
        }),
        createEmployee: builder.mutation({
            query: (body) => ({
                url: `/employee`,
                method: 'POST',
                body
            }),
        }),
        getEmployee: builder.query({
            query: (id) => ({
                url: `/employee/${id}`
            }),
            transformResponse: response => {
                return response.data;
            }
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['employees'],
        }),
        updateEmployee: builder.mutation({
            query: ({ id, ...empdata }) => ({
                url: `/employee/${id}`,
                method: 'PUT',
                body: empdata,
            }),
            transformResponse: response => {
                return response.data;
            }
        }),
    })
});

export const {
    useCreateEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeQuery,
    useGetEmployeesQuery,
    useLoginMutation,
    useUpdateEmployeeMutation
} = employeeApi;
