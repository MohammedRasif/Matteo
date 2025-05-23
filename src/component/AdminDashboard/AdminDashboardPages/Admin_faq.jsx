import React, { useEffect, useState } from "react";
import { FaqQuestionAns } from "../../Shared/Faq";
import { FaPlus } from "react-icons/fa6";
import {
  useAddFaqMutation,
  useFaqDataQuery,
  useUpdateFaqMutation,
} from "../../../Redux/feature/ApiSlice";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function Admin_faq() {
  const [activeItem, setActiveItem] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [faqItems, setFaqItems] = useState([]);
  const { data, error } = useFaqDataQuery();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();
  const location = useLocation();
  const isAdminPage = location.pathname === "/Admin_Dashboard/add_FAQ";
  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  const handleSubmitFaq = async () => {
    if (newFaq.question && newFaq.answer) {
      try {
        if (newFaq.id) {
          // ✅ EDIT MODE
          const updated = await updateFaq(newFaq).unwrap();

          // Replace in local state
          setFaqItems((prev) =>
            prev.map((faq) => (faq.id === updated.id ? updated : faq))
          );

          toast.success("FAQ updated");
        } else {
          // ✅ ADD MODE
          const added = await addFaq(newFaq).unwrap();

          setFaqItems((prev) => [...prev, added]);

          toast.success("FAQ added");
        }

        setNewFaq({ question: "", answer: "" });
        setIsModalOpen(false);
      } catch (err) {
        toast.error("Failed to submit FAQ");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setFaqItems(data);
    }
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (!isModalOpen) {
      setNewFaq({ question: "", answer: "" });
    }
  }, [isModalOpen]);
  return (
    <div>
      <Toaster />
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
            <h2 className="text-xl font-semibold mb-4">
              {newFaq.id ? "Update FAQ" : "Add New FAQ"}
            </h2>
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
                onClick={handleSubmitFaq}
              >
                {newFaq.id ? "Update" : "Add"}
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
              isAdmin={isAdminPage}
              onEdit={() => {
                setNewFaq(item); // open modal with this FAQ to edit
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
