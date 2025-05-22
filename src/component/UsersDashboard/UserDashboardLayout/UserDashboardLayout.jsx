import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar";
import { useEffect, useRef, useState } from "react";

const UserDashboardLayout = () => {
  const chatWs = useRef(null);
  const notificationWs = useRef(null);
  const token = localStorage.getItem("access_token");
  const [notificationCount, setNotificationCount] = useState(0);

  // WebSocket setup
  useEffect(() => {
    // Chat WebSocket
    chatWs.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/chat/?Authorization=Bearer ${token}`
    );

    chatWs.current.onopen = () => console.log("✅ Chat WebSocket connected");

    chatWs.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Received chat message:", data);
        // TODO: Handle chat messages if needed
      } catch (error) {
        console.error("❌ Error parsing chat message:", error);
        console.log("📥 Raw chat data:", event.data);
      }
    };

    chatWs.current.onclose = () => console.log("🔌 Chat WebSocket closed");
    chatWs.current.onerror = (err) =>
      console.error("❌ Chat WebSocket error:", err);

    // Notification WebSocket
    notificationWs.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/notification/subscribe/?Authorization=Bearer ${token}`
    );

    notificationWs.current.onopen = () =>
      console.log("✅ Notification WebSocket connected");

    notificationWs.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔔 Received notification:", data);
        setNotificationCount((prev) => {
          const newCount = prev + 1;
          console.log("📈 Updated notificationCount:", newCount);
          return newCount;
        });
      } catch (error) {
        console.error("❌ Error parsing notification:", error);
        console.log("📥 Raw notification data:", event.data);
      }
    };

    notificationWs.current.onclose = () =>
      console.log("🔌 Notification WebSocket closed");
    notificationWs.current.onerror = (err) =>
      console.error("❌ Notification WebSocket error:", err);

    return () => {
      if (chatWs.current) chatWs.current.close();
      if (notificationWs.current) notificationWs.current.close();
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white h-full fixed transition-all duration-300 ease-in-out z-40 w-[350px]">
        <div className="h-full flex flex-col justify-between">
          <UserDashboardSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col ml-[350px] w-[calc(100%-350px)]">
        {/* Navbar */}
        <div
          className="fixed top-0 bg-white transition-all duration-300 z-50 shadow"
          style={{
            left: 0,
            width: "100%",
          }}
        >
          <UserDashboardNavbar
            notificationCount={notificationCount}
            setNotificationCount={setNotificationCount}
          />
        </div>

        {/* Outlet */}
        <div className="h-full bg-gray-200 mt-16 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
