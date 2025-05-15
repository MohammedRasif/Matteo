

import React, { useRef, useState, useEffect } from 'react';
import registration_img from '../image/Maskgroup.png';
import { useNavigate } from 'react-router-dom';
import { useRegisterVerificationMutation, useResendOtpMutation } from '../../Redux/feature/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verification() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [focused, setFocused] = useState([false, false, false, false]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRefs = useRef([]);
    const [registerVerification, { isLoading: isVerifying }] = useRegisterVerificationMutation();
    const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
    const navigate = useNavigate();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const showToast = (type, message, bg = '#ff4d4f') => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            style: {
                background: bg,
                color: '#fff',
                fontWeight: 'semibold',
                borderRadius: '8px',
            },
            delay: 100,
        });
    };

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
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

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData('text').trim();
        if (!/^\d{4}$/.test(pasteData)) return;

        const newOtp = pasteData.split('');
        setOtp(newOtp);

        const lastIndex = newOtp.length - 1;
        inputRefs.current[lastIndex]?.focus();
    };

    

    const handleSubmit = async () => {
        const email = localStorage.getItem('userEmail');
        const otpString = otp.join('');

        if (!email) {
            showToast('error', 'Email not found. Please register again.');
            navigate('/register');
            return;
        }

        if (otpString.length !== 4 || !/^\d{4}$/.test(otpString)) {
            showToast('error', 'Please enter a valid 4-digit OTP.');
            return;
        }
        

        try {
            const res = await registerVerification({ email, otp: otpString }).unwrap();
            if (!res.access_token) throw new Error(res.message || 'Invalid OTP');

            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);

            showToast('success', res.message || 'OTP verified successfully!', '#00BF63');
            navigate('/');
            setOtp(["", "", "", ""]);
        } catch (error) {
            console.log('Verification Error:', error);
            const errorMessage = error.data?.message || 'OTP verification failed!';
            showToast('error', errorMessage);
        }
    };

    const handleResendClick = async () => {
        const email = localStorage.getItem('userEmail');

        if (!email) {
            showToast('error', 'Email not found. Please register again.');
            navigate('/register');
            return;
        }

        try {
            await resendOtp({ email }).unwrap();
            setIsModalOpen(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setOtp(['', '', '', '']);
            }, 2000);
        } catch (error) {
            console.log('Resend OTP Error:', error);
            const errorMessage = error.data?.message || 'Failed to resend OTP.';
            showToast('error', errorMessage);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex w-full h-screen lg:flex-row flex-col justify-between items-center nunito">
            {/* Left Side: Image */}
            <div className="lg:w-1/2 w-full md:h-screen pr-[24px]">
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
                                    type="tel"
                                    maxLength="1"
                                    aria-label={`OTP digit ${index + 1}`}
                                    placeholder={focused[index] || digit ? '' : '*'}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onFocus={() => handleFocus(index)}
                                    onBlur={() => handleBlur(index)}
                                    onPaste={handlePaste}
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
                            disabled={isVerifying}
                            className={`bg-[#1B97D8] text-[#F6F8FA] px-6 py-2 rounded-[8px] text-[16px] font-bold w-[123px] cursor-pointer ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isVerifying ? 'Verifying...' : 'Confirm'}
                        </button>
                    </div>
                    <ToastContainer />
                </div>
            </div>

            {/* Modal */}
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

export default Verification;



