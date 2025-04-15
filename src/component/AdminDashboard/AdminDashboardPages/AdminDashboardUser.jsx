"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MoreHorizontal, FileText, Trash2, AlertCircle, X } from "lucide-react"
import { FiAlertTriangle } from "react-icons/fi"
import { GoArrowLeft } from "react-icons/go"

const AdminDashboardUser = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [activePopup, setActivePopup] = useState(null)
  const dropdownRefs = useRef([])
  const popupRef = useRef(null)

  // Sample user data
  const users = [
    { id: "55-1234", startDate: "12 July 2024", package: "Half yearly" },
    { id: "55-1235", startDate: "12 July 2024", package: "Yearly" },
    { id: "55-1236", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1237", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1238", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1239", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1240", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1241", startDate: "12 July 2024", package: "Monthly" },
    { id: "55-1242", startDate: "12 July 2024", package: "Monthly" },
  ]

  // Filter users based on search query
  const filteredUsers = users.filter((user) => user.id.toLowerCase().includes(searchQuery.toLowerCase()))

  // Close dropdown and popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Dropdown
      const isOutsideDropdown = dropdownRefs.current.every((ref) => !ref || !ref.contains(event.target))
      if (isOutsideDropdown) {
        setOpenDropdownId(null)
      }
      // Popup
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActivePopup(null)
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
    console.log(`View info for user ${userId}`)
  }

  const toggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId)
  }

  const handleDeleteUser = (userId) => {
    setActivePopup(`delete-${userId}`)
    setOpenDropdownId(null)
  }

  const handleWarning = (userId) => {
    setActivePopup(`warning-${userId}`)
    setOpenDropdownId(null)
  }

  const handleClosePopup = () => {
    setActivePopup(null)
  }

  const handleDeleteConfirm = (userId) => {
    console.log(`Delete user ${userId}`)
    setActivePopup(null)
  }

  return (
    <div className="p-5 pt-10 roboto">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User management</h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by username or ID"
              value={searchQuery}
              onChange={handleSearch}
              className="w-64 py-1.5 px-4 pr-10 rounded-md border border-gray-400 text-xs placeholder:text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className=" rounded-md ">
          {/* Table header */}
          <div className="grid grid-cols-5 bg-gray-300 py-2 px-4 border-b border-gray-200">
            <div className="font-medium text-gray-700 text-[15px]">User ID</div>
            <div className="font-medium text-gray-700 text-[15px]">Starting Date</div>
            <div className="font-medium text-gray-700 text-[15px]">Package</div>
            <div className="font-medium text-gray-700 text-[15px]">User info</div>
            <div className="font-medium text-gray-700 text-[15px]">Action</div>
          </div>

          {/* Table rows */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-5 py-3 px-4 items-center border-b border-gray-300 "
              >
                <div className="text-gray-700 text-[14px]">{user.id}</div>
                <div className="text-gray-700 text-[14px]">{user.startDate}</div>
                <div className="text-gray-700 text-[14px]">{user.package}</div>
                <div>
                  <button
                    onClick={() => handleUserInfo(user.id)}
                    className="flex items-center gap-1 px-3 py-1 text-[14px] text-gray-600  rounded border border-gray-200 "
                  >
                    <FileText size={14} />
                    <span>Click</span>
                  </button>
                </div>
                <div className="relative">
                  <button onClick={() => toggleDropdown(user.id)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <MoreHorizontal size={18} />
                  </button>

                  {/* Dropdown menu */}
                  {openDropdownId === user.id && (
                    <div
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      className="absolute right-28 top-5 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.id)
                        }}
                        className="flex items-center gap-2 w-full px-4 py-1.5 text-[15px] hover:bg-gray-100 text-left cursor-pointer"
                      >
                        <Trash2 size={14} className="text-red-600" />
                        <span>Delete Account</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleWarning(user.id)
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
            <div className="py-8 text-center text-gray-500 text-[15px]">No users found matching "{searchQuery}"</div>
          )}
        </div>
      </div>

      {/* Popups */}
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
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>

            <p className="text-gray-600 mb-4 text-[14px]">
              Are you sure you want to delete user ID:{" "}
              <span className="font-medium">{activePopup.replace("delete-", "")}</span>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 cursor-pointer text-[15px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(activePopup.replace("delete-", ""))}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer text-[15px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
              <h1 className="border-[#0D95DD] font-medium text-[#0D95DD] border px-5 py-2 w-56 rounded-md flex items-center justify-center text-[15px]">
                Description
              </h1>
            </div>

            <p className="px-10 text-[14px] text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum recusandae vitae dolorum quam modi quae ab
              placeat magni porro. Ducimus temporibus dicta qui sapiente illo? Quo impedit quidem nisi voluptatibus
              laboriosam eaque, praesentium omnis facilis commodi delectus odio ex, iusto, repudiandae eius deleniti
              molestiae. Hic unde doloremque consequatur rerum et?
            </p>

            <div className="flex justify-center gap-2 mt-5">
              <button
                onClick={handleClosePopup}
                className="px-10 py-1 bg-[#0D95DD] text-white rounded-md cursor-pointer text-[15px]"
              >
                Okey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboardUser