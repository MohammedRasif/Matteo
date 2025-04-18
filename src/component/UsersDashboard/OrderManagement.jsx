


import { useState } from "react";
import SellerDashboardPages from "./UserDashboardPages/SellerDashboardPages/SellerDashboardPages";
import BuyerDashboardPages from "./UserDashboardPages/BuyerDashboardPages/BuyerDashboardPages";


const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState("seller"); // Changed default to "seller" for clarity

    // Tab change handler
    const handleTabChange = (tab) => {
        setActiveTab(tab);
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
                        className={`px-6 py-2 rounded-full ${activeTab === "seller" ? "bg-[#1B97D8] text-white" : "text-[#012939]"}`}
                        onClick={() => handleTabChange("seller")}
                    >
                        Seller
                    </button>

                    {/* Buyer Tab */}
                    <button
                        className={`px-6 py-2 rounded-full ${activeTab === "buyer" ? "bg-[#1B97D8] text-white" : "text-[#012939]"}`}
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