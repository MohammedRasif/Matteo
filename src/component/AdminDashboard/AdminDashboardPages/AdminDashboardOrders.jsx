// import { useState, useEffect, useRef } from "react"

// import { Search, ChevronRight, ChevronDown, Eye, X, Check, FileText, List, MoreHorizontal } from "lucide-react"
// import { NavLink } from "react-router-dom"
// import { useManagementOderCancelMutation, useManagementOderPartialMutation, useManagementOderViewMutation, useManagementOrdersListQuery } from "../../../Redux/feature/ApiSlice"

// const AdminDashboardOrders = () => {
//   // Sample data
//   const allOrders = [
//     {
//       id: "46593292",
//       buyerName: "username1335",
//       sellerName: "username1335",
//       amount: "$33,000",
//       status: "In-progress",
//       buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
//       sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
//     },
//     {
//       id: "28474562",
//       buyerName: "username1563",
//       sellerName: "username1335",
//       amount: "$65,000",
//       status: "Delivered",
//       buyerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
//       sellerAvatar: "https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
//     },
//   ]

//   const { data: managementOrders } = useManagementOrdersListQuery()
//   const { data: managemantOderView} = useManagementOderViewMutation()
//   const [managementOderCancel] = useManagementOderCancelMutation()
//   const [managementOderPartial] = useManagementOderPartialMutation()
//   console.log(managementOrders, "hello")
//   // State for filtered orders, search input, and filter dropdown
//   const [orders, setOrders] = useState(allOrders)
//   const [searchInput, setSearchInput] = useState("")
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false)
//   const [activeFilter, setActiveFilter] = useState("Active orders")

//   // State for action list visibility, selected action, and popup
//   const [visibleActionList, setVisibleActionList] = useState(null)
//   const [selectedActions, setSelectedActions] = useState({})
//   const [activePopup, setActivePopup] = useState(null)
//   const [activeOrderId, setActiveOrderId] = useState(null)
//   const [cancelReason, setCancelReason] = useState("")
//   const [settlementData, setSettlementData] = useState({
//     seller_percentage: "",
//     buyer_percentage: "",
//     note: "",
//   })

//   // Refs for closing filter dropdown, action lists, and popups
//   const filterDropdownRef = useRef(null)
//   const actionListRefs = useRef({})
//   const popupRef = useRef(null)

//   // Filter options
//   const filterOptions = ["Cancel requests", "Delivered", "Late", "Cancelled", "In progress", "Active orders"]

//   // Handle search by ID
//   useEffect(() => {
//     if (searchInput.trim() === "") {
//       applyStatusFilter(activeFilter)
//     } else {
//       const filtered = allOrders.filter(
//         (order) => order.id.includes(searchInput) || order.buyerName.toLowerCase().includes(searchInput.toLowerCase()),
//       )
//       if (activeFilter !== "Active orders") {
//         const statusKey =
//           activeFilter === "In progress"
//             ? "In-progress"
//             : activeFilter === "Cancel requests"
//             ? "Cancel request"
//             : activeFilter
//         setOrders(filtered.filter((order) => order.status === statusKey))
//       } else {
//         setOrders(filtered)
//       }
//     }
//   }, [searchInput, activeFilter])

//   // Close filter dropdown and action lists when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
//         setShowFilterDropdown(false)
//       }
//       const isOutsideActionList = Object.values(actionListRefs.current).every(
//         (ref) => !ref || !ref.contains(event.target),
//       )
//       if (isOutsideActionList) {
//         setVisibleActionList(null)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   // Prevent body scroll when popup is open
//   useEffect(() => {
//     if (activePopup) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = "auto"
//     }
//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [activePopup])

//   // Handle cancel form submission
//   const handleCancelSubmit = async () => {
//     if (!cancelReason.trim()) {
//       alert("Please provide a reason for cancellation")
//       return
//     }

//     try {
//       await managementOderCancel({
//         text: { reason: cancelReason },
//         id: activeOrderId,
//       }).unwrap()
//       alert("Order cancelled successfully")
//       setCancelReason("")
//       handleClosePopup()
//     } catch (error) {
//       console.error("Failed to cancel order:", error)
//       alert("Failed to cancel order")
//     }
//   }

//   // Handle partial settlement form submission
//   const handleSettlementSubmit = async () => {
//     const { seller_percentage, buyer_percentage, note } = settlementData

//     // Validate inputs
//     if (!seller_percentage || !buyer_percentage || !note.trim()) {
//       alert("Please fill in all fields")
//       return
//     }

//     const sellerPercent = Number(seller_percentage)
//     const buyerPercent = Number(buyer_percentage)

//     if (isNaN(sellerPercent) || isNaN(buyerPercent) || sellerPercent < 0 || buyerPercent < 0) {
//       alert("Percentages must be valid numbers")
//       return
//     }

//     try {
//       await managementOderPartial({
//         text: {
//           note,
//           buyer_percentage: buyerPercent,
//           seller_percentage: sellerPercent,
//         },
//         id: activeOrderId,
//       }).unwrap()
//       alert("Partial settlement submitted successfully")
//       setSettlementData({ seller_percentage: "", buyer_percentage: "", note: "" })
//       handleClosePopup()
//     } catch (error) {
//       console.error("Failed to submit partial settlement:", error)
//       alert("Failed to submit partial settlement")
//     }
//   }

