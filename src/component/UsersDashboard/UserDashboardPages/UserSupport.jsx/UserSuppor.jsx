import React, { useState } from 'react'

import { FiEdit } from 'react-icons/fi';
import { GoArrowLeft } from 'react-icons/go';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri';

function UserSupport() {


    const TicketData = [
        {
            reason: "Order related",
            details: "View",
            date_of_creation: "12/06/25",
            ticket_id: "460563292",
            status: "In progress",
            action: "..."
        }
    ];


    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

    return (
        <div className='p-6 mt-14'>
            <h1 className='text-[#154153] text-[24px] font-bold text-center nunito '>Support tickets</h1>
            <div className='flex justify-between'>
                {/* order dorpdown */}
                <div className="relative inline-block ">
                    <div
                        className="flex items-center gap-1 justify-center bg-[#F6F8FA] p-2 rounded cursor-pointer text-[#012939] w-[170px] px-4"
                        onClick={toggleDropdown}
                    >
                        <p>Order related</p>
                        <MdOutlineKeyboardArrowRight
                            className={`transform transition-transform duration-300 ${isOpenDropdown ? 'rotate-90' : ''}`}
                            size={20}
                        />
                    </div>

                    {isOpenDropdown && (
                        <div className="absolute z-10 bg-[#F6F8FA]  rounded mt-2 p-2 shadow-2xl w-full">
                            <ul className="space-y-1 text-[16px] text-[#012939]">
                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center">Others <MdOutlineKeyboardArrowRight /></li>
                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center">Withdrawal <MdOutlineKeyboardArrowRight /></li>
                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center">Blog related <MdOutlineKeyboardArrowRight /></li>
                                <li className="hover:bg-gray-100 p-1 rounded cursor-pointer flex items-center">Order related <MdOutlineKeyboardArrowRight /></li>
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    {/* <p className='text-[#38A3DC] border border-[#38A3DC] p-1 rounded cursor-pointer'>Create Ticket +</p> */}
                    {/* <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}> <p className='text-[#38A3DC] border border-[#38A3DC] p-1 rounded cursor-pointer'>Create Ticket +</p></button>
                    <dialog id="my_modal_1" className="modal">


                        <div className="modal-action">
                            <form method="dialog">
                               
                                <button className="btn">Close</button>
                            </form>
                        </div>

                    </dialog> */}

                    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}> <p className='text-[#38A3DC] border border-[#38A3DC] p-1 rounded cursor-pointer'>Create Ticket +</p></button>
                    <dialog id="my_modal_1" className="modal rounded-[6px] lg:ml-[40%] lg:mt-[250px]">
                        <div className="modal-box">
                            <div className="modal-box relative bg-[#EFF2F6] w-[470px]   p-6 text-[#154153] ">
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button
                                            className="btn btn-sm btn-circle  hover:cursor-pointer"

                                        >
                                            <div className="flex  items-center gap-2">
                                                <GoArrowLeft /> <span>Back </span>
                                            </div>
                                        </button>
                                    </form>
                                </div>


                                <h1 className="text-center text-[20px] font-medium">Support Ticket </h1>
                                <div className="py-10 space-y-3" >
                                    <div className='relative'>

                                        <span>Purpose</span>
                                        <input type="text" className="border border-[#5C91B1] p-2 w-full rounded h-[54px] mt-3" />
                                        <li className="p-1 rounded cursor-pointer flex items-center absolute gap-6 bottom-3 left-[35%]">Withdrawal <MdOutlineKeyboardArrowRight /></li>
                                    </div>

                                    <div className="">
                                        <span>Describe</span>

                                        <textarea className="border border-[#5C91B1] p-2 w-full rounded h-[111px] mt-3" placeholder="Enter here " name="" id=""></textarea>
                                    </div>

                                </div>

                                <div className="text-center">
                                    <button className="btn btn-active bg-[#0D95DD] p-4 rounded-2xl w-[120px] font-bold text-[17px] text-[#FFFFFF] cursor-ponter">Submit</button>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
            <div className='w-full'>
                <div className="my-4">
                    <table className="w-full border-collapse ">
                        <thead>
                            <tr className="rounded bg-[#d1e2ec] text-[#012939]  ">
                                <th className="py-3 px-4 text-left font-medium ">Reason</th>
                                <th className="py-3 px-4 text-left font-medium ">Details</th>
                                <th className="py-3 px-4 text-left font-medium ">Date of creation</th>
                                <th className="py-3 px-4 text-left font-medium ">Ticket ID</th>
                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                <th className="py-3 px-4 text-left font-medium ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TicketData.map((ticket) => (
                                <tr key={ticket.id} className=" text-[#012939]">
                                    <td className="py-3 px-4  ">{ticket.reason}</td>
                                    <td className="py-3 px-4  text-[#0D95DD] underline cursor-pointer">

                                        {/* {ticket.details} */}

                                        {/* Open the modal using */}
                                        <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>   {ticket.details}</button>
                                        <dialog id="my_modal_2" className="modal mx-auto my-auto bg-[#EFF2F6] p-4 rounded w-[470px]">
                                            <div className="modal-box">
                                                <div className="modal-action">

                                                    <form method="dialog">
                                                        <button className="flex items-center gap-2">
                                                            <GoArrowLeft /> <span>Back</span>
                                                        </button>
                                                    </form>
                                                </div>



                                                <div className='space-y-3'>
                                                    <h3 className=" text-lg text-[#0D95DD] text-[20px] text-center font-medium"><span>Ticket</span> ({ticket.ticket_id})</h3>
                                                    <h4 className='font-medium text-[#154153]'>Delivery message</h4>
                                                    <p className="py-4 text-[#154153]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                </div>

                                            </div>
                                        </dialog>







                                    </td>
                                    <td className="py-3 px-4 "> {ticket.date_of_creation}</td>
                                    <td className="py-3 px-4     ">  {ticket.ticket_id}</td>
                                    <td className="py-3 px-4 ">

                                        {ticket.status}

                                    </td>
                                    <td className="py-3 px-4 relative cursor-pointer ">

                                        <details className="dropdown  absolute z-50 top-2 ">
                                            <summary className="  list-none appearance-none "> {ticket.action}</summary>



                                            <ul className="menu dropdown-content bg-[#FAFDFF] z-1  py-2 pl-4 pr-10 rounded text-[#012939]  text-[18px] space-y-1">

                                                <li className='flex gap-2 items-center'> <FiEdit /><a>Edit</a></li>
                                                <li className='flex gap-2 items-center'> <RiDeleteBin5Line /><a>Delete</a></li>
                                            </ul>
                                        </details>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr className='text-[#C1DDEF]' />
                </div>
            </div>
            <div>
                <p className='text-[18px] text-[#012939]'>You don’t have any support ticket.</p>
            </div>


        </div>

    )
}

export default UserSupport