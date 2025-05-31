import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { TbBrandWechat } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

const UserDashboardSidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isProjectActive = location.pathname.startsWith(
		"/dashboard/user_notifications"
	);
	const isDashboardActive =
		location.pathname === "/dashboard" ||
		location.pathname.startsWith("/dashboard/createBuyerOrder") ||
		location.pathname.startsWith("/dashboard/createSellerOrder") ||
		location.pathname.startsWith("/dashboard/buyer_order_create");
	const isWalletActive =
		location.pathname === "/dashboard/user_wallet" ||
		location.pathname.startsWith("/dashboard/user_withdrawal_method");

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		navigate("/login");
	};

	return (
		<div className="pt-24">
			<NavLink to="/" className="nunito text-center">
				<h1 className="text-[22px]">Cameron Malek</h1>
				<h1 className="text-[16px] text-gray-400">Ui/Ux</h1>
			</NavLink>
			<div className="flex flex-col gap-2 pt-10 mx-10">
				<NavLink
					to="/dashboard"
					className={() =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isDashboardActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<MdOutlineDashboard className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Dashboard</h1>
				</NavLink>

				<NavLink
					to="/dashboard/Messages"
					className={({ isActive }) =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<TbBrandWechat className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Chats</h1>
				</NavLink>

				<NavLink
					to="/dashboard/user_notifications"
					className={() =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isProjectActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<IoMdNotificationsOutline className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Notification</h1>
				</NavLink>

				<NavLink
					to="/dashboard/user_profile_dettails"
					className={({ isActive }) =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<Users className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Profile</h1>
				</NavLink>

				<NavLink
					to="/dashboard/user_wallet"
					className={() =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isWalletActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<IoWalletOutline className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Wallet</h1>
				</NavLink>

				<NavLink
					to="/dashboard/userSupport"
					className={({ isActive }) =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<BiSupport className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Support</h1>
				</NavLink>
			</div>

			{/* Logout */}
			<div className="text-center w-full bg-[#848239] text-white rounded-sm py-[11px] absolute bottom-0 cursor-pointer">
				<button
					onClick={handleLogout}
					className="text-[17px] font-medium cursor-pointer"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default UserDashboardSidebar;
