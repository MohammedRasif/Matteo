import React, { useEffect, useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useGetCandidatesQuery } from "../../../../Redux/feature/ChatSlice";

function BuyerCandidateList() {
	const [freelancers, setFreelancers] = useState([]);
	const location = useLocation();
	const { id } = location.state || {}; // Get the id from state

	const { data, isLoading } = useGetCandidatesQuery(id); // Pass the id to the query

	useEffect(() => {
		if (data) {
			setFreelancers(data); // Set freelancers state when data is ready
		}
	}, [data]);

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
						<p className="text-center text-gray-500 text-5xl">
							No bids yet
						</p>
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
											<p className="text-sm text-gray-500">
												{freelancer.role}
											</p>
										</div>
									</div>
									<div className="pl-4 pr-6">
										<p className="text-sm text-gray-500">
											Bid amount
										</p>
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
												document
													.getElementById(
														`my_modal_1_${index}`
													)
													.showModal()
											}
										>
											View profile
										</button>

										{/* First Modal */}
										<dialog
											id={`my_modal_1_${index}`}
											className="modal mx-auto my-auto w-[590px] space-y-6 p-6 pb-10 rounded-[16px] bg-[#F6F8FA]"
										>
											<form method="dialog">
												<button className="btn btn-sm flex items-center gap-2 mb-8">
													<GoArrowLeft />{" "}
													<span>Back</span>
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
																document
																	.getElementById(
																		`my_modal_1_${index}`
																	)
																	.close();
																document
																	.getElementById(
																		`my_modal_2_${index}`
																	)
																	.showModal();
															}}
														>
															(8 Reviews)
														</button>
													</p>
												</div>
											</div>

											{/* Content */}
											<div className="w-full space-y-6 mt-5">
												<div>
													<h2 className="text-lg font-medium">
														Description
													</h2>
													<p className="text-sm text-gray-600">
														Lorem ipsum is simply
														dummy text of the
														printing and typesetting
														industry...
													</p>
												</div>

												<div className="grid grid-cols-2 space-x-10 border-blue-200">
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Task completed:
														</span>
														<span className="font-medium text-gray-800">
															138
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Age:
														</span>
														<span className="font-medium text-gray-800">
															27
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Total earning:
														</span>
														<span className="font-medium text-gray-800">
															$750
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Hourly rate:
														</span>
														<span className="font-medium text-gray-800">
															$20
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Gender:
														</span>
														<span className="font-medium text-gray-800">
															Male
														</span>
													</div>
													<div className="flex justify-between">
														<span className="text-sm text-gray-500">
															Experience:
														</span>
														<span className="font-medium text-gray-800 mr-10">
															1 year
														</span>
													</div>
												</div>

												<div className="mb-2">
													<p className="text-sm text-gray-500">
														Skills
													</p>
													<span className="font-medium text-gray-800">
														Typing, Web Design,
														Graphics Design, SEO,
														UI/UX Design
													</span>
												</div>

												<div className="grid grid-cols-2 gap-4">
													<div className="flex">
														<span className="text-sm text-gray-500">
															Language:
														</span>
														<span className="font-medium text-gray-800 ml-10">
															English, Bangla
														</span>
													</div>
													<div className="flex">
														<span className="text-sm text-gray-500">
															Education:
														</span>
														<span className="font-medium text-gray-800 ml-10">
															B.Sc in CSE
														</span>
													</div>
												</div>
											</div>
										</dialog>

										{/* Second Modal */}
										<dialog
											id={`my_modal_2_${index}`}
											className="modal mx-auto my-auto w-[590px] max-h-[700px] space-y-6 p-6 pb-10 rounded-[16px] bg-[#F6F8FA]"
										>
											<div className="modal-box">
												<div>
													<form method="dialog">
														<button className="btn btn-sm flex items-center gap-2">
															<GoArrowLeft />{" "}
															<span>Back</span>
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
																<p className="text-[#012939]">
																	MovieBuff45
																</p>
																<p className="text-[#939597]">
																	Ui/Ux
																	Designer
																</p>
															</div>
														</div>
														<div className="text-sm">
															⭐️⭐️⭐️⭐️⭐️
														</div>
													</div>
													<p className="text-[#939597]">
														Lorem Ipsum is simply
														dummy text of the
														printing and typesetting
														industry. Lorem Ipsum
														has been the industry's
														standard dummy text ever
														since the 1500s, when an
														unknown printer took a
														galley of type and
														scrambled it to make a
														type specimen book. It
														has survived not only
														five centuries,
													</p>
													<hr className="text-[#C1DDEF] mt-2" />
												</div>
												{/* Repeat similar review blocks as needed */}
											</div>
										</dialog>

										<button className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded cursor-pointer">
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
