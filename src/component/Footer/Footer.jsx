import img from "./Vector.svg"

import { useState } from "react"; // Import useState for managing email state
import { NavLink } from "react-router-dom";

const Footer = () => {
    // Define email state
    const [email, setEmail] = useState("");

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle join button click
    const handleJoinClick = () => {
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // Basic email validation
            alert(`Thank you for joining the tribe with email: ${email}`);
            setEmail("");
        } else {
            alert("Please enter a valid email address.");
        }
    };

    // Get current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-100 lora">
            {/* Main footer section */}
            <div className="">
                {/* Main Header Section */}
                <div className=" space-x-32 flex  justify-center py-10   ">
                    <div className="mb-4">

                        <h1 className="text-8xl font-bold text-gray-600">CHASKIX </h1>
                        <h1 className="text-8xl font-bold text-gray-600">STUDIOS</h1>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-500 mt-2 uppercase">
                            INSPIRED BY THE SPIRIT <br /> OF THE CHASQUIS
                        </h2>
                        <div className="mt-10">
                            <p className="text-lg font-semibold text-gray-600 mb-3 uppercase">
                                KEEP UP WITH THE TRIBE
                            </p>
                            <div className="flex flex-col md:flex-row items-center">
                                <label htmlFor="email-input" className="sr-only">
                                    Email Address
                                </label>
                                <input
                                    id="email-input"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Your email..."
                                    className="border-2 border-gray-300 rounded-lg px-4 py-2 mb-3 md:mb-0 md:mr-3 w-64 focus:outline-none focus:ring-2 "
                                    aria-label="Enter your email address"
                                />

                            </div>
                        </div>

                    </div>

                    {/* Description Section */}
                    <div>
                        <div className="mb-8 max-w-md">

                            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-4">
                                The name "Chaskix" honors the legendary Andean messengers, known for
                                their strength, agility, and resourcefulness. Just like them, we
                                deliver fast, reliable, and impactful solutions to connect and empower
                                communities.
                            </p>
                        </div>

                        <img src={img} className="h-[30vh]" alt="" />

                    </div>
                </div>

                {/* Footer Links Section */}
                <div className="bg-[#848239] w-full">
                    <div className="flex flex-wrap justify-between max-w-[180vh] gap-4 text-sm  py-4 mx-auto p  text-gray-700 uppercase">
                        <div className="space-x-10">
                            <a href="https://instagram.com" className="hover:underline">
                                INSTAGRAM
                            </a>
                            <a href="https://tiktok.com" className="hover:underline">
                                TIKTOK
                            </a>
                        </div>
                        <div className="space-x-10">
                            <NavLink to="/privacy" className="hover:underline">
                                PRIVACY
                            </NavLink>
                            <NavLink to="/terms" className="hover:underline">
                                TERMS
                            </NavLink>
                            <span>© {currentYear} CHASKIX</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
