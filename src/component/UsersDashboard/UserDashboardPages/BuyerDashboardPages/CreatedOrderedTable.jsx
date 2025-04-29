import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward, IoIosSearch } from 'react-icons/io';
import { ClockIcon } from 'lucide-react';
import { PiDotsThree } from 'react-icons/pi';
import { TbListDetails } from 'react-icons/tb';
import { BsPersonCheckFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { IoEyeOutline } from 'react-icons/io5';

function CreatedOrderedTable() {
    // State for toggling between 'seller' and 'buyer'
    const [activeTab, setActiveTab] = useState('buyer');

    // Status dropdown toggle state
    const [isOpen, setIsOpen] = useState(false);

    // Filter status from dropdown (e.g., Created, Cancelled)
    const [statusFilter, setStatusFilter] = useState('');

    // Search text for Project ID
    const [searchQuery, setSearchQuery] = useState('');

    // Which action dropdown is open (stores projectId)
    const [openDropdownAction, setOpenDropdownAction] = useState(null);

    // Refs to detect clicks outside action dropdowns
    const dropdownRefs = useRef({});

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideAnyDropdown = Object.values(dropdownRefs.current).some(ref => {
                return ref && ref.contains(event.target);
            });
            if (!isClickInsideAnyDropdown) {
                setOpenDropdownAction(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Switch between tabs
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Toggle specific action dropdown by projectId
    const handleDropdownToggleAction = (projectId) => {
        setOpenDropdownAction(prev => (prev === projectId ? null : projectId));
    };

    // Sample data array
    const projectData = [
        {
            date: "19 Apr 2021, 00:00",
            duration: "2 day/1 hour",
            projectId: "34034474",
            amount: "$26,000",
        },
        {
            date: "22 May 2021, 10:30",
            duration: "3 day/5 hour",
            projectId: "34034475",
            amount: "$18,500",
        },
        {
            date: "15 Jun 2021, 14:00",
            duration: "1 day/3 hour",
            projectId: "34034476",
            amount: "$12,000",
        },
        {
            date: "01 Jul 2021, 09:15",
            duration: "4 day/2 hour",
            projectId: "34034477",
            amount: "$30,000",
        },
        {
            date: "18 Aug 2021, 16:45",
            duration: "2 day/4 hour",
            projectId: "34034478",
            amount: "$22,750",
        },
        {
            date: "03 Sep 2021, 11:00",
            duration: "5 day/0 hour",
            projectId: "34034479",
            amount: "$27,300",
        },
        {
            date: "27 Oct 2021, 08:20",
            duration: "3 day/6 hour",
            projectId: "34034480",
            amount: "$19,800",
        },
        {
            date: "11 Nov 2021, 13:10",
            duration: "2 day/7 hour",
            projectId: "34034481",
            amount: "$21,000",
        },
        {
            date: "29 Dec 2021, 17:50",
            duration: "1 day/5 hour",
            projectId: "34034482",
            amount: "$15,600",
        },
    ];

    // 🔍 Filter projects based on search query (Project ID)
    const filteredProjects = projectData.filter(project =>
        project.projectId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Header */}
            <h1 className="text-[24.8px] font-bold text-center mb-10 nunito">
                Order Management
            </h1>

            {/* Tab buttons for Buyer / Seller */}
            <div className="flex mb-4 justify-center">
                <div className="bg-[#acaeaf23] rounded-full">
                    <button
                        className={`px-6 py-2 rounded-full ${activeTab === 'seller' ? 'bg-[#1B97D8] text-white' : 'text-[#012939]'}`}
                        onClick={() => handleTabChange('seller')}
                    >
                        Seller
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full ${activeTab === 'buyer' ? 'bg-[#1B97D8] text-white' : 'text-[#012939]'}`}
                        onClick={() => handleTabChange('buyer')}
                    >
                        Buyer
                    </button>
                </div>
            </div>

            {/* Filters and search */}
            <div className="flex justify-between mx-6 my-3">
                {/* Dropdown for order status */}
                <div className="relative inline-block text-left">
                    <div
                        className="text-[#012939] flex items-center gap-1 bg-[#F6F8FA] p-2 rounded cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p>{statusFilter || 'Created'}</p>
                        <IoIosArrowForward className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Dropdown menu */}
                    {isOpen && (
                        <div className="absolute mt-2 w-40 text-[#012939] bg-white shadow-md rounded p-2 z-10 space-y-2">
                            {['Created', 'Cancel request', 'Delivered', 'Late', 'Cancelled', 'In-Progress', ''].map((status, index) => (
                                <p
                                    key={index}
                                    onClick={() => {
                                        setStatusFilter(status);
                                        setIsOpen(false);
                                    }}
                                    className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center gap-1"
                                >
                                    {status === '' ? 'All Orders' : status}
                                    <IoIosArrowForward />
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Create order + Search input */}
                <div className="flex gap-4">
                    <Link to="/dashboard/createBuyerOrder">
                        <p className="text-[#38A3DC] border border-[#38A3DC] p-1 rounded cursor-pointer">
                            Create Order +
                        </p>
                    </Link>
                    <div className="flex items-center">
                        {/* Search input */}
                        <input
                            className="bg-[#F6F8FA] rounded-l p-2 outline-none"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <IoIosSearch className="bg-[#acaeaf23] p-3 size-10 text-[#B9C0C7]" />
                    </div>
                </div>
            </div>

            <hr className="mx-6 text-[#D8DBDD] mb-3" />

            {/* 📊 Table displaying filtered project data */}
            <div className="w-full overflow-hidden rounded">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-[#C1DDEF] text-left">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">Date of creation</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">Duration</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">Project ID</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">Amount</th>
                                <th className="px-6 py-4 text-sm font-semibold text-[#2c3e50]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* Render filtered projects */}
                            {filteredProjects.map((project, index) => (
                                <tr key={index}>
                                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">{project.date}</td>
                                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">
                                        <div className="flex items-center">
                                            <ClockIcon className="mr-2 h-4 w-4 text-[#718096]" />
                                            {project.duration}
                                        </div>
                                    </td>
                                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">{project.projectId}</td>
                                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm">{project.amount}</td>

                                    {/* Action dropdown per project row */}
                                    <td className="border-b border-[#C1DDEF] px-6 py-4 text-sm w-[195px]">
                                        <div
                                            className="relative"
                                            ref={(el) => (dropdownRefs.current[project.projectId] = el)}
                                        >
                                            <button
                                                onClick={() => handleDropdownToggleAction(project.projectId)}
                                                className="text-[#718096] cursor-pointer"
                                            >
                                                <PiDotsThree className="h-5 w-5" />
                                            </button>

                                            {/* Dropdown menu for actions */}
                                            {openDropdownAction === project.projectId && (
                                                <div className="absolute right-0 mt-1 w-[195px] bg-[#FAFDFF] rounded z-10">
                                                    <ul className="text-sm text-[#2c3e50]">
                                                        <Link to="/dashboard/buyer_candidate_list" className="px-4 py-2 cursor-pointer flex items-center gap-2">
                                                            <IoEyeOutline /> Show all bids
                                                        </Link>
                                                        <li className="px-4 py-2 cursor-pointer flex items-center gap-2"><BiEdit />Edit</li>
                                                        <li className="px-4 py-2 cursor-pointer flex items-center gap-2"><RiDeleteBinLine />Delete</li>
                                                        <li className="px-4 py-2 cursor-pointer flex items-center gap-2"><BsPersonCheckFill />Assign</li>
                                                        <li className="px-4 py-2 cursor-pointer flex items-center gap-2"><TbListDetails />Details</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default CreatedOrderedTable;