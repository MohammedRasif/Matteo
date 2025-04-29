"use client"

import { useState, useRef, useEffect } from "react"
import { PaperclipIcon, SendIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { VscRobot } from "react-icons/vsc"

const UserDashboardAiChat = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasUserSentMessage, setHasUserSentMessage] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState("")
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const fileInputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Scroll to bottom and focus input field when messages change
    useEffect(() => {
        scrollToBottom()
        // Focus the input field after a message is sent
        if (hasUserSentMessage) {
            inputRef.current?.focus()
        }
    }, [messages, hasUserSentMessage])

    const generateAIResponse = async (userMessage) => {
        setIsLoading(true)

        try {
            let botResponse = "I'm processing your request..."
            await new Promise((resolve) => setTimeout(resolve, 1000))

            if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
                botResponse = "Hello! How can I assist you today?"
            } else if (userMessage.toLowerCase().includes("help")) {
                botResponse = "I'm here to help! What do you need assistance with?"
            } else if (userMessage.toLowerCase().includes("thank")) {
                botResponse = "You're welcome! Is there anything else I can help with?"
            } else if (userMessage.toLowerCase().includes("bye")) {
                botResponse = "Goodbye! Feel free to return if you have more questions."
            } else {
                botResponse =
                    "Thank you for your message. I'm an AI assistant here to help answer your questions. Could you provide more details about what you're looking for?"
            }

            setMessages((prev) => [
                ...prev,
                {
                    text: botResponse,
                    isUser: false,
                    timestamp: new Date(),
                },
            ])
        } catch (error) {
            console.error("Error generating AI response:", error)
            setMessages((prev) => [
                ...prev,
                {
                    text: "Sorry, I encountered an error. Please try again later.",
                    isUser: false,
                    timestamp: new Date(),
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setSelectedFileName(file.name)
        }
    }

    const handleSendMessage = async () => {
        if (newMessage.trim() === "" && !selectedImage) return

        const userMessage = newMessage.trim()
        if (userMessage) {
            setMessages((prev) => [
                ...prev,
                {
                    text: userMessage,
                    isUser: true,
                    timestamp: new Date(),
                },
            ])
        }

        if (selectedImage) {
            setMessages((prev) => [
                ...prev,
                {
                    image: selectedImage,
                    fileName: selectedFileName,
                    isUser: true,
                    timestamp: new Date(),
                },
            ])
        }

        setNewMessage("")
        setSelectedImage(null)
        setSelectedFileName("")
        setHasUserSentMessage(true)

        if (userMessage) {
            await generateAIResponse(userMessage)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50" style={{ height: "80vh" }}>
            {/* Header with AI bot info */}
            <div className="flex items-center space-x-4 p-3 border-b border-gray-200 bg-white">
                <div className="h-[46px] w-11 rounded-full bg-[#2F80A9] flex items-center justify-center">
                    <VscRobot className="h-6 w-6 text-white" />
                </div>
                <h1 className="font-medium text-gray-800">AI Assistant</h1>
            </div>

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 relative">
                {/* Default message */}
                {!hasUserSentMessage && (
                    <div className="absolute bottom-0">
                        <div className="flex items-start space-x-3">
                            <div className="h-10 w-10 rounded-full bg-[#2F80A9] text-white flex items-center justify-center">
                                <VscRobot className="h-5 w-5" />
                            </div>
                            <div
                                className="px-5 py-4 rounded-lg bg-gray-200 dark:bg-[#1E232E] text-black dark:text-gray-200 lg:text-[16px] shadow-sm max-w-[70%]"
                            >
                                <ReactMarkdown>
                                    Hello! I'm your AI assistant. How can I help you today?
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat messages */}
                {messages.map((message, index) => (
                    <div key={index} className="flex w-full">
                        {message.isUser ? (
                            <div className="flex flex-col items-end w-full">
                                <div className="flex justify-end items-end space-x-3">
                                    {message.text ? (
                                        <div
                                            className="px-4 py-3 rounded-xl bg-[#2F80A9] text-white lg:text-[16px] shadow-md w-1/2"
                                        >
                                            <span>{message.text}</span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-end">
                                            <div>
                                                <img
                                                    src={message.image}
                                                    alt="Uploaded"
                                                    className="rounded-lg shadow-md w-24 h-12"
                                                />
                                                {message.fileName && (
                                                    <p className="text-xs text-gray-500 mt-1">{message.fileName}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
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
                                    <div
                                        className="px-5 py-4 rounded-lg bg-gray-200 dark:bg-[#1E232E] text-black dark:text-gray-200 lg:text-[16px] shadow-sm max-w-[70%]"
                                    >
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
                                <div className="px-5 py-4 rounded-lg bg-gray-200 dark:bg-[#1E232E] text-black dark:text-gray-200 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {selectedImage && (
                <div className="mb-3 ml-3 flex items-center space-x-3">
                    <div className="relative">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="rounded-lg shadow-md w-24 h-10 object-cover"
                        />
                        <button
                            onClick={() => {
                                setSelectedImage(null)
                                setSelectedFileName("")
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
                    <p className="text-sm text-gray-600 truncate max-w-[150px]">{selectedFileName}</p>
                </div>
            )}

            {/* Message input area */}
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
                        className={`${isLoading ? "text-gray-400" : "text-blue-500 hover:text-blue-700"}`}
                        onClick={handleSendMessage}
                        disabled={isLoading}
                    >
                        <SendIcon className="h-5 w-5 cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserDashboardAiChat