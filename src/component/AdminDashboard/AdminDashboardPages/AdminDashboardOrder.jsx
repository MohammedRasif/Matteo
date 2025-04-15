"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronRight, MoreHorizontal, Eye, ChevronDown, X, Check, FileText, List } from "lucide-react"

const AdminDashboardOrder = () => {
    // Sample data to match the image
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
        {
            id: "74895487",
            buyerName: "username1128",
            sellerName: "username1335",
            amount: "$17,000",
            status: "Late",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-portrait.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
        },
        {
            id: "62621762",
            buyerName: "username1422",
            sellerName: "username1335",
            amount: "$21,000",
            status: "Cancelled",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-escalator.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/man-on-a-street.jpg",
        },
        {
            id: "81919847",
            buyerName: "username1001",
            sellerName: "username1335",
            amount: "$46,000",
            status: "Complete",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/look-up.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529178/samples/outdoor-woman.jpg",
        },
        {
            id: "25757262",
            buyerName: "username1123",
            sellerName: "username1335",
            amount: "$26,000",
            status: "In-progress",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/video/upload/v1737529172/samples/cld-sample-video.mp4",
        },
        {
            id: "19384746",
            buyerName: "username1232",
            sellerName: "username1335",
            amount: "$62,000",
            status: "Delivered",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529173/samples/two-ladies.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529177/samples/smile.jpg",
        },
        {
            id: "23446333",
            buyerName: "username1893",
            sellerName: "username1335",
            amount: "$12,000",
            status: "Cancel request",
            buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529169/samples/people/boy-snow-hoodie.jpg",
            sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529170/samples/people/bicycle.jpg",
        },
    ]

    // State for filtered orders, search input, and filter dropdown
    const [orders, setOrders] = useState(allOrders)
    const [searchInput, setSearchInput] = useState("")
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [activeFilter, setActiveFilter] = useState("Active orders")

    // State for action dropdown and popup
    const [activeActionDropdown, setActiveActionDropdown] = useState(null)
    const [activePopup, setActivePopup] = useState(null) // Tracks which popup is active

    // Refs for closing dropdowns and popups
    const filterDropdownRef = useRef(null)
    const actionDropdownRefs = useRef([])
    const popupRef = useRef(null)

    // Filter options matching the image
    const filterOptions = ["Cancel requests", "Delivered", "Late", "Cancelled", "In progress", "Active orders"]

    // Action options matching the image
    const actionOptions = [
        { name: "Cancel the order", icon: X, popupId: "cancel" },
        { name: "Partial settlement", icon: Check, popupId: "settlement" },
        { name: "View delivery", icon: Eye, popupId: "delivery" },
        { name: "Assess the order", icon: FileText, popupId: "assess" },
        { name: "View project details", icon: List, popupId: "project" },
    ]

    // Handle search by ID
    useEffect(() => {
        if (searchInput.trim() === "") {
            // If search is empty, apply only the status filter
            applyStatusFilter(activeFilter)
        } else {
            // Filter by ID and maintain the current status filter
            const filtered = allOrders.filter(
                (order) => order.id.includes(searchInput) || order.buyerName.toLowerCase().includes(searchInput.toLowerCase()),
            )

            // If we have a status filter other than "Active orders", apply it
            if (activeFilter !== "Active orders") {
                const statusKey =
                    activeFilter === "In progress"
                        ? "In-progress"
                        : activeFilter === "Cancel requests"
                            ? "Cancel request"
                            : activeFilter

                setOrders(
                    filtered.filter(
                        (order) => order.status === statusKey || (statusKey === "Active orders" && order.status !== "Cancelled"),
                    ),
                )
            } else {
                setOrders(filtered)
            }
        }
    }, [searchInput, activeFilter])

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            // Filter dropdown
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false)
            }
            // Action dropdowns
            const isOutsideActionDropdown = actionDropdownRefs.current.every(
                (ref) => !ref || !ref.contains(event.target)
            )
            if (isOutsideActionDropdown) {
                setActiveActionDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Prevent body scroll when popup is open
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

    // Apply status filter
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

    // Handle action click
    const handleActionClick = (action) => {
        setActivePopup(action.popupId)
        setActiveActionDropdown(null)
    }

    // Handle popup close
    const handleClosePopup = () => {
        setActivePopup(null)
    }

    // Handle overlay click to close popup
    const handleOverlayClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActivePopup(null)
        }
    }

    // Function to determine status styling
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

    // Function to render status with icon if needed
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
        <div className=" roboto">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <h1 className="text-3xl font-semibold text-gray-800 py-5">List of order</h1>

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

                        {/* Filter Dropdown */}
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
                            <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-700">
                                <th className="px-6 py-3">Buyer name</th>
                                <th className="px-6 py-3">Seller name</th>
                                <th className="px-6 py-3">Order id</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} className="border-b border-gray-300 text-sm">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={order.buyerAvatar || "/placeholder.svg"}
                                                alt={order.buyerName}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-700">{order.buyerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={order.sellerAvatar || "/placeholder.svg"}
                                                alt={order.sellerName}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="text-gray-700">{order.sellerName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-700">{order.amount}</td>
                                    <td className="px-6 py-4">{renderStatus(order.status)}</td>
                                    <td className="px-6 py-4 relative">
                                        <button
                                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                            onClick={() => setActiveActionDropdown(activeActionDropdown === index ? null : index)}
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>

                                        {/* Action Dropdown */}
                                        {activeActionDropdown === index && (
                                            <div
                                                ref={(el) => (actionDropdownRefs.current[index] = el)}
                                                className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md bg-gray-100 shadow-lg"
                                            >
                                                <div className="py-1">
                                                    {actionOptions.map((action, actionIndex) => (
                                                        <button
                                                            key={actionIndex}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleActionClick(action)
                                                            }}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <action.icon className="h-4 w-4" />
                                                            {action.name}
                                                        </button>
                                                    ))}
                                                </div>
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
                        <p className="text-gray-700 mb-4 text-sm">Partial settlement</p>
                        <form className="mb-6 p-4">
                            <div className="space-y-4">
                                {/* Top two inputs side-by-side */}
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
                                {/* Third input below, full width */}
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
        </div>
    )
}

export default AdminDashboardOrder