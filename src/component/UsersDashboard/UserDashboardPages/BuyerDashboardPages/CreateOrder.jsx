

import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

function CreateOrder() {
    // State for form fields
    const [hourlyRate, setHourlyRate] = useState(false);
    const [fixedPrice, setFixedPrice] = useState(false);
    const [category, setCategory] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [title, setTitle] = useState("");
    const [numPersons, setNumPersons] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [location, setLocation] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!title || !numPersons || !category) {
            alert("Please fill in all required fields.");
            return;
        }
        // Collect form data
        const formData = {
            title,
            category,
            numPersons,
            description,
            skills,
            location,
            duration,
            hourlyRate,
            fixedPrice,
            amount,
            currency,
        };
        console.log("Form Data:", formData);
        // TODO: Integrate with API or backend
        alert("Order submitted successfully!");
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <Link to="/dashboard">
                    <button className="flex items-center text-[#154153] cursor-pointer gap-1">
                        <GoArrowLeft />
                        <span>Back</span>
                    </button>
                </Link>
                <h1 className="text-2xl font-bold text-center text-[#154153] mb-8 text-[24px]">
                    Create Order
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#154153]">
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">
                            Give a title to your task *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">
                            Name the task category *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter here"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">
                            Number of person required *
                        </label>
                        <input
                            type="number"
                            placeholder="Enter number"
                            value={numPersons}
                            onChange={(e) => setNumPersons(e.target.value)}
                            required
                            min="1"
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2 text-[#154153]">
                        Describe the task
                    </label>
                    <textarea
                        placeholder="Enter text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-[96px] px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-2 text-[#154153]">
                            Skill Required (max 5)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2 text-[#154153]">
                            Task address/location (if required)
                        </label>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                </div>

                {/* Map */}
                <div className="rounded-[8px] mx-10 border my-8 border-[#5285A7] relative">
                    {/* Search Bar and Controls */}
                    <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between p-4">
                        <div className="text-xs text-[#154153] py-5 bg-[#EEF2F5] px-10 rounded-[8px]">
                            (Task location)
                        </div>
                        <div className="flex items-center rounded overflow-hidden flex-1 mx-4 relative">
                            {!isSearchFocused && <GrSearch className="absolute ml-3 z-50" />}
                            <input
                                type="text"
                                placeholder={isSearchFocused ? "" : "Search location"}
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className="text-sm pl-8 h-[55px] w-full mx-auto bg-[#F8FCFF] border border-[#5285A7] rounded-[8px] focus:outline-none"
                            />
                        </div>
                        <button className="text-xs text-[#154153] py-5 bg-[#BDDDF4] border border-[#1D7EC5] px-10 rounded-[8px]">
                            Auto locate
                        </button>
                    </div>

                    {/* Google Map */}
                    <div className="relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.35196272633!2d-73.97950600000001!3d40.697141499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1744969095274!5m2!1sen!2sbd"
                            width="100%"
                            height="450"
                            allowFullScreen
                            loading="lazy"
                            title="google map"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="relative"
                        ></iframe>
                    </div>
                </div>

                <div className="flex justify-between gap-10 items-center">
                    <div className="w-full">
                        <label className="block text-sm mb-2 text-[#154153]">
                            Task Duration
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. 2 days"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded"
                        />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm mb-2 text-[#154153]">Offering</label>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="hourly"
                                    checked={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.checked)}
                                    className="rounded border-[#5C91B1] bg-[#F8FCFF]"
                                />
                                <label htmlFor="hourly" className="text-sm">
                                    Hourly rate
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="fixed"
                                    checked={fixedPrice}
                                    onChange={(e) => setFixedPrice(e.target.checked)}
                                    className="rounded border-[#5C91B1] bg-[#F8FCFF]"
                                />
                                <label htmlFor="fixed" className="text-sm">
                                    Fixed price
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Type total amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="rounded-l border-l border-y border-[#5C91B1] bg-[#F8FCFF] p-2 placeholder-[#154153] w-full"
                        />
                        <div className="flex items-center rounded border border-[#5C91B1] bg-[#F8FCFF] text-[#154153] p-2 w-1/2">
                            Currency ({currency})
                        </div>
                    </div>
                </div>

                <div className="pt-10 text-center">
                    <button
                        type="submit"
                        className="w-[231px] bg-[#2E9DE0] text-[#F8FCFF] text-[20px] text-center py-2 rounded transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateOrder;