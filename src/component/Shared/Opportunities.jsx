

import img from "../image/Rectanglee.png";
import img1 from "../image/Rectangleee.png";
import img2 from "../image/Rectangleeeeee.png";

const Opportunities = () => {
  // Array of objects containing card data
  const opportunitiesData = [
    {
      title: "SEARCH FOR SERVICES",
      description: "SFind what you need by location, category, or keywords.",
      imageUrl: img, // Directly assign the imported image
      altText: "Win more jobs",
    },
    {
      title: "POST OPPORTUNITIES",
      description: "Share your needs or advertise your offerings..",
      imageUrl: img1, // Directly assign the imported image
      altText: "More jobs done right",
    },
    {
      title: "BID OR HIRE",
      description:
        "Make your move. Negotiate in real time..",
      imageUrl: img2, // Directly assign the imported image
      altText: "Help users to find you",
    },
    {
      title: "GET PAID OR PAY FAIRLY",
      description:
        "Secure, fast, and transparent transactions..",
      imageUrl: img2, // Directly assign the imported image
      altText: "Help users to find you",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 sm:py-20 nunito">
      {/* Heading */}
    

      {/* Cards Container */}
     <div className="p-10">
     <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h1 className="md:text-6xl font-bold text-center text-gray-600 ">SEARCH. BID. CHAT. DELIVER. REPEAT.</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  py-10">
          {/* Map over the opportunitiesData array to render cards dynamically */}
          {opportunitiesData.map((opportunity, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl h-full border border-gray-200 shadow   "
            >
              <div className="px-10 py-6 text-center">
                <h3 className="text-xl  font-semibold text-gray-500 mb-2 h-14">
                  {opportunity.title}
                </h3>
                <p className="text-[#45853c] text-sm ">
                  {opportunity.description}
                </p>
              </div>
              <div className="w-full h-20 flex justify-center items-end py-6 ">
                <img
                  src={opportunity.imageUrl}
                  alt={opportunity.altText}
                  className="w-20   rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

       <div className="flex justify-center">
       <button className="text-[34px] font-bold  border-2 p-1 px-3 rounded-3xl text-gray-600">BROWSE OR BID NOW</button>
       </div>
      </div>
     </div>
    </div>
  );
};

export default Opportunities;