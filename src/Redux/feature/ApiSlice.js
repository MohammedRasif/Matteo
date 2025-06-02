import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://172.252.13.96:7000",
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
    // user---------------------------------------------------------------------------------------------
    getProfile: builder.query({
      query: () => ({
        url: "/api/v1/users/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    //admin-----------------------------------------------------------------------------------------------------------

    totalSelles: builder.query({
      query: () => "/api/v1/admin/dashboard/total-sales-last-month/",
    }),

    // todaySelas: builder.query({
    //     query:() =>"/api/v1/admin/dashboard/total-sales-today/"
    // }),

    todaySelas: builder.query({
      query: () => "/api/v1/admin/dashboard/total-sales-today/",
    }),
    totalUser: builder.query({
      query: () => "/api/v1/admin/dashboard/total-user/",
    }),
    totalUserEarned: builder.query({
      query: () => "/api/v1/admin/dashboard/total-user-earned-report/",
    }),
    topUserEarned: builder.query({
      query: () => "/api/v1/admin/dashboard/top-earning-user-last-month/",
    }),
    selasOverview: builder.query({
      query: () => "/api/v1/admin/dashboard/monthly-sales-report/",
    }),
    subscription: builder.query({
      query: () => "/api/v1/admin/dashboard/subscription-upgrade-per-day/",
    }),
    managementUserList: builder.query({
      query: () => "/api/v1/admin/management/user/list/",
    }),
    deleteManagementUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/admin/management/user/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Management"],
    }),

    managementUserDetails: builder.query({
      query: (id) => `/api/v1/admin/management/user/info/${id}/`,
    }),
    managementSubmitWarning: builder.mutation({
      query: ({ warning }) => ({
        url: `/api/v1/admin/management/user/give-warning/`,
        method: "POST",
        body: warning,
      }),
      invalidatesTags: ["question"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProfileQuery,

  //rasif
  useTotalSellesQuery,
  useTodaySelasQuery,
  useTotalUserQuery,
  useTotalUserEarnedQuery,
  useTopUserEarnedQuery,
  useSelasOverviewQuery,
  useSubscriptionQuery,
  useManagementUserListQuery,
  useDeleteManagementUserMutation,
  useManagementUserDetailsQuery,
  useManagementSubmitWarningMutation,
} = ApiSlice;

export default ApiSlice;
