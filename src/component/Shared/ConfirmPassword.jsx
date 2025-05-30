import { useState } from "react";
import login_img from "../image/Maskgroup.png";
import { LuLockKeyhole } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useConfirmPasswordMutation } from "../../Redux/feature/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const [confirmPasswordMutation, { isLoading: isConfirming }] =
		useConfirmPasswordMutation();

	const showToast = (message, type = "info") => {
		toast[type](message, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: "colored",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			showToast("Passwords do not match!", "error");
			return;
		}

		const email = localStorage.getItem("email");

		if (!email) {
			toast.error("Email not found. Please request a new reset link.", {
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
			return;
		}

		const passwordData = {
			new_password: password,
			email: email,
		};

		try {
			const response = await confirmPasswordMutation(
				passwordData
			).unwrap();

			showToast("Password updated successfully!", "success");

			setTimeout(() => navigate("/login"), 1500);
		} catch (error) {
			const errorMessage =
				error?.data?.message ||
				"Failed to update password. Please try again.";
			showToast(errorMessage, "error");
			console.error("Password update error:", error);
		}
	};

	// more update ...........................

	return (
		<div className="flex items-center lg:flex-row flex-col justify-between w-full min-h-screen gap-10 nunito bg-gray-50">
			<ToastContainer />
			<div className="lg:w-1/2 w-full h-screen">
				<img
					src={login_img}
					alt="Password reset illustration"
					className="w-full h-full  lg:py-10 p-6"
				/>
			</div>

			<div className="lg:w-1/2 w-full px-4 lg:px-40 py-10">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-black mb-2">
						ChaskiX
					</h1>
					<p className="text-xl text-gray-600">Reset Your Password</p>
				</div>

				<div className="bg-white shadow-lg rounded-lg px-8 py-12">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* New Password */}
						<div className="relative">
							<label
								htmlFor="password"
								className="block text-gray-700 font-medium mb-2"
							>
								New Password
							</label>
							<input
								id="password"
								type="password"
								placeholder="Enter new password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 border bg-[#848239] border-[#5C91B1] rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#848239] transition duration-200"
								disabled={isConfirming}
							/>
							<LuLockKeyhole className="absolute top-12 left-3 text-[#959AA6]" />
						</div>

						{/* Confirm Password */}
						<div className="relative">
							<label
								htmlFor="confirmPassword"
								className="block text-gray-700 font-medium mb-2"
							>
								Confirm Password
							</label>
							<input
								id="confirmPassword"
								type="password"
								placeholder="Confirm password"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								className="w-full px-4 py-3 border bg-[#848239] border-[#5C91B1] rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#848239] transition duration-200"
								disabled={isConfirming}
							/>
							<LuLockKeyhole className="absolute top-12 left-3 text-[#959AA6]" />
						</div>

						{/* Submit Button */}
						<div className="flex justify-center mt-8">
							<button
								type="submit"
								className={`bg-[#848239] text-white rounded-lg px-8 py-3 w-full max-w-[200px] font-medium ${
									isConfirming
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-[#1581b6] transition duration-200"
								}`}
								disabled={isConfirming}
							>
								{isConfirming ? "Updating..." : "Confirm"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ConfirmPassword;
