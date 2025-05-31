import { useState } from "react";
import SellerDashboardPages from "./UserDashboardPages/SellerDashboardPages/SellerDashboardPages";
import BuyerDashboardPages from "./UserDashboardPages/BuyerDashboardPages/BuyerDashboardPages";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
	const [activeTab, setActiveTab] = useState("seller"); // Changed default to "seller" for clarity
	const navigate = useNavigate();

	// Tab change handler
	const handleTabChange = (tab) => {
		setActiveTab(tab);
		tab == "buyer"
			? navigate("/dashboard/buyer_order_create")
			: navigate("/dashboard");
	};

	return (
		<div className="my-10 nunito">
			{/* Page Title */}
			<h1 className="text-[24.8px] font-bold text-center mb-10 nunito">
				Order Management
			</h1>

			{/* Tabs for Seller / Buyer */}
			<div className="flex mb-4 justify-center">
				<div className="bg-[#acaeaf23] rounded-full">
					{/* Seller Tab */}
					<button
						className={`px-6 py-2 rounded-full cursor-pointer ${
							activeTab === "seller"
								? "bg-[#848239] text-white"
								: "text-[#012939]"
						}`}
						onClick={() => handleTabChange("seller")}
					>
						Seller
					</button>

					{/* Buyer Tab */}
					<button
						className={`px-6 py-2 rounded-full  cursor-pointer  ${
							activeTab === "buyer"
								? "bg-[#848239] text-white"
								: "text-[#012939]"
						}`}
						onClick={() => handleTabChange("buyer")}
					>
						Buyer
					</button>
				</div>
			</div>

			{/* Conditional rendering based on activeTab */}
			{activeTab === "seller" ? (
				<SellerDashboardPages />
			) : (
				<BuyerDashboardPages />
			)}
		</div>
	);
};

export default OrderManagement;
