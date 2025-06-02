import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { TbBrandWechat } from "react-icons/tb";
import {
	MdManageAccounts,
	MdOutlineDashboard,
	MdOutlineQuestionAnswer,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import {
	RiAlignItemTopLine,
	RiBloggerLine,
	RiShoppingCartLine,
} from "react-icons/ri";
import { LiaShopware } from "react-icons/lia";
import { TiTicket } from "react-icons/ti";

const AdminDashboardSidebar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [isSupportOpen, setIsSupportOpen] = useState(false);

	// Check if Management or its sub-routes are active
	const isManagementActive =
		location.pathname.startsWith("/Admin_Dashboard/management") ||
		location.pathname === "/Admin_Dashboard/user" ||
		location.pathname === "/Admin_Dashboard/order" ||
		location.pathname === "/Admin_Dashboard/order_Assessment/"; // Added order_Assessment

	// Check if Support or its sub-routes are active
	const isSupportActive =
		location.pathname === "/Admin_Dashboard/blog" ||
		location.pathname === "/Admin_Dashboard/orders" ||
		location.pathname === "/Admin_Dashboard/tickets";

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("userEmail");
		navigate("/login");
	};

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
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<MdOutlineDashboard className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">Dashboard</h1>
				</NavLink>

				<NavLink
					to="/Admin_Dashboard/Message"
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

				{/* Management Section */}
				<div
					className={`${
						isManagementActive ? "bg-[#848239] rounded-md" : ""
					}`}
				>
					<div className="pl-6">
						<button
							className="flex items-center"
							onClick={() => setIsOpen(!isOpen)}
						>
							<div
								className={`flex items-center space-x-2 py-[11px] cursor-pointer ${
									isManagementActive
										? "bg-[#848239] text-white"
										: ""
								}`}
							>
								<MdManageAccounts className="h-5 w-5" />
								<h1 className="text-[17px] font-medium">
									Management
								</h1>
								{isOpen ? (
									<IoChevronUp className="ml-16" />
								) : (
									<IoChevronDown className="ml-16" />
								)}
							</div>
						</button>
					</div>
				</div>

				{/* Management Submenu */}
				<div
					className={`space-y-2 ml-5 overflow-hidden transition-all duration-300 ${
						isOpen
							? "max-h-[200px] opacity-100"
							: "max-h-0 opacity-0"
					}`}
				>
					<NavLink
						to="/Admin_Dashboard/user"
						className={({ isActive }) =>
							`py-[11px] flex items-center pl-5 text-black font-medium hover:bg-[#848239]/80 hover:text-white rounded-md transition ${
								isActive
									? "bg-[#848239]/80 text-white font-medium rounded-md"
									: ""
							}`
						}
					>
						<Users className="mx-2 h-5 w-5" />
						<h1 className="text-[17px] font-medium">User</h1>
					</NavLink>
					<NavLink
						to="/Admin_Dashboard/order"
						className={({ isActive }) =>
							`py-[11px] flex items-center pl-5 text-black font-medium hover:bg-[#848239]/80 hover:text-white rounded-md transition ${
								isActive ||
								location.pathname ===
									"/Admin_Dashboard/order_Assessment"
									? "bg-[#848239]/80 text-white font-medium rounded-md"
									: ""
							}`
						}
					>
						<RiShoppingCartLine className="mx-2 h-5 w-5" />
						<h1 className="text-[17px] font-medium">Order</h1>
					</NavLink>
				</div>

				{/* Support Section */}
				<div
					className={`${
						isSupportActive ? "bg-[#848239] rounded-md" : ""
					}`}
				>
					<div className="pl-6">
						<button
							className="flex items-center"
							onClick={() => setIsSupportOpen(!isSupportOpen)}
						>
							<div
								className={`flex items-center space-x-2 py-[11px] cursor-pointer ${
									isSupportActive
										? "bg-[#848239] text-white"
										: ""
								}`}
							>
								<BiSupport className="h-5 w-5" />
								<h1 className="text-[17px] font-medium">
									Support
								</h1>
								{isSupportOpen ? (
									<IoChevronUp className="ml-[105px]" />
								) : (
									<IoChevronDown className="ml-[105px]" />
								)}
							</div>
						</button>
					</div>
				</div>

				{/* Support Submenu */}
				<div
					className={`space-y-2 ml-5 overflow-hidden transition-all duration-300 ${
						isSupportOpen
							? "max-h-[200px] opacity-100"
							: "max-h-0 opacity-0"
					}`}
				>
					<NavLink
						to="/Admin_Dashboard/blog"
						className={({ isActive }) =>
							`py-[11px] flex items-center pl-5 text-black font-medium hover:bg-[#848239]/80 hover:text-white rounded-md transition ${
								isActive
									? "bg-[#848239]/80 text-white font-medium rounded-md"
									: ""
							}`
						}
					>
						<RiBloggerLine className="mx-2 h-5 w-5" />
						<h1 className="text-[17px] font-medium">Blog</h1>
					</NavLink>
					<NavLink
						to="/Admin_Dashboard/orders"
						className={({ isActive }) =>
							`py-[11px] flex items-center pl-5 text-black font-medium hover:bg-[#848239]/80 hover:text-white rounded-md transition ${
								isActive
									? "bg-[#848239]/80 text-white font-medium rounded-md"
									: ""
							}`
						}
					>
						<LiaShopware className="mx-2 h-5 w-5" />
						<h1 className="text-[17px] font-medium">Orders</h1>
					</NavLink>
					<NavLink
						to="/Admin_Dashboard/tickets"
						className={({ isActive }) =>
							`py-[11px] flex items-center pl-5 text-black font-medium hover:bg-[#848239]/80 hover:text-white rounded-md transition ${
								isActive
									? "bg-[#848239]/80 text-white font-medium rounded-md"
									: ""
							}`
						}
					>
						<TiTicket className="mx-2 h-5 w-5" />
						<h1 className="text-[17px] font-medium">Tickets</h1>
					</NavLink>
				</div>

				<NavLink
					to="/Admin_Dashboard/withdrawal"
					className={({ isActive }) =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<RiAlignItemTopLine className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">
						Withdrawal requests
					</h1>
				</NavLink>
				<NavLink
					to="/Admin_Dashboard/add_FAQ"
					className={({ isActive }) =>
						`flex items-center gap-3 px-6 py-[11px] transition-colors duration-200 ${
							isActive
								? "bg-[#848239] text-white rounded-md"
								: "hover:bg-[#848239] hover:text-white rounded-md"
						}`
					}
				>
					<MdOutlineQuestionAnswer className="h-5 w-5" />
					<h1 className="text-[17px] font-medium">FAQ</h1>
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

export default AdminDashboardSidebar;
