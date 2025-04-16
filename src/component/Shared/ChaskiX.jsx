import { Network, LayoutGrid,  } from "lucide-react";
import img from "../image/group.png"
import img1 from "../image/groupp.png"
import img2 from "../image/grouppp.png"

const ChaskiX = () => {
    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[150vh] mx-auto ">
                <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5  tracking-wider">WHY ChaskiX?</h1>
                <p className="text-center text-[18px] text-gray-500 mb-20">Trusted by over 120,000 field service pros, get up and running in no time.</p>


                {/* Feature Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button className="bg-[#148CCC] text-white px-6 py-3 rounded-full hover:bg-[#33C3F0] transition-colors">
                        Easy Hiring
                    </button>
                    <button className="bg-[#148CCC] text-white px-6 py-3 rounded-full hover:bg-[#33C3F0] transition-colors">
                        Get hired easily
                    </button>
                    <button className="bg-[#148CCC] text-white px-6 py-3 rounded-full hover:bg-[#33C3F0] transition-colors">
                        Enhance business
                    </button>
                    <button className="bg-[#148CCC] text-white px-6 py-3 rounded-full hover:bg-[#33C3F0] transition-colors">
                        AI assistance
                    </button>
                </div>

                {/* Three Features Section */}
                <div className="grid md:grid-cols-3 gap-10 mt-8">
                    {/* Feature 1 */}
                    <div className="flex flex-col ">
                        <div className=" w-[50px] h-[50px]  ">
                            <img src={img} alt="" />
                        </div>
                        <h3 className="text-xl font-medium text-slate-700 mb-3">Connected with all businesses</h3>
                        <p className="text-slate-600 max-w-sm">
                            ChaskiX offers Guidelines for every part of their business. All they have to do is connect.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col ">
                        <div className=" w-[50px] h-[50px]  ">
                            <img src={img1} alt="" />
                        </div>
                        <h3 className="text-xl font-medium text-slate-700 mb-3">One platform</h3>
                        <p className="text-slate-600 max-w-sm">
                            With ChaskiX, multiple categories management, platforms, and tabs are completely eliminated.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col ">
                        <div className=" w-[50px] h-[50px]  ">
                            <img src={img2} alt="" />
                        </div>
                        <h3 className="text-xl font-medium text-slate-700 mb-3">Easy to get experts services</h3>
                        <p className="text-slate-600 max-w-sm">
                            Designed for all level business enhancement, with ease of use at its core
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChaskiX;
