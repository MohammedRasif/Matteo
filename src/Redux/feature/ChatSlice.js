// src/feature/ChatSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://172.252.13.96:7000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const ChatSlice = createApi({
  reducerPath: "chatApi", // Unique name for this slice
  baseQuery,
  endpoints: (builder) => ({
    // Example: Get chat history
    getChatHistory: builder.query({
      query: (userId) => `/api/v1/chat/history/${userId}/`,
    }),
    // userChat list
    getChatList: builder.query({
      query: () => `/api/v1/chat/list_user_chats/`,
    }),

    // Example: Send message
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/chat/send/", // Example endpoint — update if different
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetChatHistoryQuery,
  useSendMessageMutation,
  useGetChatListQuery,
} = ChatSlice;
export default ChatSlice;
