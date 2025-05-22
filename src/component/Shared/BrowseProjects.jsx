"use client"

import { useState, useEffect, useRef } from "react"
import { FiSearch, FiMessageSquare, FiChevronDown } from "react-icons/fi"
import { IoIosSend } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"
import {
    useForumDataQuery,
    useCreatePostMutation,
    useCreateCommentMutation,
    useCreateReactMutation,
    useShowCommentQuery,
    useShowContributotQuery,
    useShowAllCommentQuery,
    useShowNewUpdateQuery,
} from "../../Redux/feature/ApiSlice.js"
import { useForm } from "react-hook-form"

const BrowseProjects = () => {
    const { data: forumData, isLoading, isError } = useForumDataQuery()
    const [createPost] = useCreatePostMutation()
    const [createComment] = useCreateCommentMutation()
    const [createReact] = useCreateReactMutation()
    const { data: showComments } = useShowCommentQuery()
    const { data: showContributor } = useShowContributotQuery()
    const { data: showNewUpdate, isLoading: isLoadingUpdates } = useShowNewUpdateQuery()

    // State for tracking reactions, comments, and expanded updates
    const [activeComments, setActiveComments] = useState({})
    const [userReactions, setUserReactions] = useState({})
    const [expandedUpdate, setExpandedUpdate] = useState(null) // Track single expanded update

    // Categories for filtering
    const categories = ["Use cases", "Lessons", "Inspiration", "Tips and tricks"]

    // State variables
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    const [expandedPosts, setExpandedPosts] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const categoryDropdownRef = useRef(null)

    const postsPerPage = 10
    const CHARACTER_LIMIT = 700
    const UPDATE_WORD_LIMIT = 50

    // Filter posts based on search query and category
    const filteredPosts = forumData
        ? forumData
              .filter((post) => (searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : true))
              .filter((post) => (selectedCategory ? post.category === selectedCategory : true))
        : []

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    // Get posts for the current page
    const displayedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const commentForm = useForm()

    const submitHandler = async (data) => {
        try {
            const response = await createPost(data).unwrap()
            reset()
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    // Toggle expanded state for a post
    const toggleExpanded = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }))
    }

    // Reset filters
    const handleResetFilters = () => {
        setSearchQuery("")
        setSelectedCategory("")
        setCurrentPage(1)
        setShowCategoryDropdown(false)
    }

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        setCurrentPage(1)
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
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Generate pagination numbers
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

    // Toggle comment section (only one open at a time)
    const toggleCommentSection = (postId) => {
        setActiveComments((prev) => ({
            [postId]: !prev[postId],
        }))
    }

    const { refetch } = useForumDataQuery()
    const handleReaction = async (postId, reactionType) => {
        try {
            const react_type = reactionType === "heart" ? "heart" : "like"
            await createReact({ id: postId, react_type }).unwrap()
            refetch()
        } catch (error) {
            console.error("Error creating reaction:", error)
        }
    }

    // Submit comment
    const handleCommentSubmit = async (postId, data) => {
        const text = data?.text
        try {
            await createComment({ id: postId, text: text }).unwrap()
            commentForm.reset()
        } catch (error) {
            console.error("Error creating comment:", error)
        }
    }

    // Toggle expanded update (only one open at a time)
    const toggleUpdateExpanded = (updateId) => {
        setExpandedUpdate((prev) => (prev === updateId ? null : updateId))
    }

    // Truncate update text to 50 words
    const truncateText = (text) => {
        const words = text.split(" ")
        if (words.length <= UPDATE_WORD_LIMIT) return text
        return words.slice(0, UPDATE_WORD_LIMIT).join(" ") + "..."
    }

    return (
        <div className="bg-slate-50 min-h-screen roboto pt-10">
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
                                    placeholder="Search by title"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category dropdown */}
                        <div className="mb-6 relative flex justify-end" ref={categoryDropdownRef}>
                            <button
                                className="flex items-center bg-white border border-gray-200 font-medium cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-gray-50"
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                                <span className="text-gray-700">
                                    {selectedCategory ? `Category: ${selectedCategory}` : "Select Category"}
                                </span>
                                <FiChevronDown className="ml-2 text-gray-500" />
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute z-10 mt-10 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 ${
                                                selectedCategory === category ? "bg-blue-50 text-blue-700" : "text-gray-700"
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <textarea
                                            {...register("text", {
                                                required: "Story text is required",
                                                minLength: {
                                                    value: 1,
                                                    message: "Story must be at least 1 character long",
                                                },
                                            })}
                                            placeholder="Write your story here..."
                                            className={`w-full border ${
                                                errors.text ? "border-red-500" : "border-gray-200"
                                            } rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                            rows="2"
                                        />
                                        {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white px-4 py-1 rounded-sm text-sm hover:bg-blue-600 transition flex items-center cursor-pointer"
                                            >
                                                Publish
                                                <IoIosSend size={20} className="ml-1" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Posts */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="text-center">Loading...</div>
                            ) : isError ? (
                                <div className="text-center text-red-500">Error loading posts</div>
                            ) : displayedPosts.length > 0 ? (
                                displayedPosts.map((post) => {
                                    const postId = post.id || post.posted_on || Date.now()
                                    const isLiked = userReactions[`${postId}-like`]
                                    const isHearted = userReactions[`${postId}-heart`]
                                    const showComments = activeComments[postId]

                                    return (
                                        <div key={postId} className="bg-white rounded-md shadow-sm p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center">
                                                    <img
                                                        src={post.profile_image || "https://randomuser.me/api/portraits/men/32.jpg"}
                                                        alt={post.user_name || "Anonymous"}
                                                        className="w-10 h-10 rounded-full mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">{post.title}</h3>
                                                        <p className="text-xs text-gray-500">
                                                            {post.posted_on ? new Date(post.posted_on).toLocaleString() : "Just now"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-sm text-gray-600">
                                                    {expandedPosts[post?.id] || post.text.length <= CHARACTER_LIMIT
                                                        ? post.text
                                                        : `${post.text.substring(0, CHARACTER_LIMIT)}...`}
                                                    {post.text.length > CHARACTER_LIMIT && (
                                                        <span
                                                            className="text-blue-500 cursor-pointer ml-1"
                                                            onClick={() => toggleExpanded(postId)}
                                                        >
                                                            {expandedPosts[post?.id] ? "See less" : "See more"}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <motion.div
                                                    className="flex items-center mr-4 cursor-pointer"
                                                    onClick={() => handleReaction(post?.id, "like")}
                                                    whileTap={{ scale: 1.2 }}
                                                >
                                                    {isLiked ? (
                                                        <motion.div
                                                            initial={{ scale: 0.8 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            <AiFillLike className="mr-1 text-blue-500" size={18} />
                                                        </motion.div>
                                                    ) : (
                                                        <AiOutlineLike className="mr-1" size={18} />
                                                    )}
                                                    <span>{post.like_count || 0}</span>
                                                </motion.div>
                                                <motion.div
                                                    className="flex items-center mr-4 cursor-pointer"
                                                    onClick={() => handleReaction(post?.id, "heart")}
                                                    whileTap={{ scale: 1.2 }}
                                                >
                                                    {isHearted ? (
                                                        <motion.div
                                                            initial={{ scale: 0.8 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                        >
                                                            <FaHeart className="mr-1 text-red-500" size={16} />
                                                        </motion.div>
                                                    ) : (
                                                        <FaRegHeart className="mr-1" size={16} />
                                                    )}
                                                    <span>{post.heart_count || 0}</span>
                                                </motion.div>
                                                <div className="flex items-center cursor-pointer" onClick={() => toggleCommentSection(postId)}>
                                                    <FiMessageSquare className="mr-1" />
                                                    <span>{post.comment_count || 0} Comments</span>
                                                </div>
                                            </div>
                                            <AnimatePresence>
                                                {showComments && (
                                                    <motion.div
                                                        key={`comments-${postId}`}
                                                        className="mt-4 pt-4 border-t border-gray-100"
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {post.comments && post.comments.length > 0 ? (
                                                            <div className="mb-4 space-y-3">
                                                                {post.comments.map((comment, index) => (
                                                                    <div key={index} className="flex items-start">
                                                                        <img
                                                                            src={
                                                                                comment.profile_image ||
                                                                                "https://randomuser.me/api/portraits/men/32.jpg"
                                                                            }
                                                                            alt="User"
                                                                            className="w-8 h-8 rounded-full mr-2"
                                                                        />
                                                                        <div className="bg-gray-50 p-2 rounded-lg flex-1">
                                                                            <p className="text-xs font-medium">
                                                                                {comment.user_name || "Anonymous"}
                                                                            </p>
                                                                            <p className="text-sm">{comment.text}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-gray-500 mb-3">
                                                                No comments yet. Be the first to comment!
                                                            </p>
                                                        )}
                                                        <form
                                                            onSubmit={commentForm.handleSubmit((data) =>
                                                                handleCommentSubmit(post?.id, data),
                                                            )}
                                                        >
                                                            <div className="flex">
                                                                <input
                                                                    type="text"
                                                                    {...commentForm.register("text", { required: true })}
                                                                    placeholder="Write a comment..."
                                                                    className="flex-1 border border-gray-200 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600 transition cursor-pointer"
                                                                >
                                                                    <IoIosSend size={20} />
                                                                </button>
                                                            </div>
                                                            {commentForm.formState.errors.text && (
                                                                <p className="text-red-500 text-xs mt-1">
                                                                    Comment text is required
                                                                </p>
                                                            )}
                                                        </form>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                })
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
                                    className="px-3 py-1 border border-gray-300 rounded-md mr-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {getPaginationNumbers().map((page, index) =>
                                    page === "..." ? (
                                        <span key={`ellipsis-${index}`} className="mx-1 Disagree
                                        text-gray-500">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={`page-${page}`}
                                            className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 text-sm cursor-pointer ${
                                                currentPage === page
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
                                    className="px-3 py-1 border border-gray-300 rounded-md ml-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
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
                        <div className="mb-8 bg-gray-50 shadow-md rounded-md p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">NEW UPDATES</h2>
                            <div className="space-y-4">
                                {isLoadingUpdates ? (
                                    <p className="text-sm text-gray-500">Loading updates...</p>
                                ) : Array.isArray(showNewUpdate) && showNewUpdate.length > 0 ? (
                                    showNewUpdate.map((update) => (
                                        <div key={update.id} className="flex gap-3">
                                            <img
                                                src={update.user_image || "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738133725/56832_cdztsw.png"}
                                                alt="User"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm text-gray-600">
                                                    {expandedUpdate === update.id ? update.text : truncateText(update.text)}
                                                    {update.text.split(" ").length > UPDATE_WORD_LIMIT && (
                                                        <span
                                                            className="text-blue-500 cursor-pointer ml-1"
                                                            onClick={() => toggleUpdateExpanded(update.id)}
                                                        >
                                                            {expandedUpdate === update.id ? "See less" : "See more"}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No updates available.</p>
                                )}
                            </div>
                        </div>
                        <div className="bg-gray-50 shadow-md rounded-md p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">TOP CONTRIBUTORS</h2>
                            <p className="text-xs text-gray-500 mb-4">Of The Month</p>
                            <div className="space-y-5">
                                {showContributor ? (
                                    showContributor.length > 0 ? (
                                        showContributor.map((contributor) => (
                                            <div key={contributor.email} className="flex items-center">
                                                <img
                                                    src={
                                                        contributor.user_image ||
                                                        "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1738133725/56832_cdztsw.png"
                                                    }
                                                    alt={contributor.name}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-800 text-sm">{contributor.name}</h3>
                                                    <p className="text-xs text-gray-500">{contributor.profession}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">No contributors found.</p>
                                    )
                                ) : (
                                    <p className="text-sm text-gray-500">Loading contributors...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BrowseProjects