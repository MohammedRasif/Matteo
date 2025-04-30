

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
       
    }),
});

// ✅ Destructure the auto-generated hook
export const { 
    useRegisterMutation,
 } = authApi;
export default authApi;
