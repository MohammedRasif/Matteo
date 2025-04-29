"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ChevronRight, MoreHorizontal, AlertTriangle, Trash2, X, AlertCircle, Flag } from "lucide-react"
import { GoArrowLeft } from "react-icons/go"

const AdminDashboardBlog = () => {
    // State for active tab
    const [activeTab, setActiveTab] = useState("Reports")
    const [searchInput, setSearchInput] = useState("")

    // State for action dropdown and popups
    const [activeActionDropdown, setActiveActionDropdown] = useState(null)
    const [showWarningPopup, setShowWarningPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showViewReportPopup, setShowViewReportPopup] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)
    const [selectedReport, setSelectedReport] = useState(null)

    // Ref for dropdowns
    const dropdownRefs = useRef({})

    // Sample data for reports
    const allReports = [
        {
            id: "1",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Solved",
            reportReason: "Inappropriate content",
            reportDescription:
                "This post contains content that violates community guidelines. The user has posted offensive material that should be removed.",
            reportedDate: "2023-05-15",
        },
        {
            id: "2",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Processing",
            reportReason: "Spam",
            reportDescription:
                "This user is repeatedly posting the same content across multiple threads to promote their product.",
            reportedDate: "2023-05-16",
        },
        {
            id: "3",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Solved",
            reportReason: "Harassment",
            reportDescription: "The user is targeting another community member with repeated negative comments.",
            reportedDate: "2023-05-17",
        },
        {
            id: "4",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Processing",
            reportReason: "Misinformation",
            reportDescription: "This post contains factually incorrect information that could mislead others.",
            reportedDate: "2023-05-18",
        },
        {
            id: "5",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Solved",
            reportReason: "Copyright violation",
            reportDescription: "The user has posted content that infringes on copyrighted material without permission.",
            reportedDate: "2023-05-19",
        },
        {
            id: "6",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Processing",
            reportReason: "Violent content",
            reportDescription: "This post contains violent imagery that is not appropriate for the community.",
            reportedDate: "2023-05-20",
        },
        {
            id: "7",
            reportedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            reportDetails: "View",
            dateOfCreation: "46593292",
            postId: "46593292",
            status: "Solved",
            reportReason: "Other",
            reportDescription: "This post doesn't fit into other categories but violates community standards.",
            reportedDate: "2023-05-21",
        },
    ]

    // Sample data for posts
    const allPosts = [
        {
            id: "1",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "This is a sample post content for demonstration purposes.",
            title: "Sample Post 1",
        },
        {
            id: "2",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Another sample post with different content.",
            title: "Sample Post 2",
        },
        {
            id: "3",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "This is the third sample post with unique content.",
            title: "Sample Post 3",
        },
        {
            id: "4",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Fourth sample post with different text for testing.",
            title: "Sample Post 4",
        },
        {
            id: "5",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Fifth post in the sample data set for the blog reports interface.",
            title: "Sample Post 5",
        },
        {
            id: "6",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Sixth sample post with more example content.",
            title: "Sample Post 6",
        },
        {
            id: "7",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Seventh post in our sample data collection.",
            title: "Sample Post 7",
        },
        {
            id: "8",
            postedBy: "username1335",
            avatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
            dateOfCreation: "46593292",
            postId: "46593292",
            content: "Eighth and final post in our sample data set.",
            title: "Sample Post 8",
        },
    ]

    // Filtered data based on search
    const [reports, setReports] = useState(allReports)
    const [posts, setPosts] = useState(allPosts)

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            let isOutside = true
            Object.values(dropdownRefs.current).forEach((ref) => {
                if (ref && ref.contains(event.target)) {
                    isOutside = false
                }
            })
            if (isOutside) {
                setActiveActionDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle search by ID
    useEffect(() => {
        if (searchInput.trim() === "") {
            setReports(allReports)
            setPosts(allPosts)
        } else {
            const filteredReports = allReports.filter((report) =>
                report.postId.toLowerCase().includes(searchInput.toLowerCase())
            )
            const filteredPosts = allPosts.filter((post) =>
                post.postId.toLowerCase().includes(searchInput.toLowerCase())
            )
            setReports(filteredReports)
            setPosts(filteredPosts)
        }
    }, [searchInput])

    // Handle view report click
    const handleViewReport = (report, e) => {
        e.preventDefault()
        setSelectedReport(report)
        setShowViewReportPopup(true)
    }

    // Handle action click
    const handleActionClick = (action, post) => {
        setSelectedPost(post)
        console.log(`Action: ${action}, Post: ${post.id}`) // Debug log
        if (action === "warning") {
            setShowWarningPopup(true)
        } else if (action === "delete") {
            setShowDeletePopup(true)
        }
        setActiveActionDropdown(null)
    }

    // Handle warning submission
    const handleWarningSubmit = () => {
        console.log(`Warning sent to post ${selectedPost?.postId}`)
        setShowWarningPopup(false)
    }

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        console.log(`Deleted post ${selectedPost?.postId}`)
        const updatedPosts = posts.filter((post) => post.id !== selectedPost?.id)
        setPosts(updatedPosts)
        setShowDeletePopup(false)
    }

    return (
        <div className="min-h-screen roboto">
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-gray-800 py-6">Blog reports</h1>

                {/* Tabs */}
                <div className="mb-6 flex justify-between">
                    <div></div>
                    <div className="inline-flex rounded-md border border-[#0D95DD]">
                        <button
                            onClick={() => setActiveTab("Reports")}
                            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                                activeTab === "Reports"
                                    ? "bg-[#0D95DD] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } rounded-l-md`}
                        >
                            Reports
                        </button>
                        <button
                            onClick={() => setActiveTab("Posts")}
                            className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                                activeTab === "Posts"
                                    ? "bg-[#0D95DD] text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } rounded-r-md`}
                        >
                            Posts
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by post ID"
                            className="pl-7 pr-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 w-56 text-[14px]"
                            value={searchInput} // Updated to use searchInput
                            onChange={(e) => setSearchInput(e.target.value)} // Updated to use setSearchInput
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

                {/* Reports Table */}
                {activeTab === "Reports" && (
                    <div className="">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-300 rounded-lg text-left text-sm font-medium text-gray-700">
                                    <th className="px-6 py-3">Reported by</th>
                                    <th className="px-6 py-3">Report details</th>
                                    <th className="px-6 py-3">Date of creation</th>
                                    <th className="px-6 py-3">Post ID</th>
                                    <th className="px-6 py-3 flex items-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id} className="border-b border-gray-300 text-sm">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={report.avatar || "/placeholder.svg"}
                                                    alt={report.reportedBy}
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                                <span className="text-gray-700">{report.reportedBy}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                                onClick={(e) => handleViewReport(report, e)}
                                            >
                                                {report.reportDetails}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{report.dateOfCreation}</td>
                                        <td className="px-6 py-4">
                                            <a href="#" className=" hover:underline">
                                                {report.postId}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 flex items-center justify-between">
                                            <span className={report.status === "Solved" ? "" : ""}>
                                                {report.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Posts Table */}
                {activeTab === "Posts" && (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-300 text-left text-sm font-medium text-gray-700">
                                    <th className="px-6 py-3">Posted by</th>
                                    <th className="px-6 py-3">Date of creation</th>
                                    <th className="px-6 py-3">Post ID</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => (
                                    <tr key={post.id} className="border-b border-gray-300 text-sm">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={post.avatar || "/placeholder.svg"}
                                                    alt={post.postedBy}
                                                    className="h-8 w-8 rounded-full object-cover"
                                                />
                                                <span className="text-gray-700">{post.postedBy}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{post.dateOfCreation}</td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="text-blue-500 hover:underline">
                                                {post.postId}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 relative">
                                            <button
                                                className="text-gray-400 hover:text-gray-600"
                                                onClick={() =>
                                                    setActiveActionDropdown(
                                                        activeActionDropdown === post.id ? null : post.id
                                                    )
                                                }
                                            >
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>

                                            {/* Action Dropdown */}
                                            {activeActionDropdown === post.id && (
                                                <div
                                                    ref={(el) => (dropdownRefs.current[post.id] = el)}
                                                    className="absolute right-0 top-full z-20 mt-1 w-48 rounded-md bg-white shadow-lg"
                                                >
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleActionClick("warning", post)}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <AlertTriangle className="h-4 w-4" />
                                                            Give warning
                                                        </button>
                                                        <button
                                                            onClick={() => handleActionClick("delete", post)}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete the post
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
                )}
            </div>

            {/* View Report Popup */}
            {showViewReportPopup && selectedReport && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowViewReportPopup(false)}
                                className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
                            >
                                <GoArrowLeft className="h-4 w-4 mt-[4px]" />
                                back
                            </button>
                        </div>

                        <div className="flex items-center justify-center my-2">
                            <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-6 py-2 w-56 rounded-md flex items-center justify-center">
                                Description of report
                            </h1>
                        </div>

                        <p className="px-10 text-[14px] text-gray-500">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum recusandae vitae dolorum quam
                            modi quae ab placeat magni porro. Ducimus temporibus dicta qui sapiente illo? Quo impedit
                            quidem nisi voluptatibus laboriosam eaque, praesentium omnis facilis commodi delectus odio ex,
                            iusto, repudiandae eius deleniti molestiae. Hic unde doloremque consequatur rerum et?
                        </p>

                        <div className="flex justify-center gap-2 mt-5">
                            {selectedReport.status === "Processing" && (
                                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                                    Mark as Solved
                                </button>
                            )}
                            <button
                                onClick={() => setShowViewReportPopup(false)}
                                className="px-10 py-1 bg-[#0D95DD] text-white rounded-md cursor-pointer"
                            >
                                Okey
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Warning Popup */}
            {showWarningPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowWarningPopup(false)}
                                className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
                            >
                                <GoArrowLeft className="h-4 w-4 mt-[4px]" />
                                back
                            </button>
                        </div>

                        <div className="flex items-center justify-center my-2">
                            <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-6 py-2 w-56 rounded-md flex items-center justify-center">
                                Warning
                            </h1>
                        </div>

                        <p className="px-10 text-[14px] text-gray-500">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum recusandae vitae dolorum quam
                            modi quae ab placeat magni porro. Ducimus temporibus dicta qui sapiente illo? Quo impedit
                            quidem nisi voluptatibus laboriosam eaque, praesentium omnis facilis commodi delectus odio ex,
                            iusto, repudiandae eius deleniti molestiae. Hic unde doloremque consequatur rerum et?
                        </p>

                        <div className="flex justify-center gap-2 mt-5">
                            <button
                                onClick={() => setShowWarningPopup(false)}
                                className="px-10 py-1 bg-[#0D95DD] text-white rounded-md cursor-pointer"
                            >
                                Okey
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {showDeletePopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
                    <div className="bg-white rounded-lg p-6  max-w-md w-full">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-full bg-red-100">
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                            </div>
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5 cursor-pointer" />
                            </button>
                        </div>

                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete post ID:{" "}
                            <span className="font-medium">{selectedPost?.postId}</span>? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboardBlog