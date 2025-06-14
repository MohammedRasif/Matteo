import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../component/Shared/baseUrls";

const baseQuery = fetchBaseQuery({
	baseUrl: BaseUrl,
	prepareHeaders: (headers, { getState, endpoint }) => {
		const accessToken = localStorage.getItem("access_token");
		const token = getState().auth.token || accessToken;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		if (endpoint !== "updateProfile") {
			headers.set("Content-Type", "application/json");
		}
		return headers;
	},
});

export const ApiSlice = createApi({
	reducerPath: "ApiSlice",
	baseQuery,
	tagTypes: [
		"Profile",
		"UserDashboard",
		"Project",
		"Employees",
		"Management",
		"question",
		"Comment",
		"Faq",
		"UpdateFaq",
		"DELET",
	],
	endpoints: (builder) => ({
		// User Endpoints
		getProfile: builder.query({
			query: () => ({
				url: "/api/v1/users/profile/",
				method: "GET",
			}),
			providesTags: ["Profile"],
		}),

		updateProfile: builder.mutation({
			query: (payload) => ({
				url: "/api/v1/users/update-profile/",
				method: "PUT",
				body: payload,
			}),
		}),

		supportTicket: builder.query({
			query: () => "/api/v1/tickets/",
		}),
		supportTicketDelete: builder.mutation({
			query: (id) => ({
				url: `/api/v1/tickets/ticket/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Management"],
		}),
		supporTicketPost: builder.mutation({
			query: ({ warning }) => ({
				url: `/api/v1/tickets/`,
				method: "POST",
				body: warning,
			}),
			invalidatesTags: ["question"],
		}),
		supportTikectEdit: builder.mutation({
			query: ({ id, question }) => ({
				url: `/api/v1/tickets/ticket/${id}/`,
				method: "PUT",
				body: question,
			}),
			invalidatesTags: ["question"],
		}),
		serviceCommunityData: builder.query({
			query: () => "api/v1/order-post/list/all/",
		}),
		bitpoject: builder.mutation({
			query: ({ warning }) => ({
				url: `/api/v1/order-post/bids/place/`,
				method: "POST",
				body: warning,
			}),
			invalidatesTags: ["question"],
		}),

		// Admin Endpoints
		totalSelles: builder.query({
			query: () => "/api/v1/admin/dashboard/total-sales-last-month/",
		}),
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
			query: () =>
				"/api/v1/admin/dashboard/subscription-upgrade-per-day/",
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
		managementOrdersList: builder.query({
			query: () => "/api/v1/admin/management/order/list/",
		}),
		managementOderparcentage: builder.mutation({
			query: ({ warning, id }) => ({
				url: `/api/v1/admin/management/order/partial-settlement/${id}/`,
				method: "POST",
				body: warning,
			}),
			invalidatesTags: ["question"],
		}),

		// pricing subscription endpoint
		subscribe: builder.mutation({
			query: (payload) => ({
				url: "/api/v1/stripe_payment/subscribe/",
				method: "POST",
				body: payload,
			}),
			providesTags: ["Profile"],
		}),

		// Forum Endpoints
		forumData: builder.query({
			query: () => "/api/v1/posts/list/",
		}),
		createPost: builder.mutation({
			query: (text) => ({
				url: "/api/v1/posts/create/",
				method: "POST",
				body: text,
			}),
			providesTags: ["Comment"],
		}),
		createComment: builder.mutation({
			query: ({ text, id }) => ({
				url: `/api/v1/posts/${id}/comment/`,
				method: "POST",
				body: { text },
			}),
		}),
		createReact: builder.mutation({
			query: ({ text, id }) => ({
				url: `/api/v1/posts/${id}/react/`,
				method: "POST",
				body: text,
			}),
			providesTags: ["Comment"],
		}),
		showComment: builder.query({
			query: (id) => `/api/v1/posts/${id}/detail/`,
		}),
		showContributot: builder.query({
			query: () => "/api/v1/posts/top_contributors/",
		}),
		showAllComment: builder.query({
			query: (id) => `/api/v1/posts/${id}/get_all_comments/`,
		}),
		showNewUpdate: builder.query({
			query: () => "/api/v1/posts/new_updates/",
		}),

		// Admin Management Order Endpoints
		managementOderCancel: builder.mutation({
			query: ({ text, id }) => ({
				url: `/api/v1/admin/management/order/cancel/${id}/`,
				method: "POST",
				body: text,
			}),
			providesTags: ["Comment"],
		}),
		managementOderPartial: builder.mutation({
			query: ({ text, id }) => ({
				url: `/api/v1/admin/management/order/partial-settlement/${id}/`,
				method: "POST",
				body: text,
			}),
			providesTags: ["Comment"],
		}),
		managementOderView: builder.mutation({
			query: (id) =>
				`/api/v1/admin/management/order/view-delivery/${id}/`,
		}),
		managementViewProjectDetails: builder.mutation({
			query: (id) => `/api/v1/admin/management/user/info/${id}/`,
		}),
		managementAssessOrderDetails: builder.mutation({
			query: (id) =>
				`/api/v1/admin/management/order/order-assessment/${id}/`,
		}),

		// Support Endpoints
		supportOrder: builder.query({
			query: () => "/api/v1/admin/support/order/list/",
		}),
		supporTickets: builder.query({
			query: () => "/api/v1/admin/support/ticket/view/",
		}),
		withdrawal: builder.query({
			query: () => "/api/v1/admin/withdraw/request-list/",
		}),
		adminSupportTicketDelete: builder.mutation({
			query: (id) => ({
				url: `/api/v1/admin/support/ticket/delete/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Management"],
		}),

		// Withdrawal Endpoints
		withdrawalWarning: builder.mutation({
			query: ({ warning, id }) => ({
				url: `/api/v1/admin/withdraw/give-warning/${id}/`,
				method: "POST",
				body: { warning },
			}),
			providesTags: ["Comment"],
		}),

		// addWithdrawalMethod: builder.mutation({
		// 	query: ({ payload, id }) => ({
		// 		url: `/api/v1/wallet/add-withdrawal-method/`,
		// 		method: "POST",
		// 		body: payload,
		// 	}),
		// 	providesTags: ["Comment"],
		// }),

		// admin wallet
		approveWithdrawalRequest: builder.mutation({
			query: (id) => ({
				url: `/api/v1/wallet/admin/withdraw/approve/${id}/`,
				method: "POST",
			}),
		}),

		rejectWithdrawalRequest: builder.mutation({
			query: (id) => ({
				url: `/api/v1/wallet/admin/withdraw/reject/${id}/`,
				method: "POST",
			}),
		}),

		// user wallet
		getUserWallet: builder.query({
			query: () => `/api/v1/wallet/wallet-balance/`,
		}),

		getUserTransactionHistory: builder.query({
			query: () => `/api/v1/wallet/wallet-history/`,
		}),

		addWithdrawRequest: builder.mutation({
			query: (payload) => ({
				url: `/api/v1/wallet/withdraw/`,
				method: "POST",
				body: payload,
			}),
		}),

		addWithdrawalMethod: builder.mutation({
			query: (payload) => ({
				url: `/api/v1/stripe_payment/add_external_acc/`,
				method: "POST",
				body: payload,
			}),
		}),

		// FAQ Endpoints
		faqData: builder.query({
			query: () => `/api/v1/admin/dashboard/faq/`,
		}),
		addFaq: builder.mutation({
			query: (faq) => ({
				url: `/api/v1/admin/dashboard/faq/`,
				method: "POST",
				body: faq,
			}),
			invalidatesTags: ["Faq"],
		}),
		updateFaq: builder.mutation({
			query: (faq) => ({
				url: `/api/v1/admin/dashboard/faq/`,
				method: "PUT",
				body: faq,
			}),
			invalidatesTags: ["UpdateFaq"],
		}),
		deleteFaq: builder.mutation({
			query: (id) => ({
				url: `/api/v1/admin/dashboard/faq/`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: ["DELET"],
		}),

		// Support Blog/Report Endpoints
		supporBlockReports: builder.query({
			query: () => "/api/v1/admin/support/blog/report-list/",
		}),
		supporReport: builder.query({
			query: () => "/api/v1/admin/support/blog/post-list/",
		}),
		supporPostdelete: builder.mutation({
			query: (id) => ({
				url: `/api/v1/admin/support/blog/post/delete/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Management"],
		}),

		// contact endpoint
		askQna: builder.mutation({
			query: (payload) => ({
				url: `/api/v1/qna/ask/`,
				method: "POST",
				body: payload,
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
	useBitpojectMutation,
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
	useAddWithdrawalMethodMutation,
	useAdminSupportTicketDeleteMutation,
	useFaqDataQuery,
	useAddFaqMutation,
	useUpdateFaqMutation,
	useDeleteFaqMutation,
	useSubscribeMutation,
	useGetUserWalletQuery,
	useGetUserTransactionHistoryQuery,
	useAddWithdrawRequestMutation,
	useApproveWithdrawalRequestMutation,
	useRejectWithdrawalRequestMutation,
	useUpdateProfileMutation,
	useAskQnaMutation,
} = ApiSlice;

export default ApiSlice;
