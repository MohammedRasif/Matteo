import { Outlet } from "react-router-dom";
import AdminDashboardNavbar from "../AdminDashboardNavbar.jsx/AdminDashboardNavbar";
import AdminDashboardSidebar from "../AdminDashboardSidebar/AdminDashboardSidebar";
import { useEffect, useRef } from "react";

const AdminDashboardLayout = () => {
  const ws = useRef(null);
  const token = localStorage.getItem("access_token");
  // setting socket
  useEffect(() => {
    ws.current = new WebSocket(
      `ws://192.168.10.35:8000/ws/api/v1/chat/?Authorization=Bearer ${token}`
    );

    ws.current.onopen = () => console.log("✅ WebSocket connected");
    ws.current.onclose = () => console.log("🔌 WebSocket closed");
    ws.current.onerror = (err) => console.error("❌ WebSocket error", err);

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white h-full fixed transition-all duration-300 ease-in-out z-40 w-[350px] fixed">
        <div className="h-full flex flex-col justify-between">
          {/* Sidebar Content */}
          <AdminDashboardSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col ml-[350px] w-[calc(100%-350px)] ">
        {/* Navbar - Full width and above sidebar */}
        <div
          className="fixed top-0 bg-white transition-all duration-300 z-50 shadow"
          style={{
            left: 0, // Start from the left edge of the screen
            width: "100%", // Full width of the viewport
          }}
        >
          <AdminDashboardNavbar />
        </div>

        {/* Outlet (Main Content) */}
        <div className="h-full bg-gray-200 mt-16 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
