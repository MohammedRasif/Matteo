// import img from "../image/Image.png";
// import img2 from "../image/Imagee.png"; // Added second image for the second card

// const ServiceAndBusiness = () => {
//     // Array of card data for two cards
//     const serviceData = [
//         {
//             title: "Integrate our data with Salesforce",
//             description:
//                 "You can buy a generic data list from anywhere. With our online platform, you’ll benefit from real-time insight-backed data that harnesses the combined power of artificial intelligence, data science, and big data analytics. Our platform enhances your database to make it work harder and drive better results for your business.",
//             imageUrl: img,
//             altText: "Construction worker",
//         },
//         {
//             title: "An analytics platform that helps to grow",
//             description:
//                 "If you’re in Salesforce, you know how important it is to have reliable, high-quality data. Our platform provides real-time updates, ensuring your sales and verified data into your systems, enhancing reports.",
//             imageUrl: img2,
//             altText: "Salesforce integration",
//         },
//     ];

//     return (
//         <div id="service_community" className="bg-[#F0F3F5] py-12 sm:py-28 roboto">
//             <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-700 mb-3 sm:mb-5  tracking-wider">Made for all field services and businesses</h1>
//             <p className="text-center text-[18px] text-gray-500 mb-20">Customize ChaskiX to grow your business. Schedule jobs, dispatch, <br />
//             invoice and get paid all in one place.</p>
//             {/* Cards Container */}
//             <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
//                     {serviceData.map((service, index) => (
//                         <div key={index} className="max-w-md mx-auto">
//                             <div className="overflow-hidden flex items-center justify-center">
//                                 <img
//                                     src={service.imageUrl}
//                                     alt={service.altText}
//                                     className="w-[43vh] h-[27vh] rounded-t-xl object-cover"
//                                 />
//                             </div>
//                             <div className="bg-white h-72 shadow-lg rounded-xl p-6 text-[#243746] border border-gray-300">
//                                 <h2 className="text-3xl text-gray-500  mb-7">
//                                     {service.title}
//                                 </h2>
//                                 <p className="text-sm  text-gray-500">
//                                     {service.description}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ServiceAndBusiness;

import { IoMdArrowForward } from "react-icons/io";
// Added second image for the second card
import img from "../image/Rectanglee.png";

const ServiceAndBusiness = () => {
    // Array of card data for two cards
    // const serviceData = [
    //     {
    //         title: "Integrate our data with Salesforce",
    //         description:
    //             "You can buy a generic data list from anywhere. With our online platform, you’ll benefit from real-time insight-backed data that harnesses the combined power of artificial intelligence, data science, and big data analytics. Our platform enhances your database to make it work harder and drive better results for your business.",
    //         imageUrl: img,
    //         altText: "Construction worker",
    //     },
    //     {
    //         title: "An analytics platform that helps to grow",
    //         description:
    //             "If you’re in Salesforce, you know how important it is to have reliable, high-quality data. Our platform provides real-time updates, ensuring your sales and verified data into your systems, enhancing reports.",
    //         imageUrl: img2,
    //         altText: "Salesforce integration",
    //     },
    // ];

    return (
        <div id="service_community" className=" bg-gray-50  py-2 roboto">

            {/* Cards Container */}
            {/* <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
                    {serviceData.map((service, index) => (
                        <div key={index} className="max-w-md mx-auto">
                            <div className="overflow-hidden flex items-center justify-center">
                                <img
                                    src={service.imageUrl}
                                    alt={service.altText}
                                    className="w-[43vh] h-[27vh] rounded-t-xl object-cover"
                                />
                            </div>
                            <div className="bg-white h-72 shadow-lg rounded-xl p-6 text-[#243746] border border-gray-300">
                                <h2 className="text-3xl text-gray-500  mb-7">
                                    {service.title}
                                </h2>
                                <p className="text-sm  text-gray-500">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto rounded-2xl  w-full">
                {/* Left Section: Title */}
                <div className="flex flex-col space-y-2  text-black">
                    <h1 className="text-4xl md:text-5xl font-bold  leading-tight">
                        OPPORTUNITIES<br />WITHOUT<br />MIDDLEMEN
                    </h1>
                    <p className="text-xl md:text-2xl font-medium ">
                        WE HELP YOU GROW
                    </p>
                </div>

                {/* Right Section: Text and Button */}
                <div className="flex flex-col space-y-4 mt-6 text-black md:mt-0">
                    <p className="text-lg border-b border-black">
                        Keep more of what you earn with transparent fees.
                    </p>
                    <p className="text-lg border-b border-black ">
                        Access AI insights to price, pitch, and scale smarter.
                    </p>
                    <p className="text-lg border-b border-black ">
                        Get seen by buyers actively searching for your services.
                    </p>
                    <p className="text-lg border-b border-black">
                        Join a community built to support entrepreneurs like you.
                    </p>
                    <a
                        href="#"
                        className="text-lg font-bold text-white   transition-colors flex gap-2 items-center"
                    >
                        JOIN THE SERVICE COMMUNITY <IoMdArrowForward />
                    </a>
                </div>
            </div>

            <div className="flex  max-w-screen-xl mx-auto rounded-2xl mt-30 ">
                {/* Left Section */}
                <div className="w-1/2 flex flex-col justify-center  ">
                    <h1 className="text-6xl font-bold text-gray-800 leading-tight">
                        ONE SEARCH.<br />ENDLESS<br />POSSIBILITIES.
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg">


                        Forget endless scrolling. Post what you need or search differently— <br />ChaskiX matches you with real people offeritng real service <br /> tailored to your location, your budget, and your timing.
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex  justify-between py-6  space-y-6 gap-6">
                    {/* Post a Request Button */}
                    <button className=" space-x-2  py-4 px-8 border border-gray-200 shadow rounded-lg w-full  h-full">
                        <span className="text-black font-bold  text-2xl">POST A <br /> REQUEST</span>
                        <div className="flex justify-center">
                       <img
                            src={img}
                            alt=''
                            className=" w-30 rounded-md"
                        />
                       </div>
                    </button>

                    {/* Search Button */}
                    <button className="font-bold space-x-2 border border-gray-200 py-4 px-8 rounded-lg w-full shadow ">
                        <span className="text-black text-2xl">SEARCH <br /> PROVIDERS</span>
                       <div className="flex justify-center">
                       <img
                            src={img}
                            alt=''
                            className=" w-30 rounded-md"
                        />
                       </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceAndBusiness;