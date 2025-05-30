import { useState, useEffect, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
	useSupportTicketQuery,
	useSupportTicketDeleteMutation,
	useSupporTicketPostMutation,
	useSupportTikectEditMutation,
} from "../../../../Redux/feature/ApiSlice";
import { AlertCircle, X } from "lucide-react";

function UserSupport() {
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [openActionDropdownId, setOpenActionDropdownId] = useState(null);
	const [deleteTicketId, setDeleteTicketId] = useState(null);
	const [selectedFilter, setSelectedFilter] = useState("All");
	const [isPurposeDropdownOpen, setIsPurposeDropdownOpen] = useState(false);
	const [selectedPurpose, setSelectedPurpose] = useState("withdrawal");
	const [description, setDescription] = useState("");
	const [isEditMode, setIsEditMode] = useState(false);
	const [editTicketId, setEditTicketId] = useState(null);

	const dropdownRef = useRef(null);
	const modalRefs = useRef({});
	const actionDropdownRefs = useRef({});

	const {
		data: supportTicket,
		isLoading,
		isError,
		refetch: refetchTicket,
	} = useSupportTicketQuery();
	const [deleteTicket] = useSupportTicketDeleteMutation();
	const [supportTicketPost] = useSupporTicketPostMutation();
	const [supportTicketEdit] = useSupportTikectEditMutation();

	const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);
	const toggleActionDropdown = (ticketId) => {
		setOpenActionDropdownId(
			openActionDropdownId === ticketId ? null : ticketId
		);
	};

	const togglePurposeDropdown = () =>
		setIsPurposeDropdownOpen(!isPurposeDropdownOpen);

	const handleFilterSelect = (filter) => {
		setSelectedFilter(filter);
		setIsOpenDropdown(false);
	};

	const handlePurposeSelect = (purpose) => {
		setSelectedPurpose(purpose);
		setIsPurposeDropdownOpen(false);
	};

	const filteredTickets = supportTicket
		? selectedFilter === "All"
			? supportTicket
			: supportTicket.filter(
					(ticket) =>
						ticket.purpose.toLowerCase() ===
						selectedFilter.toLowerCase()
			  )
		: [];

	const handleEditTicket = (ticket) => {
		setIsEditMode(true);
		setEditTicketId(ticket.id);
		setSelectedPurpose(ticket.purpose);
		setDescription(ticket.details);
		document.getElementById("my_modal_1").showModal();
	};

	const handleCreateOrUpdateTicket = async () => {
		if (!description.trim()) {
			alert("Please enter a description.");
			return;
		}

		const ticketData = {
			purpose: selectedPurpose,
			details: description,
		};

		console.log("Ticket Data being sent:", ticketData);
		console.log("Mode:", isEditMode ? "Edit" : "Create");

		try {
			if (isEditMode) {
				console.log("Updating ticket with ID:", editTicketId);
				await supportTicketEdit({
					id: editTicketId,
					question: ticketData,
				}).unwrap();
			} else {
				console.log("Creating new ticket");
				await supportTicketPost({ warning: ticketData }).unwrap();
			}
			document.getElementById("my_modal_1").close();
			setIsEditMode(false);
			setEditTicketId(null);
			setSelectedPurpose("withdrawal");
			setDescription("");
		} catch (error) {
			console.error(
				isEditMode
					? "Failed to update ticket:"
					: "Failed to create ticket:",
				error
			);
			alert(
				isEditMode
					? "Failed to update ticket. Please try again."
					: "Failed to create ticket. Please try again."
			);
		}
	};

	const handleCloseModal = () => {
		document.getElementById("my_modal_1").close();
		setIsEditMode(false);
		setEditTicketId(null);
		setSelectedPurpose("withdrawal");
		setDescription("");
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpenDropdown(false);
			}
			if (
				openActionDropdownId &&
				actionDropdownRefs.current[openActionDropdownId] &&
				!actionDropdownRefs.current[openActionDropdownId].contains(
					event.target
				)
			) {
				setOpenActionDropdownId(null);
			}
			Object.keys(modalRefs.current).forEach((modalId) => {
				if (
					modalRefs.current[modalId] &&
					!modalRefs.current[modalId].contains(event.target) &&
					document.getElementById(modalId)?.open
				) {
					document.getElementById(modalId).close();
				}
			});
			if (
				deleteTicketId &&
				modalRefs.current[`delete_modal_${deleteTicketId}`] &&
				!modalRefs.current[`delete_modal_${deleteTicketId}`].contains(
					event.target
				) &&
				document.getElementById(`delete_modal_${deleteTicketId}`)?.open
			) {
				document
					.getElementById(`delete_modal_${deleteTicketId}`)
					.close();
				setDeleteTicketId(null);
				setOpenActionDropdownId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openActionDropdownId, deleteTicketId]);

	const handleDelete = async (ticketId) => {
		try {
			await deleteTicket(ticketId).unwrap();
			setDeleteTicketId(null);
			setOpenActionDropdownId(null);
			document.getElementById(`delete_modal_${ticketId}`).close();
		} catch (error) {
			console.error("Failed to delete ticket:", error);
		}
	};

	const handleCancelDelete = (ticketId) => {
		document.getElementById(`delete_modal_${ticketId}`).close();
		setDeleteTicketId(null);
		setOpenActionDropdownId(null);
	};

	return (
		<div className="p-6 mt-14">
			<h1 className="text-[#154153] text-[24px] font-bold text-center nunito">
				Support tickets
			</h1>
			<div className="flex justify-between">
				<div className="relative inline-block" ref={dropdownRef}>
					<div
						className="flex items-center gap-1 justify-center bg-[#F6F8FA] rounded cursor-pointer text-[#012939] w-[170px] py-1"
						onClick={toggleDropdown}
					>
						<p>{selectedFilter}</p>
						<MdOutlineKeyboardArrowRight size={20} />
					</div>
					{isOpenDropdown && (
						<div className="absolute z-10 bg-[#F6F8FA] rounded mt-2 p-2 shadow-2xl w-full">
							<ul className="space-y-1 text-[16px] text-[#012939]">
								<li
									className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center"
									onClick={() => handleFilterSelect("All")}
								>
									All <MdOutlineKeyboardArrowRight />
								</li>
								<li
									className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center"
									onClick={() => handleFilterSelect("Others")}
								>
									Others <MdOutlineKeyboardArrowRight />
								</li>
								<li
									className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center"
									onClick={() =>
										handleFilterSelect("Withdrawal")
									}
								>
									Withdrawal <MdOutlineKeyboardArrowRight />
								</li>
								<li
									className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center"
									onClick={() =>
										handleFilterSelect("Blog related")
									}
								>
									Blog related <MdOutlineKeyboardArrowRight />
								</li>
								<li
									className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center"
									onClick={() =>
										handleFilterSelect("Order related")
									}
								>
									Order related{" "}
									<MdOutlineKeyboardArrowRight />
								</li>
							</ul>
						</div>
					)}
				</div>
				<div>
					<button
						className="btn"
						onClick={() => {
							setIsEditMode(false);
							setEditTicketId(null);
							setSelectedPurpose("withdrawal");
							setDescription("");
							document.getElementById("my_modal_1").showModal();
						}}
					>
						<p className="text-[#848239] border border-[#848239] p-1 rounded cursor-pointer">
							Create Ticket +
						</p>
					</button>
					<dialog
						id="my_modal_1"
						className="modal rounded-[6px] lg:ml-[40%] lg:mt-[250px]"
					>
						<div className="modal-box">
							<div className="modal-box relative bg-[#EFF2F6] w-[470px] p-6 text-[#154153]">
								<div className="modal-action">
									<form method="dialog">
										<button
											className="btn btn-sm btn-circle hover:cursor-pointer"
											onClick={handleCloseModal}
										>
											<div className="flex items-center gap-2">
												<GoArrowLeft />{" "}
												<span>Back</span>
											</div>
										</button>
									</form>
								</div>
								<h1 className="text-center text-[20px] font-medium">
									{isEditMode
										? "Edit Ticket"
										: "Support Ticket"}
								</h1>
								<div className="py-10 space-y-3">
									<div className="relative">
										<span>Purpose</span>
										<div
											className="flex items-center justify-between border border-[#5C91B1] p-2 w-full rounded h-[54px] mt-3 cursor-pointer"
											onClick={togglePurposeDropdown}
										>
											<p>{selectedPurpose}</p>
											<MdOutlineKeyboardArrowRight
												size={20}
											/>
										</div>
										{isPurposeDropdownOpen && (
											<div className="absolute z-10 bg-[#F6F8FA] rounded mt-1 p-2 shadow-2xl w-full">
												<ul className="space-y-1 text-[16px] text-[#012939]">
													<li
														className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center justify-between"
														onClick={() =>
															handlePurposeSelect(
																"withdrawal"
															)
														}
													>
														Withdrawal{" "}
														<MdOutlineKeyboardArrowRight />
													</li>
													<li
														className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center justify-between"
														onClick={() =>
															handlePurposeSelect(
																"blog"
															)
														}
													>
														Blog related{" "}
														<MdOutlineKeyboardArrowRight />
													</li>
													<li
														className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center justify-between"
														onClick={() =>
															handlePurposeSelect(
																"order"
															)
														}
													>
														Order related{" "}
														<MdOutlineKeyboardArrowRight />
													</li>
												</ul>
											</div>
										)}
									</div>
									<div>
										<span>Describe</span>
										<textarea
											className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-3"
											placeholder="Enter here"
											value={description}
											onChange={(e) =>
												setDescription(e.target.value)
											}
										></textarea>
									</div>
								</div>
								<div className="text-center">
									<button
										className="btn btn-active bg-[#848239] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-pointer"
										onClick={handleCreateOrUpdateTicket}
									>
										{isEditMode ? "Update" : "Submit"}
									</button>
								</div>
							</div>
						</div>
					</dialog>
				</div>
			</div>
			<div className="w-full">
				<div className="my-4">
					<table className="w-full border-collapse">
						<thead>
							<tr className="rounded bg-[#d1e2ec] text-[#012939]">
								<th className="py-3 px-4 text-left font-medium">
									Reason
								</th>
								<th className="py-3 px-4 text-left font-medium">
									Details
								</th>
								<th className="py-3 px-4 text-left font-medium">
									Date of creation
								</th>
								<th className="py-3 px-4 text-left font-medium">
									Ticket ID
								</th>
								<th className="py-3 px-4 text-left font-medium">
									Status
								</th>
								<th className="py-3 px-4 text-left font-medium">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<tr>
									<td
										colSpan="6"
										className="py-3 px-4 text-center text-[#012939]"
									>
										Loading...
									</td>
								</tr>
							) : isError ? (
								<tr>
									<td
										colSpan="6"
										className="py-3 px-4 text-center text-[#012939]"
									>
										Error loading tickets
									</td>
								</tr>
							) : filteredTickets &&
							  filteredTickets.length > 0 ? (
								filteredTickets.map((ticket) => (
									<tr
										key={ticket.id}
										className="text-[#012939]"
									>
										<td className="py-3 px-4 capitalize">
											{ticket.purpose}
										</td>
										<td className="py-3 px-4 text-[#848239] underline cursor-pointer">
											<button
												className="btn"
												onClick={() =>
													document
														.getElementById(
															`my_modal_${ticket.id}`
														)
														.showModal()
												}
											>
												View
											</button>
											<dialog
												id={`my_modal_${ticket.id}`}
												className="modal mx-auto my-auto bg-[#EFF2F6] p-4 rounded w-[470px]"
												ref={(el) =>
													(modalRefs.current[
														`my_modal_${ticket.id}`
													] = el)
												}
											>
												<div className="modal-box">
													<div className="modal-action">
														<form method="dialog">
															<button className="flex items-center gap-2">
																<GoArrowLeft />{" "}
																<span>
																	Back
																</span>
															</button>
														</form>
													</div>
													<div className="space-y-3">
														<h3 className="text-lg text-[#848239] text-[20px] text-center font-medium">
															<span>Ticket</span>{" "}
															({ticket.id})
														</h3>
														<h4 className="font-medium text-[#154153]">
															Details
														</h4>
														<p className="py-4 text-[#154153]">
															{ticket.details}
														</p>
													</div>
												</div>
											</dialog>
										</td>
										<td className="py-3 px-4">
											{ticket.created_at}
										</td>
										<td className="py-3 px-4">
											{ticket.id}
										</td>
										<td className="py-3 px-4">
											{ticket.status}
										</td>
										<td className="py-3 px-4 relative cursor-pointer">
											<div
												className="flex items-center justify-center w-8 h-8 rounded-full"
												onClick={() =>
													toggleActionDropdown(
														ticket.id
													)
												}
											>
												<span className="text-[#012939] font-bold text-[18px]">
													...
												</span>
											</div>
											{openActionDropdownId ===
												ticket.id && (
												<ul
													className="absolute z-50 bg-[#FAFDFF] rounded shadow-lg py-2 pl-4 pr-10 text-[#012939] text-[16px] space-y-1"
													onClick={(e) =>
														e.stopPropagation()
													}
												>
													<li
														className="flex gap-2 items-center hover:bg-gray-100 rounded cursor-pointer w-full"
														onClick={(e) => {
															e.stopPropagation();
															handleEditTicket(
																ticket
															);
														}}
													>
														<FiEdit />
														<a>Edit</a>
													</li>
													<li
														className="flex gap-2 items-center rounded cursor-pointer w-full"
														onClick={(e) => {
															e.stopPropagation();
															setDeleteTicketId(
																ticket.id
															);
															document
																.getElementById(
																	`delete_modal_${ticket.id}`
																)
																.showModal();
														}}
													>
														<RiDeleteBin5Line />
														<a>Delete</a>
													</li>
												</ul>
											)}
											<dialog
												id={`delete_modal_${ticket.id}`}
												className="modal mx-auto my-auto bg-white p-6 rounded-lg shadow-lg w-[400px] border border-gray-200"
												style={{ maxWidth: "400px" }}
												ref={(el) =>
													(modalRefs.current[
														`delete_modal_${ticket.id}`
													] = el)
												}
											>
												<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
													<div className="bg-white rounded-lg p-6 max-w-md w-full">
														<div className="flex items-center justify-between mb-4">
															<div className="flex items-center gap-2">
																<div className="p-2 rounded-full bg-red-100">
																	<AlertCircle className="h-6 w-6 text-red-600" />
																</div>
																<h3 className="text-lg font-medium text-gray-900">
																	Confirm
																	Deletion
																</h3>
															</div>
															<button
																onClick={() => {
																	document
																		.getElementById(
																			`delete_modal_${ticket.id}`
																		)
																		.close();
																	setDeleteTicketId(
																		null
																	);
																}}
																className="text-gray-400 hover:text-gray-600"
															>
																<X className="h-5 w-5 cursor-pointer" />
															</button>
														</div>
														<p className="text-gray-600 mb-4">
															Are you sure you
															want to delete this
															action cannot be
															undone.
														</p>
														<div className="flex justify-end gap-2">
															<button
																onClick={() =>
																	handleCancelDelete(
																		ticket.id
																	)
																}
																className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
															>
																Cancel
															</button>
															<button
																onClick={() =>
																	handleDelete(
																		ticket.id
																	)
																}
																className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
															>
																Delete
															</button>
														</div>
													</div>
												</div>
											</dialog>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="6"
										className="py-3 px-4 text-center text-[#012939]"
									>
										You don’t have any support ticket.
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<hr className="text-[#C1DDEF]" />
				</div>
			</div>
		</div>
	);
}

export default UserSupport;
