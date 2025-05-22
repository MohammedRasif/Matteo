"use client"

import { useState, useRef, useEffect } from "react"
import { FiChevronRight, FiSearch, FiMoreHorizontal, FiEye, FiArrowLeft, FiDollarSign, FiEyeOff } from "react-icons/fi"
import { useServiceCommunityDataQuery } from "../../Redux/feature/ApiSlice"

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

    const {data: showServiceData} = useServiceCommunityDataQuery()
    console.log(showServiceData);

    // Refs for dropdowns
    const sortDropdownRef = useRef(null)
    const projectMenuRefs = useRef({})
    const modalRef = useRef(null)

    // Sample project data with longer descriptions
    const initialProjects = [
        {
            id: 1,
            title: "Manual Data Entry From Text Documents",
            budget: "Budget 20USD/4 Person Required",
            description:
                "Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry.",
            skills: ["Data Processing", "Data Entry", "Microsoft Access", "Web Research"],
            time: "10 days",
            timeAgo: "10 min ago",
            attachments: [],
            type: "Fixed price",
            fixedPrice: 20,
            createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        },
        {
            id: 2,
            title: "Manual Data Entry From Text Documents",
            budget: "Budget 20USD/Per Hour (4 Person Required)",
            description:
                "Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
            skills: ["Data Processing", "Data Entry", "Microsoft Access", "Web Research"],
            time: "6 Hours",
            timeAgo: "10 min ago",
            attachments: [1, 2, 3],
            type: "Hourly rate",
            hourlyRate: 20,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (yesterday)
        },
        {
            id: 3,
            title: "Manual Data Entry From Text Documents",
            budget: "Budget 20USD/4 Person Required",
            description:
                "Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
            skills: ["Graphic Design", "Web design", "Microsoft Access", "Web Research"],
            time: "10 Days",
            timeAgo: "10 min ago",
            attachments: [],
            type: "Fixed price",
            fixedPrice: 20,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
            id: 4,
            title: "Manual Data Entry From Text Documents",
            budget: "Budget 20USD/Per Hour",
            description:
                "Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the Lorem ipsum is simply dummy text of the printing and type setting industry. Lorem ipsum has been the industry's standard dummy text ever since the...",
            skills: ["Typing", "Web design", "Microsoft Access", "Web Research"],
            time: "6 Hours",
            timeAgo: "10 min ago",
            attachments: [1, 2, 3],
            type: "Hourly rate",
            hourlyRate: 20,
            createdAt: new Date(), // Today
        },
    ]

    const [projects, setProjects] = useState(initialProjects)
    const [filteredProjects, setFilteredProjects] = useState(initialProjects)

    // Available skills for filtering
    const availableSkills = ["Typing", "Graphic Design", "Web design", "Data Processing", "Data Entry"]

    // Handle sort option selection
    const handleSortSelect = (option) => {
        setSortBy(option)
        setShowSortOptions(false)

        // Apply sorting logic
        let sorted = [...projects]

        if (option === "Most recent") {
            sorted.sort((a, b) => b.createdAt - a.createdAt)
        } else if (option === "Today") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            sorted = projects.filter((project) => project.createdAt >= today)
        } else if (option === "Yesterday") {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const yesterday = new Date(today)
            yesterday.setDate(yesterday.getDate() - 1)
            sorted = projects.filter((project) => project.createdAt >= yesterday && project.createdAt < today)
        } else if (option === "All") {
            // Keep all projects, already sorted by Most recent
            sorted.sort((a, b) => b.createdAt - a.createdAt)
        }

        setFilteredProjects(sorted)
    }

    // Handle project type filter change
    const handleProjectTypeChange = (type) => {
        const updatedFilters = { ...selectedFilters }

        if (updatedFilters.projectType.includes(type)) {
            updatedFilters.projectType = updatedFilters.projectType.filter((item) => item !== type)
        } else {
            updatedFilters.projectType.push(type)
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
        if (activeProjectMenu === projectId) {
            setActiveProjectMenu(null)
        } else {
            setActiveProjectMenu(projectId)
        }
    }

    // Handle bid for project
    const handleBidForProject = (project) => {
        setCurrentProject(project)
        setActiveProjectMenu(null)
        setShowBidModal(true)
    }

    // Handle hide project
    const handleHideProject = (projectId) => {
        const updatedProjects = projects.filter((project) => project.id !== projectId)
        setProjects(updatedProjects)
        setFilteredProjects(filteredProjects.filter((project) => project.id !== projectId))
        setActiveProjectMenu(null)
    }

    // Handle bid submission
    const handleSubmitBid = () => {
        // Here you would typically send the bid to your backend
        console.log(`Submitted bid of ${bidAmount} for project ${currentProject.id}`)
        setShowBidModal(false)
        setBidAmount("")
        setCurrentProject(null)
    }

    // Toggle description expansion
    const toggleDescription = (projectId) => {
        setExpandedDescriptions({
            ...expandedDescriptions,
            [projectId]: !expandedDescriptions[projectId],
        })
    }

    // Check if description is long enough to need "see more"
    const needsSeeMore = (description) => {
        return description.split(" ").length > 150
    }

    // Truncate description if needed
    const getTruncatedDescription = (description) => {
        if (!needsSeeMore(description)) return description

        const words = description.split(" ")
        return words.slice(0, 150).join(" ") + "..."
    }

    // Filter skills based on search
    const filteredSkills = skillSearch
        ? availableSkills.filter((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))
        : availableSkills

    // Apply filters
    useEffect(() => {
        let result = [...projects]

        // Filter by project type if any project types are selected
        if (selectedFilters.projectType.length > 0) {
            result = result.filter((project) => selectedFilters.projectType.includes(project.type))
        }

        // Filter by skills if any skills are selected
        if (selectedFilters.skills.length > 0) {
            result = result.filter((project) => project.skills.some((skill) => selectedFilters.skills.includes(skill)))
        }

        // Filter by price range if any price range values are set
        if (priceRange.fixedMin) {
            result = result.filter((project) =>
                project.type === "Fixed price" ? project.fixedPrice >= Number(priceRange.fixedMin) : true,
            )
        }

        if (priceRange.fixedMax) {
            result = result.filter((project) =>
                project.type === "Fixed price" ? project.fixedPrice <= Number(priceRange.fixedMax) : true,
            )
        }

        if (priceRange.hourlyMin) {
            result = result.filter((project) =>
                project.type === "Hourly rate" ? project.hourlyRate >= Number(priceRange.hourlyMin) : true,
            )
        }

        if (priceRange.hourlyMax) {
            result = result.filter((project) =>
                project.type === "Hourly rate" ? project.hourlyRate <= Number(priceRange.hourlyMax) : true,
            )
        }

        // Apply search query if a search term is entered
        if (searchQuery) {
            result = result.filter(
                (project) =>
                    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Apply sorting after filtering
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

        setFilteredProjects(result)
    }, [selectedFilters, priceRange, searchQuery, projects, sortBy])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close sort dropdown
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setShowSortOptions(false)
            }

            // Close project menu
            if (
                activeProjectMenu &&
                projectMenuRefs.current[activeProjectMenu] &&
                !projectMenuRefs.current[activeProjectMenu].contains(event.target)
            ) {
                setActiveProjectMenu(null)
            }

            // Close modal when clicking outside
            if (showBidModal && modalRef.current && !modalRef.current.contains(event.target)) {
                setShowBidModal(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [activeProjectMenu, showBidModal])

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
                                        className="flex items-center text-gray-800  cursor-pointer bg-white px-3 py-1 shadow rounded-sm"
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
                                                className={` cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100  ${sortBy === option ? "bg-blue-50 text-blue-700" : "text-gray-700"
                                                    }`}
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
                                    placeholder="Search"
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Projects list */}
                        <div className="space-y-4">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="bg-white rounded-md shadow-sm p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{project.title}</h3>
                                            <p className="text-sm text-gray-500">{project.budget}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-sm text-gray-500 mr-4">Time: <span className="font-semibold text-gray-600">{project.time}</span></div>
                                            <div className="relative">
                                                <button
                                                    className="text-gray-500 hover:text-gray-700 pt-2 cursor-pointer"
                                                    onClick={() => toggleProjectMenu(project.id)}
                                                >
                                                    <FiMoreHorizontal size={18} />
                                                </button>

                                                {/* Project menu */}
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
                                                ? project.description
                                                : getTruncatedDescription(project.description)}

                                            {needsSeeMore(project.description) && (
                                                <span
                                                    className="text-blue-500 cursor-pointer ml-1"
                                                    onClick={() => toggleDescription(project.id)}
                                                >
                                                    {expandedDescriptions[project.id] ? "see less" : "see more"}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Skill Required:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {project.skills.map((skill, index) => (
                                                    <span key={index} className="text-xs text-blue-600 hover:underline cursor-pointer">
                                                        {skill}
                                                        {index < project.skills.length - 1 && ", "}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500 mt-2 md:mt-0">{project.timeAgo}</div>
                                    </div>

                                    {project.attachments.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <div className="flex gap-2">
                                                {project.attachments.map((attachment, index) => (
                                                    <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                        Attachment {attachment}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {filteredProjects.length === 0 && (
                                <div className="bg-white rounded-md shadow-sm p-8 text-center">
                                    <p className="text-gray-500">No projects found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar filters */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-md shadow-sm p-5">
                            <h2 className="text-lg font-medium text-slate-800 mb-5">Filters</h2>

                            {/* Project type */}
                            <div className="mb-5">
                                <h3 className="text-base font-medium text-slate-800 mb-3">Project type</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedFilters.projectType.includes("Hourly rate")}
                                            onChange={() => handleProjectTypeChange("Hourly rate")}
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Hourly rate</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            checked={selectedFilters.projectType.includes("Fixed price")}
                                            onChange={() => handleProjectTypeChange("Fixed price")}
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Fixed price</span>
                                    </label>
                                </div>
                            </div>

                            {/* Fixed price range */}
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

                            {/* Hourly rate range */}
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

                            {/* Skills */}
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

                            {/* Project location */}
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

                            {/* Client from */}
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

            {/* Bid Modal */}
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
                                placeholder="Enter here"
                                className="w-full border border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
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