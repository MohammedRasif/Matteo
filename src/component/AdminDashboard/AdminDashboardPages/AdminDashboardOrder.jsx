
import React, { useState, useEffect, useRef } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useSupportOrderQuery } from '../../../Redux/feature/ApiSlice';

const Order = () => {
    const { data: supportOrders, isLoading, error } = useSupportOrderQuery();
    console.log('Fetched Orders:', supportOrders);

    const [filteredOrders, setFilteredOrders] = useState(supportOrders || []);
    const [sortOption, setSortOption] = useState('All');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Ref for the sort dropdown
    const sortDropdownRef = useRef(null);

    // Update filteredOrders when supportOrders, sortOption, or searchQuery changes
    useEffect(() => {
        let result = supportOrders || [];

        // Filter by status
        if (sortOption !== 'All') {
            const statusToFilter = sortOption === 'Processing' ? 'In-progress' : sortOption;
            result = result.filter(order => order.status === statusToFilter);
        }

        // Filter by search query (order_id)
        if (searchQuery) {
            result = result.filter(order =>
                order.order_id.toString().toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredOrders(result);
    }, [supportOrders, sortOption, searchQuery]);

    // Close sort dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sortDropdownRef.current &&
                !sortDropdownRef.current.contains(event.target)
            ) {
                setShowSortOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setShowPopup(true);
    };

    const handleSortClick = () => {
        setShowSortOptions(!showSortOptions);
    };

    const handleSortOptionClick = (option) => {
        setSortOption(option);
        setShowSortOptions(false);
    };

    // Handle loading and error states
    if (isLoading) {
        return <div className="p-6 roboto">Loading...</div>;
    }
    if (error) {
        return <div className="p-6 roboto">Error: {error.message}</div>;
    }

    return (
        <div className="p-6 rounded-lg roboto">
            <h1 className="text-2xl font-semibold text-gray-800 py-5">Order</h1>
            <div className="flex justify-between items-center mb-3">
                <div className="relative" ref={sortDropdownRef}>
                    <button
                        onClick={handleSortClick}
                        className="flex items-center text-gray-700 text-[15px] font-medium cursor-pointer bg-gray-50 px-2 py-1 rounded-md"
                    >
                        {sortOption === 'All' ? 'Sort by' : sortOption}{' '}
                        <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {showSortOptions && (
                        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 w-28">
                            <ul className="text-[16px]">
                                <li
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortOptionClick('All')}
                                >
                                    All
                                </li>
                                <li
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortOptionClick('Processing')}
                                >
                                    Processing
                                </li>
                                <li
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSortOptionClick('Solved')}
                                >
                                    Solved
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by order ID"
                        className="pl-7 pr-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 w-56 text-[14px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-gray-600 text-[15px] bg-gray-300">
                            <th className="py-2 pl-2">Buyer name</th>
                            <th className="py-2">Seller name</th>
                            <th className="py-2">Order id</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Request</th>
                            <th className="py-2 pr-2 flex items-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-[14px]">
                        {filteredOrders.map((order) => (
                            <tr key={order.order_id} className="border-b border-gray-300">
                                <td className="py-4 pl-2">
                                    <div className="flex items-center">
                                        <img
                                            src="/placeholder.svg"
                                            alt={order.byer_name}
                                            className="w-6 h-6 rounded-full mr-2"
                                        />
                                        <span>{order.byer_name}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img
                                            src="/placeholder.svg"
                                            alt={order.seller_name}
                                            className="w-6 h-6 rounded-full mr-2"
                                        />
                                        <span>{order.seller_name}</span>
                                    </div>
                                </td>
                                <td className="py-4">{order.order_id.toString()}</td>
                                <td className="py-4">
                                    ${order.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                </td>
                                <td className="py-4">
                                    <button
                                        className="bg-blue-500 text-white  px-3 py-1 rounded-2xl r hover:underline text-xs cursor-pointer"
                                        onClick={() => handleViewClick(order)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="py-4 pr-2">
                                    <div className="flex items-center">
                                        <span>
                                            {order.status === 'In-progress' ? 'Processing' : order.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Popup */}
            {showPopup && selectedOrder && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
                            >
                                <GoArrowLeft className="h-4 w-4 mt-[4px]" />
                                back
                            </button>
                        </div>
                        <div className="flex items-center justify-center my-2">
                            <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-6 py-2 w-56 rounded-md flex items-center justify-center">
                                Support request
                            </h1>
                        </div>
                        <p className="px-10 text-[14px] text-gray-500">{selectedOrder.details}</p>
                        <div className="flex justify-center gap-2 mt-5">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-10 py-1 bg-[#0D95DD] text-white rounded-md cursor-pointer"
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;
