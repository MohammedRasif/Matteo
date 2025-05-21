import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { ClockIcon } from "lucide-react";
import { PiDotsThree, PiDotsThreeBold } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";
import { BsPersonCheckFill } from "react-icons/bs";
import { RiDeleteBinLine, RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import {
  IoCloudUploadOutline,
  IoSearchOutline,
  IoTimeOutline,
} from "react-icons/io5";
import {
  MdMoreTime,
  MdOutlineCleanHands,
  MdOutlineHeadsetMic,
} from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { TbFileLike } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import GiveAReviewRating from "../../GiveAReviewRating"; // Assuming this component is available

function CreatedOrderedTable() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buyer");
  const [isOpen, setIsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Created");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownAction, setOpenDropdownAction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showFullText, setShowFullText] = useState(false);
  const dropdownRefs = useRef({});
  const dropdownRef = useRef(null); // For status filter dropdown
  const actionDropdownRef = useRef(null); // For action dropdown

  const description = `Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the Lorem Ipsum is simply dum my text of the printing and type setting industry. Lorem standard dummy text ever since the. Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (
        !isClickInsideAnyDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        actionDropdownRef.current &&
        !actionDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdownAction(null);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === "buyer"
      ? navigate("/dashboard/buyer_order_create")
      : navigate("/dashboard");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDropdownToggleAction = (id) => {
    setOpenDropdownAction((prev) => (prev === id ? null : id));
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    setOrderManagementData((prevOrders) =>
      prevOrders.filter((order) => order.order_id !== orderId)
    );
    setOpenDropdownAction(null);
    setOpenModal(false);
  };

  const projectData = [
    {
      date: "19 Apr 2021, 00:00",
      duration: "2 day/1 hour",
      projectId: "34034474",
      amount: "$26,000",
    },
    {
      date: "22 May 2021, 10:30",
      duration: "3 day/5 hour",
      projectId: "34034475",
      amount: "$18,500",
    },
    {
      date: "15 Jun 2021, 14:00",
      duration: "1 day/3 hour",
      projectId: "34034476",
      amount: "$12,000",
    },
    {
      date: "01 Jul 2021, 09:15",
      duration: "4 day/2 hour",
      projectId: "34034477",
      amount: "$30,000",
    },
    {
      date: "18 Aug 2021, 16:45",
      duration: "2 day/4 hour",
      projectId: "34034478",
      amount: "$22,750",
    },
    {
      date: "03 Sep 2021, 11:00",
      duration: "5 day/0 hour",
      projectId: "34034479",
      amount: "$27,300",
    },
    {
      date: "27 Oct 2021, 08:20",
      duration: "3 day/6 hour",
      projectId: "34034480",
      amount: "$19,800",
    },
    {
      date: "11 Nov 2021, 13:10",
      duration: "2 day/7 hour",
      projectId: "34034481",
      amount: "$21,000",
    },
    {
      date: "29 Dec 2021, 17:50",
      duration: "1 day/5 hour",
      projectId: "34034482",
      amount: "$15,600",
    },
  ];

  const [orderManagementData, setOrderManagementData] = useState([
    {
      user_id: "U12345",
      username: "john_doe",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      delivery_time: "2025-04-10T15:30:00Z",
      order_id: "ORD1001",
      amount: 59.99,
      status: "Delivered",
      action: "⋯",
    },
    {
      user_id: "U12346",
      username: "emma_smith",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      delivery_time: "2025-04-11T12:00:00Z",
      order_id: "ORD1002",
      amount: 89.5,
      status: "In-Progress",
      action: "⋯",
    },
    {
      user_id: "U12347",
      username: "michael_lee",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      delivery_time: "2025-04-12T09:45:00Z",
      order_id: "ORD1003",
      amount: 120.0,
      status: "Late",
      action: "⋯",
    },
    {
      user_id: "U12348",
      username: "sarah_jones",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      delivery_time: "2025-04-09T17:20:00Z",
      order_id: "ORD1004",
      amount: 42.75,
      status: "Cancelled",
      action: "⋯",
    },
    {
      user_id: "U12349",
      username: "david_khan",
      image: "https://randomuser.me/api/portraits/men/49.jpg",
      delivery_time: "2025-04-13T10:15:00Z",
      order_id: "ORD1005",
      amount: 75.25,
      status: "Complete",
      action: "⋯",
    },
    {
      user_id: "U12350",
      username: "olivia_wilson",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      delivery_time: "2025-04-14T13:00:00Z",
      order_id: "ORD1006",
      amount: 150.99,
      status: "In-Progress",
      action: "⋯",
    },
    {
      user_id: "U12351",
      username: "liam_brown",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      delivery_time: "2025-04-15T08:45:00Z",
      order_id: "ORD1007",
      amount: 65.0,
      status: "Delivered",
      action: "⋯",
    },
    {
      user_id: "U12352",
      username: "ava_davis",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      delivery_time: "2025-04-16T16:30:00Z",
      order_id: "ORD1008",
      amount: 99.0,
      status: "Cancel request",
      action: "⋯",
    },
  ]);

  const filteredProjects = projectData.filter((project) =>
    project.projectId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orderManagementData.filter(
    (order) =>
      order.order_id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "" ||
        statusFilter === "All Orders" ||
        order.status === statusFilter)
  );

  return (
    <div className="my-10 nunito">
      <h1 className="text-[24.8px] font-bold text-center mb-10 nunito">
        Order Management
      </h1>

      <div className="flex mb-4 justify-center">
        <div className="bg-[#acaeaf23] rounded-full">
          <button
            className={`px-6 py-2 rounded-full hover:cursor-pointer ${
              activeTab === "seller"
                ? "bg-[#1B97D8] text-white"
                : "text-[#012939]"
            }`}
            onClick={() => handleTabChange("seller")}
          >
            Seller
          </button>
          <button
            className={`px-6 py-2 rounded-full hover:cursor-pointer ${
              activeTab === "buyer"
                ? "bg-[#1B97D8] text-white"
                : "text-[#012939]"
            }`}
            onClick={() => handleTabChange("buyer")}
          >
            Buyer
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex justify-between mx-6 my-3">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div
            className="text-[#012939] flex items-center gap-1 bg-[#F6F8FA] px-2 py-1 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>{statusFilter || "All Orders"}</p>
            <IoIosArrowForward
              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
            />
          </div>
          {isOpen && (
            <div className="absolute mt-2 w-40 text-[#012939] bg-white shadow-md rounded p-2 z-10 space-y-2">
              {[
                "Created",
                "Cancel request",
                "Delivered",
                "Late",
                "Cancelled",
                "In-Progress",
                "",
              ].map((status, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsOpen(false);
                    if (status === "Created") {
                      navigate("/dashboard/buyer_order_create");
                    }
                  }}
                  className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center gap-1 text-[15px]"
                >
                  {status === "" ? "All Orders" : status}
                  <IoIosArrowForward />
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Link to="/dashboard/createBuyerOrder">
            <p className="text-[#38A3DC] border border-[#38A3DC] p-1 rounded cursor-pointer">
              Create Order +
            </p>
          </Link>
          <div className="flex items-center">
            <input
              className="bg-[#F6F8FA] rounded-l p-2"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IoIosSearch className="bg-[#acaeaf23] p-3 size-10 text-[#B9C0C7]" />
          </div>
        </div>
      </div>

      <hr className="mx-6 text-[#D8DBDD] mb-3" />

      {/* Conditional rendering based on statusFilter */}
      {statusFilter === "Created" ? (
        <div className="w-full overflow-hidden rounded">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-[#C1DDEF] text-left">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">
                    Date of creation
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">
                    Project ID
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">
                      {project.date}
                    </td>
                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">
                      <div className="flex items-center">
                        <ClockIcon className="mr-2 h-4 w-4 text-[#718096]" />
                        {project.duration}
                      </div>
                    </td>
                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">
                      {project.projectId}
                    </td>
                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">
                      {project.amount}
                    </td>
                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm w-[195px]">
                      <div
                        className="relative"
                        ref={(el) =>
                          (dropdownRefs.current[project.projectId] = el)
                        }
                      >
                        <button
                          onClick={() =>
                            handleDropdownToggleAction(project.projectId)
                          }
                          className="text-[#718096] cursor-pointer"
                        >
                          <PiDotsThree className="h-5 w-5" />
                        </button>
                        {openDropdownAction === project.projectId && (
                          <div className="absolute right-0 mt-1 w-[195px] bg-[#FAFDFF] rounded z-10">
                            <ul className="text-sm text-[#2c3e50]">
                              <Link
                                to="/dashboard/buyer_candidate_list"
                                className="px-4 py-2 cursor-pointer flex items-center gap-2"
                              >
                                <IoEyeOutline /> Show all bids
                              </Link>
                              <li className="px-4 py-2 cursor-pointer flex items-center gap-2">
                                <BiEdit />
                                Edit
                              </li>
                              <li className="px-4 py-2 cursor-pointer flex items-center gap-2">
                                <RiDeleteBinLine />
                                Delete
                              </li>
                              <li className="px-4 py-2 cursor-pointer flex items-center gap-2">
                                <BsPersonCheckFill />
                                Assign
                              </li>
                              <li className="px-4 py-2 cursor-pointer flex items-center gap-2">
                                <TbListDetails />
                                Details
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto mx-6 mt-2">
          <table className="min-w-full rounded-xl cursor-pointer shadow-sm">
            <thead className="text-[#012939] border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Delivery time</th>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.order_id}
                  className="border-b border-[#C1DDEF] transition text-[#012939] text-[15px]"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={order.image}
                      alt={order.username}
                      className="w-[35px] h-[35px] rounded-full"
                    />
                    <span>{order.username}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <IoTimeOutline />
                      {new Date(order.delivery_time).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">{order.order_id}</td>
                  <td className="px-4 py-3">${order.amount.toFixed(2)}</td>
                  <td
                    className={`px-4 py-2 text-sm font-semibold ${
                      order.status === "In-Progress"
                        ? "text-[#6055C2]"
                        : order.status === "Delivered"
                        ? "text-[#268F39] flex items-center cursor-pointer"
                        : order.status === "Late"
                        ? "text-[#E35A5A]"
                        : order.status === "Cancelled"
                        ? "text-[#5D7595]"
                        : order.status === "Cancel request"
                        ? "text-[#E35A5A] flex items-center cursor-pointer"
                        : order.status === "Complete"
                        ? "text-[#088ED5] flex items-center cursor-pointer"
                        : ""
                    }`}
                  >
                    <span
                      className="inline-flex items-center"
                      onClick={() => {
                        if (order.status === "Delivered") {
                          document
                            .getElementById("modal_delivered")
                            .showModal();
                        } else if (order.status === "Complete") {
                          document.getElementById("modal_complete").showModal();
                        } else if (order.status === "Cancel request") {
                          document
                            .getElementById("modal_cancel_request")
                            .showModal();
                        }
                      }}
                    >
                      {order.status}
                      {(order.status === "Delivered" ||
                        order.status === "Complete" ||
                        order.status === "Cancel request") && (
                        <VscEye className="ml-1 text-[16px] cursor-pointer" />
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 relative text-[#012939]">
                    <div
                      onClick={() => handleDropdownToggleAction(order.order_id)}
                      className="cursor-pointer"
                    >
                      {order.action}
                    </div>
                    {openDropdownAction === order.order_id && (
                      <div
                        ref={actionDropdownRef}
                        className="absolute right-0 w-[195px] text-[16px] text-[#012939] bg-[#FAFDFF] border border-gray-200 rounded shadow-md z-20 p-2 space-y-2"
                      >
                        {(() => {
                          const status = order.status
                            ? order.status.toLowerCase().replace(/[-_\s]/g, "")
                            : "";
                          if (["inprogress", "late"].includes(status)) {
                            return (
                              <>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("cancel")}
                                >
                                  <RxCrossCircled />
                                  <p>Request to cancel</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("extend")}
                                >
                                  <MdMoreTime />
                                  <p>Extend time</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("support")}
                                >
                                  <MdOutlineHeadsetMic />
                                  <p>Admin support</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("details")}
                                >
                                  <TbListDetails />
                                  <p>View project details</p>
                                </div>
                              </>
                            );
                          }
                          if (["complete", "completed"].includes(status)) {
                            return (
                              <>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("cancel")}
                                >
                                  <RxCrossCircled />
                                  <p>Request to cancel</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("extend")}
                                >
                                  <MdMoreTime />
                                  <p>Extend time</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("tip")}
                                >
                                  <CiDollar />
                                  <p>Give a tip</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("review")}
                                >
                                  <TbFileLike />
                                  <p>Give a review</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("delivery")}
                                >
                                  <MdOutlineCleanHands />
                                  <p>View delivery</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("support")}
                                >
                                  <MdOutlineHeadsetMic />
                                  <p>Admin support</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("details")}
                                >
                                  <TbListDetails />
                                  <p>View project details</p>
                                </div>
                              </>
                            );
                          }
                          if (status === "cancelled") {
                            return (
                              <>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() =>
                                    handleDeleteOrder(order.order_id)
                                  }
                                >
                                  <RiDeleteBin6Line />
                                  <p>Delete</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("support")}
                                >
                                  <MdOutlineHeadsetMic />
                                  <p>Admin support</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("details")}
                                >
                                  <TbListDetails />
                                  <p>View project details</p>
                                </div>
                              </>
                            );
                          }
                          if (status === "delivered") {
                            return (
                              <>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("cancel")}
                                >
                                  <RxCrossCircled />
                                  <p>Request to cancel</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("extend")}
                                >
                                  <MdMoreTime />
                                  <p>Extend time</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("delivery")}
                                >
                                  <MdOutlineCleanHands />
                                  <p>View delivery</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("support")}
                                >
                                  <MdOutlineHeadsetMic />
                                  <p>Admin support</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("details")}
                                >
                                  <TbListDetails />
                                  <p>View project details</p>
                                </div>
                              </>
                            );
                          }
                          if (status === "cancelrequest") {
                            return (
                              <>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("extend")}
                                >
                                  <MdMoreTime />
                                  <p>Extend time</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("viewCancel")}
                                >
                                  <MdOutlineCleanHands />
                                  <p>View cancel request</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("support")}
                                >
                                  <MdOutlineHeadsetMic />
                                  <p>Admin support</p>
                                </div>
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => handleOpenModal("details")}
                                >
                                  <TbListDetails />
                                  <p>View project details</p>
                                </div>
                              </>
                            );
                          }
                          console.log(
                            `Unexpected order status: ${order.status}`
                          );
                          return null;
                        })()}
                      </div>
                    )}
                  </td>

                  {/* Status Modals */}
                  <dialog
                    id="modal_delivered"
                    className="modal modal-middle ml-[40%] mt-[300px] rounded backdrop-blur"
                  >
                    <div className="modal-box bg-[#EFF2F6] text-[#154153] pt-4 pb-6 px-6 w-[470px] py-10">
                      <form method="dialog">
                        <button className="btn btn-sm absolute flex items-center gap-2">
                          <GoArrowLeft /> <span>Back</span>
                        </button>
                      </form>
                      <div>
                        <h1 className="text-xl font-medium my-6 text-center">
                          Delivery request
                        </h1>
                        <div className="mb-6">
                          <h2 className="text-[16px] font-medium mb-2">
                            Delivery message
                          </h2>
                          <p className="text-sm text-slate-600">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <div className="mb-12">
                          <h2 className="text-[16px] font-medium text-slate-700 mb-2">
                            Uploaded files
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 1
                              </span>
                            </div>
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 2
                              </span>
                            </div>
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 3
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2 px-4 border border-[#0D95DD] rounded-md text-[#0D95DD]">
                            Edit
                          </button>
                          <button className="py-2 px-4 bg-[#0D95DD] text-[#FFFFFF] rounded-md">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <dialog
                    id="modal_complete"
                    className="modal modal-middle ml-[40%] mt-[300px] rounded"
                  >
                    <div className="modal-box bg-[#EFF2F6] text-[#154153] px-6 py-10 rounded-lg w-[470px]">
                      <form method="dialog">
                        <button className="btn btn-sm absolute top-4 flex items-center gap-2">
                          <GoArrowLeft /> <span>Back</span>
                        </button>
                      </form>
                      <div>
                        <div className="flex-grow text-center">
                          <h1 className="text-base font-medium text-[20px]">
                            Completed
                          </h1>
                        </div>
                        <div className="mb-6">
                          <h2 className="text-[16px] font-medium text-slate-700 mb-2">
                            Delivery message
                          </h2>
                          <p className="text-sm text-slate-600">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 1
                              </span>
                            </div>
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 2
                              </span>
                            </div>
                            <div className="bg-slate-200 rounded-md px-3 py-1">
                              <span className="text-xs text-slate-700">
                                Attachment 3
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </dialog>

                  <dialog
                    id="modal_cancel_request"
                    className="modal modal-middle ml-[40%] mt-[300px] rounded"
                  >
                    <div className="modal-box bg-[#EFF2F6] text-[#154153] pt-4 pb-6 px-6 w-[470px] py-10">
                      <form method="dialog">
                        <button className="btn btn-sm absolute flex items-center gap-2">
                          <GoArrowLeft /> <span>Back</span>
                        </button>
                      </form>
                      <div>
                        <h1 className="text-xl font-medium my-6 text-center">
                          Cancel request
                        </h1>
                        <div className="my-14">
                          <h2 className="text-[16px] font-medium mb-2">
                            Reason of cancellation
                          </h2>
                          <p className="text-sm text-slate-600">
                            Lorem Ipsumis simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2 px-4 border border-[#0D95DD] rounded-md text-[#0D95DD]">
                            Decline
                          </button>
                          <button className="py-2 px-4 bg-[#0D95DD] text-[#FFFFFF] rounded-md">
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DaisyUI Modal for action dropdown */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur z-50">
          <div className="modal modal-open">
            {modalContent === "cancel" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] h-[370px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <h1 className="text-center text-[20px] font-medium">
                  Request to cancel
                </h1>
                <div className="py-8">
                  <span>Describe the Reason</span>
                  <textarea
                    className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-4"
                    placeholder="Enter here"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button className="btn btn-active bg-[#0D95DD] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer">
                    Confirm
                  </button>
                </div>
              </div>
            )}
            {modalContent === "viewCancel" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[566px] rounded px-6 py-10 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <div>
                  <h1 className="text-xl font-medium my-6 text-center">
                    Cancel request
                  </h1>
                  <div className="my-14">
                    <h2 className="text-[16px] font-medium mb-2">
                      Reason of cancellation
                    </h2>
                    <p className="text-sm text-slate-600">
                      Lorem Ipsumis simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industrys
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 px-4 border border-[#0D95DD] rounded-md text-[#0D95DD]">
                      Decline
                    </button>
                    <button className="py-2 px-4 bg-[#0D95DD] text-[#FFFFFF] rounded-md">
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            )}
            {modalContent === "tip" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[566px] rounded px-6 py-10 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <div>
                  <h2 className="text-lg font-medium text-[#154153] mb-4 text-center">
                    Give a tip
                  </h2>
                  <form className="text-[#474747] space-y-6">
                    <div className="flex justify-between gap-4">
                      <div className="mb-4">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium"
                        >
                          Candidate username
                        </label>
                        <div className="relative mt-1">
                          <input
                            type="text"
                            id="username"
                            placeholder="Search by username"
                            className="w-full h-[32px] p-2 border border-[#2E9DE0] rounded-md placeholder-[#B4B4B4]"
                          />
                          <span className="absolute inset-y-0 right-0 pr-3 flex items-center border-l border-[#2E9DE0] pl-1">
                            <IoSearchOutline className="rounded" />
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium"
                        >
                          Amount
                        </label>
                        <input
                          type="text"
                          id="amount"
                          placeholder="Enter amount"
                          className="mt-1 w-full px-3 p-2 h-[32px] border border-[#2E9DE0] rounded-md placeholder-[#B4B4B4]"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium">Note</label>
                      <input
                        placeholder="Type here"
                        className="w-full p-2 h-[32px] border border-[#2E9DE0] rounded-md placeholder-[#B4B4B4]"
                      />
                    </div>
                    <div className="mb-4 flex gap-20 items-center">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="chasix"
                          className="h-4 w-4 text-blue-600 border-[#2E9DE0] rounded"
                        />
                        <label htmlFor="chasix" className="ml-2 text-sm">
                          Pay with ChasixKI wallet
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="stripe"
                          className="h-4 w-4 text-blue-600 border-[#2E9DE0] rounded"
                        />
                        <label htmlFor="stripe" className="ml-2 text-sm">
                          Pay with Stripe
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-3">
                      <button
                        type="button"
                        className="p-1 h-[29px] border border-[#2E9DE0] rounded-md w-full cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="p-1 h-[29px] border bg-[#2E9DE0] rounded-md w-full cursor-pointer"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {modalContent === "delivery" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <div>
                  <h1 className="text-xl font-medium my-6 text-center">
                    Delivery request
                  </h1>
                  <div className="mb-6">
                    <h2 className="text-[16px] font-medium mb-2">
                      Delivery message
                    </h2>
                    <p className="text-sm text-slate-600">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industrys
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                  <div className="mb-12">
                    <h2 className="text-[16px] font-medium text-slate-700 mb-2">
                      Uploaded files
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-slate-200 rounded-md px-3 py-1">
                        <span className="text-xs text-slate-700">
                          Attachment 1
                        </span>
                      </div>
                      <div className="bg-slate-200 rounded-md px-3 py-1">
                        <span className="text-xs text-slate-700">
                          Attachment 2
                        </span>
                      </div>
                      <div className="bg-slate-200 rounded-md px-3 py-1">
                        <span className="text-xs text-slate-700">
                          Attachment 3
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 px-4 border border-[#0D95DD] rounded-md text-[#0D95DD]">
                      Edit
                    </button>
                    <button className="py-2 px-4 bg-[#0D95DD] text-[#FFFFFF] rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {modalContent === "extend" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <h1 className="text-center text-[20px] font-medium">
                  Time extension
                </h1>
                <div className="py-10 space-y-3">
                  <div className="relative">
                    <span>New deadline</span>
                    <input
                      type="date"
                      className="border border-[#5C91B1] p-2 w-full rounded h-[54px] mt-3 appearance-none pr-10"
                    />
                  </div>
                  <div>
                    <span>Describe the Reason</span>
                    <textarea
                      className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-3"
                      placeholder="Enter here"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-active bg-[#0D95DD] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer">
                    Confirm
                  </button>
                </div>
              </div>
            )}
            {modalContent === "review" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <h1 className="text-center text-[20px] font-medium">
                  Give a review
                </h1>
                <GiveAReviewRating />
              </div>
            )}
            {modalContent === "deliver" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <h1 className="text-center text-[20px] font-medium">
                  Delivery
                </h1>
                <div className="py-10 space-y-3">
                  <div>
                    <span>Delivery message</span>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="border border-[#5C91B1] p-2 w-full rounded h-[54px] mt-3 placeholder-[#939597]"
                    />
                  </div>
                  <div className="relative">
                    <span>Upload files</span>
                    <textarea className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-3 text-black"></textarea>
                    <div className="absolute right-30 bottom-34 text-center">
                      <IoCloudUploadOutline className="text-[#5C91B1] text-xl pointer-events-none w-[33px] mx-auto" />
                      <p className="text-[#939597]">
                        Upload a File
                        <br />
                        Drag and drop files or browse
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-active bg-[#0D95DD] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer">
                    Deliver
                  </button>
                </div>
              </div>
            )}
            {modalContent === "support" && (
              <div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
                <button
                  className="btn btn-sm btn-circle hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  <div className="flex items-center gap-2">
                    <GoArrowLeft /> <span>Back</span>
                  </div>
                </button>
                <h1 className="text-center text-[20px] font-medium">
                  Admin support
                </h1>
                <div className="py-10 space-y-3">
                  <div>
                    <span>Delivery message</span>
                    <input
                      type="text"
                      placeholder="Enter here"
                      className="border border-[#5C91B1] p-2 w-full rounded h-[54px] mt-3"
                    />
                  </div>
                  <div>
                    <span>Give a subject</span>
                    <textarea
                      className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-3"
                      placeholder="Enter here"
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-active bg-[#0D95DD] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer">
                    Submit
                  </button>
                </div>
              </div>
            )}
            {modalContent === "details" && (
              <div className="w-[40%] h-full mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
                  <button
                    className="btn btn-sm btn-circle hover:cursor-pointer"
                    onClick={handleCloseModal}
                  >
                    <div className="flex items-center gap-2 my-2">
                      <GoArrowLeft /> <span>Back</span>
                    </div>
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-medium text-gray-800">
                      Manual Data Entry From Text Documents
                    </h2>
                    <button className="text-gray-400 hover:text-gray-600">
                      <PiDotsThreeBold />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-700">
                      Budget 20USD/Per Hour (4 Person Required)
                    </p>
                    <p className="text-gray-700">
                      Time: <span className="font-medium">6 Hours</span>
                    </p>
                  </div>
                  <div className="mb-4">
                    <div className="relative">
                      <p className="text-gray-600 leading-relaxed">
                        {description.substring(0, 220)}
                        {!showFullText && (
                          <>
                            <span className="transition-opacity duration-300 opacity-100">
                              ...
                            </span>
                            <button
                              className="text-blue-500 hover:underline focus:outline-none ml-1"
                              onClick={() => setShowFullText(true)}
                            >
                              see more
                            </button>
                          </>
                        )}
                      </p>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          showFullText
                            ? "max-h-96 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-600 leading-relaxed">
                          {description.substring(220)}
                        </p>
                        {showFullText && (
                          <button
                            className="text-blue-500 hover:underline focus:outline-none mt-1 block"
                            onClick={() => setShowFullText(false)}
                          >
                            see less
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <div>
                      <span className="text-gray-700 mr-2">
                        Skill Required:
                      </span>
                      <a
                        href="#"
                        className="text-blue-500 hover:underline mr-1"
                      >
                        Data Processing,
                      </a>
                      <a
                        href="#"
                        className="text-blue-500 hover:underline mr-1"
                      >
                        Data Entry,
                      </a>
                      <a
                        href="#"
                        className="text-blue-500 hover:underline mr-1"
                      >
                        Microsoft Access,
                      </a>
                      <a href="#" className="text-blue-500 hover:underline">
                        Web Research
                      </a>
                    </div>
                    <span className="text-gray-400 text-sm">10 min ago</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-gray-100 rounded-md px-3 py-1.5 cursor-pointer">
                      <span className="text-sm text-gray-600">
                        Attachment 1
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-md px-3 py-1.5 cursor-pointer">
                      <span className="text-sm text-gray-600">
                        Attachment 2
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-md px-3 py-1.5 cursor-pointer">
                      <span className="text-sm text-gray-600">
                        Attachment 3
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatedOrderedTable;
