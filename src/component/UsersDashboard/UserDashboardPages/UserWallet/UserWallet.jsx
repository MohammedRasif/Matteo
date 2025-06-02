import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import {
	useAddWithdrawRequestMutation,
	useGetUserTransactionHistoryQuery,
	useGetUserWalletQuery,
} from "../../../../Redux/feature/ApiSlice.js";
import { toast, ToastContainer } from "react-toastify";

function UserWallet() {
	const [isAddWithdrawRequestError, setIsAddWithdrawRequestError] =
		useState("");
	const [withdrawRequestAmount, setWithdrawRequestAmount] = useState(null);
	const { data: userWallet, refetch } = useGetUserWalletQuery();
	const {
		data: userTransactionHistoryList,
		isLoading: isUserTransactionHistoryLoading,
		isError: isUserTransactionHistoryError,
		error: userTransactionHistoryError,
	} = useGetUserTransactionHistoryQuery();
	const [addWithdrawRequest] = useAddWithdrawRequestMutation();
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredTransactions, setFilteredTransactions] = useState([]);

	useEffect(() => {
		if (
			!isUserTransactionHistoryLoading &&
			!isUserTransactionHistoryError
		) {
			const result = userTransactionHistoryList.filter((transaction) =>
				transaction?.direction
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
			setFilteredTransactions(result);
		}
	}, [isUserTransactionHistoryLoading]);

	const handleWithdrawRequestAmountChange = async (e) => {
		try {
			const value = e.target.value;

			if (value > userWallet?.available_balance) {
				setIsAddWithdrawRequestError(
					"Amount should be less than available balance"
				);
				return;
			} else if (value <= 0) {
				setIsAddWithdrawRequestError("Amount should be greater than 0");
				return;
			} else {
				setIsAddWithdrawRequestError("");
				setWithdrawRequestAmount(value);
			}
			return;
		} catch (err) {
			console.log(err.message);
			toast.error(err.message, {
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
				},
			});
		}
	};

	const handleWithdrawRequest = async () => {
		try {
			const payload = {
				amount: withdrawRequestAmount.toString(),
			};

			const response = await addWithdrawRequest(payload).unwrap();

			if (response.message) {
				refetch();
				document.getElementById("my_modal_1").close();
				toast.success(response.message, {
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
					},
				});
			}
		} catch (err) {
			console.log(err.message);
			toast.error(err.message, {
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
				},
			});
		}
	};

	return (
		<div className="py-10 nunito px-6">
			<ToastContainer />

			<h1 className=" text-[24px] text-[#154153] font-bold">Wallet</h1>

			<div className="flex justify-between gap-10 mt-6">
				<div className="border border-[#848239] rounded-[7px] p-2 w-full space-y-3 bg-[#F6F8FA] ">
					<h1 className="text-[#154153] text-[16px]">
						Available balance for use
					</h1>
					<p className="text-[30px] font-bold text-[#3C4545]">
						{" "}
						${userWallet?.available_balance}
					</p>
					<div className="flex gap-4">
						{/* Open the modal using document.getElementById('ID').showModal() method */}
						<button
							className={`text-[#F6F8FA] bg-[#848239] text-[12px] rounded p-2 w-full cursor-pointer ${
								userWallet?.available_balance <= 0
									? "opacity-50 cursor-not-allowed pointer-events-none"
									: ""
							}`}
							onClick={() =>
								document
									.getElementById("my_modal_1")
									.showModal()
							}
						>
							Withdraw
						</button>
						<dialog
							id="my_modal_1"
							className="modal mx-auto my-auto rounded"
							open={false}
						>
							<div className="modal-box">
								<div className="bg-[#FAFDFF] p-6 rounded-lg w-80 ">
									<h2 className="text-lg font-semibold text-[#154153] mb-4 nunito">
										Available Balance: $
										{userWallet?.available_balance}
									</h2>
									<div className="mb-4 space-y-2">
										<input
											type="text"
											placeholder="Enter amount"
											className={`w-full p-2 border border-[#848239] rounded-md outline-none ${
												isAddWithdrawRequestError
													? "border-red-500"
													: ""
											}`}
											onChange={
												handleWithdrawRequestAmountChange
											}
											value={withdrawRequestAmount}
										/>
										{isAddWithdrawRequestError && (
											<p className="text-red-500 text-xs">
												{isAddWithdrawRequestError}
											</p>
										)}
									</div>
									<div className="flex items-center mb-8">
										<input
											type="checkbox"
											id="use-available"
											className="mr-2 h-4 w-4 text-[#848239] focus:[#848239] border-[#848239] rounded"
										/>
										<label
											htmlFor="use-available"
											className="text-sm text-gray-600"
										>
											Use available method
										</label>
									</div>
									<div className="flex justify-between space-x-2 gap-4 w-full">
										<button
											onClick={() =>
												document
													.getElementById(
														"my_modal_1"
													)
													.close()
											}
											className="px-8 py-2 text-[#848239] border border-[#848239] rounded-md"
										>
											Cancel
										</button>
										<button
											onClick={handleWithdrawRequest}
											className={`px-8 py-2 bg-[#848239] text-[#FFFFFF] rounded-md ${
												isAddWithdrawRequestError
													? "pointer-events-none opacity-50"
													: ""
											}`}
										>
											Confirm
										</button>
									</div>
								</div>
							</div>
						</dialog>
						<Link
							to="/dashboard/user_withdrawal_method"
							className={`text-[#848239] border rounded border-[#848239] text-[12px] text-center p-2 w-full cursor-pointer ${
								userWallet?.available_balance <= 0
									? "opacity-50 cursor-not-allowed pointer-events-none"
									: ""
							}`}
						>
							Manage method
						</Link>
					</div>
				</div>
				<div className="border border-[#848239] rounded-[7px] p-2 w-full space-y-3 bg-[#F6F8FA]  ">
					<h1 className="text-[#154153] text-[16px]">
						Payment request being cleared
					</h1>
					<p className="text-[30px] font-bold text-[#3C4545]">
						{" "}
						${userWallet?.pending_balance}
					</p>
					<h1 className="text-[#154153] text-[16px]">
						Date of request: 28 jan 2025
					</h1>
				</div>
				<div className="border border-[#848239] rounded-[7px] p-2 w-full space-y-3 bg-[#F6F8FA]">
					<h1 className="text-[#154153] text-[16px]">
						Payments for active orders
					</h1>
					<p className="text-[30px] font-bold text-[#3C4545]">
						{" "}
						${userWallet?.payment_for_active_orders}
					</p>
					<h1 className="text-[#154153] text-[16px]">
						Total task: {userWallet?.total_task}(Under processing)
					</h1>
				</div>
				<div className="border border-[#848239] rounded-[7px] p-2 w-full space-y-3 bg-[#F6F8FA] ">
					<h1 className="text-[#154153] text-[16px]">
						Expenses to date
					</h1>
					<p className="text-[30px] font-bold text-[#3C4545]">
						{" "}
						${userWallet?.total_withdrawn}
					</p>
					<h1 className="text-[#154153] text-[16px]">
						Expenses since joining
					</h1>
				</div>
			</div>
			<p className="text-[#154153] text-[16px] mt-2 text-end">
				Note: ChaskiX will charge 5% in every withdrawal.
			</p>
			<div className="  rounded-lg mt-8">
				<div className="flex justify-between items-center mb-3">
					<div className="flex items-center text-gray-600 text-sm">
						<span>Date Range</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 ml-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</div>

					{/* <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by username"
                             className="bg-[#F6F8FA] rounded-l p-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                        <IoIosSearch className="bg-[#acaeaf23] p-3 size-10 text-[#B9C0C7]" />
                        </div>
                    </div> */}

					<div className="flex items-center">
						<input
							type="text"
							placeholder="Search by username"
							className="bg-[#F6F8FA] rounded-l p-2"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<IoIosSearch className="bg-[#acaeaf23] p-3 size-10 text-[#B9C0C7]" />
					</div>
				</div>

				<div className="">
					<table className="w-full border-x border-[#D5DCE5] ">
						<thead>
							<tr className="  bg-[#d7e3eb]  border-b border-[#D5DCE5] font-bold">
								<th className="py-3 px-4 text-left text-sm  text-gray-600">
									Date
								</th>
								<th className="py-3 px-4 text-left text-sm  text-gray-600">
									Activity
								</th>
								<th className="py-3 px-4 text-left text-sm  text-gray-600">
									From
								</th>
								<th className="py-3 px-4 text-left text-sm text-gray-600">
									Order ID
								</th>
								<th className="py-3 px-4 text-right text-sm  text-gray-600">
									Amount
								</th>
							</tr>
						</thead>
						<tbody>
							{!isUserTransactionHistoryLoading &&
								filteredTransactions.length > 0 &&
								filteredTransactions.map(
									(transaction, index) => (
										<tr
											key={index}
											className={`border-b border-[#D5DCE5] `}
										>
											<td className="py-4 px-4 text-sm text-gray-700">
												{new Date(
													transaction.date
												).toDateString()}
											</td>
											<td className="py-4 px-4 text-sm text-gray-700 ">
												{transaction.type}
											</td>
											<td className="py-4 px-4 text-sm text-gray-700">
												{transaction.counterparty}
											</td>
											<td className="py-4 px-4 text-sm text-gray-700">
												{transaction.order_id}
											</td>
											<td
												className={`py-4 px-4 text-sm font-bold text-right ${
													transaction.direction ===
													"outgoing"
														? "text-red-500"
														: "text-green-600"
												}`}
											>
												{transaction.direction ===
												"outgoing"
													? "-$"
													: "$"}
												{transaction.amount.toFixed(2)}
											</td>
										</tr>
									)
								)}
							{!isUserTransactionHistoryLoading &&
								filteredTransactions.length === 0 && (
									<tr className="border-b border-[#D5DCE5]">
										<td
											colSpan={5}
											className="py-4 px-4 text-sm text-center text-gray-700"
										>
											No transactions found
										</td>
									</tr>
								)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserWallet;
