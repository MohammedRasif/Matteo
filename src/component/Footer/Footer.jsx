// import { MapPin, Mail } from "lucide-react"
// import { BsInstagram, BsTwitter } from "react-icons/bs"
// import { FaFacebook, FaLinkedin } from "react-icons/fa"
// import { GrLinkDown } from "react-icons/gr"
// import { NavLink } from "react-router-dom"

// const Footer = () => {
//     const currentYear = new Date().getFullYear()

//     return (
//         <footer className="w-full">
//             {/* Main footer section */}
//             <div className="bg-[#EEF6FC] py-20 px-4 md:px-8">
//                 <div className="container mx-auto max-w-7xl">
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                         {/* Logo and address section */}
//                         <div className="space-y-4">
//                             <h3 className="text-[26px] roboto  text-slate-800">Logo here ChaskiX</h3>
//                             <div className="flex items-start space-x-2 text-[16px] text-slate-600">
//                                 <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
//                                 <p>Villa No. 45, Street 12, Khalifa City, Abu Dhabi,United Arab Emirates</p>
//                             </div>
//                             <div className="flex items-center space-x-2 text-[16px] text-slate-600">
//                                 <Mail className="h-4 w-4 flex-shrink-0" />
//                                 <p>demonexusvision@ChaskiX.com</p>
//                             </div>
//                         </div>

//                         {/* Our collaborators section */}
//                         <div className="space-y-4">
//                             <h3 className="text-[26px] roboto  text-slate-800">Our collaborators</h3>
//                             <ul className="space-y-2 text-[16px] text-slate-600">
//                                 <li>Demo company limited</li>
//                                 <li>Demo task company</li>
//                             </ul>
//                         </div>

//                         {/* About Us section */}
//                         <div className="space-y-4">
//                             <h3 className="text-[26px] roboto  text-slate-800">About Us</h3>
//                             <ul className="space-y-2 text-[16px] text-slate-600">
//                                 <li>
//                                     <NavLink href="#" className="hover:text-slate-800 transition-colors">
//                                         Why us?
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink href="#" className="hover:text-slate-800 transition-colors">
//                                         Learn more
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Social media section */}
//                         <div className="space-y-4">
//                             <h3 className="text-[26px] roboto  text-slate-800">Follow us on</h3>
//                             <div className="flex space-x-4">
//                                 <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
//                                     <FaFacebook className="h-6 w-6" />
//                                 </NavLink>
//                                 <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
//                                     <BsInstagram className="h-6 w-6" />
//                                 </NavLink>
//                                 <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
//                                     <BsTwitter className="h-6 w-6" />
//                                 </NavLink>
//                                 <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
//                                     <FaLinkedin className="h-6 w-6" />
//                                 </NavLink>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom bar */}
//             <div className="bg-[#148CCC] text-white py-4 px-4 md:px-8">
//                 <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-[16px]">
//                     <p>© {currentYear} ChaskiX. All rights reserved</p>
//                     <div className="flex space-x-6 mt-2 md:mt-0">
//                         <NavLink href="#" className="hover:underline">
//                             Privacy
//                         </NavLink>
//                         <NavLink href="#" className="hover:underline">
//                             Terms of service
//                         </NavLink>
//                         <NavLink href="#" className="hover:underline">
//                             Cookies Policy
//                         </NavLink>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     )
// }

// export default Footer


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

                       
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-500 mt-2 uppercase">
                            INSPIRED BY THE SPIRIT <br /> OF THE CHASQUIS
                        </h2>

                    </div>

                    {/* Description Section */}
                    <div>
                        <div className="mb-8 max-w-md">
                            <h1 className="text-8xl font-bold text-gray-600">STUDIOS</h1>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-4">
                                The name "Chaskix" honors the legendary Andean messengers, known for
                                their strength, agility, and resourcefulness. Just like them, we
                                deliver fast, reliable, and impactful solutions to connect and empower
                                communities.
                            </p>
                        </div>

                        {/* Email Input Section */}
                        <div className="mb-8">
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
                </div>

                {/* Footer Links Section */}
                <div className="bg-[#148CCC] w-full">
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