//   // Apply status filter
//   const applyStatusFilter = (status) => {
//     setActiveFilter(status)
//     if (status === "Active orders") {
//       setOrders(allOrders.filter((order) => order.status !== "Cancelled"))
//     } else {
//       const statusKey =
//         status === "In progress" ? "In-progress" : status === "Cancel requests" ? "Cancel request" : status
//       setOrders(allOrders.filter((order) => order.status === statusKey))
//     }
//     setShowFilterDropdown(false)
//   }

//   // Toggle action list visibility
//   const toggleActionList = (orderId) => {
//     setVisibleActionList(visibleActionList === orderId ? null : orderId)
//   }

//   // Handle action click
//   const handleActionClick = (orderId, popupId) => {
//     setSelectedActions((prev) => ({
//       ...prev,
//       [orderId]: popupId,
//     }))
//     setActiveOrderId(orderId)
//     setActivePopup(popupId)
//     setVisibleActionList(null)
//   }

//   // Handle popup close
//   const handleClosePopup = () => {
//     setActivePopup(null)
//     setActiveOrderId(null)
//     if (activeOrderId) {
//       setSelectedActions((prev) => ({
//         ...prev,
//         [activeOrderId]: undefined,
//       }))
//     }
//   }

//   // Handle overlay click to close popup
//   const handleOverlayClick = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       handleClosePopup()
//     }
//   }

//   // Status styling
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "In-progress":
//         return "text-blue-600"
//       case "Delivered":
//         return "text-green-600"
//       case "Late":
//         return "text-red-500"
//       case "Cancelled":
//         return "text-gray-600"
//       case "Complete":
//         return "text-sky-500"
//       case "Cancel request":
//         return "text-red-500"
//       default:
//         return "text-gray-600"
//     }
//   }

//   // Render status
//   const renderStatus = (status) => {
//     if (status === "Delivered" || status === "Complete" || status === "Cancel request") {
//       return (
//         <div className="flex items-center gap-1">
//           <span className={getStatusStyle(status)}>{status}</span>
//           <Eye className="h-4 w-4" />
//         </div>
//       )
//     }
//     return <span className={getStatusStyle(status)}>{status}</span>
//   }

//   return (
//     <div className="roboto">
//       <div className="container mx-auto px-4 py-6">
//         {/* Header */}
//         <h1 className="text-2xl font-semibold text-gray-800 py-5">List of order</h1>

//         {/* Navigation and Search */}
//         <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div className="relative" ref={filterDropdownRef}>
//             <button
//               onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//               className="flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
//             >
//               {activeFilter}
//               <ChevronDown className="h-4 w-4" />
//             </button>
//             {showFilterDropdown && (
//               <div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-gray-100">
//                 <div className="py-1">
//                   {filterOptions.map((option) => (
//                     <button
//                       key={option}
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         applyStatusFilter(option)
//                       }}
//                       className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {option}
//                       <ChevronRight className="h-4 w-4" />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by order ID or username"
//               className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-3 pr-10 text-sm focus:outline-none sm:w-80"
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//             />
//             <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//               <Search className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Orders Table or Default Message */}
//         {managementOrders && managementOrders.length > 0 ? (
//           <div className="rounded-lg">
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="border-b border-gray-300 bg-gray-300 text-left text-sm font-medium text-gray-700">
//                   <th className="px-6 py-3">Buyer name</th>
//                   <th className="px-6 py-3">Seller name</th>
//                   <th className="px-6 py-3">Order id</th>
//                   <th className="px-6 py-3">Amount</th>
//                   <th className="px-6 py-3">Status</th>
//                   <th className="px-6 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {managementOrders.map((order) => (
//                   <tr key={order.id} className="border-b border-gray-300 text-sm">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={order.buyer_image || "/placeholder.svg"}
//                           alt={order.buyer_name}
//                           className="h-8 w-8 rounded-full object-cover"
//                         />
//                         <span className="text-gray-700">{order.buyerName}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={order.seller_image || "/placeholder.svg"}
//                           alt={order.seller_name}
//                           className="h-8 w-8 rounded-full object-cover"
//                         />
//                         <span className="text-gray-700">{order.seller_name}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">{order.id}</td>
//                     <td className="px-6 py-4 text-gray-700">{order.amount}</td>
//                     <td className="px-6 py-4">{renderStatus(order.status)}</td>
//                     <td className="px-6 py-4 relative">
//                       <button
//                         onClick={() => toggleActionList(order.id)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <MoreHorizontal className="h-5 w-5" />
//                       </button>
//                       {visibleActionList === order.id && (
//                         <div
//                           ref={(el) => (actionListRefs.current[order.id] = el)}
//                           className="absolute right-0 top-full z-20 mt-1 w-64 rounded-md bg-gray-100 shadow-lg p-2"
//                         >
//                           <button
//                             onClick={() => handleActionClick(order.id, "cancel")}
//                             className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
//                               selectedActions[order.id] === "cancel" ? "bg-blue-100 text-blue-600" : ""
//                             }`}
//                           >
//                             <X className="h-4 w-4" />
//                             <h1 className="text-sm font-normal">Cancel the order</h1>
//                           </button>
//                           <button
//                             onClick={() => handleActionClick(order.id, "settlement")}
//                             className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
//                               selectedActions[order.id] === "settlement" ? "bg-blue-100 text-blue-600" : ""
//                             }`}
//                           >
//                             <Check className="h-4 w-4" />
//                             <h1 className="text-sm font-normal">Partial settlement</h1>
//                           </button>
//                           <button
//                             onClick={() => handleActionClick(order.id, "delivery")}
//                             className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
//                               selectedActions[order.id] === "delivery" ? "bg-blue-100 text-blue-600" : ""
//                             }`}
//                           >
//                             <Eye className="h-4 w-4" />
//                             <h1 className="text-sm font-normal">View delivery</h1>
//                           </button>
//                           <NavLink to="/Admin_Dashboard/order_Assessment">
//                             <button
//                               className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
//                                 selectedActions[order.id] === "assess" ? "bg-blue-100 text-blue-600" : ""
//                               }`}
//                             >
//                               <FileText className="h-4 w-4" />
//                               <h1 className="text-sm font-normal">Assess the order</h1>
//                             </button>
//                           </NavLink>
//                           <button
//                             onClick={() => handleActionClick(order.id, "project")}
//                             className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
//                               selectedActions[order.id] === "project" ? "bg-blue-100 text-blue-600" : ""
//                             }`}
//                           >
//                             <List className="h-4 w-4" />
//                             <h1 className="text-sm font-normal">View project details</h1>
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
//             <p className="text-lg text-gray-600 font-medium">No orders found</p>
//           </div>
//         )}

