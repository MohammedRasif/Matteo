import { NavLink, useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import { TbBrandWechat } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";


const AdminDashboardSidebar = () => {
    const location = useLocation();
    const isProjectActive = location.pathname.startsWith('/dashboard/Project');
    return (
        <div className="pt-24">
            <NavLink to="/" className="nunito text-center">
                <h1 className="text-[22px]">Cameron Malek</h1>
                <h1 className="text-[16px] text-gray-400">Ui/Ux</h1>
            </NavLink>
            <div className="flex flex-col gap-2 pt-10 mx-10">
                <NavLink
                    to="/Admin_Dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <MdOutlineDashboard className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Dashboard</h1>
                </NavLink>

                <NavLink
                    to="/Admin_Dashboard/Message"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <TbBrandWechat
                        className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Chats</h1>
                </NavLink>

                <NavLink
                    to="/Admin_Dashboard/notification"
                    className={() =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isProjectActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <IoMdNotificationsOutline className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Notification</h1>
                </NavLink>

                <NavLink
                    to="/dashboard/addEmploye"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <Users className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Profile</h1>
                </NavLink>

                <NavLink
                    to="/dashboard/taskProgress"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <IoWalletOutline className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Wallet</h1>
                </NavLink>

                <NavLink
                    to="/dashboard/manageSubscription"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
                        }`
                    }
                >
                    <BiSupport className="h-6 w-6" />
                    <h1 className="text-lg font-medium">Support</h1>
                </NavLink>
            </div>

            {/* logout */}
            <div className="text-center w-full bg-[#B8E5FF] rounded-sm py-3 absolute bottom-0 cursor-pointer">
                <button className="text-lg font-medium cursor-pointer">Logout</button>
            </div>
        </div>
    );
}

export default AdminDashboardSidebar;
