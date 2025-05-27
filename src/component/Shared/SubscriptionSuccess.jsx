import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SubscriptionSuccess() {
	return (
		<section className="pt-10 roboto my-20 mb-52">
			<div className="container relative mx-auto px-6 bg-[#F6F8FA] rounded-lg flex flex-col items-center py-8">
				<div className="absolute -top-6 p-4 flex items-center bg-[#2A9B20] text-white rounded-full drop-shadow-[0_7.37px_16.95px_rgba(0,0,0,0.25)]">
					<FaCheck size={35} />
				</div>

				<div className="w-full flex flex-col items-center gap-3 mt-12">
					<h3 className="font-bold text-4xl text-[#2A9B20]">
						Congratulations!!
					</h3>

					<p className="font-medium text-3xl">
						"You've successfully subscribed to the Community Builder
						package!"
					</p>

					<Link
						to="/dashboard"
						className="bg-[#0D95DD] text-white font-bold cursor-pointer py-3 px-10 rounded-lg mt-5"
					>
						<button className="pointer-events-none">
							Dashboard
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
