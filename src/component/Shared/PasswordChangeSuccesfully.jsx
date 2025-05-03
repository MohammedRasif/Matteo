
import { Link } from 'react-router-dom';
import registration_img from '../image/Maskgroup.png'; // Adjust path as needed

function PasswordChangeSuccesfully() {
    return (
        <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
            <div className="w-1/2 h-screen">
                <img
                    src={registration_img}
                    alt="Registration illustration"
                    className="w-full h-screen p-10"
                />
            </div>
            <div className="w-1/2 lg:px-40">
                <div className="text-center mb-20">
                    <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
                    <p className="text-3xl text-[#000000]">Logo here</p>
                </div>
                <div className="p-4">
                    <div className="w-full rounded-lg bg-[#F8FCFF] py-14 shadow-md">
                        <div className="flex flex-col items-center justify-center space-y-6">
                            {/* Success Icon */}
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1B97D8] text-white">
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

                            {/* Success Message */}
                            <h2 className="text-center text-lg font-medium text-[#012939]">
                                Password changed successfully
                            </h2>

                            {/* Back to Login Button */}
                            <Link
                                to="/login"
                                className="flex items-center justify-center rounded-[8px] bg-[#1B97D8] px-4 py-2 text-[#F6F8FA] w-[194px] transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back To login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordChangeSuccesfully;