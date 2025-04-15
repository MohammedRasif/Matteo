import { NavLink, useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import { TbBrandWechat } from "react-icons/tb";
import { MdManageAccounts, MdOutlineDashboard } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { RiBloggerLine } from "react-icons/ri";
import { GrSupport } from "react-icons/gr";

const AdminDashboardSidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    // Check if Management or its sub-routes are active
    const isManagementActive =
        location.pathname.startsWith("/Admin_Dashboard/management") ||
        location.pathname === "/Admin_Dashboard/user" ||
        location.pathname === "/Admin_Dashboard/order";

    // Check if Support or its sub-routes are active
    const isSupportActive =
        location.pathname === "/Admin_Dashboard/blog" ||
        location.pathname === "/Admin_Dashboard/orders";

    return (
        <div className="pt-24 relative h-full">
            <NavLink to="/" className="nunito text-center">
                <h1 className="text-[22px]">Cameron Malek</h1>
                <h1 className="text-[16px] text-gray-400">Ui/Ux</h1>
            </NavLink>
            <div className="flex flex-col gap-2 pt-10 mx-10">
                <NavLink
                    to="/Admin_Dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive
                            ? "bg-[#0D95DD] text-white rounded-md"
                            : "hover:bg-[#0daddd] hover:text-white rounded-md"
                        }`
                    }
                >
                    <MdOutlineDashboard className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Dashboard</h1>
                </NavLink>

                <NavLink
                    to="/Admin_Dashboard/Message"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive
                            ? "bg-[#0D95DD] text-white rounded-md"
                            : "hover:bg-[#0daddd] hover:text-white rounded-md"
                        }`
                    }
                >
                    <TbBrandWechat className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Chats</h1>
                </NavLink>

                {/* Management Section */}
                <div className={`${isManagementActive ? "bg-[#0D95DD] rounded-md" : ""}`}>
                    <div className="pl-6">
                        <button
                            className="flex items-center"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div
                                className={`flex items-center space-x-2 h-[50px] transition-all duration-300 cursor-pointer ${isManagementActive ? "bg-[#0D95DD] text-white" : ""
                                    }`}
                            >
                                <MdManageAccounts className="h-6 w-6" />
                                <h1 className="text-lg font-medium">Management</h1>
                                {isOpen ? <IoChevronUp className="ml-16" /> : <IoChevronDown className="ml-16" />}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Management Submenu */}
                <div
                    className={`space-y-2 ml-5 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <NavLink
                        to="/Admin_Dashboard/user"
                        className={({ isActive }) =>
                            `h-[50px] flex items-center pl-5 text-black font-medium hover:bg-blue-300 hover:text-white rounded-md transition ${isActive ? "bg-blue-300 text-white font-medium rounded-md" : ""
                            }`
                        }
                    >
                        <Users className="mx-2 h-5 w-5" />
                        User
                    </NavLink>
                    <NavLink
                        to="/Admin_Dashboard/order"
                        className={({ isActive }) =>
                            `h-[50px] flex items-center pl-5 text-black font-medium hover:bg-blue-300 hover:text-white rounded-md transition ${isActive ? "bg-blue-300 text-white font-medium rounded-md" : ""
                            }`
                        }
                    >
                        <IoWalletOutline className="mx-2 h-5 w-5" />
                        Order
                    </NavLink>
                </div>

                {/* Support Section */}
                <div className={`${isSupportActive ? "bg-[#0D95DD] rounded-md" : ""}`}>
                    <div className="pl-6">
                        <button
                            className="flex items-center"
                            onClick={() => setIsSupportOpen(!isSupportOpen)}
                        >
                            <div
                                className={`flex items-center space-x-2 h-[50px] transition-all duration-300 cursor-pointer ${isSupportActive ? "bg-[#0D95DD] text-white" : ""
                                    }`}
                            >
                                <BiSupport className="h-6 w-6" />
                                <h1 className="text-lg font-medium">Support</h1>
                                {isSupportOpen ? <IoChevronUp className="ml-[105px]" /> : <IoChevronDown className="ml-[105px]" />}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Support Submenu */}
                <div
                    className={`space-y-2 ml-5 overflow-hidden transition-all duration-300 ${isSupportOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <NavLink
                        to="/Admin_Dashboard/blog"
                        className={({ isActive }) =>
                            `h-[50px] flex items-center pl-5 text-black font-medium hover:bg-blue-300 hover:text-white rounded-md transition ${isActive ? "bg-blue-300 text-white font-medium rounded-md" : ""
                            }`
                        }
                    >
                        <RiBloggerLine className="mx-2 h-5 w-5" />
                        Blog
                    </NavLink>
                    <NavLink
                        to="/Admin_Dashboard/support"
                        className={({ isActive }) =>
                            `h-[50px] flex items-center pl-5 text-black font-medium hover:bg-blue-300 hover:text-white rounded-md transition ${isActive ? "bg-blue-300 text-white font-medium rounded-md" : ""
                            }`
                        }
                    >
                        <GrSupport className="mx-2 h-5 w-5" />
                        Support
                    </NavLink>
                </div>

                <NavLink
                    to="/dashboard/taskProgress"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive
                            ? "bg-[#0D95DD] text-white rounded-md"
                            : "hover:bg-[#0daddd] hover:text-white rounded-md"
                        }`
                    }
                >
                    <IoWalletOutline className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Wallet</h1>
                </NavLink>
            </div>

            {/* Logout */}
            <div className="text-center w-full bg-[#B8E5FF] rounded-sm py-3 absolute bottom-0 cursor-pointer">
                <button className="text-lg font-medium cursor-pointer">Logout</button>
            </div>
        </div>
    );
};

export default AdminDashboardSidebar;