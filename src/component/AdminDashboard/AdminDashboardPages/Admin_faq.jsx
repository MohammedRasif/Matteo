import React, { useEffect, useState } from "react";
import { FaqQuestionAns } from "../../Shared/Faq";
import { FaPlus } from "react-icons/fa6";
import { useFaqDataQuery } from "../../../Redux/feature/ApiSlice";

export default function Admin_faq() {
  const [activeItem, setActiveItem] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [faqItems, setFaqItems] = useState([
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
  ]);
  const { data, error } = useFaqDataQuery();
  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      setFaqItems([...faqItems, newFaq]);
      setNewFaq({ question: "", answer: "" });
    }
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (data) {
      setFaqItems(data);
    }
    console.log(data);
  }, [data]);
  return (
    <div>
      <div className="mb-6 px-10 mt-20">
        <div className="flex items-center justify-center">
          <h1 className="uppercase text-center text-3xl md:text-5xl font-medium text-gray-600 mb-3 sm:mb-5 py-10 tracking-wider">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <button
            className="flex hover:cursor-pointer items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add FAQ</span>
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[#00000036] backdrop-blur-[3px] flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter FAQ question"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="6"
                placeholder="Enter FAQ answer"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 hover:cursor-pointer py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 hover:cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddFaq}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center w-full pb-10">
        <div className="px-10 w-full max-w-6xl">
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
    </div>
  );
}
