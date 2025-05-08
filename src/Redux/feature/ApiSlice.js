
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.124:2000/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        const token = getState().auth.token || accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const ApiSlice = createApi({
    reducerPath: "ApiSlice",
    baseQuery,
    // List all tag types used in the API slice
    tagTypes: ["Profile", "UserDashboard", "Project", "Employees"],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({
                url: "/users/profile/",
                method: "GET",
            }),
            providesTags: ["Profile"],
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
        }),
      
    }),
});

// Export hooks for usage in components
export const {
   useGetProfileQuery, 
} = ApiSlice;

export default ApiSlice;


