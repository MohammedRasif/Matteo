import { MapPin, Mail } from "lucide-react"
import { BsInstagram, BsTwitter } from "react-icons/bs"
import { FaFacebook, FaLinkedin } from "react-icons/fa"
import { GrLinkDown } from "react-icons/gr"
import { NavLink } from "react-router-dom"

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full">
            {/* Main footer section */}
            <div className="bg-[#EEF6FC] py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Logo and address section */}
                        <div className="space-y-4">
                            <h3 className="text-[26px] roboto  text-slate-800">Logo here ChaskiX</h3>
                            <div className="flex items-start space-x-2 text-[16px] text-slate-600">
                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <p>Villa No. 45, Street 12, Khalifa City, Abu Dhabi,United Arab Emirates</p>
                            </div>
                            <div className="flex items-center space-x-2 text-[16px] text-slate-600">
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <p>demonexusvision@ChaskiX.com</p>
                            </div>
                        </div>

                        {/* Our collaborators section */}
                        <div className="space-y-4">
                            <h3 className="text-[26px] roboto  text-slate-800">Our collaborators</h3>
                            <ul className="space-y-2 text-[16px] text-slate-600">
                                <li>Demo company limited</li>
                                <li>Demo task company</li>
                            </ul>
                        </div>

                        {/* About Us section */}
                        <div className="space-y-4">
                            <h3 className="text-[26px] roboto  text-slate-800">About Us</h3>
                            <ul className="space-y-2 text-[16px] text-slate-600">
                                <li>
                                    <NavLink href="#" className="hover:text-slate-800 transition-colors">
                                        Why us?
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink href="#" className="hover:text-slate-800 transition-colors">
                                        Learn more
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Social media section */}
                        <div className="space-y-4">
                            <h3 className="text-[26px] roboto  text-slate-800">Follow us on</h3>
                            <div className="flex space-x-4">
                                <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <FaFacebook className="h-6 w-6" />
                                </NavLink>
                                <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <BsInstagram className="h-6 w-6" />
                                </NavLink>
                                <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <BsTwitter className="h-6 w-6" />
                                </NavLink>
                                <NavLink href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <FaLinkedin className="h-6 w-6" />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#148CCC] text-white py-4 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center text-[16px]">
                    <p>© {currentYear} ChaskiX. All rights reserved</p>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <NavLink href="#" className="hover:underline">
                            Privacy
                        </NavLink>
                        <NavLink href="#" className="hover:underline">
                            Terms of service
                        </NavLink>
                        <NavLink href="#" className="hover:underline">
                            Cookies Policy
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
