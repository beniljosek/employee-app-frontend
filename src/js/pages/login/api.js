import apiCall from "../../rtk/api";

const loginApi = apiCall.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/employee/login',
                method: 'POST',
                body
            })
        })
    })
});

export const { useLoginMutation } = loginApi;