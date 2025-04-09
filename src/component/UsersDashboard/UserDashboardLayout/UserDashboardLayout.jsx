import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../UserDashboardSidebar/UserDashboardSidebar";
import UserDashboardNavbar from "../UserDashboardNavbar/UserDashboardNavbar";

const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-white h-full fixed transition-all duration-300 ease-in-out z-40 w-[350px]">
        <div className="h-full flex flex-col justify-between">
          {/* Sidebar Content */}
          <UserDashboardSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col ml-[350px] w-[calc(100%-350px)]">
        {/* Navbar - Full width and above sidebar */}
        <div
          className="fixed top-0 bg-white transition-all duration-300 z-50 shadow"
          style={{
            left: 0, // Start from the left edge of the screen
            width: "100%", // Full width of the viewport
          }}
        >
          <UserDashboardNavbar />
        </div>

        {/* Outlet (Main Content) */}
        <div className="h-full bg-gray-200 mt-16 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;