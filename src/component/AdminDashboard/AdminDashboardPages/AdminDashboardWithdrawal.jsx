import React, { useState, useEffect, useRef } from "react";
import { GoAlert } from "react-icons/go";
import {
	useApproveWithdrawalRequestMutation,
	useRejectWithdrawalRequestMutation,
	useWithdrawalQuery,
	useWithdrawalWarningMutation,
} from "../../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";
import { BaseUrl } from "../../Shared/baseUrls";

const AdminDashboardWithdrawal = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All request");
	const [showStatusDropdown, setShowStatusDropdown] = useState(false);
	const [showActionMenu, setShowActionMenu] = useState(null);
	const [showViewPopup, setShowViewPopup] = useState(false);
	const [showWarningPopup, setShowWarningPopup] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [selectedRequestId, setSelectedRequestId] = useState(null);
	const [warningMessage, setWarningMessage] = useState("");
	const [warningStatus, setWarningStatus] = useState(null); // null, 'loading', 'success', 'error'
	const [warningError, setWarningError] = useState(null);

	// Fetch withdrawal data
	const {
		data: withdrawal,
		isLoading,
		error,
		refetch: refetchWithdrawalQuery,
	} = useWithdrawalQuery();
	console.log("Fetched Withdrawal:", withdrawal);

	// Mutation for sending warning
	const [withdrawalWarning] = useWithdrawalWarningMutation();

	// mutation for approving withdrawal request
	const [approveWithdrawalRequest] = useApproveWithdrawalRequestMutation();

	// mutation for rejecting withdrawal request
	const [rejectWithdrawalRequest] = useRejectWithdrawalRequestMutation();

	// Refs for click outside detection
	const actionMenuRefs = useRef({});
	const statusDropdownRef = useRef(null);
	const popupRef = useRef(null);
	const warningPopupRef = useRef(null);

	const getStatusColor = (status) => {
		switch (status) {
			case "Complete":
				return "text-green-600";
			case "In-progress":
				return "text-indigo-600";
			case "Cancelled":
				return "text-blue-600";
			default:
				return "text-gray-600";
		}
	};

	const filteredRequests = (withdrawal || []).filter((request) => {
		// Filter by search query
		const matchesSearch =
			request.id
				.toString()
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			request.user_name.toLowerCase().includes(searchQuery.toLowerCase());

		// Filter by status (map 'pending' to 'In-progress')
		const requestStatus =
			request.status === "pending" ? "In-progress" : request.status;
		const matchesStatus =
			statusFilter === "All request" || requestStatus === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const handleStatusClick = () => {
		setShowStatusDropdown(!showStatusDropdown);
	};

	const handleStatusSelect = (status) => {
		setStatusFilter(status);
		setShowStatusDropdown(false);
		refetchWithdrawalQuery();
	};

	const handleActionClick = (id) => {
		console.log("Action dropdown opened for ID:", id);
		setShowActionMenu(showActionMenu === id ? null : id);
	};

	const handleViewClick = (request) => {
		setSelectedRequest(request);
		setShowViewPopup(true);
	};

	const handleClosePopup = () => {
		setShowViewPopup(false);
		setShowWarningPopup(false);
		setSelectedRequest(null);
		setSelectedRequestId(null);
		setWarningMessage("");
		setWarningStatus(null);
		setWarningError(null);
	};

	const handleGiveWarning = (request) => {
		console.log("Give warning clicked for request:", request);
		// Find the request in withdrawal data to ensure ID comes from mapped data
		const matchedRequest = (withdrawal || []).find(
			(item) => item.id === request.id
		);
		if (matchedRequest) {
			console.log("Matched withdrawal request ID:", matchedRequest.id);
			setSelectedRequest(matchedRequest);
			setSelectedRequestId(matchedRequest.id);
			setShowWarningPopup(true);
			setShowActionMenu(null);
		} else {
			console.error(
				"Request ID not found in withdrawal data:",
				request.id
			);
		}
	};

	const handleWarningSubmit = async () => {
		// Validate that warningMessage is not empty or just whitespace
		if (!warningMessage || warningMessage.trim().length === 0) {
			setWarningError("Please enter a valid warning message");
			console.log(
				"Validation failed: warningMessage is empty or whitespace"
			);
			return;
		}
		if (!selectedRequestId) {
			setWarningError("No request selected");
			console.log("Validation failed: selectedRequestId is null");
			return;
		}

		setWarningStatus("loading");
		setWarningError(null);

		// Prepare the payload with the correct field name 'warning'
		const payload = {
			warning: warningMessage.trim(),
			id: selectedRequestId,
		};
		console.log("Sending warning request with payload:", payload);

		try {
			// Send the warning with the correct payload structure
			const response = await withdrawalWarning(payload).unwrap();
			console.log("Warning mutation response:", response);
			setWarningStatus("success");
		} catch (err) {
			console.error("Warning mutation error:", err);
			setWarningStatus("error");
			setWarningError(err?.data?.message || "Failed to send warning");
		}
	};

	// Close dropdowns and menus when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			console.log("Click detected outside, checking refs...");

			// Close action menu
			const isOutsideActionMenu = Object.values(
				actionMenuRefs.current
			).every((ref) => !ref || !ref.contains(event.target));
			if (isOutsideActionMenu && showActionMenu !== null) {
				console.log("Closing action menu");
				setShowActionMenu(null);
			}

			// Close status dropdown
			if (
				statusDropdownRef.current &&
				!statusDropdownRef.current.contains(event.target) &&
				showStatusDropdown
			) {
				console.log("Closing status dropdown");
				setShowStatusDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showActionMenu, showStatusDropdown]);

	// Handle loading and error states for withdrawal data
	if (isLoading) {
		return <div className="p-6 roboto">Loading...</div>;
	}
	if (error) {
		return <div className="p-6 roboto">Error: {error.message}</div>;
	}

	const handleApproveWithdrawalRequest = async (e) => {
		try {
			const id = e.target.dataset.id;

			const response = await approveWithdrawalRequest(id).unwrap();
			toast.success(
				response?.message || "Request approved successfully!",
				{
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "colored",
					style: {
						background: "#00BF63",
						color: "#fff",
						fontWeight: "semibold",
						borderRadius: "8px",
						border: "1px solid #00BF63",
						padding: "10px",
						marginTop: "10px",
						marginBottom: "10px",
						marginLeft: "10px",
						marginRight: "10px",
					},
				}
			);
			refetchWithdrawalQuery();
			setShowActionMenu(null);
		} catch (err) {
			const errorMessage = err.data?.error || "Failed to approve request";
			toast.error(errorMessage, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
				style: {
					background: "#ff4d4f",
					color: "#fff",
					fontWeight: "semibold",
					borderRadius: "8px",
					border: "1px solid #ff4d4f",
					padding: "10px",
				},
			});
		}
	};

	const handleRejectWithdrawalRequest = async (e) => {
		try {
			const id = e.target.dataset.id;

			const response = await rejectWithdrawalRequest(id).unwrap();
			toast.success(
				response?.message || "Request rejected successfully!",
				{
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "colored",
					style: {
						background: "#00BF63",
						color: "#fff",
						fontWeight: "semibold",
						borderRadius: "8px",
						border: "1px solid #00BF63",
						padding: "10px",
						marginTop: "10px",
						marginBottom: "10px",
						marginLeft: "10px",
						marginRight: "10px",
					},
				}
			);
			refetchWithdrawalQuery();
			setShowActionMenu(null);
		} catch (err) {
			const errorMessage = err.data?.error || "Failed to reject request";
			toast.error(errorMessage, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "colored",
				style: {
					background: "#ff4d4f",
					color: "#fff",
					fontWeight: "semibold",
					borderRadius: "8px",
					border: "1px solid #ff4d4f",
					padding: "10px",
				},
			});
		}
	};

	return (
		<div className="p-6 roboto">
			<ToastContainer />
			<div className="mx-auto">
				<h1 className="text-2xl font-semibold mb-6 text-gray-800 mt-2">
					Withdrawal requests
				</h1>

				<div className="flex justify-between items-center mb-6">
					<div className="relative">
						<button
							className="text-gray-700 flex items-center text-sm bg-gray-50 px-3 py-1 rounded-sm cursor-pointer"
							onClick={handleStatusClick}
						>
							{statusFilter}
							<svg
								className="w-4 h-4 ml-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>

						{showStatusDropdown && (
							<div
								ref={statusDropdownRef}
								className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-20 w-36"
							>
								<ul className="py-1">
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() =>
											handleStatusSelect("All request")
										}
									>
										All request
									</li>
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() =>
											handleStatusSelect("In-progress")
										}
									>
										In-progress
									</li>
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() =>
											handleStatusSelect("Complete")
										}
									>
										Complete
									</li>
									<li
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
										onClick={() =>
											handleStatusSelect("Cancelled")
										}
									>
										Cancelled
									</li>
								</ul>
							</div>
						)}
					</div>

					<div className="relative">
						<input
							type="text"
							placeholder="Search by request ID or business Name"
							className="pl-1 pr-4 py-2 rounded-md border bg-gray-100 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-72 text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<div className="absolute inset-y-0 right-0 flex items-center pr-3">
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				<div className="rounded-md">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-300">
							<tr>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Business name
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Request id
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Date of request
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Wallet
								</th>
								<th className="px-6 py-3 text-left text-[14px] font-bold text-gray-900 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredRequests.map((request) => (
								<tr
									key={request.id}
									className="border-b border-gray-300"
								>
									<td className="px-6 py-3 whitespace-nowrap">
										<div className="flex items-center">
											<img
												src={
													request.view_data.user.image
														? `${BaseUrl}${request.view_data.user.image}`
														: "/placeholder.png"
												}
												alt=""
												className="w-8 h-8 rounded-full mr-3"
											/>
											<span className="text-sm text-gray-900">
												{request.user_name}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										${request.amount.toFixed(2)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{request.requested_at}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`text-sm ${getStatusColor(
												request.status === "pending"
													? "In-progress"
													: request.status
											)}`}
										>
											{request.status === "pending"
												? "In-progress"
												: request.status
														.charAt(0)
														.toUpperCase() +
												  request.status.slice(1)}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<button
											className="bg-blue-500 text-white text-xs px-3 py-1 rounded-2xl cursor-pointer"
											onClick={() =>
												handleViewClick(request)
											}
										>
											View
										</button>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
										<button
											className="text-gray-400 hover:text-gray-600 cursor-pointer"
											onClick={() =>
												handleActionClick(request.id)
											}
										>
											<svg
												className="w-5 h-5"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
											</svg>
										</button>

										{showActionMenu === request.id && (
											<div
												ref={(el) =>
													(actionMenuRefs.current[
														request.id
													] = el)
												}
												className="absolute right-0 top-full mt-1 min-w-[150px] bg-white rounded-md shadow-lg z-20"
											>
												<div className="py-1">
													<button
														data-id={request.id}
														className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
														onClick={
															handleApproveWithdrawalRequest
														}
													>
														<svg
															className="w-4 h-4 mr-2"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
															/>
														</svg>
														Go to payment
													</button>
													<button
														data-id={request.id}
														className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
														onClick={
															handleRejectWithdrawalRequest
														}
													>
														<svg
															className="w-4 h-4 mr-2"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M6 18L18 6M6 6l12 12"
															/>
														</svg>
														Cancel request
													</button>
													<button
														className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
														onClick={() =>
															handleGiveWarning(
																request
															)
														}
													>
														<svg
															className="w-4 h-4 mr-2"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
															/>
														</svg>
														Warning
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

			{/* View Popup - Profile details */}
			{showViewPopup && selectedRequest && (
				<div className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50">
					<div className="bg-gray-100 rounded-lg shadow-lg max-w-xl w-full">
						<div className="p-4 flex items-center">
							<button
								className="flex items-center text-gray-800 font-medium cursor-pointer"
								onClick={handleClosePopup}
							>
								<svg
									className="w-5 h-5 mr-2"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 19l-7-7m0 0l7-7m-7 7h18"
									/>
								</svg>
								Back
							</button>
						</div>

						<div className="px-6 pb-4">
							<div className="flex items-start">
								<img
									src={
										selectedRequest.view_data.user.image ||
										"/placeholder.png"
									}
									alt=""
									className="w-24 h-24 rounded-full mr-6"
								/>
								<div>
									<h2 className="text-xl font-medium text-gray-800">
										{
											selectedRequest.view_data.user
												.username
										}
									</h2>
									<p className="text-gray-600">
										{selectedRequest.view_data.user.role ||
											"Hostler"}
									</p>
									<div className="mt-2">
										<p className="text-gray-700">
											Rating:{" "}
											<span className="font-medium">
												{selectedRequest.view_data
													.rating_count > 0
													? (
															selectedRequest
																.view_data
																.rating_sum /
															selectedRequest
																.view_data
																.rating_count
													  ).toFixed(1)
													: "0"}
											</span>
											<span className="text-gray-500">
												{" "}
												(
												{
													selectedRequest.view_data
														.rating_count
												}{" "}
												Reviews)
											</span>
										</p>
									</div>
								</div>
							</div>

							<div className="mt-6">
								<h3 className="text-lg font-medium text-gray-800 mb-2">
									Description
								</h3>
								<p className="text-gray-600 text-sm">
									{selectedRequest.view_data.user.about ||
										"No description available"}
								</p>
							</div>

							<div className="mt-6 grid grid-cols-2 gap-y-4">
								<div className="flex items-center space-x-8">
									<p className="text-gray-600">
										Task completed:
									</p>
									<p className="font-medium">
										{
											selectedRequest.view_data
												.task_completed_count
										}
									</p>
								</div>
								<div className="flex items-center space-x-[83px]">
									<p className="text-gray-600">Age:</p>
									<p className="font-medium">
										{selectedRequest.view_data.user
											.date_of_birth
											? new Date().getFullYear() -
											  new Date(
													selectedRequest.view_data.user.date_of_birth
											  ).getFullYear()
											: "N/A"}
									</p>
								</div>
								<div className="flex items-center space-x-[50px]">
									<p className="text-gray-600">
										Total earning:
									</p>
									<p className="font-medium">
										$
										{selectedRequest.view_data.task_completed_amount.toFixed(
											2
										)}
									</p>
								</div>
								<div className="flex items-center space-x-8">
									<p className="text-gray-600">
										Hourly rate:
									</p>
									<p className="font-medium">
										{selectedRequest.view_data.user
											.hourly_rate
											? `$${selectedRequest.view_data.user.hourly_rate}`
											: "N/A"}
									</p>
								</div>
								<div className="flex items-center space-x-[90px]">
									<p className="text-gray-600">Gender:</p>
									<p className="font-medium">
										{selectedRequest.view_data.user
											.gender || "N/A"}
									</p>
								</div>
								<div className="flex items-center space-x-9">
									<p className="text-gray-600">Experience:</p>
									<p className="font-medium">
										{selectedRequest.view_data.user
											.years_of_experience
											? `${selectedRequest.view_data.user.years_of_experience} year(s)`
											: "N/A"}
									</p>
								</div>
							</div>

							<div className="mt-6">
								<h3 className="text-lg font-medium text-gray-800 mb-1">
									Skills
								</h3>
								<p className="text-gray-700">
									{selectedRequest.view_data.user.skills
										.length > 0
										? selectedRequest.view_data.user.skills.join(
												", "
										  )
										: "None"}
								</p>
							</div>

							<div className="mt-6 flex">
								<p className="text-gray-600 mr-2">Language:</p>
								<p className="text-gray-700 font-medium">
									{selectedRequest.view_data.user.languages
										.length > 0
										? selectedRequest.view_data.user.languages.join(
												", "
										  )
										: "None"}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Warning Popup */}
			{showWarningPopup && selectedRequest && (
				<div className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50">
					<div
						ref={warningPopupRef}
						className="bg-gray-50 rounded-lg shadow-lg max-w-md w-full p-4"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex items-center mb-4">
							<button
								className="text-gray-500 flex items-center text-sm cursor-pointer"
								onClick={handleClosePopup}
							>
								<svg
									className="w-4 h-4 mr-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								Back
							</button>
						</div>

						<div className="border border-blue-500 text-red-500 rounded-md w-32 p-[4px] mb-4 flex items-center space-x-3 justify-center mx-auto">
							<div className="mb-1">
								<GoAlert size={24} />
							</div>
							<span className="font-bold text-lg">Warning</span>
						</div>

						<div className="mb-6">
							{warningStatus === "success" ? (
								<p className="text-green-600 text-sm">
									Warning sent successfully!
								</p>
							) : warningStatus === "error" ? (
								<p className="text-red-600 text-sm">
									Error: {warningError}
								</p>
							) : (
								<>
									<textarea
										className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
										rows="4"
										placeholder="Enter warning message"
										value={warningMessage}
										onChange={(e) =>
											setWarningMessage(e.target.value)
										}
									/>
									{warningError && (
										<p className="text-red-600 text-sm mt-2">
											{warningError}
										</p>
									)}
									{warningStatus === "loading" && (
										<p className="text-gray-600 text-sm mt-2">
											Sending warning...
										</p>
									)}
								</>
							)}
						</div>

						<div className="flex justify-center space-x-4">
							{warningStatus !== "success" && (
								<button
									onClick={handleWarningSubmit}
									className="px-8 py-2 bg-[#848239] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none text-md font-medium cursor-pointer"
									disabled={warningStatus === "loading"}
								>
									Submit
								</button>
							)}
							<button
								onClick={handleClosePopup}
								className="px-8 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none text-md font-medium cursor-pointer"
							>
								{warningStatus === "success"
									? "Close"
									: "Cancel"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboardWithdrawal;
