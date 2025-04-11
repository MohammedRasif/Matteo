import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminDashboardMessage = () => {
    const navigate = useNavigate();

    // Sample user data (replace with your actual data source)
    const users = [
        { id: "U001", name: "Alice", message: "hello", image: "https://via.placeholder.com/40" },
        { id: "U002", name: "Bob", message: "how are you", image: "https://via.placeholder.com/40" },
        { id: "U003", name: "Charlie", message: "are you ok", image: "https://via.placeholder.com/40" },
    ];

    // Handle click to navigate to user's message route
    const handleUserClick = (user) => {
        navigate(`/Admin_Dashboard/Message/${user.id}`, { state: { user } });
    };

    return (
        <div className="mt-10 m-4 roboto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">Messages</h1>
            <div className="flex h-screen">
                {/* User List Sidebar */}
                <div className="w-1/4 bg-gray-50 dark:bg-[#1E232E] p-4 border-r border-gray-200 dark:border-gray-700">
                    <div>
                        <input type="text" name="" placeholder="Search" className=" border border-gray-300 rounded-md w-full pl-2 py-[10px]" id="" />
                    </div>

                    <NavLink to="/Admin_Dashboard/Message/chatbot" className="text-2xl">
                        Ai Chat
                    </NavLink>
                    <div className="space-y-2">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                                className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#252c3b] text-gray-700 dark:text-gray-200 transition-colors"
                            >
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <span className="font-medium">{user.name}</span>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Outlet for Messages */}
                <div className="w-3/4 p-6 bg-white dark:bg-[#252c3b]">
                    <Outlet /> {/* Renders content based on route */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardMessage;