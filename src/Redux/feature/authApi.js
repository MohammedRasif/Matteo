

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.131:7000/api/v1", // ✅ Update this with your backend URL
    }),
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (data) => ({
                url: "/users/signup/", // ✅ Your API endpoint
                method: "POST",
                body: data, // ✅ Sending email & password
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/users/login/", // ✅ Your API endpoint
                method: "POST",
                body: data, // ✅ Sending email & password
            }),
        }),

        registerVerification: builder.mutation({
            query: (data) => ({
                url: "/users/activate/",
                method: "POST",
                body: data,
            })
        }),
       
    }),
});

// ✅ Destructure the auto-generated hook
export const { 
    useRegisterMutation,useLoginMutation,useRegisterVerificationMutation
 } = authApi;
export default authApi;
