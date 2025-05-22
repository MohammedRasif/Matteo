
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.124:2000",
    //baseUrl: "http://192.168.10.35:8000",
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

        // use Support
        supportTicket: builder.query({
            query: () => "/api/v1/tickets/"
        }),

        supportTicketDelete: builder.mutation({
            query: (id) => ({
                url: `/api/v1/tickets/ticket/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Management"]
        }),
        supporTicketPost: builder.mutation({
            query: ({ warning }) => ({
                url: `/api/v1/tickets/`,
                method: "POST",
                body: warning
            }),
            invalidatesTags: ["question"]
        }),

        supportTikectEdit: builder.mutation({
            query: ({ id, question }) => ({
                url: `/api/v1/tickets/ticket/${id}/`,
                method: "PUT",
                body: question
            }),
            invalidatesTags: ["question"]
        }),

        serviceCommunityData: builder.query({
            query:() => "api/v1/order-post/list/all/"
        }),

        
























        //admin-----------------------------------------------------------------------------------------------------------

        totalSelles: builder.query({
            query: () => "/api/v1/admin/dashboard/total-sales-last-month/",

        }),

        // todaySelas: builder.query({
        //     query:() =>"/api/v1/admin/dashboard/total-sales-today/"
        // }),

        todaySelas: builder.query({
            query: () => "/api/v1/admin/dashboard/total-sales-today/"
        }),
        totalUser: builder.query({
            query: () => "/api/v1/admin/dashboard/total-user/"
        }),
        totalUserEarned: builder.query({
            query: () => "/api/v1/admin/dashboard/total-user-earned-report/"
        }),
        topUserEarned: builder.query({
            query: () => "/api/v1/admin/dashboard/top-earning-user-last-month/"
        }),
        selasOverview: builder.query({
            query: () => "/api/v1/admin/dashboard/monthly-sales-report/"
        }),
        subscription: builder.query({
            query: () => "/api/v1/admin/dashboard/subscription-upgrade-per-day/"
        }),
        managementUserList: builder.query({
            query: () => "/api/v1/admin/management/user/list/"
        }),
        deleteManagementUser: builder.mutation({
            query: (id) => ({
                url: `/api/v1/admin/management/user/delete/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Management"]
        }),

        managementUserDetails: builder.query({
            query: (id) => `/api/v1/admin/management/user/info/${id}/`
        }),
        managementSubmitWarning: builder.mutation({
            query: ({ warning }) => ({
                url: `/api/v1/admin/management/user/give-warning/`,
                method: "POST",
                body: warning
            }),
            invalidatesTags: ["question"]
        }),
        managementOrdersList: builder.query({
            query: () => "/api/v1/admin/management/order/list/"
        }),
        managementOderparcentage: builder.mutation({
            query: ({ warning, id }) => ({
                url: `/api/v1/admin/management/order/partial-settlement/${id}/`,
                method: "POST",
                body: warning
            }),
            invalidatesTags: ["question"]
        }),


        //landing page furom-------------------------------------------------------------------------------------------------------------------------
        forumData: builder.query({
            query: () => "/api/v1/posts/list/"
        }),

        //comment create
        createPost: builder.mutation({
            query: (text) => ({
                url: "/api/v1/posts/create/",
                method: "POST",
                body: text,
                providesTags: ["Comment"]
            }),

        }),


        // comment create

        createComment: builder.mutation({
            query: ({ text, id }) => ({
                url: `/api/v1/posts/${id}/comment/`,
                method: "POST",
                body: { text },

            }),
        }),
        // react create
        createReact: builder.mutation({
            query: ({ text, id }) => ({
                url: `/api/v1/posts/${id}/react/`,
                method: "POST",
                body: text,
                providesTags: ["Comment"]
            }),
        }),

        //show post 
        showComment: builder.query({
            query: (id) => `/api/v1/posts/${id}/detail/`
        }),

        //show contributor
        showContributot: builder.query({
            query: () => "/api/v1/posts/top_contributors/"
        }),

        //showAllComment
        showAllComment: builder.query({
            query: (id) => `/api/v1/posts/${id}/get_all_comments/`
        }),

        // showNewUpdate

        showNewUpdate: builder.query({
            query: () => "/api/v1/posts/new_updates/"
        }),

        //admin management oder Cancel
        managementOderCancel: builder.mutation({
            query: ({ text, id }) => ({
                url: `/api/v1/admin/management/order/cancel/${id}/`,
                method: "POST",
                body: text,
                providesTags: ["Comment"]
            }),
        }),
        //admin management oder partial-settlement
        managementOderPartial: builder.mutation({
            query: ({ text, id }) => ({
                url: `/api/v1/admin/management/order/partial-settlement/${id}/`,
                method: "POST",
                body: text,
                providesTags: ["Comment"]
            }),
        }),
        //admin management view delivary
        managementOderView: builder.mutation({
            query: (id) => `/api/v1/admin/management/order/view-delivery/${id}/`
        }),
        // admin management view order details
        managementViewProjectDetails: builder.mutation({
            query: (id) => `/api/v1/admin/management/user/info/${id}/`
        }),
        // admin management view order details
        managementAssessOrderDetails: builder.mutation({
            query: (id) => `/api/v1/admin/management/order/order-assessment/${id}/`
        }),

        // support report
        supporBlockReports: builder.query({
            query: () => "/api/v1/admin/support/blog/report-list/"
        }),
        // support blog
        supporReport: builder.query({
            query: () => "/api/v1/admin/support/blog/post-list/"
        }),
        //support post delete
        supporPostdelete: builder.mutation({
            query: (id) => ({
                url: `/api/v1/admin/support/blog/post/delete/${id}/`,
                method: "DELETE"
            }),
            invalidatesTags: ["Management"]
        }),

        supportOrder: builder.query({
            query: () => "/api/v1/admin/support/order/list/"
        }),
        supporTickets: builder.query({
            query: () => "/api/v1/admin/support/ticket/view/"
        }),
        withdrawal: builder.query({
            query: () => "/api/v1/admin/withdraw/request-list/"
        }),
        // give warning
        withdrawalWarning: builder.mutation({
            query: ({ warning, id }) => ({
                url: `/api/v1/admin/withdraw/give-warning/${id}/`,
                method: 'POST',
                body: { warning },
                providesTags: ['Comment'],
            }),
        }),




    }),
});

// Export hooks for usage in components
export const {
    useGetProfileQuery,
    useSupportTicketQuery,
    useSupportTicketDeleteMutation,
    useSupporTicketPostMutation,
    useSupportTikectEditMutation,
    useServiceCommunityDataQuery,



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
    useManagementOrdersListQuery,
    useManagementOderparcentageMutation,
    useManagementOderCancelMutation,
    useManagementOderPartialMutation,
    useManagementOderViewMutation,
    useManagementViewProjectDetailsMutation,
    useManagementAssessOrderDetailsMutation,
    useForumDataQuery,
    useCreatePostMutation,
    useCreateCommentMutation,
    useCreateReactMutation,
    useShowCommentQuery,
    useShowContributotQuery,
    useShowAllCommentQuery,
    useShowNewUpdateQuery,
    useSupporBlockReportsQuery,
    useSupporReportQuery,
    useSupporPostdeleteMutation,
    useSupportOrderQuery,
    useSupporTicketsQuery,
    useWithdrawalQuery,
    useWithdrawalWarningMutation,









} = ApiSlice;

export default ApiSlice;


