

import { useState, useRef, useEffect } from "react"
import { Search, MoreHorizontal, FileText, Trash2, AlertCircle, X, ArrowLeft } from "lucide-react"
import { FiAlertTriangle } from "react-icons/fi"
import { GoArrowLeft } from "react-icons/go"
import { useDeleteManagementUserMutation, useManagementSubmitWarningMutation, useManagementUserDetailsQuery, useManagementUserListQuery } from "../../../Redux/feature/ApiSlice"

const AdminDashboardUser = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [activePopup, setActivePopup] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [warningReason, setWarningReason] = useState("") // New state for warning description
  const dropdownRefs = useRef([])
  const popupRef = useRef(null)
  const { data: management, isLoading } = useManagementUserListQuery()
  console.log(management);
  const [deleteUser] = useDeleteManagementUserMutation()

  const [submiteData] = useManagementSubmitWarningMutation()
  console.log(submiteData, "submited data");
  const { data: managementDetails, isLoading: isDetailsLoading } = useManagementUserDetailsQuery(selectedUserId, {
    skip: !selectedUserId,
  })

  // Filter users based on search query
  const filteredUsers = management
    ? management.filter((user) => user.user_id.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  // Close dropdown and popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDropdown = dropdownRefs.current.every((ref) => !ref || !ref.contains(event.target))
      if (isOutsideDropdown) {
        setOpenDropdownId(null)
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null)
        setSelectedUserId(null)
        setWarningReason("") // Reset warning reason
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (activePopup) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [activePopup])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleUserInfo = (userId) => {
    setSelectedUserId(userId)
    setActivePopup(`userinfo-${userId}`)
  }

  const toggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId)
  }

  const handleDeleteUser = (userId) => {
    setActivePopup(`delete-${userId}`)
    setOpenDropdownId(null)
  }

  const handleWarning = (userId) => {
    setSelectedUserId(userId) // Store userId for warning submission
    setActivePopup(`warning-${userId}`)
    setOpenDropdownId(null)
  }

  const handleClosePopup = () => {
    setActivePopup(null)
    setSelectedUserId(null)
    setWarningReason("") // Reset warning reason
    setIsDeleting(false)
  }

  const handleDeleteConfirm = async (userId) => {
    setIsDeleting(true)
    try {
      await deleteUser(userId).unwrap()
      alert(`User ${userId} deleted successfully!`)
      setActivePopup(null)
    } catch (error) {
      console.error("Failed to delete user:", error)
      alert(`Failed to delete user: ${error?.data?.message || "Unknown error"}`)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleWarningSubmit = async (userId) => {
    console.log("userId in handleWarningSubmit:", userId); // Debug userId
    console.log("warningReason:", warningReason); // Debug reason

    if (!warningReason.trim()) {
      alert("Please provide a reason for the warning.");
      return;
    }

    try {
      const payload = {
        user_id: userId, // Keep as string, remove parseInt
        reason: warningReason,
      };
      console.log("Submitting payload:", payload); // Debug payload

      await submiteData(payload).unwrap();
      alert(`Warning submitted successfully for user ${userId}!`);
      setActivePopup(null);
      setWarningReason("");
      setSelectedUserId(null);
    } catch (error) {
      console.error("Failed to submit warning, full error:", error); // Log full error
      alert(`Failed to submit warning: ${error?.data?.message || error?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="p-5 pt-10 roboto">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">User management</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by user ID"
              className="w-full rounded-md border border-gray-300 bg-gray-100 py-2 pl-3 pr-10 text-sm focus:outline-none sm:w-80"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="rounded-md">
          {/* Table header */}
          <div className="grid grid-cols-5 bg-gray-300 py-2 px-4 border-b border-gray-200">
            <div className="font-bold text-gray-700 text-[14px]">User ID</div>
            <div className="font-bold text-gray-700 text-[14px]">Starting Date</div>
            <div className="font-bold text-gray-700 text-[14px]">Package</div>
            <div className="font-bold text-gray-700 text-[14px]">User info</div>
            <div className="font-bold text-gray-700 text-[14px]">Action</div>
          </div>

          {/* Table rows */}
          {isLoading ? (
            <div className="py-8 text-center
            text-center text-gray-500 text-[15px]">Loading users...</div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-5 py-3 px-4 items-center border-b border-gray-300"
              >
                <div className="text-gray-700 text-[13px]">{user.user_id}</div>
                <div className="text-gray-700 text-[13px]">{user.starting_date}</div>
                <div className="text-gray-700 text-[13px]">{user.package}</div>
                <div>
                  <button
                    onClick={() => handleUserInfo(user.user_id)}
                    className="flex items-center gap-1 px-3 py-1 text-[13px] text-gray-600 rounded border border-gray-200 bg-gray-300 cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>Click</span>
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(user.user_id)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {openDropdownId === user.user_id && (
                    <div
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      className="absolute right-28 top-5 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.user_id)
                        }}
                        className="flex items-center gap-2 w-full px-4 py-1.5 text-[15px] hover:bg-gray-100 text-left cursor-pointer"
                      >
                        <Trash2 size={14} className="text-red-600" />
                        <span>Delete Account</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWarning(user.user_id)
                        }}
                        className="flex items-center gap-2 w-full px-4 py-1.5 text-[15px] hover:bg-gray-100 text-left cursor-pointer"
                      >
                        <FiAlertTriangle size={14} />
                        <span>Give Warning</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 text-[15px]">
              No users found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* User Info Popup */}
      {activePopup && activePopup.startsWith("userinfo-") && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
          <div
            ref={popupRef}
            className="bg-white rounded-lg p-6 shadow-xl max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <button
                onClick={handleClosePopup}
                className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            </div>

            {/* User Profile Content */}
            {isDetailsLoading ? (
              <div className="text-center text-gray-500 text-[15px]">Loading user details...</div>
            ) : managementDetails ? (
              <div className="px-2">
                <div className="flex items-center mb-4">
                  <img
                    src={managementDetails.user.image || "/placeholder.svg"}
                    alt={managementDetails.user.username}
                    className="w-16 h-16 rounded-full mr-4 object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{managementDetails.user.username}</h3>
                    <p className="text-sm text-gray-500">{managementDetails.user.role}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600">Rating: {managementDetails.rating_sum}</span>
                      <span className="mx-1 text-gray-400">|</span>
                      <span className="text-sm text-blue-500 cursor-pointer">({managementDetails.rating_count} Reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                  <p className="text-xs text-gray-600">{managementDetails.user.about}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Task completed:</p>
                    <p className="text-sm font-medium">{managementDetails.task_completed_count}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Age:</p>
                    <p className="text-sm font-medium">{managementDetails.user.date_of_birth}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total earning:</p>
                    <p className="text-sm font-medium">{managementDetails.task_completed_amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hourly rate:</p>
                    <p className="text-sm font-medium">{managementDetails.user.hourly_rate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Experience:</p>
                    <p className="text-sm font-medium">{managementDetails.user.years_of_experience}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Skills</h4>
                  <p className="text-xs text-gray-600">{managementDetails.user.skills.join(", ")}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Language:</p>
                    <p className="text-sm font-medium">{managementDetails.user.languages.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Education:</p>
                    <p className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm inline-block">
                      {managementDetails.user.education}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-[15px]">
                No user details available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Popup */}
      {activePopup && activePopup.startsWith("delete-") && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
          <div
            ref={popupRef}
            className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
              </div>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600"
                disabled={isDeleting}
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>
            <p className="text-gray-600 mb-4 text-[13px]">
              Are you sure you want to delete user ID:{" "}
              <span className="font-medium">{activePopup.replace("delete-", "")}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer text-[15px]"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(activePopup.replace("delete-", ""))}
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-[15px] ${isDeleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Popup */}
      {activePopup && activePopup.startsWith("warning-") && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[3px]">
          <div
            ref={popupRef}
            className="bg-white rounded-lg p-6 shadow-xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleClosePopup}
                className="text-gray-400 text-[15px] hover:text-gray-600 flex cursor-pointer"
              >
                <GoArrowLeft className="h-4 w-4 mt-[4px] mr-1" />
                back
              </button>
            </div>
            <div className="flex items-center justify-center my-2">
              <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-5 py-2 w-56 rounded-md flex items-center justify-center text-[15px] mb-5">
                Description
              </h1>
            </div>
            <textarea
              placeholder="Write a description..."
              className="w-full min-h-[100px] bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D95DD] focus:border-[#0D95DD] transition duration-200 resize"
              value={warningReason}
              onChange={(e) => setWarningReason(e.target.value)}
            />
            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={() => handleWarningSubmit(activePopup.replace("warning-", ""))}
                className="px-10 py-2 bg-[#0D95DD] text-white rounded-md cursor-pointer text-[14px]"
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

export default AdminDashboardUser
