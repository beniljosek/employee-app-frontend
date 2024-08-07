import apiCall from "../../rtk/api";

const employeeApi = apiCall.injectEndpoints({
    endpoints: (builder) => ({
        getEmployees: builder.query({
            query: () => '/employee',
            providesTags: ['Employee']
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
            })
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/employee/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employee'],
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
    useUpdateEmployeeMutation
} = employeeApi;