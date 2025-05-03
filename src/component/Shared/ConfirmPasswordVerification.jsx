

import React, { useRef, useState } from 'react';
import registration_img from '../image/Maskgroup.png';
import { useNavigate } from 'react-router-dom';
import { useRegisterVerificationMutation, useResendOtpMutation } from '../../Redux/feature/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function ConfirmPasswordVerification() {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [focused, setFocused] = useState([false, false, false, false]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const inputRefs = useRef([]);
    const [registerVerification, { isLoading }] = useRegisterVerificationMutation();
    const navigate = useNavigate();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

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

    const handleSubmit = async () => {
        const email = localStorage.getItem("userEmail");
        const otpString = otp.join(""); // Concatenate OTP digits (e.g., ["5", "3", "5", "9"] → "5359")

        if (!email) {
            toast.error("Email not found. Please register again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            return;
        }

        if (otpString.length !== 4 || !/^\d{4}$/.test(otpString)) {
            toast.error("Please enter a valid 4-digit OTP.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            return;
        }

        try {
            const res = await registerVerification({ email, otp: otpString }).unwrap();
            console.log("backendResponse", res);
            if (res.access_token) {
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                console.log("Access Token:", res.access_token);
                console.log("Refresh Token:", res.refresh_token);
            } else {
                console.warn("No access token found in response");
            }
            const successMessage = res.message || "OTP verified successfully!";
            console.log("Success:", successMessage);
            toast.success(successMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#00BF63",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            navigate("/confirm_password");
        } catch (error) {
            const errorMessage = error.data?.message || "OTP verification failed!";
            console.log("Error:", errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
        }
    };

    const handleResendClick = async () => {
        const email = localStorage.getItem("userEmail");

        if (!email) {
            toast.error("Email not found. Please register again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            return;
        }

        try {
            const res = await resendOtp({ email }).unwrap();
            setIsModalOpen(true);
            toast.success(res.message || "OTP resent successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#00BF63",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);
            
            setOtp(["", "", "", ""]);// Close modal after 3 seconds
        } catch (error) {
            const errorMessage = error.data?.message || "Failed to resend OTP!";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: {
                    background: "#ff4d4f",
                    color: "#fff",
                    fontWeight: "semibold",
                    borderRadius: "8px",
                },
            });
            setIsModalOpen(false); // Close modal immediately on error
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="flex w-full h-screen lg:flex-row flex-col justify-between items-center nunito">
            {/* Left Side: Image */}
            <div className="lg:w-1/2 w-full md:h-screen pr-[24px] ">
                <img
                    src={registration_img}
                    alt="Registration illustration"
                    className="w-full h-screen lg:py-10 lg:pl-16"
                />
            </div>

            {/* Right Side: Verification Form */}
            <div className="lg:w-1/2 w-full p-3">
                <div className="text-center lg:mb-20 mb-10">
                    <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
                    <p className="text-3xl text-[#000000]">Logo here</p>
                </div>
                <div className="justify-center flex mx-auto rounded md:px-10 px-4 lg:py-20 py-4">
                    <div className="text-center lx:space-y-8 space-y-4">
                        {/* Header Text */}
                        <p className="md:text-lg text-sm text-[#012939] font-semibold">
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
                                className={`text-blue-500 cursor-pointer underline ${isResending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                click here..
                            </span>
                        </p>

                        {/* Confirm Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`bg-[#1B97D8] text-[#F6F8FA] px-6 py-2 rounded-[8px] text-[16px] font-bold w-[123px] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Verifying...' : 'Confirm'}
                        </button>
                    </div>
                    <ToastContainer/>
                </div>
            </div>

            {/* Modal for Resend Link */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50 z-50"
                    onClick={handleBackdropClick}
                >
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg space-y-8 py-10">
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

export default ConfirmPasswordVerification;