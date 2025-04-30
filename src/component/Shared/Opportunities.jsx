// import img from "../image/Rectangle.png";
// import img1 from "../image/Rectangleee.png";
// import img2 from "../image/Rectangleeeeee.png";

// const Opportunities = () => {
//   // Array of objects containing card data
//   const opportunitiesData = [
//     {
//       title: "Win more jobs",
//       description: "Send impressive quotes that turn leads into paying customers fast.",
//       imageUrl: img, // Directly assign the imported image
//       altText: "Win more jobs",
//     },
//     {
//       title: "More jobs done right",
//       description: "Powerful automations and complete control of your operations.",
//       imageUrl: img1, // Directly assign the imported image
//       altText: "More jobs done right",
//     },
//     {
//       title: "Help users to find you",
//       description:
//         "Insightful, easy-to-use marketing tools that bring in new and repeat business.",
//       imageUrl: img2, // Directly assign the imported image
//       altText: "Help users to find you",
//     },
//   ];

//   return (
//     <div className="bg-gray-50 py-12 sm:py-16 nunito">
//       {/* Heading */}
//       <h2 className="text-3xl sm:text-5xl font-medium text-gray-700 text-center mb-8 sm:mb-12 uppercase tracking-wider">
//         Opportunities
//       </h2>

//       {/* Cards Container */}
//       <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {/* Map over the opportunitiesData array to render cards dynamically */}
//           {opportunitiesData.map((opportunity, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-300 "
//             >
//               <div className="p-6 sm:p-8 text-center">
//                 <h3 className="text-xl sm:text-3xl font-semibold text-gray-700 mb-2">
//                   {opportunity.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-[17px]">
//                   {opportunity.description}
//                 </p>
//               </div>
//               <div className="w-full h-48 sm:h-80 p-5 ">
//                 <img
//                   src={opportunity.imageUrl}
//                   alt={opportunity.altText}
//                   className="w-full h-full object-cover rounded-md"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Opportunities;

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
        <h1 className="md:text-6xl font-bold text-center ">SEARCH. BID. CHAT. DELIVER. REPEAT.</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  py-10">
          {/* Map over the opportunitiesData array to render cards dynamically */}
          {opportunitiesData.map((opportunity, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl h-full border border-gray-200 shadow   "
            >
              <div className="px-10 py-6 text-center">
                <h3 className="text-xl  font-semibold text-gray-700 mb-2 h-14">
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
       <button className="text-[34px] font-bold  border-2 p-1 px-3 rounded-3xl">BROWSE OR BID NOW</button>
       </div>
      </div>
     </div>
    </div>
  );
};

export default Opportunities;