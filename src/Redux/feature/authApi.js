import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://192.168.10.124:2100/api/v1", //  Update this with your backend URL
	}),
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => ({
				url: "/users/signup/", //  Your API endpoint
				method: "POST",
				body: data, //  Sending email & password
			}),
		}),
		login: builder.mutation({
			query: (data) => ({
				url: "/users/login/", // Your API endpoint
				method: "POST",
				body: data, //  Sending email & password
			}),
		}),

		registerVerification: builder.mutation({
			query: (data) => ({
				url: "/users/activate/",
				method: "POST",
				body: data,
			}),
		}),

		resendOtp: builder.mutation({
			query: (data) => ({
				url: "/users/resend-otp/",
				method: "POST",
				body: data,
			}),
		}),

		forgetPassword: builder.mutation({
			query: (email) => ({
				url: "/users/password-reset-request/",
				method: "POST",
				body: email,
			}),
		}),
		forgetPasswordVerification: builder.mutation({
			query: (data) => ({
				url: "/users/reset-request-activate/",
				method: "POST",
				body: data,
			}),
		}),
		ConfirmPassword: builder.mutation({
			query: (data) => ({
				url: "/users/reset-password/",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

// ✅ Destructure the auto-generated hook
export const {
	useRegisterMutation,
	useLoginMutation,
	useRegisterVerificationMutation,
	useResendOtpMutation,
	useForgetPasswordMutation,
	useForgetPasswordVerificationMutation,
	useConfirmPasswordMutation,
} = authApi;
export default authApi;
