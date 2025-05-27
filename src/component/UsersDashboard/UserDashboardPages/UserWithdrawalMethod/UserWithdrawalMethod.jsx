import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import imgOne from "../../../image/319.png"; // Mastercard
import imgTwo from "../../../image/cardd.png"; // Amex
import imgThree from "../../../image/Frame.png"; // Visa
import imgFour from "../../../image/Discover.png"; // Discover
import { Link } from "react-router-dom";
import { useAddWithdrawalMethodMutation } from "../../../../Redux/feature/ApiSlice";

function UserWithdrawalMethod() {
	const [data] = useAddWithdrawalMethodMutation();

	const [formData, setFormData] = useState({
		cardholderName: "",
		email: "",
		cardNumber: "",
		cardType: [],
	});

	// Map card types to their respective imported images
	const cardImages = {
		MASTERCARD: imgOne,
		AMEX: imgTwo,
		VISA: imgThree,
		DISCOVER: imgFour,
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox") {
			setFormData((prev) => {
				if (checked) {
					return { ...prev, cardType: [...prev.cardType, name] };
				} else {
					return {
						...prev,
						cardType: prev.cardType.filter((type) => type !== name),
					};
				}
			});
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (
			!formData.cardholderName ||
			!formData.email ||
			!formData.cardNumber
		) {
			alert("Please fill in all required fields.");
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			alert("Please enter a valid email address.");
			return;
		}

		// Card number validation (basic, for demo purposes)
		const cardNumberRegex = /^\d{16}$/;
		if (!cardNumberRegex.test(formData.cardNumber)) {
			alert("Please enter a valid 16-digit card number.");
			return;
		}

		// Handle form submission logic here
		const addWithdrawalMethodPayload = {
			email: formData.email,
			card_number: formData.cardNumber,
			cardholder_name: formData.cardholderName,
			card_type: formData.cardType[0],
		};
		const response = await data({
			payload: addWithdrawalMethodPayload,
		}).unwrap();
		console.log(response);
	};

	return (
		<div className="p-6 pt-10 nunito">
			<div className="relative">
				<Link
					to="/dashboard/user_wallet"
					className="btn btn-sm flex items-center gap-2"
				>
					<GoArrowLeft /> <span>Back</span>
				</Link>
				<h1 className="text-[24px] text-[#154153] font-bold text-center">
					Withdrawal Method
				</h1>
			</div>
			{/* table for withdrawal method */}
			<div className="  bg-[#F6F8FA] rounded-[16px] p-8 py-8 mt-10">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="col-span-1">
							<label
								htmlFor="cardholderName"
								className="block text-sm font-medium  text-gray-700 mb-2"
							>
								Cardholder Name
							</label>
							<input
								type="text"
								id="cardholderName"
								name="cardholderName"
								placeholder="Enter here"
								value={formData.cardholderName}
								onChange={handleChange}
								className="w-full px-3 py-2  rounded-md bg-[#F8FCFF] border border-[#5C91B1]"
							/>
						</div>

						<div className="col-span-1">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Email for Contact
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Enter here"
								value={formData.email}
								onChange={handleChange}
								className="w-full px-3 py-2  rounded-md bg-[#F8FCFF] border border-[#5C91B1]"
							/>
						</div>
					</div>

					<div className="flex gap-6 items-center justify-center">
						<div className="mt-4 w-full">
							<label
								htmlFor="cardNumber"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Card Number
							</label>
							<input
								type="text"
								id="cardNumber"
								name="cardNumber"
								placeholder="Enter here"
								value={formData.cardNumber}
								onChange={handleChange}
								className="w-full px-3 py-2 rounded-md bg-[#F8FCFF] border border-[#5C91B1]"
							/>
						</div>

						<div className="mt-4 flex items-center w-full">
							<div className="flex items-center space-x-4">
								{["MASTERCARD", "AMEX", "VISA", "DISCOVER"].map(
									(card) => (
										<div
											key={card}
											className="flex items-center ml-10"
										>
											<input
												type="checkbox"
												id={card}
												name={card}
												checked={formData.cardType.includes(
													card
												)}
												onChange={handleChange}
												className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
											/>
											<label
												htmlFor={card}
												className="ml-4 "
											>
												<img
													src={cardImages[card]}
													alt={
														card
															.charAt(0)
															.toUpperCase() +
														card.slice(1)
													}
													width={40}
													height={25}
													className=" w-[60px] h-[40px]"
												/>
											</label>
										</div>
									)
								)}
							</div>
						</div>
					</div>

					<div className="mt-10 text-center">
						<button
							type="submit"
							className="px-10 w-[117px] py-2 bg-[#2E9DE0] text-[#FFFFFF] font-medium rounded-md "
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UserWithdrawalMethod;
