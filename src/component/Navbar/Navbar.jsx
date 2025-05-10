


import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../../Redux/feature/ApiSlice";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = (event) => {
    event.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getNavLinkClass = ({ isActive }) =>
    `text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
      isActive ? "bg-black text-white" : "text-gray-800 hover:bg-gray-100"
    }`;

  const accessToken = localStorage.getItem("access_token");
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !accessToken,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsProfileDropdownOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="shadow-md lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 w-full bg-white">
        <div className="bg-green-600 w-full py-[10px]"></div>
        <div className="flex items-center justify-between w-full h-16 px-4 sm:px-6 bg-white">
          <div className="flex items-center justify-between w-full max-w-[1430px] mx-auto">
            <div className="flex items-center">
              <NavLink to="/" className="text-[28px] sm:text-[32px] font-bold text-[#0077b6]">
                ChaskiX
              </NavLink>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/" className={getNavLinkClass}>
                HOME
              </NavLink>
              <NavLink to="/browse_projects" className={getNavLinkClass}>
                INSPIRATION
              </NavLink>
              <NavLink to="/pricing" className={getNavLinkClass}>
                PRICING
              </NavLink>
              <NavLink to="/all_Projects" className={getNavLinkClass}>
                SERVICE COMMUNITY
              </NavLink>
              <NavLink to="/contact" className={getNavLinkClass}>
                CONTACT US
              </NavLink>
            </div>
            <div className="hidden md:block">
              {accessToken && !isLoading && !isError && profile ? (
                <div className="relative flex flex-row-reverse items-center gap-4" ref={profileRef}>
                  {/* <button
                    onClick={toggleProfileDropdown}
                    aria-label="Toggle profile dropdown"
                    className="focus:outline-none"
                  >
                    <GoChevronRight className="h-5 w-5 text-gray-700 cursor-pointer" />
                  </button> */}
                  <button
                    onClick={toggleProfileDropdown}
                    aria-label="Toggle profile dropdown"
                  >
                    {profile.image ? (
                      <img
                        src={profile.image}
                        alt="User profile"
                        className="h-10 w-10 rounded-full object-cover cursor-pointer"
                      />
                    ) : (
                      <FaRegCircleUser className="h-10 w-10 text-gray-800 cursor-pointer" />
                    )}
                  </button>
                  <span className="text-gray-700 font-medium">
                    {profile.email || "No email available"}
                  </span>
                  {isProfileDropdownOpen && (
                    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="bg-[#47BDFC] px-12 py-4 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `relative bg-[#0077B6] text-white px-5 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00669e] transition-colors ${
                          isActive ? "bg-black" : ""
                        }`
                      }
                    >
                      <span className="text-lg font-semibold">Login</span>
                      <ArrowRight className="h-5 w-5" />
                      <div
                        className="absolute inset-0 rounded-md bg-[#00A3E0] -z-10"
                        style={{ transform: "translate(4px, 4px)" }}
                      />
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white px-4 py-4 flex flex-col space-y-4 max-w-[1430px] mx-auto z-[100]">
            <NavLink
              to="/browse_projects"
              className={getNavLinkClass}
              onClick={toggleMobileMenu}
            >
              INSPIRATION
            </NavLink>
            <NavLink
              to="/pricing"
              className={getNavLinkClass}
              onClick={toggleMobileMenu}
            >
              PRICING
            </NavLink>
            <NavLink
              to="/all_Projects"
              className={getNavLinkClass}
              onClick={toggleMobileMenu}
            >
              SERVICE COMMUNITY
            </NavLink>
            <NavLink
              to="/reviews"
              className={getNavLinkClass}
              onClick={toggleMobileMenu}
            >
              REVIEWS
            </NavLink>
            <NavLink
              to="/contact"
              className={getNavLinkClass}
              onClick={toggleMobileMenu}
            >
              CONTACT US
            </NavLink>
            {accessToken && !isLoading && !isError && profile ? (
              <div className="relative flex flex-row-reverse items-center space-x-3" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  aria-label="Toggle profile dropdown"
                  className="focus:outline-none"
                >
                  <GoChevronRight className="h-5 w-5 text-gray-700 cursor-pointer" />
                </button>
                <button
                  onClick={toggleProfileDropdown}
                  aria-label="Toggle profile dropdown"
                >
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="User profile"
                      className="h-10 w-10 rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <FaRegCircleUser className="h-10 w-10 text-gray-800 cursor-pointer" />
                  )}
                </button>
                <span className="text-gray-700 font-medium">
                  {profile.email || "No email available"}
                </span>
                {isProfileDropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 w-48 z-50">
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        toggleMobileMenu();
                      }}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="relative bg-[#0077B6] text-white px-5 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00669e] transition-colors w-fit"
                onClick={toggleMobileMenu}
              >
                <span className="text-lg font-semibold">Login</span>
                <ArrowRight className="h-5 w-5" />
                <div
                  className="absolute inset-0 rounded-md bg-[#00A3E0] -z-10"
                  style={{ transform: "translate(4px, 4px)" }}
                />
              </NavLink>
            )}
          </div>
        )}
      </div>
      <div className="hidden lg:block h-[74px]"></div>
    </>
  );
};

export default Navbar;