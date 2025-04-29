import img from "../image/Image.png";
import img2 from "../image/Imagee.png"; // Added second image for the second card

const ServiceAndBusiness = () => {
    // Array of card data for two cards
    const serviceData = [
        {
            title: "Integrate our data with Salesforce",
            description:
                "You can buy a generic data list from anywhere. With our online platform, you’ll benefit from real-time insight-backed data that harnesses the combined power of artificial intelligence, data science, and big data analytics. Our platform enhances your database to make it work harder and drive better results for your business.",
            imageUrl: img,
            altText: "Construction worker",
        },
        {
            title: "An analytics platform that helps to grow",
            description:
                "If you’re in Salesforce, you know how important it is to have reliable, high-quality data. Our platform provides real-time updates, ensuring your sales and verified data into your systems, enhancing reports.",
            imageUrl: img2,
            altText: "Salesforce integration",
        },
    ];

    return (
        <div id="service_community" className="bg-[#F0F3F5] py-12 sm:py-28 roboto">
            <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-700 mb-3 sm:mb-5  tracking-wider">Made for all field services and businesses</h1>
            <p className="text-center text-[18px] text-gray-500 mb-20">Customize ChaskiX to grow your business. Schedule jobs, dispatch, <br />
            invoice and get paid all in one place.</p>
            {/* Cards Container */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
            </div>
        </div>
    );
};

export default ServiceAndBusiness;