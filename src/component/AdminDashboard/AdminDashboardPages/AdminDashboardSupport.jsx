"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, CheckCircle, Trash2, X, Filter, Search, AlertCircle } from "lucide-react"
import { GoArrowLeft } from "react-icons/go"

const AdminDashboardSupport = () => {
    // State for filter, search, dropdowns, and popups
    const [activeFilter, setActiveFilter] = useState("Order related")
    const [searchInput, setSearchInput] = useState("")
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)
    const [activeStatusDropdown, setActiveStatusDropdown] = useState(null)
    const [showViewPopup, setShowViewPopup] = useState(false)
    const [showSolvePopup, setShowSolvePopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [pendingSolveTicket, setPendingSolveTicket] = useState(null)
    const [pendingDeleteTicket, setPendingDeleteTicket] = useState(null)

    // Refs for closing dropdowns when clicking outside
    const filterDropdownRef = useRef(null)
    const statusDropdownRefs = useRef([])

    // Sample data for tickets
    const allTickets = [
        {
            id: "1",
            reason: "Order related",
            reportDetails: "View",
            dateOfCreation: "2023-05-15",
            ticketId: "46593291",
            status: "Solved",
            description: "Customer reported an issue with their order delivery. The package was delayed by 3 days.",
        },
        {
            id: "2",
            reason: "Order related",
            reportDetails: "View",
            dateOfCreation: "2023-05-16",
            ticketId: "46593292",
            status: "Processing",
            description: "Customer is requesting a refund for a damaged product received in their order.",
        },
        {
            id: "3",
            reason: "Order related",
            reportDetails: "View",
            dateOfCreation: "2023-05-17",
            ticketId: "46593293",
            status: "Solved",
            description:
                "Customer reported missing items from their order. Issue has been resolved by sending the missing items.",
        },
        {
            id: "4",
            reason: "Withdrawal",
            reportDetails: "View",
            dateOfCreation: "2023-05-18",
            ticketId: "46593294",
            status: "Processing",
            description: "Customer is having issues with withdrawing funds from their account. Transaction is pending.",
        },
        {
            id: "5",
            reason: "Withdrawal",
            reportDetails: "View",
            dateOfCreation: "2023-05-19",
            ticketId: "46593295",
            status: "Solved",
            description: "Customer reported a delayed withdrawal. The funds have now been successfully transferred.",
        },
        {
            id: "6",
            reason: "Order related",
            reportDetails: "View",
            dateOfCreation: "2023-05-20",
            ticketId: "46593296",
            status: "Processing",
            description: "Customer is requesting to change the shipping address for their order.",
        },
        {
            id: "7",
            reason: "Withdrawal",
            reportDetails: "View",
            dateOfCreation: "2023-05-21",
            ticketId: "46593297",
            status: "Solved",
            description: "Customer reported an incorrect amount withdrawn. The issue has been resolved with a correction.",
        },
        {
            id: "8",
            reason: "Others",
            reportDetails: "View",
            dateOfCreation: "2023-05-22",
            ticketId: "46593298",
            status: "Processing",
            description: "Customer reported a technical issue with the website login process.",
        },
    ]

    // Filter options
    const filterOptions = ["Order related", "Withdrawal", "Others"]

    // Filtered tickets based on active filter and search
    const [tickets, setTickets] = useState(allTickets)

    // Update filtered tickets when active filter or search changes
    useEffect(() => {
        let filteredTickets = allTickets

        // Apply filter
        if (activeFilter === "Order related") {
            filteredTickets = allTickets // Show all tickets
        } else if (activeFilter === "Withdrawal") {
            filteredTickets = allTickets.filter((ticket) => ticket.reason === "Withdrawal" || ticket.reason === "Others")
        } else if (activeFilter === "Others") {
            filteredTickets = allTickets.filter((ticket) => ticket.reason !== "Order related" && ticket.reason !== "Withdrawal")
        }

        // Apply search
        if (searchInput.trim() !== "") {
            filteredTickets = filteredTickets.filter((ticket) =>
                ticket.ticketId.toLowerCase().includes(searchInput.toLowerCase())
            )
        }

        setTickets(filteredTickets)
    }, [activeFilter, searchInput])

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false)
            }
            const isOutsideDropdown = statusDropdownRefs.current.every(
                (ref) => !ref || !ref.contains(event.target)
            )
            if (isOutsideDropdown) {
                setActiveStatusDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle view ticket details
    const handleViewTicket = (ticket, e) => {
        e.preventDefault()
        setSelectedTicket(ticket)
        setShowViewPopup(true)
    }

    // Handle status actions
    const handleStatusAction = (action, ticket) => {
        console.log(`Action triggered: ${action}, Ticket ID: ${ticket.ticketId}`) // Debug
        if (action === "solve") {
            setPendingSolveTicket(ticket)
            setShowSolvePopup(true)
        } else if (action === "delete") {
            setPendingDeleteTicket(ticket)
            setShowDeletePopup(true)
        }
        setActiveStatusDropdown(null)
    }

    // Handle solve confirmation
    const handleSolveConfirm = () => {
        if (pendingSolveTicket) {
            const updatedTickets = tickets.map((t) =>
                t.id === pendingSolveTicket.id ? { ...t, status: "Solved" } : t
            )
            setTickets(updatedTickets)
        }
        setShowSolvePopup(false)
        setPendingSolveTicket(null)
    }

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        if (pendingDeleteTicket) {
            const updatedTickets = tickets.filter((t) => t.id !== pendingDeleteTicket.id)
            setTickets(updatedTickets)
        }
        setShowDeletePopup(false)
        setPendingDeleteTicket(null)
    }

    return (
        <div className="roboto">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <h1 className="mb-6 text-2xl font-semibold text-gray-800 pt-5">Support tickets</h1>

                {/* Search and Filter */}
                <div className="mb-4 flex justify-between">
                    {/* Filter */}
                    <div className="relative" ref={filterDropdownRef}>
                        <button
                            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                            className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 px-4 rounded-sm py-[5px] cursor-pointer"
                        >
                            {activeFilter}
                            <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Filter Dropdown */}
                        {showFilterDropdown && (
                            <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-white shadow-lg">
                                <div className="py-1">
                                    {filterOptions.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setActiveFilter(option)
                                                setShowFilterDropdown(false)
                                            }}
                                            className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search by ID"
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-[#0D95DD] focus:outline-none"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0D95DD] bg-gray-100 rounded-full p-1">
                            <Search className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Tickets Table */}
                <div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-300 text-left text-sm font-medium text-gray-700">
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Report Details</th>
                                <th className="px-6 py-3">Date of creation</th>
                                <th className="px-6 py-3">Ticket ID</th>
                                <th className="px-6 py-3 flex items-center">
                                    Status
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={ticket.id} className="border-b border-gray-300 text-sm">
                                    <td className="px-6 py-4 text-gray-700">{ticket.reason}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href="#"
                                            className="text-blue-500 hover:underline"
                                            onClick={(e) => handleViewTicket(ticket, e)}
                                        >
                                            {ticket.reportDetails}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{ticket.dateOfCreation}</td>
                                    <td className="px-6 py-4">
                                        <a href="#" className=" hover:underline">
                                            {ticket.ticketId}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 relative">
                                        <button
                                            className="flex items-center justify-between w-full"
                                            onClick={() =>
                                                setActiveStatusDropdown(activeStatusDropdown === index ? null : index)
                                            }
                                        >
                                            <span
                                                className={ticket.status === "Solved" ? "" : ""}
                                            >
                                                {ticket.status}
                                            </span>
                                            
                                        </button>

                                        {/* Status Dropdown */}
                                        {activeStatusDropdown === index && (
                                            <div
                                                ref={(el) => (statusDropdownRefs.current[index] = el)}
                                                className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md bg-white shadow-lg"
                                            >
                                                <div className="py-1">
                                                    {ticket.status === "Processing" && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleStatusAction("solve", ticket)
                                                            }}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            Make it solved
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleStatusAction("delete", ticket)
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </button>
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

            {/* View Ticket Popup */}
            {showViewPopup && selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowViewPopup(false)}
                                className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
                            >
                                <GoArrowLeft className="h-4 w-4 mt-[4px]" />
                                back
                            </button>
                        </div>

                        <div className="flex items-center justify-center my-2">
                            <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-5 py-2 w-56 rounded-md flex items-center justify-center">
                                Description
                            </h1>
                        </div>

                        <p className="px-10 text-[14px] text-gray-500">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum recusandae vitae dolorum quam
                            modi quae ab placeat magni porro. Ducimus temporibus dicta qui sapiente illo? Quo impedit
                            quidem nisi voluptatibus laboriosam eaque, praesentium omnis facilis commodi delectus odio ex,
                            iusto, repudiandae eius deleniti molestiae. Hic unde doloremque consequatur rerum et?
                        </p>

                        <div className="flex justify-center gap-2 mt-5">
                            <button
                                onClick={() => setShowViewPopup(false)}
                                className="px-10 py-1 bg-[#0D95DD] text-white rounded-md cursor-pointer"
                            >
                                Okey
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Solve Confirmation Popup */}
            {showSolvePopup && pendingSolveTicket && (
                <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-green-100">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Confirm Mark as Solved</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setShowSolvePopup(false)
                                    setPendingSolveTicket(null)
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-4">
                            Are you sure you want to mark ticket ID:{" "}
                            <span className="font-medium">{pendingSolveTicket?.ticketId}</span> as Solved?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowSolvePopup(false)
                                    setPendingSolveTicket(null)
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSolveConfirm}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && pendingDeleteTicket && (
                <div className="fixed inset-0 flex items-center justify-center z-50  backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-red-100">
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setShowDeletePopup(false)
                                    setPendingDeleteTicket(null)
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete ticket ID:{" "}
                            <span className="font-medium">{pendingDeleteTicket?.ticketId}</span>? This action cannot be
                            undone.
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowDeletePopup(false)
                                    setPendingDeleteTicket(null)
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboardSupport