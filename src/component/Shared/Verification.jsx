


import React, { useRef, useState } from 'react';
import registration_img from '../image/Mask group.png';
import { NavLink } from 'react-router-dom';

function Verification() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [focused, setFocused] = useState([false, false, false, false]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) inputRefs.current[index + 1].focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleFocus = (index) => {
        const newFocused = [...focused];
        newFocused[index] = true;
        setFocused(newFocused);
    };

    const handleBlur = (index) => {
        const newFocused = [...focused];
        newFocused[index] = false;
        setFocused(newFocused);
    };

    const handleSubmit = () => {
        alert(`Entered OTP: ${otp.join("")}`);
    };

    const handleResendClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle click on the backdrop to close the modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="flex w-full h-screen justify-between items-center nunito">
            {/* Left Side: Image */}
            <div className="w-1/2 h-screen pr-[24px]">
                <img
                    src={registration_img}
                    alt="Registration illustration"
                    className="w-full h-screen p-10"
                />
            </div>

            {/* Right Side: Verification Form */}
            <div className="w-1/2">
                <div className="text-center mb-20">
                    <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
                    <p className="text-3xl text-[#000000]">Logo here</p>
                </div>
                <div className="w-1/2 flex mx-auto bg-[#F8FCFF] shadow-md rounded px-10 py-20">
                    <div className="text-center space-y-8">
                        {/* Header Text */}
                        <p className="text-lg text-[#012939] font-semibold">
                            We have sent you an activation code.
                        </p>
                        <p className="text-sm text-gray-600">
                            An email has been sent to your email address containing a <br />
                            code to reset your password.
                        </p>
                        <h2 className="text-[16px] font-semibold text-[#012939]">
                            Enter verification code
                        </h2>

                        {/* OTP Inputs */}
                        <div className="flex justify-center space-x-4 my-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    placeholder={focused[index] || digit ? '' : '*'}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onFocus={() => handleFocus(index)}
                                    onBlur={() => handleBlur(index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-full pt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            ))}
                        </div>

                        {/* Resend Link */}
                        <p className="text-sm text-gray-600">
                            If you didn’t receive a code!{' '}
                            <span
                                onClick={handleResendClick}
                                className="text-blue-500 cursor-pointer underline"
                            >
                                click here..
                            </span>
                        </p>

                        {/* Confirm Button */}
                        <NavLink to="/confirm_password">
                            <button
                                onClick={handleSubmit}
                                className="bg-[#1B97D8] text-[#F6F8FA] px-6 py-2 rounded-[8px] text-[16px] font-bold w-[123px] cursor-pointer"
                            >
                                Confirm
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Modal for Resend Link */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center  backdrop-blur bg-opacity-50 z-50 "
                    onClick={handleBackdropClick} // Add click handler to backdrop
                >
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg space-y-8 py-10 ">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full mx-auto bg-[#1B97D8] text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="text-[#012939] text-[20px] font-medium text-center">
                            Code has been sent again
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Verification;