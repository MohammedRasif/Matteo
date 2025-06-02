import { useState, useEffect, useRef } from "react";
import { VscRobot } from "react-icons/vsc";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGetChatListQuery } from "../../../Redux/feature/ChatSlice";

const UserDashboardMessage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data, error, isLoading, refetch } = useGetChatListQuery();
  const ws = useRef(null);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://172.252.13.96:7000/ws/api/v1/chat/?Authorization=Bearer ${token}`
    );

    ws.current.onopen = () => console.log("✅ WebSocket connected");

    ws.current.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data);
        const message = raw.message || raw;
        console.log("📩 Received WebSocket message:", message);

        const senderId = String(message.sender || message.sender_id || "");

        if (senderId && users.some((user) => String(user.id) === senderId)) {
          setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
              String(user.id) === senderId
                ? {
                    ...user,
                    number: (Number(user.number) || 0) + 1,
                  }
                : user
            );
            console.log("📈 Updated users state:", updatedUsers);
            return [...updatedUsers];
          });
          console.log("📈 Updated user number for sender:", senderId);
        } else {
          console.log("ℹ️ Sender not in users list:", senderId);
        }
      } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
        console.log("📥 Raw WebSocket data:", event.data);
      }
    };

    ws.current.onclose = () => console.log("🔌 WebSocket closed");
    ws.current.onerror = (err) => console.error("❌ WebSocket error:", err);

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [users]);
  // refetch chat list
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔁 Refetching chat list...");
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);
  //
  useEffect(() => {
    if (data) {
      console.log("📋 User chat list fetched:", data);
      setUsers(data);
    }
    if (error) {
      console.error("❌ Error fetching chat list:", error);
    }
  }, [data, error]);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const userIdFromPath = pathParts[pathParts.length - 1];

    if (
      pathParts.includes("Message") &&
      users.some((user) => String(user.id) === userIdFromPath)
    ) {
      setSelectedUserId(userIdFromPath);
    } else {
      setSelectedUserId(null);
    }
  }, [location.pathname, users]);

  const handleUserClick = (user) => {
    setSelectedUserId(user.id);
    // Reset the number for the clicked user
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((u) =>
        String(u.id) === String(user.id)
          ? { ...u, number: 0 } // Reset number to 0
          : u
      );
      console.log(
        "🔔 Cleared number for user:",
        user.id,
        "Updated users:",
        updatedUsers
      );
      return [...updatedUsers]; // Ensure new array for React to detect change
    });
    navigate(`/dashboard/Messages/${user.id}`, { state: { user } });
  };

  const handleChatbotClick = () => {
    setSelectedUserId(null);
    navigate("/dashboard/Messages/chatbot");
  };

  const isBaseRoute = location.pathname === "/dashboard/Messages";

  return (
    <div className="mt-10 m-4 roboto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Messages
      </h1>
      <div className="flex" style={{ height: "80vh" }}>
        <div className="w-1/4 rounded-l-lg bg-gray-50 dark:bg-[#1E232E] border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="m-3">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md w-full pl-2 py-[10px]"
            />
          </div>

          <div
            onClick={handleChatbotClick}
            className={`flex items-center space-x-2 px-[10px] py-[8px] mt-2 cursor-pointer ${
              location.pathname === "/dashboard/Messages/chatbot"
                ? "bg-[#B6E3FC]"
                : "hover:bg-[#B6E3FC]"
            }`}
          >
            <div className="bg-[#2F80A9] h-10 w-10 text-white flex items-center justify-center rounded-full">
              <VscRobot size={25} />
            </div>
            <div className="text-md">
              <h1 className="pt-1 font-semibold">Smart Ai Assistant</h1>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {isLoading && (
              <div className="p-3 text-gray-600 dark:text-gray-400">
                Loading users...
              </div>
            )}
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#252c3b] text-gray-700 dark:text-gray-200 transition-colors border-b border-gray-200 ${
                  selectedUserId === user.id
                    ? "bg-blue-100 dark:bg-[#2F80A9]"
                    : ""
                }`}
              >
                <img
                  src={user.image || user.user_image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="relative">
                  <span className="font-medium text-[15px]">{user.name}</span>
                  {Number(user.number) > 0 && (
                    <h1 className="absolute top-1 left-[28vh] text-[12px] bg-[#0B7EBB] text-white px-[5px] rounded-full">
                      {user.number}
                    </h1>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4 bg-white dark:bg-[#252c3b] rounded-r-lg">
          {isBaseRoute ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Select a Chat to Start Messaging
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Choose a user or the Smart AI Assistant to begin your
                  conversation.
                </p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardMessage;
