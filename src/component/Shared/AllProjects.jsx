"use client"

import { useState, useRef, useEffect } from "react"
import { FiChevronRight, FiSearch, FiMoreHorizontal, FiEye, FiArrowLeft, FiDollarSign, FiEyeOff } from "react-icons/fi"
import { useBitpojectMutation, useServiceCommunityDataQuery } from "../../Redux/feature/ApiSlice"

const AllProjects = () => {
    // State for sorting and filtering
    const [sortBy, setSortBy] = useState("Most recent")
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        projectType: [],
        skills: [],
    })
    const [priceRange, setPriceRange] = useState({
        fixedMin: "",
        fixedMax: "",
        hourlyMin: "",
        hourlyMax: "",
    })
    const [locationSearch, setLocationSearch] = useState("")
    const [clientSearch, setClientSearch] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [skillSearch, setSkillSearch] = useState("")

    // State for project actions
    const [activeProjectMenu, setActiveProjectMenu] = useState(null)
    const [showBidModal, setShowBidModal] = useState(false)
    const [bidAmount, setBidAmount] = useState("")
    const [currentProject, setCurrentProject] = useState(null)
    const [expandedDescriptions, setExpandedDescriptions] = useState({})
    const [bidError, setBidError] = useState("") // State for error messages

    // Fetch data from API
    const { data: showServiceData, isLoading, isError } = useServiceCommunityDataQuery()
    const [bitproject] = useBitpojectMutation()

    // Refs for dropdowns
    const sortDropdownRef = useRef(null)
    const projectMenuRefs = useRef({})
    const modalRef = useRef(null)

    // Debug API data
    useEffect(() => {
        console.log("showServiceData:", showServiceData)
    }, [showServiceData])

    // Dynamically generate top 5 most frequent skills from showServiceData
    const skillFrequency = showServiceData
        ? showServiceData
            .flatMap(item =>
                (item.skills || []).map(skill => skill && skill.name ? skill.name : "").filter(skill => skill.trim() !== "")
            )
            .reduce((acc, skill) => {
                if (skill && skill.trim() !== "") {
                    acc[skill] = (acc[skill] || 0) + 1
                }
                return acc
            }, {})
        : {}

    const availableSkills = Object.entries(skillFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill]) => skill)

    const [filteredProjects, setFilteredProjects] = useState(showServiceData || [])
    console.log(filteredProjects, "hello");

    // Helper function to transform API item to project structure
    const transformProject = (item) => ({
        id: item.id || "",
        title: item.title || "",
        budget: item.budget || "",
        details: item.details || "",
        skills: item.skills,
        duration: item.duration || "",
        timeAgo: item.time_passed || item.timeAgo ||"",
        attachments: item.images || [],
        type: item.payment_type === "fixed" ? "Fixed price" : "Hourly rate",
        payment_type: item.payment_type || "",
        fixedPrice: item.payment_type === "fixed" ? item.price : null,
        hourlyRate: item.payment_type === "hourly" ? item.price : null,
        createdAt: item.created_at ? new Date(item.created_at) : new Date(),
        address: item.address || "",
        requiredPerson: item.required_person || "",
        categories: (item.categories || []).map(cat => cat.name || ""),
        user: item.user || {}
    })


    // Handle sort option selection
    const handleSortSelect = (option) => {
        setSortBy(option)
        setShowSortOptions(false)

        let sorted = [...(showServiceData || [])].map(transformProject)
        if (option === "Most recent") {
            sorted.sort((a, b) => b.createdAt - a.createdAt)
        } else if (option === "Today") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            sorted = sorted.filter((project) => project.createdAt >= today)
        } else if (option === "Yesterday") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            sorted = sorted.filter((project) => project.createdAt >= yesterday && project.createdAt < today)
        } else if (option === "All") {
            sorted.sort((a, b) => b.createdAt - a.createdAt)
        }
        setFilteredProjects(sorted)
    }

    // Handle project type filter change
    const handleProjectTypeChange = (type) => {
        const updatedFilters = { ...selectedFilters }
        const mappedType = type === "Fixed price" ? "fixed" : "hourly"
        if (updatedFilters.projectType.includes(mappedType)) {
            updatedFilters.projectType = updatedFilters.projectType.filter((item) => item !== mappedType)
        } else {
            updatedFilters.projectType.push(mappedType)
        }
        setSelectedFilters(updatedFilters)
    }

    // Handle skill filter change
    const handleSkillChange = (skill) => {
        const updatedFilters = { ...selectedFilters }
        if (updatedFilters.skills.includes(skill)) {
            updatedFilters.skills = updatedFilters.skills.filter((item) => item !== skill)
        } else {
            if (updatedFilters.skills.length < 5) {
                updatedFilters.skills.push(skill)
            }
        }
        setSelectedFilters(updatedFilters)
    }

    // Toggle project menu
    const toggleProjectMenu = (projectId) => {
        setActiveProjectMenu(activeProjectMenu === projectId ? null : projectId)
    }

    // Handle bid for project
    const handleBidForProject = (project) => {
        setCurrentProject(project)
        setActiveProjectMenu(null)
        setShowBidModal(true)
        setBidError("") // Reset error message
    }

    // Handle hide project
    const handleHideProject = (projectId) => {
        setFilteredProjects(filteredProjects.filter((project) => project.id !== projectId))
        setActiveProjectMenu(null)
    }

    // Handle bid submission
    const handleSubmitBid = async () => {
        if (!currentProject || !bidAmount) {
            setBidError("Please enter a bid amount.")
            return
        }

        const bidAmountNumber = parseFloat(bidAmount)
        if (isNaN(bidAmountNumber) || bidAmountNumber <= 0) {
            setBidError("Please enter a valid bid amount.")
            return
        }

        const bidData = {
            service_id: currentProject.id,
            bid_amount: bidAmountNumber
        }

        try {
            await bitproject({ warning: bidData }).unwrap()
            console.log(`Successfully submitted bid of ${bidAmount} for project ${currentProject.id}`)
            setShowBidModal(false)
            setBidAmount("")
            setCurrentProject(null)
            setBidError("")
        } catch (error) {
            console.error("Failed to submit bid:", error)
            setBidError("Failed to submit bid. Please try again.")
        }
    }

    // Toggle description expansion
    const toggleDescription = (projectId) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [projectId]: !expandedDescriptions[projectId],
        })
    }

    // Check if details is long enough to need "see more"
    const needsSeeMore = (details) => {
        return details.split(" ").length > 150
    }

    // Truncate details if needed
    const getTruncatedDescription = (details) => {
        if (!needsSeeMore(details)) return details
        const words = details.split(" ")
        return words.slice(0, 150).join(" ") + "..."
    }

    // Filter skills based on search
    const filteredSkills = skillSearch
        ? availableSkills.filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))
        : availableSkills

    // Apply filters
    useEffect(() => {
        let result = [...(showServiceData || [])].map(transformProject)

        // Filter by project type
        if (selectedFilters.projectType.length > 0) {
            result = result.filter((project) => selectedFilters.projectType.includes(project.payment_type))
        }

        // Filter by skills
        if (selectedFilters.skills.length > 0) {
            result = result.filter((project) =>
                project.skills.some((skill) => selectedFilters.skills.includes(skill))
            )
        }

        // Filter by price range
        if (priceRange.fixedMin) {
            result = result.filter((project) =>
                project.payment_type === "fixed" ? project.fixedPrice >= Number(priceRange.fixedMin) : true
            )
        }
        if (priceRange.fixedMax) {
            result = result.filter((project) =>
                project.payment_type === "fixed" ? project.fixedPrice <= Number(priceRange.fixedMax) : true
            )
        }
        if (priceRange.hourlyMin) {
            result = result.filter((project) =>
                project.payment_type === "hourly" ? project.hourlyRate >= Number(priceRange.hourlyMin) : true
            )
        }
        if (priceRange.hourlyMax) {
            result = result.filter((project) =>
                project.payment_type === "hourly" ? project.hourlyRate <= Number(priceRange.hourlyMax) : true
            )
        }

        // Filter by search query (only title)
        if (searchQuery) {
            result = result.filter((project) =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by location
        if (locationSearch) {
            result = result.filter((project) =>
                project.address.toLowerCase().includes(locationSearch.toLowerCase())
            )
        }

        // Filter by client
        if (clientSearch) {
            result = result.filter((project) =>
                project.user?.name?.toLowerCase().includes(clientSearch.toLowerCase()) || false
            )
        }

        // Apply sorting
        if (sortBy === "Most recent") {
            result.sort((a, b) => b.createdAt - a.createdAt)
        } else if (sortBy === "Today") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            result = result.filter((project) => project.createdAt >= today)
        } else if (sortBy === "Yesterday") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            result = result.filter((project) => project.createdAt >= yesterday && project.createdAt < today)
        } else if (sortBy === "All") {
            result.sort((a, b) => b.createdAt - a.createdAt)
        }

        console.log("Filtered Projects:", result) // Debug filtered projects
        setFilteredProjects(result)
    }, [selectedFilters, priceRange, searchQuery, locationSearch, clientSearch, showServiceData, sortBy])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setShowSortOptions(false)
            }
            if (
                activeProjectMenu &&
                projectMenuRefs.current[activeProjectMenu] &&
                !projectMenuRefs.current[activeProjectMenu].contains(event.target)
            ) {
                setActiveProjectMenu(null)
            }
            if (showBidModal && modalRef.current && !modalRef.current.contains(event.target)) {
                setShowBidModal(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [activeProjectMenu, showBidModal])

    // Update filtered projects when API data changes
    useEffect(() => {
        setFilteredProjects(showServiceData ? showServiceData.map(transformProject) : [])
    }, [showServiceData])

    return (
        <div className="bg-slate-50 min-h-screen roboto pt-10">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Main content */}
                    <div className="w-full md:w-3/4">
                        {/* Sort and search */}
                        <div className="flex flex-col md:flex-row justify-between mb-6">
                            <div className="relative mb-4 md:mb-0" ref={sortDropdownRef}>
                                <div className="flex items-center text-md text-gray-600">
                                    <span className="mr-2 font-bold">Sort by:</span>
                                    <button
                                        className="flex items-center text-gray-800 cursor-pointer bg-white px-3 py-1 shadow rounded-sm"
                                        onClick={() => setShowSortOptions(!showSortOptions)}
                                    >
                                        {sortBy}
                                        <FiChevronRight className="ml-1" />
                                    </button>
                                </div>
                                {showSortOptions && (
                                    <div className="absolute z-10 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-1 cursor-pointer">
                                        {["All", "Most recent", "Today", "Yesterday"].map((option) => (
                                            <button
                                                key={option}
                                                className={`cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === option ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                                                onClick={() => handleSortSelect(option)}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by project title"
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Projects list */}
                        {isLoading ? (
                            <div className="bg-white rounded-md shadow-sm p-8 text-center">
                                <p className="text-gray-500">Loading projects...</p>
                            </div>
                        ) : isError ? (
                            <div className="bg-white rounded-md shadow-sm p-8 text-center">
                                <p className="text-red-500">Error loading projects. Please try again later.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProjects.map((item) => {
                                    const project = transformProject(item)
                                    console.log(project, "aaaaaaa");
                                    console.log(`Project ${project.id} skills:`, project.skills)
                                    return (
                                        <div key={project.id} className="bg-white rounded-md shadow-sm p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                                                    <p className="text-sm text-gray-500">{project.budget}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-sm text-gray-500 mr-4">
                                                        Duration: <span className="font-semibold text-gray-600">{project.duration}</span>
                                                    </div>
                                                    <div className="relative">
                                                        <button
                                                            className="text-gray-500 hover:text-gray-700 pt-2 cursor-pointer"
                                                            onClick={() => toggleProjectMenu(project.id)}
                                                        >
                                                            <FiMoreHorizontal size={18} />
                                                        </button>
                                                        {activeProjectMenu === project.id && (
                                                            <div
                                                                ref={(el) => (projectMenuRefs.current[project.id] = el)}
                                                                className="absolute z-20 right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1"
                                                            >
                                                                <button
                                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 cursor-pointer flex items-center"
                                                                    onClick={() => handleBidForProject(project)}
                                                                >
                                                                    <FiDollarSign className="mr-2" size={16} />
                                                                    Bid for the project
                                                                </button>
                                                                <button
                                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 cursor-pointer flex items-center"
                                                                    onClick={() => handleHideProject(project.id)}
                                                                >
                                                                    <FiEyeOff className="mr-2" size={16} />
                                                                    Hide the post
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-sm text-gray-600">
                                                    {expandedDescriptions[project.id]
                                                        ? project.details
                                                        : getTruncatedDescription(project.details)}
                                                    {needsSeeMore(project.details) && (
                                                        <span
                                                            className="text-blue-500 cursor-pointer ml-1"
                                                            onClick={() => toggleDescription(project.id)}
                                                        >
                                                            {expandedDescriptions[project.id] ? "see less" : "see more"}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div>
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="text-sm text-gray-600 ">Skills Required:</div>
                                                                <div className="flex items-center  gap-2">
                                                                    {project.skills && project.skills.length > 0 ? (
                                                                        project.skills.map((skill, index) => (
                                                                            <span
                                                                                key={skill.id}
                                                                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                                                                            >
                                                                                {skill.name}
                                                                                {index < project.skills.length - 1 && ","}
                                                                            </span>
                                                                        ))
                                                                    ) : (
                                                                        <span className="text-xs text-gray-500">No skills listed</span>
                                                                    )}
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="text-[13px]">Remaining: {project?.timeAgo}</div>
                                            </div>
                                            {project.attachments.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <div className="flex gap-2">
                                                        {project.attachments.map((attachment, index) => (
                                                            <div
                                                                key={index}
                                                                className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600"
                                                            >
                                                                Attachment {attachment}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                                {filteredProjects.length === 0 && (
                                    <div className="bg-white rounded-md shadow-sm p-8 text-center">
                                        <p className="text-gray-500">No projects found matching your criteria.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar filters */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-md shadow-sm p-5">
                            <h2 className="text-lg font-medium text-slate-800 mb-5">Filters</h2>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Project type</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedFilters.projectType.includes("hourly")}
                                            onChange={() => handleProjectTypeChange("Hourly rate")}
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Hourly rate</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedFilters.projectType.includes("fixed")}
                                            onChange={() => handleProjectTypeChange("Fixed price")}
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Fixed price</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Fixed price (USD)</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Min</label>
                                        <input
                                            type="text"
                                            placeholder="Enter here"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={priceRange.fixedMin}
                                            onChange={(e) => setPriceRange({ ...priceRange, fixedMin: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Max</label>
                                        <input
                                            type="text"
                                            placeholder="Enter here"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={priceRange.fixedMax}
                                            onChange={(e) => setPriceRange({ ...priceRange, fixedMax: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Hourly rate (USD)</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Min</label>
                                        <input
                                            type="text"
                                            placeholder="Enter here"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={priceRange.hourlyMin}
                                            onChange={(e) => setPriceRange({ ...priceRange, hourlyMin: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-600 mb-1">Max</label>
                                        <input
                                            type="text"
                                            placeholder="Enter here"
                                            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={priceRange.hourlyMax}
                                            onChange={(e) => setPriceRange({ ...priceRange, hourlyMax: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Skills (Max 5)</h3>
                                <div className="relative mb-3">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="text-gray-400" size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Type skill name"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={skillSearch}
                                        onChange={(e) => setSkillSearch(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2 mt-3">
                                    {filteredSkills.map((skill) => (
                                        <label key={skill} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={selectedFilters.skills.includes(skill)}
                                                onChange={() => handleSkillChange(skill)}
                                                disabled={!selectedFilters.skills.includes(skill) && selectedFilters.skills.length >= 5}
                                            />
                                            <span className="ml-2 text-sm text-slate-600">{skill}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Project location</h3>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="text-gray-400" size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter location"
                                        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <FiEye className="text-gray-400" size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Client from</h3>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiSearch className="text-gray-400" size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter country"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        value={clientSearch}
                                        onChange={(e) => setClientSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showBidModal && (
                <div className="fixed inset-0 backdrop-blur-[3px] flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-slate-50 rounded-lg shadow-lg w-full max-w-md p-6">
                        <div className="flex items-center mb-6">
                            <button
                                className="flex items-center text-slate-700 cursor-pointer"
                                onClick={() => setShowBidModal(false)}
                            >
                                <FiArrowLeft className="mr-2" />
                                <span>Back</span>
                            </button>
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-semibold text-slate-800">Bid for The Project</h2>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bidding amount</label>
                            <input
                                type="text"
                                placeholder="Enter bid amount (USD)"
                                className="w-full border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
                            {bidError && (
                                <p className="text-red-500 text-sm mt-2">{bidError}</p>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded transition-colors cursor-pointer"
                                onClick={handleSubmitBid}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllProjects