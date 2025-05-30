import { useState } from "react";
import registrationImage from "../image/Maskgroup.png";
import { LuLockKeyhole } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/feature/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For password visibility toggle

function Register() {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("student");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [register, { isLoading }] = useRegisterMutation();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Confirm password doesn't match!", {
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
					fontWeight: "bold",
					borderRadius: "8px",
				},
			});
			return;
		}

		const userData = {
			email,
			role,
			password,
		};

		try {
			const res = await register(userData).unwrap();
			const successMessage = res.message || "Registration successful!";
			toast.success(successMessage, {
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
			localStorage.setItem("userEmail", email); // Store email in localStorage
			navigate("/verification");
		} catch (error) {
			const errorMessage = error.data?.message || "Registration failed!";
			const isEmailExists = /email.*exists/i.test(errorMessage);
			toast.error(isEmailExists ? "User already exists" : errorMessage, {
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
		<div className="flex items-center justify-between lg:flex-row flex-col w-full md:min-h-screen gap-10 nunito">
			<ToastContainer autoClose={3000} />
			<div className="lg:w-1/2 w-full lg:h-screen">
				<img
					src={registrationImage}
					alt="Registration illustration"
					className="w-full lg:h-screen md:py-10 p-6 pl- "
				/>
			</div>
			<div className="lg:w-1/2 w-full lg:px-40 p-6">
				<div className="text-center mb-6">
					<h1 className="text-3xl text-[#000000]">ChaskiX</h1>
				</div>

				<h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
					Welcome to ChaskiX
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative">
						<label
							htmlFor="email"
							className="block text-gray-700 mt-2"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="user@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border bg-[#848239] border-[#5C91B1] rounded pl-10"
							required
						/>
						<MdEmail className="text-[#959AA6] bottom-[12px] left-3 absolute" />
					</div>

					<div className="flex gap-2 justify-between items-center">
						<label className="block text-gray-700 mb-2">
							What describes you best?
						</label>
						<select
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="w-1/2 px-8 py-2 border bg-[#848239] border-[#5C91B1] rounded"
						>
							<option value="student">Student</option>
							<option value="hostler">Hostler</option>
							<option value="entrepreneur">Entrepreneur</option>
							<option value="educator">Educator</option>
							<option value="strategist">Strategist</option>
						</select>
					</div>

					<div className="relative">
						<label
							htmlFor="password"
							className="block text-gray-700 mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border bg-[#848239] border-[#5C91B1] rounded pl-10 pr-10"
							required
						/>
						<LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute bottom-[14px] right-3 text-[#959AA6]"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					<div className="relative">
						<label
							htmlFor="confirmPassword"
							className="block text-gray-700 mb-2"
						>
							Confirm Password
						</label>
						<input
							id="confirmPassword"
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full px-4 py-2 border bg-[#848239] border-[#5C91B1] rounded pl-10 pr-10"
							required
						/>
						<LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
						<button
							type="button"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							className="absolute bottom-[14px] right-3 text-[#959AA6]"
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>

					<div className="flex justify-center mt-16">
						<button
							type="submit"
							className="bg-[#848239] text-white rounded mx-auto px-6 py-2 cursor-pointer w-[123px] disabled:opacity-50"
							disabled={isLoading}
						>
							{isLoading ? "Registering..." : "Register"}
						</button>
					</div>

					<p className="text-center text-gray-600">
						Already have an account?{" "}
						<NavLink to="/login">
							<span className="text-[#848239]">Login</span>
						</NavLink>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Register;
