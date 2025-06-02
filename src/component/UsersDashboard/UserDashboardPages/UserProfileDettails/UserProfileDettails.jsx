import React, { useEffect, useState } from "react";
import { MdChevronRight, MdSecurityUpdateWarning } from "react-icons/md";
import {
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "../../../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";

function UserProfileDettails() {
	const [selectedFile, setSelectedFile] = useState(null);
	const {
		data: profileData,
		isLoading,
		isError,
		error,
	} = useGetProfileQuery();
	const [updateProfile] = useUpdateProfileMutation();

	const [formData, setFormData] = useState({
		name: null,
		username: null,
		email: null,
		image: null,
		about: null,
		country: null,
		is_subscribed: false,
		residence_area: null,
		date_of_birth: null,
		profession: null,
		average_rating: null,
		age: null,
		total_earnings: null,
		hourly_rate: null,
		gender: null,
		experience: null,
		skills: [],
		languages: [],
		education: null,
	});

	useEffect(() => {
		if (!isLoading) {
			setFormData({
				name: profileData?.name,
				username: profileData?.username,
				email: profileData?.email,
				image: profileData?.image,
				about: profileData?.about,
				country: profileData?.country,
				is_subscribed: profileData?.is_subscribed,
				residence_area: profileData?.residence_area,
				date_of_birth: profileData?.date_of_birth,
				profession: profileData?.profession,
				average_rating: profileData?.average_rating,
				age: profileData?.age,
				total_earnings: profileData?.total_earnings,
				hourly_rate: profileData?.hourly_rate,
				gender: profileData?.gender,
				experience: profileData?.experience,
				skills: profileData?.skills,
				languages: profileData?.languages,
				education: profileData?.education,
			});

			console.log("formdata, ", formData);
		}
	}, [isLoading, profileData]);

	const handleFileChange = (e) => {
		if (e.target.files.length > 0) {
			const file = e.target.files[0];
			setSelectedFile(file.name);
			setFormData({ ...formData, image: file });
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			// Create a new FormData object
			const formDataToSend = new FormData();

			// Append each field to FormData
			// Handle file input (image) separately
			if (formData.image instanceof File) {
				formDataToSend.append("image", formData.image);
			} else if (formData.image && typeof formData.image !== "string") {
				// If image is a URL or string (e.g., existing image), append as is or skip if not a file
				formDataToSend.append("image", formData.image);
			}

			// Append other fields
			formDataToSend.append("name", formData.name || "");
			formDataToSend.append("username", formData.username || "");
			formDataToSend.append("email", formData.email || "");
			formDataToSend.append("about", formData.about || "");
			formDataToSend.append("country", formData.country || "");
			formDataToSend.append(
				"is_subscribed",
				formData.is_subscribed ? "true" : "false"
			);
			formDataToSend.append(
				"residence_area",
				formData.residence_area || ""
			);
			formDataToSend.append(
				"date_of_birth",
				formData.date_of_birth || ""
			);
			formDataToSend.append("profession", formData.profession || "");
			formDataToSend.append(
				"average_rating",
				formData.average_rating || ""
			);
			formDataToSend.append("age", formData.age || "");
			formDataToSend.append(
				"total_earnings",
				formData.total_earnings || ""
			);
			formDataToSend.append("hourly_rate", formData.hourly_rate || "");
			formDataToSend.append("gender", formData.gender || "");
			formDataToSend.append(
				"years_of_experience",
				formData.experience || ""
			);
			formDataToSend.append("education", formData.education || "");
			formDataToSend.append(
				"skills",
				formData.skills.toString().split(",")
			);
			formDataToSend.append(
				"languages",
				formData.languages.toString().split(",")
			);

			console.log(
				"UPDATING FORM DATA, ",
				Object.fromEntries(formDataToSend)
			); // Log for debugging
			const response = await updateProfile(formDataToSend).unwrap();
			console.log(response);

			toast.success(response?.detail || "Profile updated successfully", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
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
			});
		} catch (err) {
			const errorMessage =
				err.data?.message || "Failed to update profile";
			console.log(err.message);
			toast.error(errorMessage, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-bp-4 nunito">
			<ToastContainer />
			<div className="w-full   rounded-lg  p-8">
				<h1 className="text-2xl font-bold text-center text-[#154153] mb-8 text-[24px] ">
					Profile Details
				</h1>

				<form onSubmit={handleUpdate} className="space-y-6">
					{/* Name and Profession */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Enter here"
								className="w-full px-3 py-2 border  border-[#848239] rounded-md bg-[#F8FCFF] "
								value={formData.name}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label
								htmlFor="profession"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Profession
							</label>
							<input
								type="text"
								id="profession"
								name="profession"
								placeholder="Enter here"
								className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF] "
								value={formData.profession}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Degree, Username, and about */}
					<div className="flex gap-6">
						<div className="flex gap-6 w-full ">
							<div className="w-full">
								<label
									htmlFor="education"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Highest degree you have achieved
								</label>
								<input
									type="text"
									id="education"
									name="education"
									placeholder="Enter here"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]  "
									value={formData.education}
									onChange={handleChange}
								/>
							</div>
							<div className="w-full">
								<label
									htmlFor="username"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Select username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Type here"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
									value={formData.username}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="md:col-span-1 w-full">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Describe about yourself (Max 100 words)
							</label>
							<textarea
								id="about"
								name="about"
								placeholder="Enter here"
								rows="1"
								className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
								value={formData.about}
								onChange={handleChange}
							></textarea>
						</div>
					</div>

					{/* Skills, DOB, and Experience */}
					<div className="flex gap-6">
						<div className="md:col-span-1 w-full">
							<label
								htmlFor="skills"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Skills (Max 5)
							</label>
							<input
								type="text"
								id="skills"
								name="skills"
								placeholder="Comma separated skills"
								className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
								value={formData.skills}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex gap-6 ">
							<div className="w-full">
								<label
									htmlFor="dob"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Date of birth
								</label>
								<input
									type="text"
									id="dob"
									name="date_of_birth"
									placeholder="Ex: YYYY-MM-DD"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
									value={formData.date_of_birth}
									onChange={handleChange}
								/>
							</div>
							<div className="w-full">
								<label
									htmlFor="experience"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Year of experience
								</label>
								<div className="relative">
									<select
										id="experience"
										name="experience"
										className="w-full px-3 py-2 border border-[#848239]  bg-[#F8FCFF] text-[#939597] rounded-md appearance-none "
										value={formData.experience}
										onChange={handleChange}
									>
										<option value="">Ex: 1, 2, 3</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5+</option>
									</select>
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<svg
											className="h-5 w-5 text-gray-400"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Gender, Hourly Rate, and Email */}
					<div className="flex gap-6">
						<div className="flex gap-6 w-full">
							<div className="w-full">
								<label
									htmlFor="gender"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Gender (optional)
								</label>
								<div className="relative  ">
									<select
										id="gender"
										name="gender"
										className="w-full  px-3 py-2 border border-[#848239] bg-[#F8FCFF]  rounded-md appearance-none absolute  "
										value={formData.gender}
										onChange={handleChange}
									>
										<option value="">Select</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
										<option value="other">Custom</option>
									</select>
									<div className="absolute top-[14px] left-20 flex items-center pr-3 pointer-events-none">
										<MdChevronRight />
									</div>
								</div>
							</div>
							<div className="w-full">
								<label
									htmlFor="hourlyRate"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Hourly rate
								</label>
								<input
									type="text"
									id="hourlyRate"
									name="hourly_rate"
									placeholder="Ex: 10 USD/hour"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
									value={formData.hourly_rate}
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="w-full">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="user@example.com"
								className="w-full px-3 py-2 border border-[#848239] bg-[#F8FCFF]  rounded-md "
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Upload Picture and Languages */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="relative">
							<label
								htmlFor="picture"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Upload picture
							</label>
							<div className="flex items-center">
								<label className=" p-1 rounded ml-2 bg-[#E4E8EE] text-gray-700 rounded-l-md cursor-pointer absolute">
									Choose file
									<input
										type="file"
										id="picture"
										className="hidden"
										onChange={handleFileChange}
									/>
								</label>
								<span className="px-3 py-2 border  border-[#848239]  rounded pl-30 bg-[#F8FCFF] text-[#939597] flex-grow truncate">
									{selectedFile ||
										formData.image ||
										"Upload a file"}
								</span>
							</div>
						</div>
						<div className="flex gap-6 w-full">
							<div className="w-full">
								<label
									htmlFor="languages"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Languages
								</label>
								<input
									type="text"
									id="languages"
									name="languages"
									placeholder="English, Bengali, Hindi"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
									value={formData.languages}
									onChange={handleChange}
								/>
							</div>
							<div className="w-full">
								<label
									htmlFor="age"
									className="block text-sm font-medium text-[#154153] mb-2"
								>
									Age
								</label>
								<input
									type="text"
									id="age"
									name="age"
									placeholder="Enter here"
									className="w-full px-3 py-2 border border-[#848239]  rounded-md bg-[#F8FCFF]"
									value={formData.age}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					{/* Country and Residence */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="country"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Country
							</label>
							<input
								type="text"
								id="country"
								name="country"
								placeholder="Enter here"
								className="w-full px-3 py-2 border border-[#848239] bg-[#F8FCFF]  rounded-md "
								value={formData.country}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label
								htmlFor="residence"
								className="block text-sm font-medium text-[#154153] mb-2"
							>
								Residence area
							</label>
							<input
								type="text"
								id="residence"
								name="residence_area"
								placeholder="Enter here"
								className="w-full px-3 py-2 border border-[#848239] bg-[#F8FCFF] rounded-md "
								value={formData.residence_area}
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-center mt-8">
						<button
							type="submit"
							className="px-6 py-3 bg-[#848239] text-white hover:bg-[#848239]/80 font-medium rounded-md w-[280px] cursor-pointer transition-all duration-300"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default UserProfileDettails;
