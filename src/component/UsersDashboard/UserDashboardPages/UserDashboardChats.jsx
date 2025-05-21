"use client";

import { useState, useRef, useEffect } from "react";
import { PaperclipIcon, SendIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetChatHistoryQuery } from "../../../Redux/feature/ChatSlice";

const UserDashboardChats = () => {
  const location = useLocation();
  const user = location.state;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const ws = useRef(null);
  const token = localStorage.getItem("access_token");

  // Fetch chat history
  const {
    data: chatHistory,
    isLoading,
    isSuccess,
    error,
  } = useGetChatHistoryQuery(user?.user?.id, {
    skip: !user?.user?.id, // Avoid calling before user is ready
  });

  // Set initial messages from chat history
  useEffect(() => {
    if (isSuccess && chatHistory) {
      console.log("📚 Chat history fetched:", chatHistory);
      const normalizedHistory = chatHistory.map((msg) => ({
        id: msg.id || null,
        sender: msg.sender || null,
        receiver: msg.receiver || null,
        message: msg.message || "",
        timestamp: msg.timestamp || "",
        reply_to: msg.reply_to || null,
        attachment_name: msg.attachment_name || "",
        is_read: msg.is_read || false,
        is_deleted: msg.is_deleted || false,
        is_edited: msg.is_edited || false,
        is_reported: msg.is_reported || false,
        attachment_data: msg.attachment_data || msg.attachment || "",
        isUser: !(msg.sender === user.user.id),
      }));
      setMessages(normalizedHistory);
    }
    if (error) {
      console.error("❌ Error fetching chat history:", error);
    }
  }, [isSuccess, chatHistory, error, user?.user?.id]);

  // WebSocket setup
  useEffect(() => {
    if (!user || !user.user?.id) {
      console.log("🚫 No user or user ID found");
      return;
    }

    ws.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/chat/?Authorization=Bearer ${token}`
    );

    ws.current.onopen = () => console.log("✅ WebSocket connected");

    ws.current.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        console.log("📥 Raw WebSocket data:", raw);
        const incoming = raw.message || raw;
        console.log("📩 Received message:", incoming);

        const normalizedMessage = {
          id: incoming.id || null,
          sender: incoming.sender || null,
          receiver: incoming.receiver || null,
          message: incoming.message || "",
          timestamp: incoming.timestamp || "",
          reply_to: incoming.reply_to || null,
          attachment_name: incoming.attachment_name || "",
          is_read: incoming.is_read || false,
          is_deleted: incoming.is_deleted || false,
          is_edited: incoming.is_edited || false,
          is_reported: incoming.is_reported || false,
          attachment_data:
            incoming.attachment_data || incoming.attachment || "",
          isUser: !(incoming.sender === user.user.id), // Fixed sender comparison
        };

        setMessages((prev) => [...prev, normalizedMessage]);
      } catch (error) {
        console.error("❌ Error parsing message:", error);
      }
    };

    ws.current.onerror = (err) => console.error("❌ WebSocket error:", err);
    ws.current.onclose = () => console.log("🔌 WebSocket closed");

    return () => ws.current?.close();
  }, [user?.user?.id]);

  useEffect(() => {
    console.log("📜 Updated messages state:", messages);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setSelectedFile(fileUrl);
      setSelectedFileName(file.name);
      console.log("📎 File selected:", file.name);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        console.log("📄 File converted to Base64, length:", base64.length);
        resolve(base64);
      };
      reader.onerror = (error) => {
        console.error("❌ Error converting file to Base64:", error);
        reject(error);
      };
    });

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) {
      console.log("⚠️ No message or file to send");
      return;
    }

    const messagePayload = {
      user_id: user?.user?.id,
      message: newMessage.trim() || "",
      attachment_name: selectedFileName || "",
      attachment_data: "",
      receiver_id: user?.user?.id, // TODO: Replace with actual receiver ID
    };

    if (selectedFile && fileInputRef.current?.files[0]) {
      const file = fileInputRef.current.files[0];

      if (file.size > 20 * 1024 * 1024) {
        console.log("⚠️ File size exceeds 20MB:", file.size);
        alert("File must be less than 20MB.");
        return;
      }

      try {
        const base64 = await toBase64(file);
        messagePayload.attachment_name = file.name;
        messagePayload.attachment_data = base64;
        console.log(messagePayload.attachment_data);
      } catch (error) {
        console.error("❌ Failed to convert file to Base64:", error);
        return;
      }
    }

    console.log("📤 Sending message payload:", messagePayload);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(messagePayload));
        console.log("✅ Message sent successfully");

        setMessages((prev) => [
          ...prev,
          {
            id: null,
            sender: user?.user?.id,
            receiver: user?.user?.id, // TODO: Replace with actual receiver ID
            message: newMessage.trim() || "",
            timestamp: new Date().toISOString(),
            reply_to: null,
            attachment_name: selectedFileName || "",
            is_read: false,
            is_deleted: false,
            is_edited: false,
            is_reported: false,
            attachment_data: messagePayload.attachment_data || "",
            isUser: true,
          },
        ]);

        setNewMessage("");
        setSelectedFile(null);
        setSelectedFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        inputRef.current?.focus();
      } catch (error) {
        console.error("❌ Error sending message:", error);
      }
    } else {
      console.error(
        "❌ WebSocket not open. readyState:",
        ws.current?.readyState
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isImage = (filename) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);
  };

  const createDownloadLink = (base64, filename) => {
    return `data:application/octet-stream;base64,${base64}`;
  };

  if (!user || !user.user) {
    return (
      <div className="rounded-r-lg bg-[#F5F7FB] dark:bg-[#252c3b] h-full flex flex-col items-center justify-center">
        <h1 className="text-lg text-gray-800 dark:text-gray-100">
          Select a user to start chatting
        </h1>
      </div>
    );
  }

  return (
    <div className="rounded-r-lg bg-[#F5F7FB] dark:bg-[#252c3b] h-full flex flex-col">
      <div className="flex items-center space-x-4 p-3 border-b border-gray-200 bg-white dark:bg-[#252c3b]">
        <img
          src={user.user.image}
          className="h-[46px] w-[46px] rounded-full object-cover"
          alt={user.user.name}
        />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {user.user.name}
        </h1>
      </div>

      {isLoading && (
        <div className="p-4 text-center text-gray-600 dark:text-gray-400">
          Loading chat history...
        </div>
      )}

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index}>
            {message.isUser ? (
              <div className="flex justify-end space-x-2">
                <div className="max-w-full w-fit bg-[#2F80A9] text-white rounded-lg p-3 text-md font-medium">
                  {message.attachment_data && message.attachment_name && (
                    <div className="mb-2">
                      {isImage(message.attachment_name) ? (
                        <img
                          src={`${message.attachment_data}`}
                          alt={message.attachment_name}
                          className="rounded-lg w-full object-cover"
                        />
                      ) : (
                        <a
                          href={createDownloadLink(
                            message.attachment_data,
                            message.attachment_name
                          )}
                          download={message.attachment_name}
                          className="text-xs text-gray-300 underline"
                        >
                          {message.attachment_name}
                        </a>
                      )}
                    </div>
                  )}
                  {message.message && <p>{message.message}</p>}
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-600">You</span>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-2">
                <img
                  src={user.user.image}
                  className="h-8 w-8 rounded-full object-cover"
                  alt={user.user.name}
                />
                <div className="max-w-full w-fit bg-white dark:bg-[#1E232E] text-gray-800 dark:text-gray-200 rounded-lg p-3 text-md font-medium shadow-sm">
                  {message.attachment_data && message.attachment_name && (
                    <div className="mb-2">
                      {isImage(message.attachment_name) ? (
                        <img
                          src={`${message.attachment_data}`}
                          alt={message.attachment_name}
                          className="rounded-lg w-full object-cover"
                        />
                      ) : (
                        <a
                          href={createDownloadLink(
                            message.attachment_data,
                            message.attachment_name
                          )}
                          download={message.attachment_name}
                          className="text-xs text-gray-400 underline"
                        >
                          {message.attachment_name}
                        </a>
                      )}
                    </div>
                  )}
                  {message.message && (
                    <p className="w-fit">{message.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedFile && (
        <div className="mb-3 ml-3 flex items-center space-x-3">
          <div className="relative">
            {isImage(selectedFileName) ? (
              <img
                src={selectedFile}
                alt="Selected"
                className="rounded-lg shadow-md w-24 h-10 object-cover"
              />
            ) : (
              <p className="text-sm text-gray-600">{selectedFileName}</p>
            )}
            <button
              onClick={() => {
                setSelectedFile(null);
                setSelectedFileName("");
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="absolute top-1 right-1 bg-[#E2E8F0] text-gray-800 rounded-full p-[2px] hover:bg-[#d1d7df]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {isImage(selectedFileName) && (
            <p className="text-sm text-gray-600 truncate max-w-[150px]">
              {selectedFileName}
            </p>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
          <input
            type="file"
            accept="*/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-gray-700"
          >
            <PaperclipIcon className="h-5 w-5 cursor-pointer" />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none focus:outline-none mx-3 text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            ref={inputRef}
          />
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleSendMessage}
          >
            <SendIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardChats;
