import { Bell } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../Shared/baseUrls";
import { useGetProfileQuery } from "../../../Redux/feature/ApiSlice";
import { useEffect, useState } from "react";
const AdminDashboardNavbar = ({ notificationCount, setNotificationCount }) => {
	const navigate = useNavigate();
	const accessToken = localStorage.getItem("access_token");
	const {
		data: profile,
		isLoading,
		isError,
	} = useGetProfileQuery(undefined, {
		skip: !accessToken,
	});
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (profile?.is_admin) setIsAdmin(profile?.is_admin);

		console.log("fsdaf ", isAdmin);

		// if (!isAdmin) return navigate("/");
	}, [profile, navigate]);

	return (
		<div>
			<div className="bg-[#848239] w-full py-[10px] "></div>
			<div>
				<div className="flex items-center justify-between w-full h-16 px-6 bg-white max-w-[180vh] mx-auto">
					{/* Logo on the left */}
					<div className="flex items-center">
						<NavLink
							to="/"
							className="text-[24px] font-bold text-[#848239]"
						>
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
										{notificationCount > 9
											? "9+"
											: notificationCount}
									</div>
								)}
							</div>
						</NavLink>
						<div className="flex items-center space-x-2">
							<div className="h-10 w-10">
								<img
									src={
										!isLoading && profile.image
											? `${BaseUrl}${profile.image}`
											: "/placeholder.png"
									}
									alt="User profile"
								/>
							</div>
							<span className="text-[17px] font-medium">
								{profile?.username || profile?.email}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardNavbar;
