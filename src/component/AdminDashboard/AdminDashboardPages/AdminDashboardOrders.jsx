"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronRight, ChevronDown, Eye, X, Check, FileText, List, MoreHorizontal } from "lucide-react"
import { NavLink } from "react-router-dom"

const AdminDashboardOrders = () => {
    // Sample data (unchanged)
    const allOrders = [
        {
            id: "46593292",
            buyerName: "username1335",
            sellerName: "username1335",
            amount: "$33,000",
            status: "In-progress",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
        },
        {
            id: "28474562",
            buyerName: "username1563",
            sellerName: "username1335",
            amount: "$65,000",
            status: "Delivered",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
        },
        // ... (other orders unchanged)
    ]

    // State for filtered orders, search input, and filter dropdown (unchanged)
    const [orders, setOrders] = useState(allOrders)
    const [searchInput, setSearchInput] = useState("")
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [activeFilter, setActiveFilter] = useState("Active orders")

    // State for action list visibility, selected action, and popup
    const [visibleActionList, setVisibleActionList] = useState(null) // Tracks which order's action list is visible (order.id)
    const [selectedActions, setSelectedActions] = useState({}) // Tracks selected action per order (e.g., { "46593292": "cancel" })
    const [activePopup, setActivePopup] = useState(null) // Tracks which popup is active
    const [activeOrderId, setActiveOrderId] = useState(null) // Tracks which order's popup is open

    // Refs for closing filter dropdown, action lists, and popups
    const filterDropdownRef = useRef(null)
    const actionListRefs = useRef({})
    const popupRef = useRef(null)

    // Filter options (unchanged)
    const filterOptions = ["Cancel requests", "Delivered", "Late", "Cancelled", "In progress", "Active orders"]

    // Handle search by ID (unchanged)
    useEffect(() => {
        if (searchInput.trim() === "") {
            applyStatusFilter(activeFilter)
        } else {
            const filtered = allOrders.filter(
                (order) => order.id.includes(searchInput) || order.buyerName.toLowerCase().includes(searchInput.toLowerCase()),
            )
            if (activeFilter !== "Active orders") {
                const statusKey =
                    activeFilter === "In progress"
                        ? "In-progress"
                        : activeFilter === "Cancel requests"
                            ? "Cancel request"
                            : activeFilter
                setOrders(filtered.filter((order) => order.status === statusKey))
            } else {
                setOrders(filtered)
            }
        }
    }, [searchInput, activeFilter])

    // Close filter dropdown and action lists when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            // Filter dropdown
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false)
            }
            // Action lists
            const isOutsideActionList = Object.values(actionListRefs.current).every(
                (ref) => !ref || !ref.contains(event.target),
            )
            if (isOutsideActionList) {
                setVisibleActionList(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Prevent body scroll when popup is open (unchanged)
    useEffect(() => {
        if (activePopup) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [activePopup])

    // Apply status filter (unchanged)
    const applyStatusFilter = (status) => {
        setActiveFilter(status)
        if (status === "Active orders") {
            setOrders(allOrders.filter((order) => order.status !== "Cancelled"))
        } else {
            const statusKey =
                status === "In progress" ? "In-progress" : status === "Cancel requests" ? "Cancel request" : status
            setOrders(allOrders.filter((order) => order.status === statusKey))
        }
        setShowFilterDropdown(false)
    }

    // Toggle action list visibility
    const toggleActionList = (orderId) => {
        setVisibleActionList(visibleActionList === orderId ? null : orderId)
    }

    // Handle action click
    const handleActionClick = (orderId, popupId) => {
        setSelectedActions((prev) => ({
            ...prev,
            [orderId]: popupId, // Mark this action as selected
        }))
        setActiveOrderId(orderId)
        setActivePopup(popupId) // Open the corresponding popup
        setVisibleActionList(null) // Close the action list
    }

    // Handle popup close
    const handleClosePopup = () => {
        setActivePopup(null)
        setActiveOrderId(null)
        // Optionally reset selected action
        if (activeOrderId) {
            setSelectedActions((prev) => ({
                ...prev,
                [activeOrderId]: undefined,
            }))
        }
    }

    // Handle overlay click to close popup
    const handleOverlayClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            handleClosePopup()
        }
    }

    // Status styling (unchanged)
    const getStatusStyle = (status) => {
        switch (status) {
            case "In-progress":
                return "text-blue-600"
            case "Delivered":
                return "text-green-600"
            case "Late":
                return "text-red-500"
            case "Cancelled":
                return "text-gray-600"
            case "Complete":
                return "text-sky-500"
            case "Cancel request":
                return "text-red-500"
            default:
                return "text-gray-600"
        }
    }

    // Render status (unchanged)
    const renderStatus = (status) => {
        if (status === "Delivered" || status === "Complete" || status === "Cancel request") {
            return (
                <div className="flex items-center gap-1">
                    <span className={getStatusStyle(status)}>{status}</span>
                    <Eye className="h-4 w-4" />
                </div>
            )
        }
        return <span className={getStatusStyle(status)}>{status}</span>
    }

    return (
        <div className="roboto">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-gray-800 py-5">List of order</h1>

                {/* Navigation and Search */}
                <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="relative" ref={filterDropdownRef}>
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                            {activeFilter}
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {showFilterDropdown && (
                            <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-gray-100">
                                <div className="py-1">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                applyStatusFilter(option)
                                            }}
                                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option}
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by order ID or username"
                            className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-3 pr-10 text-sm focus:outline-none sm:w-80"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="rounded-lg">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-300 bg-gray-300 text-left text-sm font-medium text-gray-700">
                                <th className="px-6 py-3">Buyer name</th>
                                <th className="px-6 py-3">Seller name</th>
                                <th className="px-6 py-3">Order id</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-300 text-sm">
                                    <td className="px-6 py-4 ">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={order.buyerAvatar || "/placeholder.svg"}
                                                alt={order.buyerName}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-700">{order.buyerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={order.sellerAvatar || "/placeholder.svg"}
                                                alt={order.sellerName}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-700">{order.sellerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4  text-gray-700">{order.id}</td>
                                    <td className="px-6 py-4  text-gray-700">{order.amount}</td>
                                    <td className="px-6 py-4 ">{renderStatus(order.status)}</td>
                                    <td className="px-6 py-4  relative">
                                        <button
                                            onClick={() => toggleActionList(order.id)}
                                            className="text-gray-400 hover:text-gray-600 "
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                        {visibleActionList === order.id && (
                                            <div
                                                ref={(el) => (actionListRefs.current[order.id] = el)}
                                                className="absolute right-0 top-full z-20 mt-1 w-64 rounded-md bg-gray-100 shadow-lg p-2"
                                            >
                                                <button
                                                    onClick={() => handleActionClick(order.id, "cancel")}
                                                    className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${selectedActions[order.id] === "cancel" ? "bg-blue-100 text-blue-600" : ""
                                                        }`}
                                                >
                                                    <X className="h-4 w-4" />
                                                    <h1 className="text-sm font-normal">Cancel the order</h1>
                                                </button>
                                                <button
                                                    onClick={() => handleActionClick(order.id, "settlement")}
                                                    className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${selectedActions[order.id] === "settlement" ? "bg-blue-100 text-blue-600" : ""
                                                        }`}
                                                >
                                                    <Check className="h-4 w-4" />
                                                    <h1 className="text-sm font-normal">Partial settlement</h1>
                                                </button>
                                                <button
                                                    onClick={() => handleActionClick(order.id, "delivery")}
                                                    className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${selectedActions[order.id] === "delivery" ? "bg-blue-100 text-blue-600" : ""
                                                        }`}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    <h1 className="text-sm font-normal">View delivery</h1>
                                                </button>
                                                <NavLink to="/Admin_Dashboard/order_Assessment">
                                                    <button

                                                        className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${selectedActions[order.id] === "assess" ? "bg-blue-100 text-blue-600" : ""
                                                            }`}
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                        <h1 className="text-sm font-normal">Assess the order</h1>
                                                    </button>
                                                </NavLink>
                                                <button
                                                    onClick={() => handleActionClick(order.id, "project")}
                                                    className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${selectedActions[order.id] === "project" ? "bg-blue-100 text-blue-600" : ""
                                                        }`}
                                                >
                                                    <List className="h-4 w-4" />
                                                    <h1 className="text-sm font-normal">View project details</h1>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popups for each action */}
            {activePopup === "settlement" && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={popupRef}
                        className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-700 mb-4 text-sm font-normal">Partial settlement</h1>
                        <form className="mb-6 p-4">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
                                    <div className="flex-1">
                                        <label htmlFor="seller1" className="mb-1 block text-sm font-medium text-gray-700">
                                            Seller
                                        </label>
                                        <input
                                            type="text"
                                            id="seller1"
                                            placeholder="Enter seller name"
                                            className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="seller2" className="mb-1 block text-sm font-medium text-gray-700">
                                            Buyer
                                        </label>
                                        <input
                                            type="text"
                                            id="seller2"
                                            placeholder="Enter buyer name"
                                            className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="seller3" className="mb-1 block text-sm font-medium text-gray-700">
                                        Note
                                    </label>
                                    <input
                                        type="text"
                                        id="seller3"
                                        placeholder="Enter note"
                                        className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-row gap-2 px-4">
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {activePopup === "cancel" && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={popupRef}
                        className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-700 mb-4 text-sm font-normal">Cancel the order</h1>
                        <form className="mb-6 p-4">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="reason" className="mb-1 block text-sm font-medium text-gray-700">
                                        Reason for cancellation
                                    </label>
                                    <textarea
                                        id="reason"
                                        placeholder="Enter reason"
                                        className="w-full rounded-md border border-[#0D95DD] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD]"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-row gap-2 px-4">
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Add other popups for "delivery", "assess", "project" */}
            {activePopup === "delivery" && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={popupRef}
                        className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-700 mb-4 text-sm font-normal">View delivery</h1>
                        <div className="mb-6 p-4">
                            <p className="text-sm text-gray-700">Delivery details for order {activeOrderId}</p>
                            {/* Add delivery-specific content here */}
                        </div>
                        <div className="flex flex-row gap-2 px-4">
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {activePopup === "assess" && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={popupRef}
                        className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-700 mb-4 text-sm font-normal">Assess the order</h1>
                        <form className="mb-6 p-4">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="assessment" className="mb-1 block text-sm font-medium text-gray-700">
                                        Assessment notes
                                    </label>
                                    <textarea
                                        id="assessment"
                                        placeholder="Enter assessment"
                                        className="w-full rounded-md border border-[#0D95DD] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD]"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="flex flex-row gap-2 px-4">
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {activePopup === "project" && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={popupRef}
                        className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-gray-700 mb-4 text-sm font-normal">View project details</h1>
                        <div className="mb-6 p-4">
                            <p className="text-sm text-gray-700">Project details for order {activeOrderId}</p>
                            {/* Add project-specific content here */}
                        </div>
                        <div className="flex flex-row gap-2 px-4">
                            <button
                                onClick={handleClosePopup}
                                className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboardOrders