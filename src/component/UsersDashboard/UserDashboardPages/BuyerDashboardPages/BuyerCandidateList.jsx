import { useEffect, useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useGetCandidatesQuery } from "../../../../Redux/feature/ChatSlice";

function BuyerCandidateList() {
	const [freelancers, setFreelancers] = useState([]);
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);
	const [formData, setFormData] = useState({
		username: "",
		amount: "",
		deadline: "",
	});
	const token = localStorage.getItem("access_token");
	const location = useLocation();
	const { id } = location.state || {};

	const { data, isLoading } = useGetCandidatesQuery(id);

	useEffect(() => {
		if (data) {
			setFreelancers(data);
		}
		console.log(freelancers);
	}, [data,freelancers]);

	const handleOpenAssignModal = (freelancer) => {
		console.log("Selected Freelancer ID:", freelancer.id); // Log the freelancer's ID
		setSelectedFreelancer(freelancer);
		setFormData({
			username: freelancer.username,
			amount: freelancer.bid_amount || "",
			deadline: "",
		});
		document.getElementById(`assign_modal_${freelancer.id}`).showModal();
	};

	const handleCloseModal = (freelancerId) => {
		if (freelancerId) {
			document.getElementById(`assign_modal_${freelancerId}`).close();
		}
		setSelectedFreelancer(null);
		setFormData({ username: "", amount: "", deadline: "" });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
const handleSubmit = () => {
  console.log("Form submitted:", formData);

  fetch(`http://172.252.13.96:7000/api/v1/orders/bid/assign/${selectedFreelancer?.id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);
      
      // Redirect to checkout link
      if (data.checkout_link) {
        window.location.href = data.checkout_link;
      } else {
        console.warn("No checkout_link found in response");
      }

      handleCloseModal(); // Only close modal after response
    })
    .catch(err => {
      console.error("Error:", err);
    });
};
const inviteToChat = (id)=>{
	fetch(`http://172.252.13.96:7000/api/v1/chat/create-chat/${id}/`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }}).then(res=>res.json()).then(data=>{
		console.log(data);
	}).catch(err=>{
		console.log(err);
	})
}
	return (
		<div className="nunito p-6">
			<div className="">
				<Link
					to="/dashboard/buyer_order_create"
					className="btn pl-5 btn-sm flex items-center text-[#012939]"
				>
					<GoArrowLeft /> <span>Back</span>
				</Link>
				<h1 className="text-center text-[#012939] text-[24px] font-bold">
					Candidate list
				</h1>
			</div>

			<div className="rounded-lg py-10">
				{isLoading ? (
					<p className="text-center text-gray-500">Loading...</p>
				) : freelancers.length === 0 ? (
					<div className="h-[50vh] w-full flex items-center justify-center">
						<p className="text-center text-gray-500 text-5xl">No bids yet</p>
					</div>
				) : (
					<div className="space-y-4">
						{freelancers.map((freelancer, index) => (
							<div
								key={index}
								className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm h-[81px]"
							>
								<div className="flex items-center space-x-4">
									<div className="flex gap-2 border-r w-[180px] border-gray-200">
										<img
											src={freelancer.image}
											className="w-[48px] h-[48px] rounded-full"
											alt=""
										/>
										<div>
											<p className="font-medium text-gray-800">
												{freelancer.username}
											</p>
											<p className="text-sm text-gray-500">{freelancer.role}</p>
										</div>
									</div>
									<div className="pl-4 pr-6">
										<p className="text-sm text-gray-500">Bid amount</p>
										<p className="text-sm text-gray-700">
											{freelancer.bid_amount}
										</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="flex space-x-4">
										<button
											className="text-sm underline cursor-pointer"
											onClick={() =>
												document.getElementById(`my_modal_1_${index}`).showModal()
											}
										>
											View profile
										</button>
										<button
											className="text-gray-600 bg-gray-100 px-4 py-2 rounded cursor-pointer"
											onClick={() => handleOpenAssignModal(freelancer)}
										>
											Assign
										</button>

										{/* Profile Modal */}
										<dialog
											id={`my_modal_1_${index}`}
											className="modal mx-auto my-auto w-[590px] space-y-6 p-6 pb-10 rounded-[16px] bg-[#F6F8FA]"
										>
											<form method="dialog">
												<button className="btn btn-sm flex items-center gap-2 mb-8">
													<GoArrowLeft /> <span>Back</span>
												</button>
											</form>
											<div className="modal-box flex items-center gap-10 space-y-3">
												<div>
													<img
														className="font-bold text-lg w-[126px] h-[126px]"
														src={freelancer.image}
														alt=""
													/>
												</div>
												<div>
													<h1 className="text-[24px] text-[#012939] font-semibold">
														{freelancer.username}
													</h1>
													<p className="text-[#595B5B] text-[21px]">
														{freelancer.role}
													</p>
													<p className="text-[#595B5B] text-[18px] mt-5">
														Rating: 4.7
														<button
															className="text-[#848239] underline cursor-pointer ml-2"
															onClick={() => {
																document.getElementById(`my_modal_1_${index}`).close();
																document.getElementById(`my_modal_2_${index}`).showModal();
															}}
														>
															(8 Reviews)
														</button>
													</p>
												</div>
											</div>
											<div className="w-full space-y-6 mt-5">
												<div>
													<h2 className="text-lg font-medium">Description</h2>
													<p className="text-sm text-gray-600">
														Lorem ipsum is simply dummy text of the printing and typesetting
														industry...
													</p>
												</div>
												<div className="grid grid-cols-2 space-x-10 border-blue-200">
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Task completed:</span>
														<span className="font-medium text-gray-800">138</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Age:</span>
														<span className="font-medium text-gray-800">27</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Total earning:</span>
														<span className="font-medium text-gray-800">$750</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Hourly rate:</span>
														<span className="font-medium text-gray-800">$20</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Gender:</span>
														<span className="font-medium text-gray-800">Male</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">Experience:</span>
														<span className="font-medium text-gray-800 mr-10">1 year</span>
													</div>
												</div>
												<div className="mb-2">
													<p className="text-sm text-gray-500">Skills</p>
													<span className="font-medium text-gray-800">
														Typing, Web Design, Graphics Design, SEO, UI/UX Design
													</span>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div className="flex">
														<span className="text-sm text-gray-500">Language:</span>
														<span className="font-medium text-gray-800 ml-10">
															English, Bangla
														</span>
													</div>
													<div className="flex">
														<span className="text-sm text-gray-500">Education:</span>
														<span className="font-medium text-gray-800 ml-10">
															B.Sc in CSE
														</span>
													</div>
												</div>
											</div>
										</dialog>

										{/* Reviews Modal */}
										<dialog
											id={`my_modal_2_${index}`}
											className="modal mx-auto my-auto w-[590px] max-h-[700px] space-y-6 p-6 pb-10 rounded-[16px] bg-[#F6F8FA]"
										>
											<div className="modal-box">
												<div>
													<form method="dialog">
														<button className="btn btn-sm flex items-center gap-2">
															<GoArrowLeft /> <span>Back</span>
														</button>
													</form>
													<p className="text-xl font-bold text-[#012939] mb-2 text-center text-[24px]">
														Reviews (8)
													</p>
												</div>
												<div>
													<div className="flex justify-between space-y-2 pt-4">
														<div className="flex gap-2">
															<img
																src=""
																alt=""
																className="w-10 h-10 bg-[#D9D9D9] rounded-full"
															/>
															<div>
																<p className="text-[#012939]">MovieBuff45</p>
																<p className="text-[#939597]">Ui/Ux Designer</p>
															</div>
														</div>
														<div className="text-sm">⭐️⭐️⭐️⭐️⭐️</div>
													</div>
													<p className="text-[#939597]">
														Lorem Ipsum is simply dummy text of the printing and typesetting
														industry. Lorem Ipsum has been the industry's standard dummy text
														ever since the 1500s, when an unknown printer took a galley of
														type and scrambled it to make a type specimen book. It has
														survived not only five centuries,
													</p>
													<hr className="text-[#C1DDEF] mt-2" />
												</div>
											</div>
										</dialog>

										{/* Assign Modal */}
										<dialog
											id={`assign_modal_${freelancer.id}`}
											className="modal mx-auto my-auto w-[530px] space-y-6 p-6 pb-10 rounded-[16px] bg-[#EFF2F6]"
										>
											<div className="modal-box relative bg-[#EFF2F6] w-[470px] rounded p-6 text-[#154153]">
												<button
													className="btn btn-sm btn-circle hover:cursor-pointer flex items-center gap-2 mb-4"
													onClick={() => handleCloseModal(freelancer.id)}
												>
													<GoArrowLeft /> <span>Back</span>
												</button>
												<h1 className="text-xl font-semibold mb-4">Assign Candidate</h1>
												<div className="flex flex-col gap-4">
													<div className="flex gap-4">
														<div className="flex-1">
															<label className="block text-sm mb-1">Candidate username</label>
															<div className="relative">
																<input
																	type="text"
																	name="username"
																	value={formData.username}
																	onChange={handleInputChange}
																	placeholder="Search by username"
																	className="w-full p-2 border border-[#D3D3D3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#154153]"
																/>
															</div>
														</div>
													</div>
													<div className="flex gap-4">
														<div className="flex-1">
															<label className="block text-sm mb-1">Amount</label>
															<input
																type="text"
																name="amount"
																value={formData.amount}
																onChange={handleInputChange}
																placeholder="Enter amount"
																className="w-full p-2 border border-[#D3D3D3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#154153]"
															/>
														</div>
														<div className="flex-1">
															<label className="block text-sm mb-1">Deadline</label>
															<input
																type="text"
																name="deadline"
																value={formData.deadline}
																onChange={handleInputChange}
																placeholder="yyyy/mm/dd"
																className="w-full p-2 border border-[#D3D3D3] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#154153]"
															/>
														</div>
													</div>
													<div className="flex justify-between items-center text-sm">
														<span>Total amount: 105</span>
														<span className="text-[#848239]">ChaskiX will charge 5%</span>
													</div>
													<div className="flex gap-4 mt-4">
														<button
															className="flex-1 p-2 border border-[#154153] rounded text-[#154153] hover:bg-gray-200 cursor-pointer"
															onClick={() => handleCloseModal(freelancer.id)}
														>
															Cancel
														</button>
														<button
															className="flex-1 p-2 rounded text-white cursor-pointer"
															style={{ backgroundColor: "rgba(132, 130, 57, 1)" }}
															onClick={handleSubmit}
														>
															Confirm
														</button>
													</div>
												</div>
											</div>
										</dialog>

										<button onClick={()=>inviteToChat(freelancer?.seller_id)} className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded cursor-pointer">
											Invite to chat
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default BuyerCandidateList;