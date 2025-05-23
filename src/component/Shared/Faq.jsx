import { useState } from "react";
import { ChevronDown } from "lucide-react";

// FAQ Question and Answer Component
const FaqQuestionAns = ({ item, index, activeItem, toggleItem }) => {
  return (
    <div key={`item-${index}`} className="">
      <button
        onClick={() => toggleItem(index)}
        className={`py-4 text-[#345168] bg-white px-3 border border-gray-300 text-left text-base font-medium flex justify-between items-center w-full hover:cursor-pointer ${
          activeItem === index ? "rounded-t-xl" : "rounded-xl"
        }`}
      >
        {item.question}
        <ChevronDown
          className={`transition-transform duration-300 ${
            activeItem === index ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          activeItem === index
            ? "max-h-96 opacity-100 pb-5 rounded-b-xl border-x border-gray-300"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 px-10">
          <ul>
            {item.answer &&
              item.answer.split(",").map((q, i) => (
                <li className="text-gray-600 text-sm list-disc" key={i}>
                  {q}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [activeItem, setActiveItem] = useState(0);

  const faqItems = [
    {
      question: "What is field service management?",
      answer:
        "Field service management is a system designed to coordinate the work of distributed employees or contractors who carry out service at the client's location. It includes schedule optimization, dispatch, mobile connectivity, and performance analysis tools.",
    },
    {
      question: "What are the benefits of field service management?",
      answer:
        "Field service management provides numerous benefits including increased efficiency, reduced operational costs, improved customer satisfaction, enhanced workforce productivity, better resource allocation, accurate billing, and real-time visibility into field operations.",
    },
    {
      question: "How much does field service management cost?",
      answer:
        "The cost of field service management varies based on factors like the size of your organization, number of users, features required, and whether it's cloud-based or on-premises. Pricing typically ranges from $15-$300 per user per month, with enterprise solutions costing more based on customization needs.",
    },
    {
      question: "What are the common features of field service management?",
      answer:
        "Common features include scheduling and dispatch, route optimization, mobile access, work order management, inventory management, customer portal, invoicing, reporting and analytics, GPS tracking, and integration with other business systems.",
    },
    {
      question: "Factors to consider when buying field service management?",
      answer:
        "Consider scalability, ease of use, mobile capabilities, integration with existing systems, customization options, reporting features, customer support, security measures, offline functionality, and overall cost of ownership when selecting a field service management solution.",
    },
    {
      question: "Who needs field service management?",
      answer:
        "Field service management is beneficial for industries like HVAC, electrical, plumbing, IT services, healthcare, telecommunications, property maintenance, pest control, landscaping, security services, and any business that manages employees working at customer locations rather than company facilities.",
    },
  ];

  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5 py-10 tracking-wider">
        FREQUENTLY ASKED QUESTIONS
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-4">
          <div className="h-[600px]">
            {faqItems.map((item, index) => (
              <FaqQuestionAns
                key={`item-${index}`}
                item={item}
                index={index}
                activeItem={activeItem}
                toggleItem={toggleItem}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/3 mt-10 md:mt-0 flex justify-center items-center">
          <div className="bg-[#0092D8] rounded-full w-64 h-64 flex flex-col justify-center items-center text-white p-6 text-center">
            <h3 className="text-2xl font-semibold mb-2">FAQ's</h3>
            <p className="text-sm">
              Let us know if you have any other questions, our team is always
              happy to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
export { FaqQuestionAns };
