"use client"

import { useState, useRef, useEffect } from "react"
import { Search, MoreHorizontal, FileText, Trash2 } from "lucide-react"
import { FiAlertTriangle } from "react-icons/fi"

const AdminDashboardUser = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const dropdownRef = useRef(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
    console.log(`Delete user ${userId}`)
    // Here you would implement the actual delete functionality
    // For example: deleteUser(userId).then(() => fetchUpdatedUsers())
    setOpenDropdownId(null)
  }

  return (
    <div className=" min-h-screen p-4 pt-10 roboto">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">User management</h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by username or ID"
              value={searchQuery}
              onChange={handleSearch}
              className="w-64 py-2 px-4 pr-10 rounded-md border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 bg-gray-50 py-3 px-4 border-b border-gray-200">
            <div className="font-medium text-gray-700">User ID</div>
            <div className="font-medium text-gray-700">Starting Date</div>
            <div className="font-medium text-gray-700">Package</div>
            <div className="font-medium text-gray-700">User info</div>
            <div className="font-medium text-gray-700">Action</div>
          </div>

          {/* Table rows */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-5 py-4 px-4 items-center border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="text-gray-700">{user.id}</div>
                <div className="text-gray-700">{user.startDate}</div>
                <div className="text-gray-700">{user.package}</div>
                <div>
                  <button
                    onClick={() => handleUserInfo(user.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded border border-gray-200 hover:bg-gray-200"
                  >
                    <FileText size={16} />
                    <span>Click</span>
                  </button>
                </div>
                <div className="relative">
                  <button onClick={() => toggleDropdown(user.id)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <MoreHorizontal size={20} />
                  </button>

                  {/* Dropdown menu */}
                  {openDropdownId === user.id && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-36 top-5 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                    >
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
                      >
                        <Trash2 size={16} className="text-red-600 " />
                        <span>Delete Account</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left cursor-pointer"
                      >
                        <FiAlertTriangle size={16} />
                        <span>Give Warning</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">No users found matching "{searchQuery}"</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardUser
