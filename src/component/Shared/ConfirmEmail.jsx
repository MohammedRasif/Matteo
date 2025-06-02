// impor

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registration_img from "../image/Maskgroup.png";
import { MdEmail } from "react-icons/md";
import { useForgetPasswordMutation } from "../../Redux/feature/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmEmail() {
	const [email, setEmail] = useState("");
	const [userType, setUserType] = useState("Student");
	const [emailFocused, setEmailFocused] = useState(false);
	const navigate = useNavigate();
	const [ForgetPassword, { isLoading }] = useForgetPasswordMutation();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!emailRegex.test(email)) {
			toast.error("Please enter a valid email address");
			return;
		}
		const userData = { email };

		try {
			const response = await ForgetPassword(userData).unwrap();
			localStorage.setItem("email", email); //local storage save email
			toast.success("Email verification sent successfully!");
			setTimeout(() => {
				navigate("/confirm_password_verification");
			}, 2000);
		} catch (error) {
			toast.error(
				error?.data?.message ||
					"Failed to send verification email. Please try again."
			);
			console.error("Error:", error);
		}
	};

	return (
		<div className="flex items-center lg:flex-row flex-col justify-between w-full min-h-screen gap-10 nunito">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="lg:w-1/2 w-full lg:h-screen">
				<img
					src={registration_img}
					alt="Registration illustration"
					className="w-full lg:h-screen lg:py-10 p-6 "
				/>
			</div>
			<div className="lg:w-1/2 w-full lg:px-40 p-6">
				<div className="text-center lg:mb-20 mb-5">
					<h1 className="text-3xl text-[#000000]">ChaskiX</h1>
					<p className="text-3xl text-[#000000]">Logo here</p>
				</div>

				<div className="rounded lg:px-10 lg:py-20">
					<h2 className="text-[28px] font-medium text-center text-[#012939] lg:mb-6">
						Confirm email
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="relative lg:py-10">
							<label className="block text-gray-700 mb-2">
								Email
							</label>
							<input
								type="email"
								placeholder="user@gmail.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => setEmailFocused(true)}
								onBlur={() => setEmailFocused(email !== "")}
								className="w-full px-4 py-3 border bg-[#F8FCFF] border-[#848239] rounded pl-10"
							/>
							<MdEmail className="text-[#959AA6] lg:bottom-[58px] bottom-4 left-3 absolute" />
						</div>

						<div className="flex justify-center mt-16">
							<button
								type="submit"
								className="bg-[#848239] text-white rounded-[8px] mx-auto px-6 py-2 cursor-pointer w-[123px] disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isLoading}
							>
								{isLoading ? "Processing..." : "Confirm"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ConfirmEmail;
