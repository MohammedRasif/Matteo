
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";


function CreateOrder() {
    const [hourlyRate, setHourlyRate] = useState(false);
    const [fixedPrice, setFixedPrice] = useState(false);
    // const [category, setCategory] = useState("");
    // const [currency, setCurrency] = useState("USD");

    return (
        <div className="  p-6 ">
            {/* Header */}
            <div className=" mb-6">
                <Link to="/dashboard">
                    <button className="flex items-center text-[#154153] cursor-pointer gap-1">
                        <GoArrowLeft />
                        <span>Back</span>


                    </button>
                </Link>
                <h1 className="text-2xl font-bold text-center text-[#154153]  mb-8 text-[24px]">Create Order</h1>

            </div>

            {/* Form */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#154153] ">
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">Give a title to your task</label>
                        <input
                            type="text"
                            placeholder="Enter text"
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">Name the task category</label>
                        {/* <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="cleaning">Cleaning</option>
              <option value="delivery">Delivery</option>
              <option value="repair">Repair</option>
              <option value="other">Other</option>
            </select> */}
                        <input
                            type="category"
                            placeholder="Enter here"
                            required
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded required"
                        />


                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[16px] mb-2 text-[#154153]">Number of person required *</label>
                        <input
                            type="num"
                            placeholder="Enter number"

                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2 text-[#154153]">Describe the task</label>
                    <textarea
                        placeholder="Enter text"
                        className="w-full h-[96px] px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex items-center mb-2 text-[#154153]">
                            <label className="block text-sm">Skill Required (max 5)</label>


                        </div>
                        <input
                            type="text"
                            placeholder="Enter text"
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-2 text-[#154153]">Task address/location (if required)</label>
                        <input
                            type="text"
                            placeholder="Enter text"
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                        />
                    </div>
                </div>

                {/* Map */}
                <div className="border border-gray-200 rounded overflow-hidden">
                    <div className="flex items-center justify-between p-2 bg-white">
                        <div className="text-xs text-gray-500">(Task location)</div>
                        <div className="flex items-center border rounded overflow-hidden flex-1 mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search location"
                                className="p-1 px-2 w-full text-sm focus:outline-none"
                            />
                        </div>
                        <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                            Auto locate
                        </button>
                        <div className="text-xs text-gray-500">(Task location)</div>
                    </div>
                    <div className="relative h-[180px] bg-gray-100">
                        <div className="w-full h-full bg-gray-200">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between gap-10 items-center">
                    <div className="w-full">
                        <label className="block text-sm mb-2 text-[#154153]">Task Duration</label>
                        <input
                            type="text"
                            placeholder="e.g. 2 days"
                            className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded "
                        />
                    </div>
                    <div className="md:col-span-1 w-full">
                        <label className="block text-sm mb-2 text-[#154153]">Offering</label>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="hourly"
                                    checked={hourlyRate}
                                    onChange={(e) => setHourlyRate(e.target.checked)}
                                    className="rounded border-[#5C91B1] bg-[#F8FCFF] "
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
                                    className="rounded border-[#5C91B1] bg-[#F8FCFF] text-blue-600 focus:ring-blue-500"
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
                            className="rounded-l border-l border-y border-[#5C91B1] bg-[#F8FCFF] p-2 placeholder-[#154153] w-full "
                        />
                        <div className="flex items-center rounded border  border-[#5C91B1]  bg-[#F8FCFF] text-[#154153] p-2 w-1/2 ">
                            Currency (USD)
                        </div>
                    </div>




                </div>

                <div className="pt-10 text-center">
                    <button
                        type="submit"
                        className="w-[231px] bg-[#2E9DE0]  text-[#F8FCFF] text-[20px] text-center py-2 rounded transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateOrder;