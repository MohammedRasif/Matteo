"use client";

import { useState, useRef, useEffect } from "react";
import { PaperclipIcon, SendIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { VscRobot } from "react-icons/vsc";

const AdminDashboardAiChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const ws = useRef(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/chat_bot/?Authorization=Bearer ${token}`
    );

    ws.current.onopen = () => console.log("✅ WebSocket connected");
    ws.current.onerror = (err) => console.error("❌ WebSocket error:", err);
    ws.current.onclose = () => console.log("🔌 WebSocket closed");

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [
        ...prev,
        {
          text: data.message,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      console.log(data);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (hasUserSentMessage) inputRef.current?.focus();
  }, [messages, hasUserSentMessage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) return;

    const userMessage = newMessage.trim();

    const newMsg = {
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(",")[1];
        const payload = {
          message: userMessage,
          attachment_data: base64Data,
          attachment_name: selectedFile.name,
        };
        ws.current?.send(JSON.stringify(payload));
      };
      reader.readAsDataURL(selectedFile);
    } else {
      const payload = { message: userMessage };
      ws.current?.send(JSON.stringify(payload));
    }

    setMessages((prev) => [...prev, newMsg]);

    setNewMessage("");
    setSelectedFile(null);
    setSelectedFileName("");
    setHasUserSentMessage(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex flex-col h-screen bg-gray-50"
      style={{ height: "80vh" }}
    >
      <div className="flex items-center space-x-4 p-3 border-b border-gray-200 bg-white">
        <div className="h-[46px] w-11 rounded-full bg-[#2F80A9] flex items-center justify-center">
          <VscRobot className="h-6 w-6 text-white" />
        </div>
        <h1 className="font-medium text-gray-800">AI Assistant</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative">
        {!hasUserSentMessage && (
          <div className="absolute bottom-0">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-[#2F80A9] text-white flex items-center justify-center">
                <VscRobot className="h-5 w-5" />
              </div>
              <div className="px-5 py-4 rounded-lg bg-gray-200 text-black shadow-sm max-w-[70%]">
                <ReactMarkdown>
                  Hello! I'm your AI assistant. How can I help you today?
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className="flex w-full">
            {message.isUser ? (
              <div className="flex flex-col items-end w-full">
                <div className="flex justify-end items-end space-x-3">
                  <div className="px-4 py-3 rounded-xl bg-[#2F80A9] text-white shadow-md w-1/2">
                    <span>{message.text}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                      src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start w-full">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 rounded-full bg-[#2F80A9] flex items-center justify-center">
                    <VscRobot className="h-5 w-5 text-white" />
                  </div>
                  <div className="px-5 py-4 rounded-lg bg-gray-200 text-black shadow-sm max-w-[70%]">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex w-full">
            <div className="flex flex-col items-start w-full">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#2F80A9] flex items-center justify-center">
                  <VscRobot className="h-5 w-5 text-white" />
                </div>
                <div className="px-5 py-4 rounded-lg bg-gray-200 text-black shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {selectedFile && (
        <div className="mb-3 ml-3 flex items-center space-x-3">
          <div className="relative">
            <p className="text-sm text-gray-600 truncate max-w-[150px]">
              {selectedFileName}
            </p>
            <button
              onClick={() => {
                setSelectedFile(null);
                setSelectedFileName("");
              }}
              className="absolute top-1 right-1 bg-[#2F80A9] text-white rounded-full p-[2px] hover:bg-[#2f6ea9] cursor-pointer"
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
        </div>
      )}

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
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
            disabled={isLoading}
            ref={inputRef}
          />
          <button
            className={`${
              isLoading ? "text-gray-400" : "text-blue-500 hover:text-blue-700"
            }`}
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            <SendIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAiChat;
