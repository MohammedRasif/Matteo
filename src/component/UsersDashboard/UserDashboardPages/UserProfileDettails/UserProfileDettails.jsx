import React, { useState } from 'react'
import { MdChevronRight } from 'react-icons/md'

function UserProfileDettails() {

    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedFile(e.target.files[0].name)
        }
    }
    return (
        <div className="flex items-center justify-center bg-gradient-to-bp-4 nunito">
            <div className="w-full   rounded-lg  p-8">
                <h1 className="text-2xl font-bold text-center text-[#154153] mb-8 text-[24px] ">Profile Details</h1>

                <form className="space-y-6">
                    {/* Name and Profession */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#154153] mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border  border-[#5C91B1] rounded-md bg-[#F8FCFF] "
                            />
                        </div>
                        <div>
                            <label htmlFor="profession" className="block text-sm font-medium text-[#154153] mb-2">
                                Profession
                            </label>
                            <input
                                type="text"
                                id="profession"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF] "
                            />
                        </div>
                    </div>

                    {/* Degree, Username, and Description */}
                    <div className="flex gap-6">
                        <div className='flex gap-6 w-full '>
                            <div className='w-full'>
                                <label htmlFor="degree" className="block text-sm font-medium text-[#154153] mb-2">
                                    Highest degree you have achieved
                                </label>
                                <input
                                    type="text"
                                    id="degree"
                                    placeholder="Enter here"
                                    className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]  "
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="username" className="block text-sm font-medium text-[#154153] mb-2">
                                    Select username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Type here"
                                    className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1 w-full">
                            <label htmlFor="description" className="block text-sm font-medium text-[#154153] mb-2">
                                Describe about yourself (Max 100 words)
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter here"
                                rows="1"
                                className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                            ></textarea>
                        </div>
                    </div>

                    {/* Skills, DOB, and Experience */}
                    <div className="flex gap-6">
                        <div className="md:col-span-1 w-full">
                            <label htmlFor="skills" className="block text-sm font-medium text-[#154153] mb-2">
                                Skills (Max 5)
                            </label>
                            <input
                                type="text"
                                id="skills"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                            />
                        </div>
                        <div className='w-full flex gap-6 '>
                            <div className='w-full'>
                                <label htmlFor="dob" className="block text-sm font-medium text-[#154153] mb-2">
                                    Date of birth
                                </label>
                                <input
                                    type="text"
                                    id="dob"
                                    placeholder="Ex: dd/mm/yyyy"
                                    className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="experience" className="block text-sm font-medium text-[#154153] mb-2">
                                    Year of experience
                                </label>
                                <div className="relative ">
                                    <select
                                        id="experience"
                                        className="w-full px-3 py-2 border border-[#5C91B1]  bg-[#F8FCFF] text-[#939597] rounded-md appearance-none "
                                    >
                                        <option value="">Ex: 1, 2, 3</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5+</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg
                                            className="h-5 w-5 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gender, Hourly Rate, and Email */}
                    <div className="flex gap-6">
                        <div className='flex gap-6 w-full'>
                            <div className='w-full'>
                                <label htmlFor="gender" className="block text-sm font-medium text-[#154153] mb-2">
                                    Gender (optional)
                                </label>
                                <div className="relative  ">
                                    <select
                                        id="gender"
                                        className="w-full  px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF]  rounded-md appearance-none absolute  "
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Custom</option>

                                    </select>
                                    <div className="absolute top-[14px] left-20 flex items-center pr-3 pointer-events-none">
                                        <MdChevronRight />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <label htmlFor="hourlyRate" className="block text-sm font-medium text-[#154153] mb-2">
                                    Hourly rate
                                </label>
                                <input
                                    type="text"
                                    id="hourlyRate"
                                    placeholder="Ex: 10 USD/hour"
                                    className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="email" className="block text-sm font-medium text-[#154153] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="user@example.com"
                                className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF]  rounded-md "
                            />
                        </div>
                    </div>

                    {/* Upload Picture and Languages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='relative'>
                            <label htmlFor="picture" className="block text-sm font-medium text-[#154153] mb-2">
                                Upload picture
                            </label>
                            <div className="flex items-center">
                                <label className=" p-1 rounded ml-2 bg-[#E4E8EE] text-gray-700 rounded-l-md cursor-pointer absolute">
                                    Choose file
                                    <input type="file" id="picture" className="hidden" onChange={handleFileChange} />
                                </label>
                                <span className="px-3 py-2 border  border-[#5C91B1]  rounded pl-30 bg-[#F8FCFF] text-[#939597] flex-grow truncate">
                                    {selectedFile || "Upload a file"}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="languages" className="block text-sm font-medium text-[#154153] mb-2">
                                Languages
                            </label>
                            <input
                                type="text"
                                id="languages"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border border-[#5C91B1]  rounded-md bg-[#F8FCFF]"
                            />
                        </div>
                    </div>

                    {/* Country and Residence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-[#154153] mb-2">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF]  rounded-md "
                            />
                        </div>
                        <div>
                            <label htmlFor="residence" className="block text-sm font-medium text-[#154153] mb-2">
                                Residence area
                            </label>
                            <input
                                type="text"
                                id="residence"
                                placeholder="Enter here"
                                className="w-full px-3 py-2 border border-[#5C91B1] bg-[#F8FCFF] rounded-md "
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-sky-500 text-[#F8FCFF] font-medium rounded-md w-[280px]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfileDettails