import { useState, useEffect } from "react";
import { VscRobot } from "react-icons/vsc";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGetChatListQuery } from "../../../Redux/feature/ChatSlice";
const UserDashboardMessage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data, error, isLoading, refetch } = useGetChatListQuery();
  // refetch chat list
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("🔁 Refetching chat list...");
      refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetch]);
  useEffect(() => {
    if (data) {
      console.log("📋 User chat list fetched:", data);
      setUsers(data);
    }
    if (error) {
      console.error("❌ Error fetching chat list:", error);
    }
  }, [data, error]);
  // Update selectedUserId based on the current route
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const userIdFromPath = pathParts[pathParts.length - 1];

    // Check if the route is for a user (not chatbot)
    if (
      pathParts.includes("Message") &&
      users.some((user) => user.id === userIdFromPath)
    ) {
      setSelectedUserId(userIdFromPath);
    } else {
      setSelectedUserId(null); // Reset when on chatbot or other routes
    }
  }, [location.pathname]);

  const handleUserClick = (user) => {
    setSelectedUserId(user.id);
    navigate(`/dashboard/Messages/${user.id}`, { state: { user } });
  };

  const handleChatbotClick = () => {
    setSelectedUserId(null); // Ensure no user is selected
    navigate("/dashboard/Messages/chatbot");
  };

  // Check if the current route is the base route (/Admin_Dashboard/Message)
  const isBaseRoute = location.pathname === "/dashboard/Messages";

  return (
    <div className="mt-10 m-4 roboto">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Messages
      </h1>
      <div className="flex" style={{ height: "80vh" }}>
        {/* User List Sidebar */}
        <div className="w-1/4 rounded-l-lg bg-gray-50  border-r border-gray-200  flex flex-col">
          <div className="m-3">
            <input
              type="text"
              name=""
              placeholder="Search"
              className="border border-gray-300 rounded-md w-full pl-2 py-[10px]"
              id=""
            />
          </div>

          <div
            onClick={handleChatbotClick}
            className={`flex items-center space-x-2 px-[10px] py-[8px] mt-2 cursor-pointer ${
              location.pathname === "/dashboard/Message/chatbot"
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

          {/* User list container */}
          <div className="overflow-y-auto flex-1">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-100  text-gray-700  transition-colors border-b border-gray-200 ${
                  selectedUserId === user.id
                    ? "bg-blue-100 dark:bg-[#2F80A9]"
                    : ""
                }`}
              >
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <div className="relative">
                  <span className="font-medium text-[15px]">{user.name}</span>
                  {user.number && (
                    <h1 className="absolute top-1 left-[28vh] text-[12px] bg-[#0B7EBB] text-white px-[5px] rounded-full">
                      {user.number}
                    </h1>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Default Message or Outlet */}
        <div className="w-3/4 bg-white  rounded-r-lg">
          {isBaseRoute ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-600 ">
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
