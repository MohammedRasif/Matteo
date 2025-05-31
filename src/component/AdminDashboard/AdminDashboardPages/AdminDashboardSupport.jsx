import { useState, useEffect, useRef } from "react";
import {
	ChevronRight,
	CheckCircle,
	Trash2,
	X,
	Search,
	AlertCircle,
} from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import {
	useAdminSupportTicketDeleteMutation,
	useSupporTicketsQuery,
} from "../../../Redux/feature/ApiSlice";

const AdminDashboardSupport = () => {
	// State for filter, search, dropdowns, and popups
	const [activeFilter, setActiveFilter] = useState("All");
	const [searchInput, setSearchInput] = useState("");
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [activeStatusDropdown, setActiveStatusDropdown] = useState(null);
	const [showViewPopup, setShowViewPopup] = useState(false);
	const [showSolvePopup, setShowSolvePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [pendingSolveTicket, setPendingSolveTicket] = useState(null);
	const [pendingDeleteTicket, setPendingDeleteTicket] = useState(null);
	const [filteredTickets, setFilteredTickets] = useState([]);
	const [deleteError, setDeleteError] = useState(""); // State for error messages

	// Fetch tickets from API
	const { data: supportTicket, isLoading, error } = useSupporTicketsQuery();
	const [supportTicketDelete] = useAdminSupportTicketDeleteMutation();
	console.log("Fetched Tickets:", supportTicket);

	// Refs for closing dropdowns when clicking outside
	const filterDropdownRef = useRef(null);
	const statusDropdownRefs = useRef({});

	// Filter options
	const filterOptions = ["All", "Order related", "Withdrawal", "Others"];

	// Update filtered tickets when supportTicket, activeFilter, or searchInput changes
	useEffect(() => {
		let result = supportTicket || [];

		// Apply filter based on purpose
		if (activeFilter === "Order related") {
			result = result.filter(
				(ticket) => ticket.purpose === "order_related"
			);
		} else if (activeFilter === "Withdrawal") {
			result = result.filter((ticket) => ticket.purpose === "withdrawal");
		} else if (activeFilter === "Others") {
			result = result.filter(
				(ticket) =>
					ticket.purpose !== "order_related" &&
					ticket.purpose !== "withdrawal"
			);
		} // "All" shows all tickets, so no filtering

		// Apply search by ticket ID (id)
		if (searchInput.trim() !== "") {
			result = result.filter((ticket) =>
				ticket.id
					.toString()
					.toLowerCase()
					.includes(searchInput.toLowerCase())
			);
		}

		setFilteredTickets(result);
		console.log("Filtered Tickets:", result);
	}, [supportTicket, activeFilter, searchInput]);

	// Close dropdowns when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			// Close filter dropdown
			if (
				filterDropdownRef.current &&
				!filterDropdownRef.current.contains(event.target)
			) {
				setShowFilterDropdown(false);
			}
			// Close status dropdown
			let isOutside = true;
			Object.values(statusDropdownRefs.current).forEach((ref) => {
				if (ref && ref.contains(event.target)) {
					isOutside = false;
				}
			});
			if (isOutside) {
				setActiveStatusDropdown(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle view ticket details
	const handleViewTicket = (ticket, e) => {
		e.preventDefault();
		setSelectedTicket(ticket);
		setShowViewPopup(true);
	};

	// Handle status actions
	const handleStatusAction = (action, ticket) => {
		console.log(`Action triggered: ${action}, Ticket ID: ${ticket.id}`);
		if (action === "solve") {
			setPendingSolveTicket(ticket);
			setShowSolvePopup(true);
		} else if (action === "delete") {
			setPendingDeleteTicket(ticket);
			setShowDeletePopup(true);
			setDeleteError(""); // Reset error message
		}
		setActiveStatusDropdown(null);
	};

	// Handle solve confirmation
	const handleSolveConfirm = () => {
		if (pendingSolveTicket) {
			const updatedTickets = filteredTickets.map((t) =>
				t.id === pendingSolveTicket.id ? { ...t, status: "Solved" } : t
			);
			setFilteredTickets(updatedTickets);
		}
		setShowSolvePopup(false);
		setPendingSolveTicket(null);
	};

	// Handle delete confirmation
	const handleDeleteConfirm = async () => {
		if (pendingDeleteTicket) {
			try {
				await supportTicketDelete(pendingDeleteTicket.id).unwrap();
				console.log(
					`Successfully deleted ticket ID: ${pendingDeleteTicket.id}`
				);
				const updatedTickets = filteredTickets.filter(
					(t) => t.id !== pendingDeleteTicket.id
				);
				setFilteredTickets(updatedTickets);
				setShowDeletePopup(false);
				setPendingDeleteTicket(null);
				setDeleteError("");
			} catch (error) {
				console.error("Failed to delete ticket:", error);
				setDeleteError("Failed to delete ticket. Please try again.");
			}
		}
	};

	// Handle loading and error states
	if (isLoading) {
		return <div className="p-6 roboto">Loading...</div>;
	}
	if (error) {
		return <div className="p-6 roboto">Error: {error.message}</div>;
	}

	return (
		<div className="roboto">
			<div className="container mx-auto px-4 py-6">
				{/* Header */}
				<h1 className="mb-6 text-2xl font-semibold text-gray-800 pt-5">
					Support tickets
				</h1>

				{/* Search and Filter */}
				<div className="mb-4 flex justify-between">
					{/* Filter */}
					<div className="relative" ref={filterDropdownRef}>
						<button
							onClick={() =>
								setShowFilterDropdown(!showFilterDropdown)
							}
							className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 bg-gray-100 px-4 rounded-sm py-[7px] cursor-pointer"
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
												setActiveFilter(option);
												setShowFilterDropdown(false);
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
							className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-[#848239] focus:outline-none"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#848239] bg-gray-100 rounded-full p-1">
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
							{filteredTickets.map((ticket) => (
								<tr
									key={ticket.id}
									className="border-b border-gray-300 text-sm"
								>
									<td className="px-6 py-4 text-gray-700">
										{ticket.purpose === "order_related"
											? "Order related"
											: ticket.purpose === "blog_related"
											? "Blog related"
											: "Others"}
									</td>
									<td className="px-6 py-4">
										<a
											href="#"
											className="bg-blue-500 text-white text-xs px-3 py-1 rounded-2xl cursor-pointer hover:underline"
											onClick={(e) =>
												handleViewTicket(ticket, e)
											}
										>
											View
										</a>
									</td>
									<td className="px-6 py-4 text-gray-700">
										{new Date(
											ticket.created_at
										).toLocaleDateString()}
									</td>
									<td className="px-6 py-4">
										<a href="#" className="hover:underline">
											{ticket.id}
										</a>
									</td>
									<td className="px-6 py-4 relative">
										<button
											className="flex items-center justify-between w-full"
											onClick={() =>
												setActiveStatusDropdown(
													activeStatusDropdown ===
														ticket.id
														? null
														: ticket.id
												)
											}
										>
											<span className="underline text-blue-400 cursor-pointer">
												{ticket.status}
											</span>
										</button>

										{/* Status Dropdown */}
										{activeStatusDropdown === ticket.id && (
											<div
												ref={(el) =>
													(statusDropdownRefs.current[
														ticket.id
													] = el)
												}
												className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md bg-white shadow-lg"
											>
												<div className="py-1">
													{ticket.status ===
														"In-progress" && (
														<button
															onClick={(e) => {
																e.stopPropagation();
																handleStatusAction(
																	"solve",
																	ticket
																);
															}}
															className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100"
														>
															<CheckCircle className="h-4 w-4" />
															Make it solved
														</button>
													)}
													<button
														onClick={(e) => {
															e.stopPropagation();
															handleStatusAction(
																"delete",
																ticket
															);
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
							<h1 className="border-[#848239] font-medium text-[#848239] border px-5 py-2 w-56 rounded-md flex items-center justify-center">
								Description
							</h1>
						</div>
						<p className="px-10 text-[14px] text-gray-500">
							{selectedTicket.details}
						</p>
						<div className="flex justify-center gap-2 mt-5">
							<button
								onClick={() => setShowViewPopup(false)}
								className="px-10 py-1 bg-[#848239] text-white rounded-md cursor-pointer"
							>
								Okay
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Solve Confirmation Popup */}
			{showSolvePopup && pendingSolveTicket && (
				<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
					<div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<div className="p-2 rounded-full bg-green-100">
									<CheckCircle className="h-6 w-6 text-green-600" />
								</div>
								<h3 className="text-lg font-medium text-gray-900">
									Confirm Mark as Solved
								</h3>
							</div>
							<button
								onClick={() => {
									setShowSolvePopup(false);
									setPendingSolveTicket(null);
								}}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<p className="text-gray-600 mb-4">
							Are you sure you want to mark ticket ID:{" "}
							<span className="font-medium">
								{pendingSolveTicket?.id}
							</span>{" "}
							as Solved?
						</p>
						<div className="flex justify-end gap-2">
							<button
								onClick={() => {
									setShowSolvePopup(false);
									setPendingSolveTicket(null);
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
				<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
					<div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<div className="p-2 rounded-full bg-red-100">
									<AlertCircle className="h-6 w-6 text-red-600" />
								</div>
								<h3 className="text-lg font-medium text-gray-900">
									Confirm Deletion
								</h3>
							</div>
							<button
								onClick={() => {
									setShowDeletePopup(false);
									setPendingDeleteTicket(null);
									setDeleteError("");
								}}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="h-5 w-5 cursor-pointer" />
							</button>
						</div>
						<p className="text-gray-600 mb-4">
							Are you sure you want to delete ticket ID:{" "}
							<span className="font-medium">
								{pendingDeleteTicket?.id}
							</span>
							? This action cannot be undone.
						</p>
						{deleteError && (
							<p className="text-red-500 text-sm mb-4">
								{deleteError}
							</p>
						)}
						<div className="flex justify-end gap-2">
							<button
								onClick={() => {
									setShowDeletePopup(false);
									setPendingDeleteTicket(null);
									setDeleteError("");
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
	);
};

export default AdminDashboardSupport;
