"use client"

import { Bell } from "lucide-react"
import { NavLink } from "react-router-dom"


const UserDashboardNavbar = () => {
    return (
        <div className="flex items-center justify-between w-full h-16 px-6 bg-white max-w-[180vh] mx-auto">
            {/* Logo on the left */}
            <div className="flex items-center">
                <NavLink to="/" className="text-[24px] font-bold text-[#0077b6]">
                    ChaskiX
                </NavLink>
            </div>

            {/* Navigation NavLinks in the middle */}
            <div className="hidden md:flex items-center space-x-8">
                <NavLink to="/blog" className="text-[16px] font-medium">
                    BLOG
                </NavLink>
                <NavLink to="/pricing" className="text-[16px] font-medium">
                    PRICING
                </NavLink>
                <NavLink to="/service-community" className="text-[16px] font-medium">
                    SERVICE COMMUNITY
                </NavLink>
            </div>

            {/* User profile and notification on the right */}
            <div className="flex items-center space-x-4">
                <div>
                    <button className="pt-2 rounded-full hover:bg-gray-100">
                        <Bell className="h-7 w-6 text-gray-600" />
                    </button>
                    <div className=" absolute text-[10px] p-[5px]  top-[18px] right-[268px] bg-red-400 rounded-full "></div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="h-10 w-10">
                        <img
                            src="https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738148405/fotor-2025010923230_1_u9l6vi.png"

                        />

                    </div>
                    <span className="text-[17px] font-medium">Cameron</span>

                </div>
            </div>
        </div>
    )
}

export default UserDashboardNavbar
