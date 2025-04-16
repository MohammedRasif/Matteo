import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { IoIosArrowRoundBack } from "react-icons/io"
import { NavLink } from "react-router-dom"
import { X } from "lucide-react"

// Define the data in an object
const orderData = {
    projectDetails: {
        title: "Manual Data Entry From Text Documents",
        budget: "200USD",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum is simply dummy text ever since the Lorem Ipsum is simply dummy text ever since the...",
        skills: ["Data Processing", "Data Entry", "Microsoft Access", "Web Research"],
    },
    buyer: {
        username: "username1335",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
    },
    seller: {
        username: "username1335",
        avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
    },
    chatMessages: [
        {
            buyer:
                "yee and scrambled it to scragfd type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
            seller: null,
        },
        {
            buyer: null,
            seller: "yee and scrambled it to",
        },
        {
            buyer:
                "yee and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
            seller: null,
        },
        {
            buyer: null,
            seller: "Got it, I'll make the changes you requested.",
        },
        {
            buyer: "Thanks! Can you also add some more details to the report?",
            seller: null,
        },
        {
            buyer: null,
            seller: "Sure, I'll include the additional details by tomorrow.",
        },
        {
            buyer: "Great, looking forward to it!",
            seller: null,
        },
    ],
    deliveries: [
        {
            deliveryNo: 1,
            date: "12/12/2025",
        },
        {
            deliveryNo: 2,
            date: "12/12/2025",
        },
    ],
}

const AdminDashboardOrderAsses = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = () => {
        setIsPopupOpen(true)
    }

    const closePopup = () => {
        setIsPopupOpen(false)
    }

    return (
        <div className="p-6 roboto">
            {/* Header */}
            <div className="flex justify-between gap-2 mb-4 py-3">
                <NavLink to="/Admin_Dashboard/orders">
                    <button className="flex items-center cursor-pointer">
                        <IoIosArrowRoundBack className="h-6 w-6" />
                        <h1>back</h1>
                    </button>
                </NavLink>
                <h1 className="text-3xl text-center font-semibold text-gray-800">Order assessment</h1>
                <h1></h1>
            </div>

            {/* Main Content - Split Layout */}
            <div className="flex flex-col lg:flex-row gap-3 h-screen" style={{ height: "78vh" }}>
                {/* Left Side: Project Details */}
                <div className="lg:w-1/2 bg-white rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-md font-bold">Deliver files:</span>
                        <span
                            className="text-blue-500 underline text-sm cursor-pointer"
                            onClick={openPopup}
                        >
                            View
                        </span>
                    </div>
                    {/* Map project details */}
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{orderData.projectDetails.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">Budget: {orderData.projectDetails.budget}</p>
                    <p className="text-sm text-gray-700 mb-4">{orderData.projectDetails.description}</p>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Skills Required:</h3>
                    <p className="text-sm text-blue-600">
                        {orderData.projectDetails.skills.map((skill, index) => (
                            <span key={index}>
                                {skill}
                                {index < orderData.projectDetails.skills.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Right Side: Chat Section */}
                <div className="lg:w-1/2 bg-white rounded-lg shadow-md">
                    {/* Buyer/Seller Info */}
                    <div className="flex justify-between items-center mb-4 p-3 rounded-md bg-[#E2F2FC]">
                        <div className="flex items-center gap-2">
                            <img
                                src={orderData.buyer.avatar}
                                alt="Buyer"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-xs text-white bg-[#848EA7] w-12 text-center py-[1px] rounded-full">
                                    Buyer
                                </p>
                                <p className="text-sm font-medium text-gray-800 pl-1">{orderData.buyer.username}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src={orderData.seller.avatar}
                                alt="Seller"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-xs text-white bg-[#0077B6] w-12 text-center py-[1px] rounded-full">
                                    Seller
                                </p>
                                <p className="text-sm font-medium text-gray-800 pl-[1px]">{orderData.seller.username}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages - Display in chronological order, bottom to top */}
                    <div className="p-6 flex flex-col-reverse space-y-4 space-y-reverse overflow-y-auto h-[calc(78vh-120px)]">
                        {orderData.chatMessages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.buyer !== null ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`p-3 max-w-xs text-sm ${message.buyer !== null
                                        ? "bg-[#0077B6] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                                        : "bg-gray-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                                        }`}
                                >
                                    <p>{message.buyer || message.seller}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0  flex items-center justify-center z-50 backdrop-blur-[3px] ">
                    <div className="bg-gray-50 shadow-md  rounded-lg  w-11/12 md:w-3/4 lg:w-1/3 relative">
                        {/* Header */}
                        <div className="flex justify-between items-center  p-5">
                            <div className="flex items-center gap-2">
                                <button onClick={closePopup} className="flex items-center cursor-pointer">
                                    <IoIosArrowRoundBack className="h-6 w-6" />
                                    <h1>back</h1>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className=" bg-[#E2F2FC] w-full ">
                                        <th className="text-left py-2 pl-5 text-gray-800 text-sm">Delivery No.</th>
                                        <th className="text-left py-2 text-gray-800 text-sm">Date</th>
                                        <th className="text-left py-2 text-gray-800 text-sm">Message</th>
                                        <th className="text-left py-2 text-gray-800 text-sm">Files</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.deliveries.map((delivery) => (
                                        <tr key={delivery.deliveryNo} className="">
                                            <td className="py-2 text-sm pl-12">{delivery.deliveryNo}</td>
                                            <td className="py-2 text-sm">{delivery.date}</td>
                                            <td className="py-2">
                                                <span
                                                    className="text-blue-500 underline text-sm cursor-pointer"
                                                // onClick={() => handleMessageView(delivery)}
                                                >
                                                    View
                                                </span>
                                            </td>
                                            <td className="py-2">
                                                <span
                                                    className="text-blue-500 underline text-sm cursor-pointer"
                                                // onClick={() => handleFilesView(delivery)}
                                                >
                                                    View
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboardOrderAsses