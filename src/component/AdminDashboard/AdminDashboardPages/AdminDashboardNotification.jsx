"use client"

import { useState } from "react"
import { RiDeleteBinLine } from "react-icons/ri"

const AdminDashboardNotification = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "100 New user joined today.",
            time: "Today",
            isUnread: true,
        },
        {
            id: 2,
            message: "10 Blog reports submitted today",
            time: "Yesterday",
            isUnread: true,
        },
        {
            id: 3,
            message: "15 new support tickets created",
            time: "2 days ago",
            isUnread: true,
        },
        {
            id: 4,
            message: "10 new Orders requires supports",
            time: "4 days ago",
            isUnread: true,
        },
        {
            id: 5,
            message: "12 subscription upgrades this week",
            time: "4 days ago",
            isUnread: true,
        },
        {
            id: 6,
            message: "You 10 new withdrawal request today",
            time: "4 days ago",
            isUnread: true,
        },
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [notificationToDelete, setNotificationToDelete] = useState(null)

    const handleDeleteClick = (notification) => {
        setNotificationToDelete(notification)
        setIsModalOpen(true)
    }

    const handleConfirmDelete = () => {
        if (notificationToDelete) {
            setNotifications(notifications.filter((n) => n.id !== notificationToDelete.id))
            console.log(`Deleted notification ${notificationToDelete.id}`)
        }
        setIsModalOpen(false)
        setNotificationToDelete(null)
    }

    const handleCancelDelete = () => {
        setIsModalOpen(false)
        setNotificationToDelete(null)
    }

    return (
        <div className="bg-[#f1f5f9] min-h-screen p-4 pt-10 roboto relative">
            {/* Main content */}
            <div className={`relative z-10 ${isModalOpen ? "blur-sm" : ""}`}>
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Notifications</h1>
                </div>

                <div className="space-y-2">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center justify-between py-5 px-5 border-b border-gray-100 bg-white"
                        >
                            <div className="text-gray-700 text-[16px] font-medium">
                                {notification.message}
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">{notification.time}</span>
                                <button
                                    onClick={() => handleDeleteClick(notification)}
                                    className="p-[2px] flex items-center justify-center border border-gray-200 rounded cursor-pointer"
                                >
                                    <div className="text-red-500 rounded-full">
                                        <RiDeleteBinLine size={24} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 backdrop-blur-[3px] "
                        onClick={handleCancelDelete}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the notification: "
                            <span className="font-medium">{notificationToDelete?.message}</span>"?
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AdminDashboardNotification