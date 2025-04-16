import React, { useState, useEffect, useRef } from 'react';

const AdminDashboardWithdrawal = () => {
    const [withdrawalRequests, setWithdrawalRequests] = useState([
        { id: '46593292', username: 'username1335', profileImg: '/placeholder.svg', amount: '$33,000', date: '$33,000', status: 'In-progress', role: 'Freelancer', rating: 4.7, reviews: 8, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,', tasksCompleted: 138, age: 27, totalEarning: '$750', hourlyRate: '$20', gender: 'Male', experience: '1 year', skills: ['Typing', 'Web Design', 'Graphics Design', 'SEO', 'UI/UX Design'], languages: ['English', 'Bangla'] },
        { id: '28474562', username: 'username1563', profileImg: '/placeholder.svg', amount: '$65,000', date: '$65,000', status: 'Complete', role: 'Designer', rating: 4.2, reviews: 12, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', tasksCompleted: 95, age: 31, totalEarning: '$1,200', hourlyRate: '$25', gender: 'Female', experience: '3 years', skills: ['UI/UX Design', 'Illustration', 'Branding'], languages: ['English', 'Spanish'] },
        { id: '74895487', username: 'username1128', profileImg: '/placeholder.svg', amount: '$17,000', date: '$17,000', status: 'Complete', role: 'Developer', rating: 4.9, reviews: 24, description: 'Experienced web developer with focus on React and Node.js', tasksCompleted: 210, age: 29, totalEarning: '$3,500', hourlyRate: '$35', gender: 'Male', experience: '5 years', skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'], languages: ['English', 'German'] },
        { id: '62621762', username: 'username1422', profileImg: '/placeholder.svg', amount: '$21,000', date: '$21,000', status: 'Cancelled', role: 'Content Writer', rating: 4.5, reviews: 18, description: 'Professional content writer specializing in technical documentation', tasksCompleted: 87, age: 34, totalEarning: '$950', hourlyRate: '$22', gender: 'Female', experience: '2 years', skills: ['Content Writing', 'Copywriting', 'Editing', 'SEO'], languages: ['English', 'French'] },
        { id: '81919847', username: 'username1001', profileImg: '/placeholder.svg', amount: '$46,000', date: '$46,000', status: 'Complete', role: 'Marketing Specialist', rating: 4.6, reviews: 15, description: 'Digital marketing expert with focus on social media campaigns', tasksCompleted: 124, age: 28, totalEarning: '$2,100', hourlyRate: '$28', gender: 'Male', experience: '4 years', skills: ['Social Media', 'SEO', 'Content Strategy', 'Analytics'], languages: ['English', 'Italian'] },
        { id: '25757262', username: 'username1123', profileImg: '/placeholder.svg', amount: '$26,000', date: '$26,000', status: 'In-progress', role: 'Data Analyst', rating: 4.8, reviews: 9, description: 'Data analyst with expertise in visualization and business intelligence', tasksCompleted: 76, age: 32, totalEarning: '$1,800', hourlyRate: '$30', gender: 'Female', experience: '3 years', skills: ['Data Analysis', 'Tableau', 'SQL', 'Excel'], languages: ['English', 'Russian'] },
        { id: '19384746', username: 'username1232', profileImg: '/placeholder.svg', amount: '$62,000', date: '$62,000', status: 'Complete', role: 'Project Manager', rating: 4.4, reviews: 21, description: 'Certified project manager with agile methodology expertise', tasksCompleted: 156, age: 36, totalEarning: '$4,200', hourlyRate: '$40', gender: 'Male', experience: '7 years', skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership'], languages: ['English', 'Portuguese'] },
        { id: '23446333', username: 'username1893', profileImg: '/placeholder.svg', amount: '$12,000', date: '$12,000', status: 'Cancelled', role: 'Graphic Designer', rating: 4.3, reviews: 14, description: 'Creative graphic designer specializing in brand identity', tasksCompleted: 92, age: 26, totalEarning: '$1,400', hourlyRate: '$24', gender: 'Female', experience: '2 years', skills: ['Graphic Design', 'Illustrator', 'Photoshop', 'Branding'], languages: ['English', 'Chinese'] },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All request');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState(null);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Ref to track action menu dropdowns
    const actionMenuRefs = useRef([]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Complete':
                return 'text-green-600';
            case 'In-progress':
                return 'text-indigo-600';
            case 'Cancelled':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    const filteredRequests = withdrawalRequests.filter(request => {
        // Filter by search query
        const matchesSearch = request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.username.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by status
        const matchesStatus = statusFilter === 'All request' ||
            request.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleStatusClick = () => {
        setShowStatusDropdown(!showStatusDropdown);
    };

    const handleStatusSelect = (status) => {
        setStatusFilter(status);
        setShowStatusDropdown(false);
    };

    const handleActionClick = (id) => {
        setShowActionMenu(showActionMenu === id ? null : id);
    };

    const handleViewClick = (request) => {
        setSelectedRequest(request);
        setShowViewPopup(true);
    };

    const handleClosePopup = () => {
        setShowViewPopup(false);
        setSelectedRequest(null);
    };

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isOutsideActionMenu = actionMenuRefs.current.every(
                (ref) => !ref || !ref.contains(event.target)
            );
            if (isOutsideActionMenu) {
                setShowActionMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="p-6">
            <div className="mx-auto">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Withdrawal requests</h1>

                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <button
                            className="text-gray-700 flex items-center text-sm bg-gray-50 px-3 py-1 rounded-sm"
                            onClick={handleStatusClick}
                        >
                            {statusFilter}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {showStatusDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 w-36">
                                <ul className="py-1">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleStatusSelect('All request')}
                                    >
                                        All request
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleStatusSelect('In-progress')}
                                    >
                                        In-progress
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleStatusSelect('Complete')}
                                    >
                                        Complete
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        onClick={() => handleStatusSelect('Cancelled')}
                                    >
                                        Cancelled
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by request ID or business Name"
                            className="pl-1 pr-4 py-2 rounded-md border bg-gray-100 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-72 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Business name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Request id
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date of request
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Wallet
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {filteredRequests.map((request, index) => (
                                <tr key={request.id} className="border-b border-gray-300">
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={request.profileImg || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full mr-3" />
                                            <span className="text-sm text-gray-900">{request.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {request.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded-2xl cursor-pointer"
                                            onClick={() => handleViewClick(request)}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                                        <button
                                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                            onClick={() => handleActionClick(request.id)}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>

                                        {showActionMenu === request.id && (
                                            <div
                                                ref={(el) => (actionMenuRefs.current[index] = el)} // Assign ref to each dropdown
                                                className="absolute right-24 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        onClick={() => setShowActionMenu(null)}
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        Go to payment
                                                    </button>
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        onClick={() => setShowActionMenu(null)}
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        Cancel request
                                                    </button>
                                                    <button
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                        onClick={() => setShowActionMenu(null)}
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        Give a warning
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Popup - Updated to match the design in the image */}
            {showViewPopup && selectedRequest && (
                <div className="fixed inset-0  flex items-center justify-center backdrop-blur-[3px] z-50">
                    <div className="bg-gray-100 rounded-lg shadow-lg max-w-xl w-full">
                        {/* Back button header */}
                        <div className="p-4 flex items-center">
                            <button 
                                className="flex items-center text-gray-800 font-medium cursor-pointer"
                                onClick={handleClosePopup}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </button>
                        </div>
                        
                        {/* Profile section */}
                        <div className="px-6 pb-4">
                            <div className="flex items-start">
                                <img 
                                    src={selectedRequest.profileImg || "/placeholder.svg"} 
                                    alt="" 
                                    className="w-24 h-24 rounded-full mr-6" 
                                />
                                <div>
                                    <h2 className="text-xl font-medium text-gray-800">{selectedRequest.username}</h2>
                                    <p className="text-gray-600">{selectedRequest.role || "Ui/Ux Designer"}</p>
                                    <div className="mt-2">
                                        <p className="text-gray-700">
                                            Rating: <span className="font-medium">{selectedRequest.rating || "4.7"}</span> 
                                            <span className="text-gray-500"> ({selectedRequest.reviews || "8"} Reviews)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
                                <p className="text-gray-600 text-sm">
                                    {selectedRequest.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"}
                                </p>
                            </div>
                            
                            {/* Stats grid */}
                            <div className="mt-6 grid grid-cols-2 gap-y-4">
                                <div className='flex items-center space-x-8'>
                                    <p className="text-gray-600">Task completed:</p>
                                    <p className="font-medium">{selectedRequest.tasksCompleted || "138"}</p>
                                </div>
                                <div className='flex items-center space-x-[83px]'>
                                    <p className="text-gray-600">Age:</p>
                                    <p className="font-medium">{selectedRequest.age || "27"}</p>
                                </div>
                                <div className='flex items-center space-x-[50px]'>
                                    <p className="text-gray-600">Total earning:</p>
                                    <p className="font-medium">{selectedRequest.totalEarning || "$750"}</p>
                                </div>
                                <div className='flex items-center space-x-8'>
                                    <p className="text-gray-600">Hourly rate:</p>
                                    <p className="font-medium">{selectedRequest.hourlyRate || "$20"}</p>
                                </div>
                                <div className='flex items-center space-x-[90px]'>
                                    <p className="text-gray-600">Gender:</p>
                                    <p className="font-medium">{selectedRequest.gender || "Male"}</p>
                                </div>
                                <div className='flex items-center space-x-9'>
                                    <p className="text-gray-600">Experience:</p>
                                    <p className="font-medium">{selectedRequest.experience || "1 year"}</p>
                                </div>
                            </div>
                            
                            {/* Skills */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-800 mb-1">Skills</h3>
                                <p className="text-gray-700">
                                    {selectedRequest.skills ? 
                                        selectedRequest.skills.join(', ') : 
                                        "Typing, Web Design, Graphics Design, SEO, Ui/Ux Design"}
                                </p>
                            </div>
                            
                            {/* Languages */}
                            <div className="mt-6 flex">
                                <p className="text-gray-600 mr-2">Language:</p>
                                <p className="text-gray-700 font-medium">
                                    {selectedRequest.languages ? 
                                        selectedRequest.languages.join(', ') : 
                                        "English, Bangla"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardWithdrawal;