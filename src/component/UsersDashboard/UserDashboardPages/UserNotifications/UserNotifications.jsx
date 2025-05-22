import React, { useState, useEffect, useRef } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const ws = useRef(null);
  const token = localStorage.getItem("access_token");

  // Convert ISO timestamp to relative time (e.g., "Today", "Yesterday")
  const getRelativeTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays <= 7) return `${diffDays} days ago`;
      return date.toLocaleDateString(); // Fallback to full date
    } catch (error) {
      console.error("❌ Error parsing timestamp:", error);
      return "Unknown";
    }
  };

  // WebSocket setup
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/notification/subscribe/?Authorization=Bearer ${token}`
    );

    ws.current.onopen = () =>
      console.log("✅ Notification WebSocket connected");

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔔 Received WebSocket message:", data);

        // Handle new notification
        if (!data.action || data.action !== "delete") {
          const normalizedNotification = {
            id: data.id || Date.now(), // Fallback ID if not provided
            message: data.message || data.content || "New notification",
            time: getRelativeTime(data.timestamp || new Date().toISOString()),
            isUnread: data.isUnread !== undefined ? data.isUnread : true,
          };
          setNotifications((prev) => [...prev, normalizedNotification]);
          console.log(
            "📈 Added notification to state:",
            normalizedNotification
          );
        }
        // Handle deletion confirmation or broadcast
        else if (data.action === "delete" && data.id) {
          setNotifications((prev) => prev.filter((n) => n.id !== data.id));
          console.log(
            `🗑️ Removed notification ${data.id} from state (backend update)`
          );
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
        console.log("📥 Raw WebSocket data:", event.data);
      }
    };

    ws.current.onclose = () => console.log("🔌 Notification WebSocket closed");
    ws.current.onerror = (err) =>
      console.error("❌ Notification WebSocket error:", err);

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const handleDeleteClick = (notification) => {
    setNotificationToDelete(notification);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (notificationToDelete) {
      // Remove locally
      setNotifications(
        notifications.filter((n) => n.id !== notificationToDelete.id)
      );
      console.log(`🗑️ Deleted notification ${notificationToDelete.id} locally`);

      // Send delete command to backend
      const deletePayload = {
        action: "delete",
        id: notificationToDelete.id,
      };

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(deletePayload));
        console.log("📤 Sent delete command:", deletePayload);
      } else {
        console.error(
          "❌ WebSocket not open. readyState:",
          ws.current?.readyState
        );
      }

      setIsModalOpen(false);
      setNotificationToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setNotificationToDelete(null);
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen p-4 pt-10 roboto relative">
      <div className={`relative z-10 ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Notifications
          </h1>
        </div>

        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="text-gray-600 text-center py-5">
              No notifications available
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between py-5 px-5 border-b border-gray-100 bg-white"
              >
                <div className="text-gray-700 text-[16px] font-medium">
                  {notification.message}
                  {notification.isUnread && (
                    <span className="ml-2 inline-block h-2 w-2 bg-blue-500 rounded-full" />
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {notification.time}
                  </span>
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
            ))
          )}
        </div>
      </div>

      {isModalOpen && notificationToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 backdrop-blur-[3px]"
            onClick={handleCancelDelete}
          ></div>

          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the notification:{" "}
              <span className="font-medium">
                {notificationToDelete.message}
              </span>
              ? This action cannot be undone.
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
  );
};

export default UserNotifications;
