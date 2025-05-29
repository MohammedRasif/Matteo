import { useState } from "react";
import { useAskQnaMutation } from "../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";

const Question = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		companyName: "",
		companyLocation: "",
		message: "",
	});

	const [askQna] = useAskQnaMutation();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const payload = {
				full_name: formData.firstName + " " + formData.lastName,
				email: formData.email,
				phone_number: formData.phoneNumber,
				company_name: formData.companyName,
				company_location: formData.companyLocation,
				question: formData.message,
			};

			const response = await askQna(payload).unwrap();

			toast.success(
				response?.message || "Question submitted successfully!",
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
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				phoneNumber: "",
				companyName: "",
				companyLocation: "",
				message: "",
			});
		} catch (err) {
			const errorMessage = err?.message || "Failed to submit question";
			console.log("Error:", errorMessage);
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
				},
			});
		}

		console.log("Form submitted:", formData);
		// Here you would typically send the data to your backend
	};

	return (
		<div id="contact" className="max-w-7xl mx-auto px-4 py-20 mb-10">
			<ToastContainer />
			<div className="text-center mb-12">
				<h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5  tracking-wider">
					Have a question?
				</h1>
				<p className="text-center text-[18px] text-gray-500 mb-20">
					reach out to us!
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
			>
				<div>
					<label
						htmlFor="firstName"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						First name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						placeholder="Enter here"
						value={formData.firstName}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="lastName"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						Last name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						placeholder="Enter here"
						value={formData.lastName}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter here"
						value={formData.email}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="phoneNumber"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						Phone number
					</label>
					<input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						placeholder="Enter here"
						value={formData.phoneNumber}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="companyName"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						Company name
					</label>
					<input
						type="text"
						id="companyName"
						name="companyName"
						placeholder="Enter here"
						value={formData.companyName}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label
						htmlFor="companyLocation"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						Company location
					</label>
					<input
						type="text"
						id="companyLocation"
						name="companyLocation"
						placeholder="Enter here"
						value={formData.companyLocation}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div className="md:col-span-2">
					<label
						htmlFor="message"
						className="block text-[17px]   text-slate-700 mb-1"
					>
						How can we help you?
					</label>
					<textarea
						id="message"
						name="message"
						placeholder="Enter here"
						value={formData.message}
						onChange={handleChange}
						rows={5}
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</div>

				<div className="md:col-span-2 flex justify-center mt-2">
					<button
						type="submit"
						className="px-16 py-2 bg-[#848239] text-white rounded hover:bg-[#848239] transition-colors cursor-pointer"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Question;
