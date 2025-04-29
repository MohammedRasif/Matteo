

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.10.131:4000/api/v1", // ✅ Update this with your backend URL
    }),
    endpoints: (builder) => ({

    //    -------------------------------------
       
    }),
});

// ✅ Destructure the auto-generated hook
export const { 
    
 } = authApi;
export default authApi;
