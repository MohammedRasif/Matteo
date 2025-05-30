import { useState, useEffect, useRef } from "react";
import {
	MoreHorizontal,
	AlertTriangle,
	Trash2,
	X,
	AlertCircle,
} from "lucide-react";
import { GoArrowLeft } from "react-icons/go";
import {
	useSupporBlockReportsQuery,
	useSupporPostdeleteMutation,
	useSupporReportQuery,
} from "../../../Redux/feature/ApiSlice";

const AdminDashboardBlog = () => {
	// State for active tab
	const [activeTab, setActiveTab] = useState("Reports");
	const [searchInput, setSearchInput] = useState("");

	// State for action dropdown and popups
	const [activeActionDropdown, setActiveActionDropdown] = useState(null);
	const [showWarningPopup, setShowWarningPopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [showViewReportPopup, setShowViewReportPopup] = useState(false);
	const [selectedPost, setSelectedPost] = useState(null);
	const [selectedReport, setSelectedReport] = useState(null);
	const [deleteError, setDeleteError] = useState(null);

	// Fetch data from API
	const {
		data: blogReport,
		isLoading: reportsLoading,
		error: reportsError,
	} = useSupporBlockReportsQuery();
	const {
		data: blogPost,
		isLoading: postsLoading,
		error: postsError,
	} = useSupporReportQuery();
	// Post delete mutation
	const [supporPostdelete] = useSupporPostdeleteMutation();

	// Log fetched data for debugging
	useEffect(() => {
		if (blogReport) console.log("Fetched Reports:", blogReport);
		if (blogPost) console.log("Fetched Posts:", blogPost);
	}, [blogReport, blogPost]);

	// Ref for dropdowns
	const dropdownRefs = useRef({});

	// Filtered data based on search
	const [reports, setReports] = useState([]);
	const [posts, setPosts] = useState([]);

	// Update reports and posts when API data changes
	useEffect(() => {
		if (blogReport) {
			setReports(blogReport);
		}
		if (blogPost) {
			setPosts(blogPost);
		}
	}, [blogReport, blogPost]);

	// Close dropdowns when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			let isOutside = true;
			Object.values(dropdownRefs.current).forEach((ref) => {
				if (ref && ref.contains(event.target)) {
					isOutside = false;
				}
			});
			if (isOutside) {
				setActiveActionDropdown(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Handle search by ID
	useEffect(() => {
		if (searchInput.trim() === "") {
			setReports(blogReport || []);
			setPosts(blogPost || []);
		} else {
			const filteredReports = (blogReport || []).filter((report) =>
				report.blog_id
					.toString()
					.toLowerCase()
					.includes(searchInput.toLowerCase())
			);
			const filteredPosts = (blogPost || []).filter((post) =>
				post.id
					.toString()
					.toLowerCase()
					.includes(searchInput.toLowerCase())
			);
			setReports(filteredReports);
			setPosts(filteredPosts);
		}
	}, [searchInput, blogReport, blogPost]);

	// Handle view report click
	const handleViewReport = (report, e) => {
		e.preventDefault();
		setSelectedReport(report);
		setShowViewReportPopup(true);
	};

	// Handle action click
	const handleActionClick = (action, post) => {
		setSelectedPost(post);
		console.log(`Action: ${action}, Post: ${post.id}`);
		if (action === "warning") {
			setShowWarningPopup(true);
		} else if (action === "delete") {
			setShowDeletePopup(true);
		}
		setActiveActionDropdown(null);
	};

	// Handle warning submission
	const handleWarningSubmit = () => {
		console.log(`Warning sent to post ${selectedPost?.id}`);
		setShowWarningPopup(false);
	};

	// Handle delete confirmation
	const handleDeleteConfirm = async () => {
		try {
			await supporPostdelete(selectedPost.id).unwrap();
			console.log(`Deleted post ${selectedPost?.id}`);
			const updatedPosts = posts.filter(
				(post) => post.id !== selectedPost?.id
			);
			setPosts(updatedPosts);
			setDeleteError(null);
		} catch (error) {
			console.error("Failed to delete post:", error);
			setDeleteError("Failed to delete post. Please try again.");
		}
		setShowDeletePopup(false);
	};

	// Handle loading and error states
	if (reportsLoading || postsLoading) {
		return <div>Loading...</div>;
	}
	if (reportsError || postsError) {
		return <div>Error: {reportsError?.message || postsError?.message}</div>;
	}

	return (
		<div className="min-h-screen roboto">
			<div className="container mx-auto px-4 py-6">
				{/* Header */}
				<h1 className="text-2xl font-semibold text-gray-800 py-6">
					Blog reports
				</h1>

				{/* Tabs */}
				<div className="mb-6 flex justify-between">
					<div></div>
					<div className="inline-flex rounded-md border border-[#848239]">
						<button
							onClick={() => setActiveTab("Reports")}
							className={`px-4 py-2 text-sm font-medium cursor-pointer ${
								activeTab === "Reports"
									? "bg-[#848239] text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300"
							} rounded-l-md`}
						>
							Reports
						</button>
						<button
							onClick={() => setActiveTab("Posts")}
							className={`px-4 py-2 text-sm font-medium cursor-pointer ${
								activeTab === "Posts"
									? "bg-[#848239] text-white"
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
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
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

				{/* Delete Error Message */}
				{deleteError && (
					<div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
						{deleteError}
					</div>
				)}

				{/* Reports Table */}
				{activeTab === "Reports" && (
					<div className="overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-300 rounded-lg text-left text-sm font-medium text-gray-700">
									<th className="px-6 py-3">Reported by</th>
									<th className="px-6 py-3">
										Report details
									</th>
									<th className="px-6 py-3">
										Date of creation
									</th>
									<th className="px-6 py-3">Post ID</th>
									<th className="px-6 py-3">Status</th>
								</tr>
							</thead>
							<tbody>
								{reports.map((report) => (
									<tr
										key={report.id}
										className="border-b border-gray-300 text-sm"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<img
													src="/placeholder.png"
													alt={report.reporter_name}
													className="h-8 w-8 rounded-full object-cover"
												/>
												<span className="text-gray-700">
													{report.reporter_name}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<a
												href="#"
												className="bg-blue-500 text-white text-xs px-3 py-1 rounded-2xl cursor-pointer hover:underline"
												onClick={(e) =>
													handleViewReport(report, e)
												}
											>
												View
											</a>
										</td>
										<td className="px-6 py-4 text-gray-700">
											{report.created_at}
										</td>
										<td className="px-6 py-4">
											<a
												href="#"
												className="text-blue-500 hover:underline"
											>
												{report.blog_id}
											</a>
										</td>
										<td className="px-6 py-4">
											<span>{report.status}</span>
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
									<th className="px-6 py-3">
										Date of creation
									</th>
									<th className="px-6 py-3">Post ID</th>
									<th className="px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{posts.map((post) => (
									<tr
										key={post.id}
										className="border-b border-gray-300 text-sm"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<img
													src="/placeholder.png"
													alt={post.author}
													className="h-8 w-8 rounded-full object-cover"
												/>
												<span className="text-gray-700">
													{post.author}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 text-gray-700">
											{post.posted_on}
										</td>
										<td className="px-6 py-4">
											<a
												href="#"
												className="text-blue-500 hover:underline"
											>
												{post.id}
											</a>
										</td>
										<td className="px-6 py-4 relative">
											<button
												className="text-gray-400 hover:text-gray-600"
												onClick={(e) => {
													setActiveActionDropdown(
														activeActionDropdown ===
															post.id
															? null
															: post.id
													);
													const rect =
														e.currentTarget.getBoundingClientRect();
													dropdownRefs.current[
														post.id
													] = { rect };
												}}
											>
												<MoreHorizontal className="h-5 w-5" />
											</button>
											{activeActionDropdown ===
												post.id && (
												<div
													className="fixed z-30 w-48 rounded-md bg-white shadow-lg"
													style={{
														top: `${
															dropdownRefs
																.current[
																post.id
															]?.rect.bottom +
															window.scrollY
														}px`,
														left: `${Math.min(
															dropdownRefs
																.current[
																post.id
															]?.rect.left,
															window.innerWidth -
																200
														)}px`,
													}}
												>
													<div className="py-1">
														<button
															onClick={() =>
																handleActionClick(
																	"warning",
																	post
																)
															}
															className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
														>
															<AlertTriangle className="h-4 w-4" />
															Give warning
														</button>
														<button
															onClick={() =>
																handleActionClick(
																	"delete",
																	post
																)
															}
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

				{/* View Report Popup */}
				{showViewReportPopup && selectedReport && (
					<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
						<div className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full">
							<div className="flex items-center justify-between mb-4">
								<button
									onClick={() =>
										setShowViewReportPopup(false)
									}
									className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
								>
									<GoArrowLeft className="h-4 w-4 mt-[4px]" />
									back
								</button>
							</div>
							<div className="flex items-center justify-center my-2">
								<h1 className="border-[#848239] font-medium text-[#848239] border px-6 py-2 w-56 rounded-md flex items-center justify-center">
									Description of report
								</h1>
							</div>
							<p className="px-10 text-[14px] text-gray-500">
								{selectedReport.details}
							</p>
							<div className="flex justify-center gap-2 mt-5">
								{selectedReport.status === "In-progress" && (
									<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
										Mark as Solved
									</button>
								)}
								<button
									onClick={() =>
										setShowViewReportPopup(false)
									}
									className="px-10 py-1 bg-[#848239] text-white rounded-md cursor-pointer"
								>
									Okay
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
								<h1 className="border-[#848239] font-medium text-[#848239] border px-6 py-2 w-56 rounded-md flex items-center justify-center">
									Warning
								</h1>
							</div>
							<p className="px-10 text-[14px] text-gray-500">
								Are you sure you want to issue a warning for
								post ID:{" "}
								<span className="font-medium">
									{selectedPost?.id}
								</span>
								? This action will notify the user.
							</p>
							<div className="flex justify-center gap-2 mt-5">
								<button
									onClick={handleWarningSubmit}
									className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
								>
									Send Warning
								</button>
								<button
									onClick={() => setShowWarningPopup(false)}
									className="px-10 py-1 bg-[#848239] text-white rounded-md cursor-pointer"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Delete Confirmation Popup */}
				{showDeletePopup && (
					<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
						<div className="bg-white rounded-lg p-6 max-w-md w-full">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center gap-2">
									<div className="p-2 rounded-full bg-red-100">
										<AlertCircle className="h-6 w-6 text-red-600" />
									</div>
									<h3 className="text-lg font-medium text-gray-900">
										Confirm Deletion
									</h3>
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
								<span className="font-medium">
									{selectedPost?.id}
								</span>
								? This action cannot be undone.
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
		</div>
	);
};

export default AdminDashboardBlog;
