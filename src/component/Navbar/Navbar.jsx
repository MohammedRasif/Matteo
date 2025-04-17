import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("banner");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Scroll to section with offset for fixed navbar
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const offset = 50; // Offset for fixed navbar
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = sectionPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveSection(id);
        } else {
            console.log(`Section with id "${id}" not found`);
        }
    };

    // Get class for section links based on active section
    const getSectionLinkClass = (sectionId) => {
        if (sectionId === "inspiration") {
            return `px-4 py-2 text-[14px] font-medium rounded-sm ${activeSection === sectionId ? "bg-[#003049] text-white" : "bg-[#003049] text-white"
                }`;
        }
        return `text-[14px] font-medium ${activeSection === sectionId ? "text-[#003049]" : "text-[#003049] hover:text-[#0077B6]"
            }`;
    };

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["banner", "features", "about", "pricing", "contact"];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        if (activeSection !== section) {
                            setActiveSection(section);
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeSection]);

    return (
        <>
            <div className="shadow-md lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:z-50 w-full">
                {/* Top bar with full width */}
                <div className="bg-[#0077B6] w-full py-[10px]"></div>

                {/* Navbar content with max width */}
                <div className="flex items-center justify-between w-full h-16 px-4 sm:px-6    bg-white ">
                    <div className=" flex items-center justify-between w-full max-w-[1430px]  mx-auto">
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
                        <div className="hidden md:flex items-center space-x-6">
                            <a
                                href="#inspiration"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("inspiration");
                                }}
                                className={getSectionLinkClass("inspiration")}
                            >
                                INSPIRATION
                            </a>
                            <NavLink to="/pricing"

                            // onClick={(e) => {
                            //     e.preventDefault();
                            //     scrollToSection("pricing");
                            // }}
                            // className={getSectionLinkClass("pricing")}
                            >
                                PRICING
                            </NavLink>
                            <a
                                href="#service_community"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("service_community");
                                }}
                                className={getSectionLinkClass("service_community")}
                            >
                                SERVICE COMMUNITY
                            </a>
                            <a
                                href="#reviews"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("reviews");
                                }}
                                className={getSectionLinkClass("reviews")}
                            >
                                REVIEWS
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection("contact");
                                }}
                                className={getSectionLinkClass("contact")}
                            >
                                CONTACT US
                            </a>
                        </div>

                        {/* Login button on the right (desktop view) */}
                        <div className="hidden md:block">
                            <div className="relative">
                                <div className="bg-[#47BDFC] px-12 py-4 rounded-md"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <NavLink
                                        to="/login"
                                        className="relative bg-[#0077B6] text-white px-5 py-2 rounded-md flex items-center space-x-2 hover:bg-[#00669e] transition-colors"
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
                        <a
                            href="#inspiration"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("inspiration");
                                toggleMobileMenu();
                            }}
                            className={getSectionLinkClass("inspiration")}
                        >
                            INSPIRATION
                        </a>
                        <a
                            href="#pricing"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("pricing");
                                toggleMobileMenu();
                            }}
                            className={getSectionLinkClass("pricing")}
                        >
                            PRICING
                        </a>
                        <a
                            href="#service_community"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("service_community");
                                toggleMobileMenu();
                            }}
                            className={getSectionLinkClass("service_community")}
                        >
                            SERVICE COMMUNITY
                        </a>
                        <a
                            href="#reviews"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("reviews");
                                toggleMobileMenu();
                            }}
                            className={getSectionLinkClass("reviews")}
                        >
                            REVIEWS
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("contact");
                                toggleMobileMenu();
                            }}
                            className={getSectionLinkClass("contact")}
                        >
                            CONTACT US
                        </a>
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