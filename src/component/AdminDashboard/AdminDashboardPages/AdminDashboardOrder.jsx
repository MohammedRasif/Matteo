import React, { useState, useEffect } from 'react';

const OrderTable = () => {
    const [orders, setOrders] = useState([
        { id: '46593292', buyerName: 'username1335', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$33,000', status: 'Solved' },
        { id: '28474562', buyerName: 'username1563', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$65,000', status: 'Processing' },
        { id: '74895487', buyerName: 'username1128', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$17,000', status: 'Processing' },
        { id: '62621762', buyerName: 'username1422', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$21,000', status: 'Solved' },
        { id: '81919847', buyerName: 'username1001', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$46,000', status: 'Processing' },
        { id: '25757262', buyerName: 'username1123', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$26,000', status: 'Solved' },
        { id: '19384746', buyerName: 'username1232', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$62,000', status: 'Processing' },
        { id: '23446333', buyerName: 'username1893', buyerImg: '/placeholder.svg', sellerName: 'username1335', sellerImg: '/placeholder.svg', amount: '$12,000', status: 'Solved' },
    ]);

    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [sortOption, setSortOption] = useState('All');
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        let result = orders;

        // Filter by status
        if (sortOption !== 'All') {
            result = orders.filter(order => order.status === sortOption);
        }

        // Filter by search query (ID)
        if (searchQuery) {
            result = result.filter(order =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredOrders(result);
    }, [orders, sortOption, searchQuery]);

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

    return (
        <div className=" p-6 rounded-lg roboto">
            <h1 className="text-3xl font-semibold text-gray-800 py-5 ">Order</h1>
            <div className="flex justify-between items-center mb-3">
                <div className="relative">
                    <button
                        onClick={handleSortClick}
                        className="flex items-center text-gray-700 text-[15px] font-medium cursor-pointer bg-gray-50 px-2 py-1 rounded-md"
                    >
                        {sortOption === 'All' ? 'Sort by' : sortOption} <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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
                        className="pl-7 pr-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-56 text-[14px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="w-3 h-3 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left text-gray-600 text-[15px] bg-gray-300 ">
                            <th className="py-2 pl-2">Buyer name</th>
                            <th className="py-2">Seller name</th>
                            <th className="py-2">Order id</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Request</th>
                            <th className="py-2 pr-2 flex items-center">
                                Status

                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-[14px]">
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-300">
                                <td className="py-4 pl-2">
                                    <div className="flex items-center">
                                        <img src={order.buyerImg || "/placeholder.svg"} alt="" className="w-6 h-6 rounded-full mr-2" />
                                        <span>{order.buyerName}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center">
                                        <img src={order.sellerImg || "/placeholder.svg"} alt="" className="w-6 h-6 rounded-full mr-2" />
                                        <span>{order.sellerName}</span>
                                    </div>
                                </td>
                                <td className="py-4">{order.id}</td>
                                <td className="py-4">{order.amount}</td>
                                <td className="py-4">
                                    <button
                                        className="text-blue-500 hover:underline text-xs"
                                        onClick={() => handleViewClick(order)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="py-4 pr-2">
                                    <div className="flex items-center">
                                        <span className={order.status === 'Solved' ? '' : ''}>
                                            {order.status}
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-3">Order Details</h2>
                        <p className="mb-3 text-sm">This is the order information popup for Order #{selectedOrder.id}.</p>
                        <button
                            className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-600"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;