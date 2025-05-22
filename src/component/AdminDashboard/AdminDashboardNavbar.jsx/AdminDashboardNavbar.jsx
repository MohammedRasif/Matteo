import { useEffect } from "react";
import { Bell } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { useGetProfileQuery } from "../../../Redux/feature/ApiSlice";
import { useGetChatListQuery } from "../../../Redux/feature/ChatSlice";
import useSocket from "../../../sockit/useSockit";

const AdminDashboardNavbar = ({ notificationCount, setNotificationCount }) => {
  const accessToken = localStorage.getItem("access_token");
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    skip: !accessToken,
  });

  // WebSocket for real-time notifications
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("notification", () => {
        setNotificationCount((prev) => prev + 1);
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket, setNotificationCount]);

  // Fetch chat list to initialize notification count
  const { data: chatList } = useGetChatListQuery(undefined, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (chatList) {
      const unreadCount = chatList.reduce(
        (acc, chat) => acc + (chat.unreadCount || 0),
        0
      );
      setNotificationCount(unreadCount);
    }
  }, [chatList, setNotificationCount]);

  return (
    <div>
      <div className="bg-[#848239] w-full py-[10px]"></div>
      <div>
        <div className="flex items-center justify-between w-full h-16 px-6 bg-white max-w-[180vh] mx-auto">
          {/* Logo on the left */}
          <div className="flex items-center">
            <NavLink to="/" className="text-[24px] font-bold text-[#0077b6]">
              ChaskiX
            </NavLink>
          </div>

          {/* User profile and notification on the right */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/Admin_Dashboard/notification"
              className="cursor-pointer"
              onClick={() => setNotificationCount(0)}
            >
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer">
                  <Bell className="h-7 w-7 text-gray-600" />
                </button>
                {notificationCount > 0 && (
                  <div className="absolute text-[12px] p-[5px] -top-[3px] right-[3px] bg-red-400 rounded-full text-white w-5 h-5 max-w-8 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </div>
                )}
              </div>
            </NavLink>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10">
                {accessToken && !isLoading && !isError && profile ? (
                  profile.image ? (
                    <img
                      src={profile.image}
                      alt="User profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="h-10 w-10 text-gray-800" />
                  )
                ) : (
                  <FaRegCircleUser className="h-10 w-10 text-gray-800" />
                )}
              </div>
              <span className="text-[17px] font-medium">
                {accessToken && !isLoading && !isError && profile
                  ? profile.email || "No email available"
                  : "Guest"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardNavbar;
