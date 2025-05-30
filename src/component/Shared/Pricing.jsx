import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Faq from "./Faq";
import {
	useGetProfileQuery,
	useSubscribeMutation,
} from "../../Redux/feature/ApiSlice";
import { toast, ToastContainer } from "react-toastify";

const Pricing = () => {
	const accessToken = localStorage.getItem("access_token");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(
		accessToken ? true : false
	);
	const {
		data: profile,
		isLoading,
		isError,
	} = useGetProfileQuery(undefined, {
		skip: !accessToken,
	});
	const [subscribeMutation] = useSubscribeMutation();

	const plans = [
		{
			type: "free",
			limit: "FREE",
			community: "Community Member",
			features: [
				"Read-only access to Forum",
				"Read-only access to Service Community",
			],
		},
		{
			type: "standard",
			limit: "$3 / MONTH",
			community: "Community Builder",
			features: [
				"Full access to Forum",
				"Full access to Service Community",
				"Access to premium ChasiX partner benefits",
			],
			action: {
				type: "link",
				href: isUserLoggedIn ? "#" : "/login",
				title: "Select",
			},
		},
		{
			type: "premium",
			limit: "$7 / MONTH",
			community: "Community Pro",
			features: [
				"Full access to Forum",
				"Full access to Service Community",
				"Unlimited access to built-in AI Consultant and analytics",
				"Access to premium ChasiX partner benefits",
			],
			action: {
				type: "link",
				href: isUserLoggedIn ? "#" : "/login",
				title: "Select",
			},
		},
	];

	const handleSubscribe = async (e) => {
		if (!isUserLoggedIn) return;
		try {
			const type = e.target.dataset.type;

			const payload = {
				subscription_type: type,
				success_url: "http://localhost:5173/subscription_success",
				cancel_url: "http://localhost:5173/subscription_cancel",
			};
			const response = await subscribeMutation(payload).unwrap();
			console.log(response);

			const subscription_link = response.subscription_link;

			// redirect to the subscription link
			window.location.href = subscription_link;
		} catch (error) {
			const errorMessage =
				error.data?.message || "Subscription add failed!";
			console.log("Subscription add failed. ", errorMessage);
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
	};

	return (
		<section className="pt-10 lora">
			<ToastContainer />
			<div className="container mx-auto px-4">
				<h1 className="uppercase text-center text-3xl sm:text-5xl font-medium text-gray-600 mb-3 sm:mb-5 tracking-wider">
					PRICING
				</h1>

				{/* Toggle */}
				{/* <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
					<div className="flex bg-white rounded-md shadow-sm">
						<button
							className={`px-6 py-2 rounded-l-md text-base font-medium transition-colors cursor-pointer ${
								billingCycle === "monthly"
									? "bg-[#848239] text-white"
									: "bg-white text-slate-700 hover:bg-slate-100"
							}`}
							onClick={() => setBillingCycle("monthly")}
						>
							Client
						</button>
						<button
							className={`px-6 py-2 rounded-r-md text-base font-medium transition-colors cursor-pointer ${
								billingCycle === "yearly"
									? "bg-[#848239] text-white"
									: "bg-white text-slate-700 hover:bg-slate-100"
							}`}
							onClick={() => setBillingCycle("yearly")}
						>
							Business
						</button>
					</div>
				</div> */}

				{/* Pricing cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 50 }} // Start below with opacity 0
							animate={{ opacity: 1, y: 0 }} // Move to final position with opacity 1
							transition={{
								duration: 0.5, // Animation duration
								delay: 0.3, // Uniform delay for all cards
								ease: "easeOut", // Smooth easing for upward motion
							}}
							className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full border border-gray-300 roboto"
							layout
						>
							<div className="relative">
								<div className="w-3/4 rounded-r-lg my-10 relative">
									{/* <img src={img} alt="Plan background" className="w-full h-auto" /> */}
								</div>
							</div>

							<div className="p-6 flex flex-col flex-grow">
								<div className="mb-6">
									<div className="flex flex-col-reverse items-start">
										<span className="text-4xl font-bold text-gray-600">
											{plan.limit}
										</span>
										<span className="text-base text-slate-500 ml-2 mb-1">
											{plan.community}
										</span>
									</div>
								</div>

								{/* <button className="w-full bg-[#309ED7] text-white py-3 rounded-md mb-4 hover:bg-[#00669e] transition-colors cursor-pointer text-lg font-semibold">
                  Select
                </button> */}

								<div className="mb-4 flex-grow">
									<div className="flex items-center mb-3"></div>

									<ul className="space-y-3 text-base text-gray-500">
										{plan.features.map((feature, i) => (
											<li
												key={i}
												className="flex items-start border-b border-gray-500 mb-4"
											>
												{/* <IoCheckmarkDoneSharp
                          className="text-[#848239] mt-1 mr-2 flex-shrink-0"
                          size={20}
                        /> */}
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>

								{plan?.action?.type === "link" && (
									<div className="">
										<Link
											onClick={handleSubscribe}
											data-type={plan.type}
											to={plan.action.href}
										>
											<button className="w-full bg-[#848239] text-white py-3 rounded-md mb-4 hover:bg-[#00669e] transition-colors cursor-pointer text-lg font-semibold pointer-events-none">
												{plan.action.title}
											</button>
										</Link>
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
			<Faq />
		</section>
	);
};

export default Pricing;
