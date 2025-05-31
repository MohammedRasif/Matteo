import { Bell } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGetProfileQuery } from "../../../Redux/feature/ApiSlice";
import { BaseUrl } from "../../Shared/baseUrls";
const UserDashboardNavbar = ({ notificationCount, setNotificationCount }) => {
	const accessToken = localStorage.getItem("access_token");
	const {
		data: profile,
		isLoading,
		isError,
	} = useGetProfileQuery(undefined, {
		skip: !accessToken,
	});

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

					{/* Navigation NavLinks in the middle */}
					{/* <div className="hidden md:flex items-center space-x-8">
                        
                        <NavLink to="/pricing" className="text-[16px] font-medium">
                            PRICING
                        </NavLink>
                        <NavLink to="/all_Projects" className="text-[16px] font-medium">
                            SERVICE COMMUNITY
                        </NavLink>
                    </div> */}

					{/* User profile and notification on the right */}
					<div className="flex items-center space-x-4">
						<NavLink
							to="/dashboard/user_notifications"
							className="cursor-pointer"
							onClick={() => setNotificationCount(0)}
						>
							<div className="relative ">
								<button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer ">
									<Bell className="h-7 w-7 text-gray-600" />{" "}
									{/* Increased base size */}
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
							<div className="h-10 w-10 rounded-full">
								<img
									src={
										!isLoading && profile.image
											? `${BaseUrl}${profile.image}`
											: "/placeholder.png"
									}
									alt="User profile"
									className="h-10 w-10 rounded-full object-cover"
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

export default UserDashboardNavbar;
