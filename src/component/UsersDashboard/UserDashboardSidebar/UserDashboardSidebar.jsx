import { NavLink, useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import { TbBrandWechat } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

const UserDashboardSidebar = () => {
  const location = useLocation();
  const isProjectActive = location.pathname.startsWith('/dashboard/user_notifications');



  return (
    <div className="pt-24">
      <NavLink to="/" className="nunito text-center">
        <h1 className="text-[22px]">Cameron Malek</h1>
        <h1 className="text-[16px] text-gray-400">Ui/Ux</h1>
      </NavLink>
      <div className="flex flex-col gap-2 pt-10 mx-10">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <MdOutlineDashboard className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Dashboard</h1>
        </NavLink>

        <NavLink
          to="/dashboard/chat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <TbBrandWechat
            className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Chats</h1>
        </NavLink>

        <NavLink
          to="/dashboard/user_notifications"
          className={() =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isProjectActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <IoMdNotificationsOutline className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Notification</h1>
        </NavLink>

        <NavLink
          to="/dashboard/user_profile_dettails"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <Users className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Profile</h1>
        </NavLink>

        <NavLink
          to="/dashboard/user_wallet"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <IoWalletOutline className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Wallet</h1>
        </NavLink>

        <NavLink
          to="/dashboard/userSupport"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${isActive ? 'bg-[#0D95DD] text-white rounded-md' : 'hover:bg-[#0daddd] hover:text-white rounded-md'
            }`
          }
        >
          <BiSupport className="h-5 w-5" />
          <h1 className="text-[17px] font-medium">Support</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default UserDashboardSidebar;