//         {/* Popups for each action */}
//         {activePopup === "settlement" && (
//           <div
//             className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
//             onClick={handleOverlayClick}
//           >
//             <div
//               ref={popupRef}
//               className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="text-gray-700 mb-4 text-sm font-normal">Partial settlement</h1>
//               <form className="mb-6 p-4" onSubmit={(e) => e.preventDefault()}>
//                 <div className="space-y-4">
//                   <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
//                     <div className="flex-1">
//                       <label htmlFor="seller_percentage" className="mb-1 block text-sm font-medium text-gray-700">
//                         Seller Percentage
//                       </label>
//                       <input
//                         type="number"
//                         id="seller_percentage"
//                         placeholder="Enter seller percentage"
//                         value={settlementData.seller_percentage}
//                         onChange={(e) =>
//                           setSettlementData((prev) => ({ ...prev, seller_percentage: e.target.value }))
//                         }
//                         className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <label htmlFor="buyer_percentage" className="mb-1 block text-sm font-medium text-gray-700">
//                         Buyer Percentage
//                       </label>
//                       <input
//                         type="number"
//                         id="buyer_percentage"
//                         placeholder="Enter buyer percentage"
//                         value={settlementData.buyer_percentage}
//                         onChange={(e) =>
//                           setSettlementData((prev) => ({ ...prev, buyer_percentage: e.target.value }))
//                         }
//                         className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="note" className="mb-1 block text-sm font-medium text-gray-700">
//                       Note
//                     </label>
//                     <input
//                       type="text"
//                       id="note"
//                       placeholder="Enter note"
//                       value={settlementData.note}
//                       onChange={(e) => setSettlementData((prev) => ({ ...prev, note: e.target.value }))}
//                       className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </form>
//               <div className="flex flex-row gap-2 px-4">
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSettlementSubmit}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {activePopup === "cancel" && (
//           <div
//             className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
//             onClick={handleOverlayClick}
//           >
//             <div
//               ref={popupRef}
//               className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="text-gray-700 mb-4 text-sm font-normal">Cancel the order</h1>
//               <form className="mb-6 p-4" onSubmit={(e) => e.preventDefault()}>
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="reason" className="mb-1 block text-sm font-medium text-gray-700">
//                       Reason for cancellation
//                     </label>
//                     <textarea
//                       id="reason"
//                       placeholder="Enter reason"
//                       value={cancelReason}
//                       onChange={(e) => setCancelReason(e.target.value)}
//                       className="w-full rounded-md border border-[#0D95DD] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD]"
//                     />
//                   </div>
//                 </div>
//               </form>
//               <div className="flex flex-row gap-2 px-4">
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCancelSubmit}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {activePopup === "delivery" && (
//           <div
//             className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
//             onClick={handleOverlayClick}
//           >
//             <div
//               ref={popupRef}
//               className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="text-gray-700 mb-4 text-sm font-normal">View delivery</h1>
//               <div className="mb-6 p-4">
//                 <p className="text-sm text-gray-700">Delivery details for order {activeOrderId}</p>
//                 {/* Add delivery-specific content here */}
//               </div>
//               <div className="flex flex-row gap-2 px-4">
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {activePopup === "assess" && (
//           <div
//             className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
//             onClick={handleOverlayClick}
//           >
//             <div
//               ref={popupRef}
//               className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="text-gray-700 mb-4 text-sm font-normal">Assess the order</h1>
//               <form className="mb-6 p-4">
//                 <div className="space-y-4">
//                   <div>
//                     <label htmlFor="assessment" className="mb-1 block text-sm font-medium text-gray-700">
//                       Assessment notes
//                     </label>
//                     <textarea
//                       id="assessment"
//                       placeholder="Enter assessment"
//                       className="w-full rounded-md border border-[#0D95DD] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD]"
//                     />
//                   </div>
//                 </div>
//               </form>
//               <div className="flex flex-row gap-2 px-4">
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {activePopup === "project" && (
//           <div
//             className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
//             onClick={handleOverlayClick}
//           >
//             <div
//               ref={popupRef}
//               className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h1 className="text-gray-700 mb-4 text-sm font-normal">View project details</h1>
//               <div className="mb-6 p-4">
//                 <p className="text-sm text-gray-700">Project details for order {activeOrderId}</p>
//                 {/* Add project-specific content here */}
//               </div>
//               <div className="flex flex-row gap-2 px-4">
//                 <button
//                   onClick={handleClosePopup}
//                   className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AdminDashboardOrders

"use client";

import { useState, useEffect, useRef } from "react";
import {
	Search,
	ChevronRight,
	ChevronDown,
	Eye,
	X,
	Check,
	FileText,
	List,
	MoreHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
	useManagementOderCancelMutation,
	useManagementOderPartialMutation,
	useManagementOderViewMutation,
	useManagementOrdersListQuery,
	useManagementViewProjectDetailsMutation,
} from "../../../Redux/feature/ApiSlice";
import { BaseUrl } from "../../Shared/baseUrls";

const AdminDashboardOrders = () => {
	const allOrders = [
		{
			id: "46593292",
			buyerName: "username1335",
			sellerName: "username1335",
			amount: "$33,000",
			status: "In-progress",
			buyerAvatar:
				"https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529180/cld-sample-3.jpg",
			sellerAvatar:
				"https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/cld-sample.jpg",
		},
		{
			id: "28474562",
			buyerName: "username1563",
			sellerName: "username1335",
			amount: "$65,000",
			status: "Delivered",
			buyerAvatar:
				"https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/woman-on-a-football-field.jpg",
			sellerAvatar:
				"https://res.cloudinary.com/dfsu0cuvb/image/upload/v1737529179/samples/upscale-face-1.jpg",
		},
	];

	const { data: managementOrders } = useManagementOrdersListQuery();
	console.log(managementOrders);
	const [
		managementOderView,
		{
			data: managemantOderView,
			isLoading: isViewLoading,
			error: viewError,
		},
	] = useManagementOderViewMutation();
	const [
		managementViewProjectDetails,
		{
			data: managemantViewProjectDetails,
			isLoading: isProjectLoading,
			error: projectError,
		},
	] = useManagementViewProjectDetailsMutation();
	const [managementOderCancel] = useManagementOderCancelMutation();
	const [managementOderPartial] = useManagementOderPartialMutation();

	const [orders, setOrders] = useState(allOrders);
	const [searchInput, setSearchInput] = useState("");
	const [showFilterDropdown, setShowFilterDropdown] = useState(false);
	const [activeFilter, setActiveFilter] = useState("Active orders");
	const [visibleActionList, setVisibleActionList] = useState(null);
	const [selectedActions, setSelectedActions] = useState({});
	const [activePopup, setActivePopup] = useState(null);
	const [activeOrderId, setActiveOrderId] = useState(null);
	const [cancelReason, setCancelReason] = useState("");
	const [settlementData, setSettlementData] = useState({
		seller_percentage: "",
		buyer_percentage: "",
		note: "",
	});

	const filterDropdownRef = useRef(null);
	const actionListRefs = useRef({});
	const popupRef = useRef(null);

	const filterOptions = [
		"Cancel requests",
		"Delivered",
		"Late",
		"Cancelled",
		"In progress",
		"Active orders",
	];

	useEffect(() => {
		if (searchInput.trim() === "") {
			applyStatusFilter(activeFilter);
		} else {
			const filtered = allOrders.filter(
				(order) =>
					order.id.includes(searchInput) ||
					order.buyerName
						.toLowerCase()
						.includes(searchInput.toLowerCase())
			);
			if (activeFilter !== "Active orders") {
				const statusKey =
					activeFilter === "In progress"
						? "In-progress"
						: activeFilter === "Cancel requests"
						? "Cancel request"
						: activeFilter;
				setOrders(
					filtered.filter((order) => order.status === statusKey)
				);
			} else {
				setOrders(filtered);
			}
		}
	}, [searchInput, activeFilter]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				filterDropdownRef.current &&
				!filterDropdownRef.current.contains(event.target)
			) {
				setShowFilterDropdown(false);
			}
			const isOutsideActionList = Object.values(
				actionListRefs.current
			).every((ref) => !ref || !ref.contains(event.target));
			if (isOutsideActionList) {
				setVisibleActionList(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (activePopup) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [activePopup]);

	useEffect(() => {
		if (activePopup === "delivery" && activeOrderId) {
			managementOderView(activeOrderId)
				.unwrap()
				.catch((error) => {
					console.error("Failed to fetch delivery details:", error);
				});
		}
	}, [activePopup, activeOrderId, managementOderView]);

	useEffect(() => {
		if (activePopup === "project" && activeOrderId) {
			managementViewProjectDetails(activeOrderId)
				.unwrap()
				.catch((error) => {
					console.error("Failed to fetch project details:", error);
				});
		}
	}, [activePopup, activeOrderId, managementViewProjectDetails]);

	const handleCancelSubmit = async () => {
		if (!cancelReason.trim()) {
			alert("Please provide a reason for cancellation");
			return;
		}

		try {
			await managementOderCancel({
				text: { reason: cancelReason },
				id: activeOrderId,
			}).unwrap();
			alert("Order cancelled successfully");
			setCancelReason("");
			handleClosePopup();
		} catch (error) {
			console.error("Failed to cancel order:", error);
			alert("Failed to cancel order");
		}
	};

	const handleSettlementSubmit = async () => {
		const { seller_percentage, buyer_percentage, note } = settlementData;

		if (!seller_percentage || !buyer_percentage || !note.trim()) {
			alert("Please fill in all fields");
			return;
		}

		const sellerPercent = Number(seller_percentage);
		const buyerPercent = Number(buyer_percentage);

		if (
			isNaN(sellerPercent) ||
			isNaN(buyerPercent) ||
			sellerPercent < 0 ||
			buyerPercent < 0
		) {
			alert("Percentages must be valid numbers");
			return;
		}

		try {
			await managementOderPartial({
				text: {
					note,
					buyer_percentage: buyerPercent,
					seller_percentage: sellerPercent,
				},
				id: activeOrderId,
			}).unwrap();
			alert("Partial settlement submitted successfully");
			setSettlementData({
				seller_percentage: "",
				buyer_percentage: "",
				note: "",
			});
			handleClosePopup();
		} catch (error) {
			console.error("Failed to submit partial settlement:", error);
			alert("Failed to submit partial settlement");
		}
	};

	const applyStatusFilter = (status) => {
		setActiveFilter(status);
		if (status === "Active orders") {
			setOrders(
				allOrders.filter((order) => order.status !== "Cancelled")
			);
		} else {
			const statusKey =
				status === "In progress"
					? "In-progress"
					: status === "Cancel requests"
					? "Cancel request"
					: status;
			setOrders(allOrders.filter((order) => order.status === statusKey));
		}
		setShowFilterDropdown(false);
	};

	const toggleActionList = (orderId) => {
		setVisibleActionList(visibleActionList === orderId ? null : orderId);
	};

	const handleActionClick = (orderId, popupId) => {
		setSelectedActions((prev) => ({
			...prev,
			[orderId]: popupId,
		}));
		setActiveOrderId(orderId);
		setActivePopup(popupId);
		setVisibleActionList(null);
	};

	const handleClosePopup = () => {
		setActivePopup(null);
		setActiveOrderId(null);
		if (activeOrderId) {
			setSelectedActions((prev) => ({
				...prev,
				[activeOrderId]: undefined,
			}));
		}
	};

	const handleOverlayClick = (event) => {
		if (popupRef.current && !popupRef.current.contains(event.target)) {
			handleClosePopup();
		}
	};

	const getStatusStyle = (status) => {
		switch (status) {
			case "In-progress":
				return "text-blue-600";
			case "Delivered":
				return "text-green-600";
			case "Late":
				return "text-red-500";
			case "Cancelled":
				return "text-gray-600";
			case "Complete":
				return "text-sky-500";
			case "Cancel request":
				return "text-red-500";
			default:
				return "text-gray-600";
		}
	};

	const renderStatus = (status) => {
		if (
			status === "Delivered" ||
			status === "Complete" ||
			status === "Cancel request"
		) {
			return (
				<div className="flex items-center gap-1">
					<span className={getStatusStyle(status)}>{status}</span>
					<Eye className="h-4 w-4" />
				</div>
			);
		}
		return <span className={getStatusStyle(status)}>{status}</span>;
	};

	return (
		<div className="roboto">
			<div className="container mx-auto px-4 py-6">
				<h1 className="text-2xl font-semibold text-gray-800 py-5">
					List of order
				</h1>
				<div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
					<div className="relative" ref={filterDropdownRef}>
						<button
							onClick={() =>
								setShowFilterDropdown(!showFilterDropdown)
							}
							className="flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
						>
							{activeFilter}
							<ChevronDown className="h-4 w-4" />
						</button>
						{showFilterDropdown && (
							<div className="absolute left-0 top-full z-10 mt-1 w-48 rounded-md bg-gray-100">
								<div className="py-1">
									{filterOptions.map((option) => (
										<button
											key={option}
											onClick={(e) => {
												e.stopPropagation();
												applyStatusFilter(option);
											}}
											className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
										>
											{option}
											<ChevronRight className="h-4 w-4" />
										</button>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="relative">
						<input
							type="text"
							placeholder="Search by order ID or username"
							className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-3 pr-10 text-sm focus:outline-none sm:w-80"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
						/>
						<button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
							<Search className="h-5 w-5" />
						</button>
					</div>
				</div>
				{managementOrders && managementOrders.length > 0 ? (
					<div className="rounded-lg">
						<table className="w-full table-auto">
							<thead>
								<tr className="border-b border-gray-300 bg-gray-300 text-left text-sm font-medium text-gray-700">
									<th className="px-6 py-3">Buyer name</th>
									<th className="px-6 py-3">Seller name</th>
									<th className="px-6 py-3">Order id</th>
									<th className="px-6 py-3">Amount</th>
									<th className="px-6 py-3">Status</th>
									<th className="px-6 py-3">Action</th>
								</tr>
							</thead>
							<tbody>
								{managementOrders.map((order) => (
									<tr
										key={order.id}
										className="border-b border-gray-300 text-sm"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<img
													src={
														(order.buyer_image &&
															`${BaseUrl}${order.buyer_image}`) ||
														"/placeholder.png"
													}
													alt={order.buyer_name}
													className="h-8 w-8 rounded-full object-cover"
												/>
												<span className="text-gray-700">
													{order.buyerName}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2">
												<img
													src={
														(order.seller_image &&
															`${BaseUrl}${order.seller_image}`) ||
														"/placeholder.png"
													}
													alt={order.seller_name}
													className="h-8 w-8 rounded-full object-cover"
												/>
												<span className="text-gray-700">
													{order.seller_name}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 text-gray-700">
											{order.id}
										</td>
										<td className="px-6 py-4 text-gray-700">
											{order.amount}
										</td>
										<td className="px-6 py-4">
											{renderStatus(order.status)}
										</td>
										<td className="px-6 py-4 relative">
											<button
												onClick={() =>
													toggleActionList(order.id)
												}
												className="text-gray-400 hover:text-gray-600"
											>
												<MoreHorizontal className="h-5 w-5" />
											</button>
											{visibleActionList === order.id && (
												<div
													ref={(el) =>
														(actionListRefs.current[
															order.id
														] = el)
													}
													className="absolute right-0 top-full z-20 mt-1 w-64 rounded-md bg-gray-100 shadow-lg p-2"
												>
													<button
														onClick={() =>
															handleActionClick(
																order.id,
																"cancel"
															)
														}
														className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
															selectedActions[
																order.id
															] === "cancel"
																? "bg-blue-100 text-blue-600"
																: ""
														}`}
													>
														<X className="h-4 w-4" />
														<h1 className="text-sm font-normal">
															Cancel the order
														</h1>
													</button>
													<button
														onClick={() =>
															handleActionClick(
																order.id,
																"settlement"
															)
														}
														className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
															selectedActions[
																order.id
															] === "settlement"
																? "bg-blue-100 text-blue-600"
																: ""
														}`}
													>
														<Check className="h-4 w-4" />
														<h1 className="text-sm font-normal">
															Partial settlement
														</h1>
													</button>
													<button
														onClick={() =>
															handleActionClick(
																order.id,
																"delivery"
															)
														}
														className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
															selectedActions[
																order.id
															] === "delivery"
																? "bg-blue-100 text-blue-600"
																: ""
														}`}
													>
														<Eye className="h-4 w-4" />
														<h1 className="text-sm font-normal">
															View delivery
														</h1>
													</button>
													<NavLink
														to={`/Admin_Dashboard/order_Assessment/${order.id}`}
													>
														<button
															className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
																selectedActions[
																	order.id
																] === "assess"
																	? "bg-blue-100 text-blue-600"
																	: ""
															}`}
														>
															<FileText className="h-4 w-4" />
															<h1 className="text-sm font-normal">
																Assess the order
															</h1>
														</button>
													</NavLink>
													<button
														onClick={() =>
															handleActionClick(
																order.id,
																"project"
															)
														}
														className={`flex items-center gap-2 w-full px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer ${
															selectedActions[
																order.id
															] === "project"
																? "bg-blue-100 text-blue-600"
																: ""
														}`}
													>
														<List className="h-4 w-4" />
														<h1 className="text-sm font-normal">
															View project details
														</h1>
													</button>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
						<p className="text-lg text-gray-600 font-medium">
							No orders found
						</p>
					</div>
				)}
				{activePopup === "settlement" && (
					<div
						className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
						onClick={handleOverlayClick}
					>
						<div
							ref={popupRef}
							className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
							onClick={(e) => e.stopPropagation()}
						>
							<h1 className="text-gray-700 mb-4 text-sm font-normal">
								Partial settlement
							</h1>
							<form
								className="mb-6 p-4"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="space-y-4">
									<div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
										<div className="flex-1">
											<label
												htmlFor="seller_percentage"
												className="mb-1 block text-sm font-medium text-gray-700"
											>
												Seller Percentage
											</label>
											<input
												type="number"
												id="seller_percentage"
												placeholder="Enter seller percentage"
												value={
													settlementData.seller_percentage
												}
												onChange={(e) =>
													setSettlementData(
														(prev) => ({
															...prev,
															seller_percentage:
																e.target.value,
														})
													)
												}
												className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
											/>
										</div>
										<div className="flex-1">
											<label
												htmlFor="buyer_percentage"
												className="mb-1 block text-sm font-medium text-gray-700"
											>
												Buyer Percentage
											</label>
											<input
												type="number"
												id="buyer_percentage"
												placeholder="Enter buyer percentage"
												value={
													settlementData.buyer_percentage
												}
												onChange={(e) =>
													setSettlementData(
														(prev) => ({
															...prev,
															buyer_percentage:
																e.target.value,
														})
													)
												}
												className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="note"
											className="mb-1 block text-sm font-medium text-gray-700"
										>
											Note
										</label>
										<input
											type="text"
											id="note"
											placeholder="Enter note"
											value={settlementData.note}
											onChange={(e) =>
												setSettlementData((prev) => ({
													...prev,
													note: e.target.value,
												}))
											}
											className="h-9 w-full rounded-md border border-[#0D95DD] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-transparent"
										/>
									</div>
								</div>
							</form>
							<div className="flex flex-row gap-2 px-4">
								<button
									onClick={handleClosePopup}
									className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
								>
									Cancel
								</button>
								<button
									onClick={handleSettlementSubmit}
									className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
								>
									Done
								</button>
							</div>
						</div>
					</div>
				)}
				{activePopup === "cancel" && (
					<div
						className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
						onClick={handleOverlayClick}
					>
						<div
							ref={popupRef}
							className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
							onClick={(e) => e.stopPropagation()}
						>
							<h1 className="text-gray-700 mb-4 text-sm font-normal">
								Cancel the order
							</h1>
							<form
								className="mb-6 p-4"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="space-y-4">
									<div>
										<label
											htmlFor="reason"
											className="mb-1 block text-sm font-medium text-gray-700"
										>
											Reason for cancellation
										</label>
										<textarea
											id="reason"
											placeholder="Enter reason"
											value={cancelReason}
											onChange={(e) =>
												setCancelReason(e.target.value)
											}
											className="w-full rounded-md border border-[#0D95DD] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D95DD]"
										/>
									</div>
								</div>
							</form>
							<div className="flex flex-row gap-2 px-4">
								<button
									onClick={handleClosePopup}
									className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
								>
									Cancel
								</button>
								<button
									onClick={handleCancelSubmit}
									className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				)}
				{activePopup === "delivery" && (
					<div
						className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
						onClick={handleOverlayClick}
					>
						<div
							ref={popupRef}
							className="bg-gray-100 rounded-lg p-3 shadow-lg max-w-md w-full"
							onClick={(e) => e.stopPropagation()}
						>
							<h1 className="text-gray-700 mb-4 text-sm font-normal">
								View delivery
							</h1>
							<div className="mb-6 p-4">
								{isViewLoading ? (
									<p className="text-sm text-gray-700">
										Loading...
									</p>
								) : viewError ? (
									<p className="text-sm text-red-500">
										{viewError?.data?.message ||
											"Error loading delivery details"}
									</p>
								) : managemantOderView ? (
									<p className="text-sm text-gray-700">
										{managemantOderView.message}
									</p>
								) : (
									<p className="text-sm text-gray-700">
										No delivery details available
									</p>
								)}
							</div>
							<div className="flex flex-row gap-2 px-4">
								<button
									onClick={handleClosePopup}
									className="w-full px-4 h-9 cursor-pointer border border-[#0D95DD] text-gray-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}

				{activePopup === "project" && (
					<div
						className="fixed inset-0 flex items-center justify-center backdrop-blur-[3px] z-50"
						onClick={handleOverlayClick}
					>
						<div
							ref={popupRef}
							className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="bg-[#0D95DD] px-6 py-4">
								<h1 className="text-white text-lg font-medium">
									View Project Details
								</h1>
							</div>
							<div className="p-6 max-h-[70vh] overflow-y-auto">
								{isProjectLoading ? (
									<div className="flex items-center justify-center h-40">
										<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0D95DD]"></div>
									</div>
								) : projectError ? (
									<div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
										{projectError?.data?.message ||
											"Error loading project details"}
									</div>
								) : managemantViewProjectDetails ? (
									<div className="space-y-6">
										<div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
											<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-2 text-[#0D95DD]"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
														clipRule="evenodd"
													/>
												</svg>
												User Information
											</h2>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-3">
													<div>
														<p className="text-sm font-medium text-gray-500">
															ID
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.id ||
																"N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Name
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.name !==
															null
																? managemantViewProjectDetails
																		.user
																		.name
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Email
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.email ||
																"N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Username
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.username ||
																"N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Role
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.role ||
																"N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Staff Status
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.is_staff ? (
																<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
																	Staff
																</span>
															) : (
																<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
																	Not Staff
																</span>
															)}
														</p>
													</div>
												</div>
												<div className="space-y-3">
													<div>
														<p className="text-sm font-medium text-gray-500">
															Profession
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.profession !==
															null
																? managemantViewProjectDetails
																		.user
																		.profession
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															About
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.about !==
															null
																? managemantViewProjectDetails
																		.user
																		.about
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Date of Birth
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.date_of_birth !==
															null
																? managemantViewProjectDetails
																		.user
																		.date_of_birth
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Years of Experience
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.years_of_experience !==
															null
																? managemantViewProjectDetails
																		.user
																		.years_of_experience
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Gender
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user.gender !==
															null
																? managemantViewProjectDetails
																		.user
																		.gender
																: "N/A"}
														</p>
													</div>
													<div>
														<p className="text-sm font-medium text-gray-500">
															Subscription Status
														</p>
														<p className="text-sm font-medium text-gray-800">
															{managemantViewProjectDetails
																.user
																.is_subscribed ? (
																<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
																	Subscribed
																</span>
															) : (
																<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
																	Not
																	Subscribed
																</span>
															)}
														</p>
													</div>
												</div>
											</div>

											<div className="mt-4 space-y-3">
												<div>
													<p className="text-sm font-medium text-gray-500">
														Country
													</p>
													<p className="text-sm font-medium text-gray-800">
														{managemantViewProjectDetails
															.user.country !==
														null
															? managemantViewProjectDetails
																	.user
																	.country
															: "N/A"}
													</p>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-500">
														Residence Area
													</p>
													<p className="text-sm font-medium text-gray-800">
														{managemantViewProjectDetails
															.user
															.residence_area !==
														null
															? managemantViewProjectDetails
																	.user
																	.residence_area
															: "N/A"}
													</p>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-500">
														Hourly Rate
													</p>
													<p className="text-sm font-medium text-gray-800">
														{managemantViewProjectDetails
															.user
															.hourly_rate !==
														null
															? `$${managemantViewProjectDetails.user.hourly_rate}`
															: "N/A"}
													</p>
												</div>
												<div>
													<p className="text-sm font-medium text-gray-500">
														Education
													</p>
													<p className="text-sm font-medium text-gray-800">
														{managemantViewProjectDetails
															.user.education !==
														null
															? managemantViewProjectDetails
																	.user
																	.education
															: "N/A"}
													</p>
												</div>
											</div>

											{managemantViewProjectDetails.user
												.skills &&
											managemantViewProjectDetails.user
												.skills.length > 0 ? (
												<div className="mt-4">
													<p className="text-sm font-medium text-gray-500 mb-2">
														Skills
													</p>
													<div className="flex flex-wrap gap-2">
														{managemantViewProjectDetails.user.skills.map(
															(skill, index) => (
																<span
																	key={index}
																	className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
																>
																	{skill}
																</span>
															)
														)}
													</div>
												</div>
											) : (
												<div className="mt-4">
													<p className="text-sm font-medium text-gray-500">
														Skills
													</p>
													<p className="text-sm font-medium text-gray-800">
														N/A
													</p>
												</div>
											)}

											{managemantViewProjectDetails.user
												.languages &&
											managemantViewProjectDetails.user
												.languages.length > 0 ? (
												<div className="mt-4">
													<p className="text-sm font-medium text-gray-500 mb-2">
														Languages
													</p>
													<div className="flex flex-wrap gap-2">
														{managemantViewProjectDetails.user.languages.map(
															(
																language,
																index
															) => (
																<span
																	key={index}
																	className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700"
																>
																	{language}
																</span>
															)
														)}
													</div>
												</div>
											) : (
												<div className="mt-4">
													<p className="text-sm font-medium text-gray-500">
														Languages
													</p>
													<p className="text-sm font-medium text-gray-800">
														N/A
													</p>
												</div>
											)}
										</div>

										<div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
											<h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-2 text-[#0D95DD]"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
														clipRule="evenodd"
													/>
												</svg>
												Project Statistics
											</h2>
											<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
												<div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
													<p className="text-sm font-medium text-gray-500">
														Tasks Completed
													</p>
													<p className="text-2xl font-bold text-[#0D95DD]">
														{
															managemantViewProjectDetails.task_completed_count
														}
													</p>
												</div>
												<div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
													<p className="text-sm font-medium text-gray-500">
														Total Amount
													</p>
													<p className="text-2xl font-bold text-[#0D95DD]">
														$
														{
															managemantViewProjectDetails.task_completed_amount
														}
													</p>
												</div>
												<div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
													<p className="text-sm font-medium text-gray-500">
														Rating Count
													</p>
													<p className="text-2xl font-bold text-[#0D95DD]">
														{
															managemantViewProjectDetails.rating_count
														}
													</p>
												</div>
												<div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
													<p className="text-sm font-medium text-gray-500">
														Rating Sum
													</p>
													<p className="text-2xl font-bold text-[#0D95DD]">
														{
															managemantViewProjectDetails.rating_sum
														}
													</p>
												</div>
											</div>
											{managemantViewProjectDetails.rating_count >
												0 && (
												<div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
													<p className="text-sm font-medium text-gray-500">
														Average Rating
													</p>
													<div className="flex items-center mt-1">
														<p className="text-xl font-bold text-[#0D95DD] mr-2">
															{(
																managemantViewProjectDetails.rating_sum /
																managemantViewProjectDetails.rating_count
															).toFixed(1)}
														</p>
														<div className="flex text-yellow-400">
															{[...Array(5)].map(
																(_, i) => (
																	<svg
																		key={i}
																		xmlns="http://www.w3.org/2000/svg"
																		className="h-5 w-5"
																		viewBox="0 0 20 20"
																		fill={
																			i <
																			Math.round(
																				managemantViewProjectDetails.rating_sum /
																					managemantViewProjectDetails.rating_count
																			)
																				? "currentColor"
																				: "none"
																		}
																		stroke="currentColor"
																	>
																		<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
																	</svg>
																)
															)}
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								) : (
									<div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-600">
										No project details available
									</div>
								)}
							</div>
							<div className="bg-gray-50 px-6 py-4 flex justify-end">
								<button
									onClick={handleClosePopup}
									className="px-6 py-2 cursor-pointer border border-[#0D95DD] bg-[#0D95DD] text-white rounded-md hover:bg-[#0A7BBF] focus:outline-none focus:ring-2 focus:ring-[#0D95DD] text-sm font-medium"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminDashboardOrders;
