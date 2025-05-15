
import { useState, useRef, useEffect } from "react"
import { PaperclipIcon, SendIcon } from "lucide-react"
import { useLocation } from "react-router-dom"

const UserDashboardChats = () => {
    const location = useLocation()
    const user = location.state
    console.log(user)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState("")
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const fileInputRef = useRef(null)

    // Update messages whenever the user changes
    useEffect(() => {
        if (user && user.user) {
            setMessages([
                { text: user.user.message, isUser: true },
                { text: user.user.bot, isUser: false },
            ])
        }
    }, [user]) // Re-run this effect whenever the user changes

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Handle image selection
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setSelectedImage(imageUrl)
            setSelectedFileName(file.name)
        }
    }

    // Handle sending the message or image
    const handleSendMessage = () => {
        if (newMessage.trim() === "" && !selectedImage) return

        const newMessageObj = {
            isUser: true,
            timestamp: new Date(),
        }

        if (newMessage.trim()) {
            newMessageObj.text = newMessage.trim()
        }

        if (selectedImage) {
            newMessageObj.image = selectedImage
            newMessageObj.fileName = selectedFileName
        }

        setMessages((prev) => [...prev, newMessageObj])

        setNewMessage("")
        setSelectedImage(null)
        setSelectedFileName("")
        inputRef.current?.focus()
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    if (!user || !user.user) {
        return (
            <div className="rounded-r-lg bg-[#F5F7FB]  h-full flex flex-col items-center justify-center">
                <h1 className="text-lg text-gray-800 dark:text-gray-100">Select a user to start chatting</h1>
            </div>
        )
    }

    return (
        <div className="rounded-r-lg bg-[#F5F7FB]  h-full flex flex-col">
            {/* Header Section */}
            <div className="flex items-center space-x-4 p-3 border-b border-gray-200 rounded-tr-lg bg-white ">
                <img
                    src={user.user.image}
                    className="h-[46px] w-[46px] rounded-full object-cover"
                    alt={user.user.name}
                />
                <h1 className="text-lg font-semibold text-gray-400 ">
                    {user.user.name}
                </h1>
            </div>

            {/* Messages Section */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index}>
                        {message.isUser ? (
                            <div className="flex justify-end space-x-2">
                                <div className="max-w-xs bg-[#2F80A9] text-white rounded-lg p-3 text-md font-medium">
                                    {message.image && (
                                        <div className="mb-2">
                                            <img
                                                src={message.image}
                                                alt="Uploaded"
                                                className="rounded-lg w-24 h-12 object-cover"
                                            />
                                            {message.fileName && (
                                                <p className="text-xs text-gray-500 mt-1">{message.fileName}</p>
                                            )}
                                        </div>
                                    )}
                                    {message.text && <h1>{message.text}</h1>}
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
                                <div className="max-w-xs bg-white  text-gray-800  rounded-lg p-3 text-md font-medium shadow-sm">
                                    <h1>{message.text}</h1>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Display selected image above the input field */}
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
                            className="absolute top-1 right-1 bg-[#E2E8F0] text-gray-800 rounded-full p-[2px] hover:bg-[#d1d7df] cursor-pointer"
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
    )
}

export default UserDashboardChats