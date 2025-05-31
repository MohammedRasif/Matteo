import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";
import { useManagementAssessOrderDetailsMutation } from "../../../Redux/feature/ApiSlice";

const AdminDashboardOrderAsses = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const { id } = useParams(); // Get the id from URL params

	// Use the mutation hook
	const [trigger, { data: managementAssessOrderDetails, isLoading, error }] =
		useManagementAssessOrderDetailsMutation();

	// Trigger the mutation when the component mounts or id changes
	useEffect(() => {
		if (id) {
			trigger(id); // Call the mutation with the id
		}
	}, [id, trigger]);

	// Log the fetched data to the console
	useEffect(() => {
		if (managementAssessOrderDetails) {
			console.log("Fetched Order Details:", managementAssessOrderDetails);
		}
	}, [managementAssessOrderDetails]);

	const openPopup = () => {
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	// If loading, show a loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// If there's an error, show an error message
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// If no data is available, show a fallback
	if (!managementAssessOrderDetails) {
		return <div>No data available</div>;
	}

	// Extract buyer and seller info from the first message
	const buyer = {
		username: managementAssessOrderDetails.messages[0].receiver_username,
		avatar: managementAssessOrderDetails.messages[0].receiver_image,
	};
	const seller = {
		username: managementAssessOrderDetails.service_details.user.username,
		avatar: managementAssessOrderDetails.service_details.user.image,
	};

	// Filter messages with attachments for deliveries and assign deliveryNo
	const deliveries = managementAssessOrderDetails.messages
		.filter((msg) => msg.attachment_name)
		.map((msg, index) => ({
			deliveryNo: index + 1,
			date: new Date(msg.timestamp).toLocaleDateString(),
			message: msg.message,
			files: msg.attachment_name,
		}));

	return (
		<div className="p-6 roboto">
			{/* Header */}
			<div className="flex justify-between gap-2 mb-4 py-3">
				<NavLink to="/Admin_Dashboard/order">
					<button className="flex items-center cursor-pointer">
						<IoIosArrowRoundBack className="h-6 w-6" />
						<h1>back</h1>
					</button>
				</NavLink>
				<h1 className="text-3xl text-center font-semibold text-gray-800">
					Order assessment
				</h1>
			</div>

			<div
				className="flex flex-col lg:flex-row gap-3 h-screen"
				style={{ height: "78vh" }}
			>
				{/* Left Side: Project Details */}
				<div className="lg:w-1/2 bg-white rounded-lg p-6">
					<div className="flex items-center gap-2 mb-4">
						<span className="text-md font-bold">
							Deliver files:
						</span>
						<span
							className="text-blue-500 underline text-sm cursor-pointer"
							onClick={openPopup}
						>
							View
						</span>
					</div>
					<h2 className="text-lg font-semibold text-gray-800 mb-2">
						{managementAssessOrderDetails.service_details.title}
					</h2>
					<p className="text-sm text-gray-600 mb-4">
						Budget: $
						{managementAssessOrderDetails.service_details.price}
					</p>
					<p className="text-sm text-gray-700 mb-4">
						{managementAssessOrderDetails.service_details.details}
					</p>
					<h3 className="text-sm font-semibold text-gray-800 mb-2">
						Skills Required:
					</h3>
					<p className="text-sm text-blue-600">
						{managementAssessOrderDetails.service_details.user
							.skills.length > 0
							? managementAssessOrderDetails.service_details.user.skills.map(
									(skill, index) => (
										<span key={index}>
											{skill}
											{index <
											managementAssessOrderDetails
												.service_details.user.skills
												.length -
												1
												? ", "
												: ""}
										</span>
									)
							  )
							: "No skills listed"}
					</p>
				</div>

				{/* Right Side: Chat and Buyer/Seller Info */}
				<div className="lg:w-1/2 bg-white rounded-lg shadow-md">
					{/* Buyer/Seller Info */}
					<div className="flex justify-between items-center mb-4 p-3 rounded-md bg-[#E2F2FC]">
						<div className="flex items-center gap-2">
							<img
								src={buyer.avatar}
								alt="Buyer"
								className="h-8 w-8 rounded-full object-cover"
							/>
							<div>
								<p className="text-xs text-white bg-[#848EA7] w-12 text-center py-[1px] rounded-full">
									Buyer
								</p>
								<p className="text-sm font-medium text-gray-800 pl-1">
									{buyer.username}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<img
								src={seller.avatar}
								alt="Seller"
								className="h-8 w-8 rounded-full object-cover"
							/>
							<div>
								<p className="text-xs text-white bg-[#848239] w-12 text-center py-[1px] rounded-full">
									Seller
								</p>
								<p className="text-sm font-medium text-gray-800 pl-[1px]">
									{seller.username}
								</p>
							</div>
						</div>
					</div>

					{/* Chat Messages */}
					<div className="p-6 flex flex-col-reverse space-y-4 space-y-reverse overflow-y-auto h-[calc(78vh-120px)]">
						{managementAssessOrderDetails.messages.map(
							(message, index) => (
								<div
									key={index}
									className={`flex ${
										message.sender_username ===
										buyer.username
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div
										className={`p-3 max-w-xs text-sm ${
											message.sender_username ===
											buyer.username
												? "bg-[#848239] text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
												: "bg-gray-200 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
										}`}
									>
										<p>{message.message}</p>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>

			{/* Popup */}
			{isPopupOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
					<div className="bg-gray-50 shadow-md rounded-lg w-11/12 md:w-3/4 lg:w-1/3 relative">
						{/* Header */}
						<div className="flex justify-between items-center p-5">
							<div className="flex items-center gap-2">
								<button
									onClick={closePopup}
									className="flex items-center cursor-pointer"
								>
									<IoIosArrowRoundBack className="h-6 w-6" />
									<h1>back</h1>
								</button>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full border-collapse">
								<thead>
									<tr className="bg-[#E2F2FC] w-full">
										<th className="text-left py-2 pl-5 text-gray-800 text-sm">
											Delivery No.
										</th>
										<th className="text-left py-2 text-gray-800 text-sm">
											Date
										</th>
										<th className="text-left py-2 text-gray-800 text-sm">
											Message
										</th>
										<th className="text-left py-2 text-gray-800 text-sm">
											Files
										</th>
									</tr>
								</thead>
								<tbody>
									{deliveries.map((delivery) => (
										<tr
											key={delivery.deliveryNo}
											className=""
										>
											<td className="py-2 text-sm pl-12">
												{delivery.deliveryNo}
											</td>
											<td className="py-2 text-sm">
												{delivery.date}
											</td>
											<td className="py-2">
												<span className="text-blue-500 underline text-sm cursor-pointer">
													View
												</span>
											</td>
											<td className="py-2">
												<span className="text-blue-500 underline text-sm cursor-pointer">
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
	);
};

export default AdminDashboardOrderAsses;
