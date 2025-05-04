import { useState,  } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to determine active link styles
    const getNavLinkClass = ({ isActive }) =>
        `text-[16px] font-medium px-3 py-2 rounded-md transition-colors ${
            isActive
                ? "bg-black text-white"
                : "text-gray-800 hover:bg-gray-100"
        }`;

    return (
        <>
            <div className="shadow-md lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 w-full">
                {/* Top bar with full width */}
                <div className="bg-green-600 w-full py-[10px]"></div>

                {/* Navbar content with max width */}
                <div className="flex items-center justify-between w-full h-16 px-4 sm:px-6 bg-white">
                    <div className="flex items-center justify-between w-full max-w-[1430px] mx-auto">
                        {/* Logo on the left */}
                        <div className="flex items-center">
                            <NavLink to="/" className="text-[28px] sm:text-[32px] font-bold text-[#0077b6]">
                                ChaskiX
                            </NavLink>
                        </div>

                        {/* Mobile menu toggle (visible on mobile, hidden on desktop) */}
                        <div className="md:hidden flex items-center">
                            <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>

                        {/* Navigation links (desktop view) */}
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

                        {/* Login button on the right (desktop view) */}
                        <div className="hidden md:block">
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
                        </div>
                    </div>
                </div>

                {/* Mobile menu (visible when toggled on mobile) */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white px-4 py-4 flex flex-col space-y-4 max-w-[1430px] mx-auto">
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
                            to="/all_project"
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
                    </div>
                )}
            </div>

            {/* Spacer div to prevent content from being hidden under the fixed navbar on lg devices */}
            <div className="hidden lg:block h-[74px]"></div>
        </>
    );
};

export default Navbar;




