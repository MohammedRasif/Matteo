"use client"

import { useState, useEffect, useRef } from "react"
import { FiSearch, FiChevronRight, FiMoreHorizontal, FiHeart, FiMessageSquare, FiChevronDown } from "react-icons/fi"
import { IoIosSend } from "react-icons/io"

const BrowseProjects = () => {
    // Generate more sample posts for pagination
    const generateSamplePosts = (count) => {
        const posts = []
        const categories = ["Use cases", "Lessons", "Inspiration", "Tips and tricks"]
        const authors = [
            { name: "Cameron Williamson", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Eleanor Pena", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Jerome Bell", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
            { name: "Kathryn Murphy", avatar: "https://randomuser.me/api/portraits/women/70.jpg" },
            { name: "Robert Johnson", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
        ]

        for (let i = 1; i <= count; i++) {
            const authorIndex = Math.floor(Math.random() * authors.length)
            posts.push({
                id: i,
                author: authors[authorIndex].name,
                avatar: authors[authorIndex].avatar,
                time: `${Math.floor(Math.random() * 60)} min ago`,
                content:
                    "Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
                likes: Math.floor(Math.random() * 50),
                comments: Math.floor(Math.random() * 20),
                category: categories[Math.floor(Math.random() * categories.length)],
            })
        }
        return posts
    }

    // Sample initial data for posts (30 posts for pagination testing)
    const initialPosts = generateSamplePosts(30)

    // Sample data for updates
    const updates = [
        {
            id: 1,
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            content:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
        },
        {
            id: 2,
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            content:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
        },
        {
            id: 3,
            avatar: "https://randomuser.me/api/portraits/men/42.jpg",
            content:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
        },
        {
            id: 4,
            avatar: "https://randomuser.me/api/portraits/women/26.jpg",
            content:
                "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
        },
    ]

    // Sample data for contributors
    const contributors = [
        {
            id: 1,
            name: "Cameron Williamson",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            title: "Environmental Consultant",
        },
        {
            id: 2,
            name: "Wade Warren",
            avatar: "https://randomuser.me/api/portraits/men/40.jpg",
            title: "Fire Protection Engineer",
        },
        {
            id: 3,
            name: "Floyd Miles",
            avatar: "https://randomuser.me/api/portraits/men/53.jpg",
            title: "Plumber",
        },
        {
            id: 4,
            name: "Ronald Richards",
            avatar: "https://randomuser.me/api/portraits/men/61.jpg",
            title: "Project Engineer",
        },
        {
            id: 5,
            name: "Cody Fisher",
            avatar: "https://randomuser.me/api/portraits/men/37.jpg",
            title: "Industrial Electrician",
        },
        {
            id: 6,
            name: "Jerome Bell",
            avatar: "https://randomuser.me/api/portraits/men/36.jpg",
            title: "Crane Mechanic",
        },
        {
            id: 7,
            name: "Arlene McCoy",
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
            title: "Concrete Inspector",
        },
        {
            id: 8,
            name: "Marvin McKinney",
            avatar: "https://randomuser.me/api/portraits/men/71.jpg",
            title: "Landscaping Supervisor",
        },
        {
            id: 9,
            name: "Theresa Webb",
            avatar: "https://randomuser.me/api/portraits/women/67.jpg",
            title: "Historical Restoration Specialist",
        },
    ]

    // Categories for filtering
    const categories = ["Use cases", "Lessons", "Inspiration", "Tips and tricks"]

    // State variables
    const [allPosts, setAllPosts] = useState(initialPosts)
    const [filteredPosts, setFilteredPosts] = useState(initialPosts)
    const [displayedPosts, setDisplayedPosts] = useState([])
    const [storyText, setStoryText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const categoryDropdownRef = useRef(null)

    const postsPerPage = 10
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    // Handle post submission
    const handlePostSubmit = () => {
        if (storyText.trim() === "") return

        const newPost = {
            id: Date.now(),
            author: "You", // Assuming the current user
            avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Default avatar
            time: "Just now",
            content: storyText,
            likes: 0,
            comments: 0,
            category: "Use cases", // Default category
        }

        const updatedPosts = [newPost, ...allPosts]
        setAllPosts(updatedPosts)
        setFilteredPosts(updatedPosts)
        setStoryText("")
        setCurrentPage(1) // Reset to first page when adding a new post
    }

    // Filter posts based on search query and category
    useEffect(() => {
        let result = allPosts

        // Filter by search query
        if (searchQuery) {
            result = result.filter(
                (post) =>
                    post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.content.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Filter by category
        if (selectedCategory) {
            result = result.filter((post) => post.category === selectedCategory)
        }

        setFilteredPosts(result)
        setCurrentPage(1) // Reset to first page when filters change
    }, [searchQuery, selectedCategory, allPosts])

    // Update displayed posts when page or filtered posts change
    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage
        const endIndex = startIndex + postsPerPage
        setDisplayedPosts(filteredPosts.slice(startIndex, endIndex))
    }, [currentPage, filteredPosts, postsPerPage])

    // Reset filters
    const handleResetFilters = () => {
        setSearchQuery("")
        setSelectedCategory("")
        setFilteredPosts(allPosts)
        setShowCategoryDropdown(false)
    }

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        setShowCategoryDropdown(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setShowCategoryDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Generate pagination numbers with sliding window
    const getPaginationNumbers = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        if (currentPage <= 3) {
            return [1, 2, 3, 4, 5, "...", totalPages]
        }

        if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        }

        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
    }

    return (
        <div className="bg-slate-50 min-h-screen roboto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Main content */}
                    <div className="w-full md:w-3/4">
                        {/* Search and filter */}
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                            <div className="relative w-full md:w-72 mb-4 md:mb-0">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 mr-2">View by:</span>
                                <div className="relative">
                                    <button className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 text-sm">
                                        Most recent
                                        <FiChevronRight className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Category dropdown */}
                        <div className="mb-6 relative flex justify-end" ref={categoryDropdownRef}>
                            <button
                                className="flex items-center bg-white border border-gray-200 font-medium cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-gray-50"
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                                <span className="text-gray-700 ">
                                    {selectedCategory ? `Category: ${selectedCategory}` : "Select Category"}
                                </span>
                                <FiChevronDown className="ml-2 text-gray-500" />
                            </button>

                            {showCategoryDropdown && (
                                <div className="absolute z-10 mt-10 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1  ">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 ${selectedCategory === category ? "bg-blue-50 text-blue-700" : "text-gray-700"
                                                }`}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        className="w-full font-medium cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleResetFilters}
                                    >
                                        Reset
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Post your story */}
                        <div className="bg-white rounded-md shadow-sm p-4 mb-6">
                            <h3 className="text-md font-medium text-gray-700 mb-3">Post your story</h3>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Write your story here..."
                                        className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        rows="2"
                                        value={storyText}
                                        onChange={(e) => setStoryText(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end mt-2 ">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded-sm text-sm hover:bg-blue-600 transition flex cursor-pointer "
                                            onClick={handlePostSubmit}
                                        >
                                            Publish
                                            <IoIosSend size={20} className="ml-1" />

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts */}
                        <div className="space-y-4">
                            {displayedPosts.length > 0 ? (
                                displayedPosts.map((post) => (
                                    <div key={post.id} className="bg-white rounded-md shadow-sm p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <img
                                                    src={post.avatar || "/placeholder.svg"}
                                                    alt={post.author}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{post.author}</h3>
                                                    <p className="text-xs text-gray-500">{post.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">

                                                <button className="text-gray-500 hover:text-gray-700">
                                                    <FiMoreHorizontal size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-sm text-gray-600">
                                                {post.content}
                                                <span className="text-blue-500 cursor-pointer ml-1">See more</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <div className="flex items-center mr-4">
                                                <FiHeart className="mr-1" />
                                                <span>{post.likes}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <FiMessageSquare className="mr-1" />
                                                <span>{post.comments} Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-md shadow-sm p-8 text-center">
                                    <p className="text-gray-500">No posts found matching your criteria.</p>
                                    <button className="mt-4 text-blue-500 hover:underline" onClick={handleResetFilters}>
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredPosts.length > 0 && (
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    className="px-3 py-1 border border-gray-300 rounded-md mr-2 text-sm text-gray-600 hover:bg-gray-100"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                {getPaginationNumbers().map((page, index) =>
                                    page === "..." ? (
                                        <span key={`ellipsis-${index}`} className="mx-1 text-gray-500">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={`page-${page}`}
                                            className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 text-sm ${currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                                                }`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    ),
                                )}

                                <button
                                    className="px-3 py-1 border border-gray-300 rounded-md ml-2 text-sm text-gray-600 hover:bg-gray-100"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        {/* New Updates */}
                        <div className="mb-8 bg-gray-50 shadow-md rounded-md p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">NEW UPDATES</h2>
                            <div className="space-y-4">
                                {updates.map((update) => (
                                    <div key={update.id} className="flex gap-3">
                                        <img src={update.avatar || "/placeholder.svg"} alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {update.content}
                                                <span className="text-blue-500 cursor-pointer ml-1">See more</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="bg-gray-50 shadow-md rounded-md p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">TOP CONTRIBUTORS</h2>
                            <p className="text-xs text-gray-500 mb-4">Of The Month</p>
                            <div className="space-y-5">
                                {contributors.map((contributor) => (
                                    <div key={contributor.id} className="flex items-center">
                                        <img
                                            src={contributor.avatar || "/placeholder.svg"}
                                            alt={contributor.name}
                                            className="w-10 h-10 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800 text-sm">{contributor.name}</h3>
                                            <p className="text-xs text-gray-500">{contributor.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseProjects
