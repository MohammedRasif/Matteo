// import { useState } from "react";
// import login_img from "../image/Maskgroup.png";
// import { LuLockKeyhole } from "react-icons/lu";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useConfirmPasswordMutation } from "../../Redux/feature/authApi";

// function ConfirmPassword() {
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [passwordFocused, setPasswordFocused] = useState(false);
//     const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
//     const navigate = useNavigate();
//     const [resendOtp, { isLoading: isResending }] = useConfirmPasswordMutation();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }
//         console.log({ password, confirmPassword });
//         // Add your form submission logic here (e.g., API call)
//     };

//     return (
//         <div className="flex items-center lg:flex-row flex-col justify-between w-full min-h-screen gap-10 nunito">
//             <div className="lg:w-1/2 w-full h-screen">
//                 <img
//                     src={login_img}
//                     alt="Registration illustration"
//                     className="w-full h-screen p-10 lg:pl-16"
//                 />
//             </div>
//             <div className="lg:w-1/2 w-full lg:px-40">
//                 <div className="text-center mb-20">
//                     <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
//                     <p className="text-3xl text-[#000000]">Logo here</p>
//                 </div>

//                 <div className="rounded px-10 py-20">
//                     {/* <h2 className="text-[28px] font-medium text-center text-[#012939] mb-6">
//             Confirm Password
//           </h2> */}
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="relative">
//                             <label htmlFor="password" className="block text-gray-700 mb-2">
//                                 Password
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 onFocus={() => setPasswordFocused(true)}
//                                 onBlur={() => setPasswordFocused(password !== "")}
//                                 className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                                 required
//                                 aria-required="true"
//                             />
                           
//                                 <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
                            
//                         </div>

//                         <div className="relative">
//                             <label
//                                 htmlFor="confirmPassword"
//                                 className="block text-gray-700 mb-2"
//                             >
//                                 Confirm Password
//                             </label>
//                             <input
//                                 id="confirmPassword"
//                                 type="password"
//                                 placeholder={confirmPasswordFocused ? "" : "Confirm Password"}
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 onFocus={() => setConfirmPasswordFocused(true)}
//                                 onBlur={() => setConfirmPasswordFocused(confirmPassword !== "")}
//                                 className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                                 required
//                                 aria-required="true"
//                             />
//                             {!confirmPasswordFocused && (
//                                 <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
//                             )}
//                         </div>

//                         <div className="flex justify-center mt-16">
//                             <NavLink to="/password_change_succesfull">
//                             <button
//                                 type="submit"
//                                 className="bg-[#1B97D8] text-white rounded-[8px] mx-auto px-6 py-2 cursor-pointer w-[123px]"
//                             >
//                                 Confirm
//                             </button>
//                             </NavLink>

//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ConfirmPassword;


import { useState } from "react";
import login_img from "../image/Maskgroup.png";
import { LuLockKeyhole } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useConfirmPasswordMutation } from "../../Redux/feature/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const [confirmPasswordMutation, { isLoading: isConfirming }] = useConfirmPasswordMutation();

    const showToast = (message, type = "info") => {
        toast[type](message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showToast("Passwords do not match!", "error");
            return;
        }

        const email = localStorage.getItem("email");

        if (!email) {
            toast.error("Email not found. Please request a new reset link.", {
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

        const passwordData = {
            new_password: password,
            email: email,
        };

        try {
            const response = await confirmPasswordMutation(passwordData).unwrap();

            showToast("Password updated successfully!", "success");

            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to update password. Please try again.";
            showToast(errorMessage, "error");
            console.error("Password update error:", error);
        }
    };


    // more update ...........................

    return (
        <div className="flex items-center lg:flex-row flex-col justify-between w-full min-h-screen gap-10 nunito bg-gray-50">
            <ToastContainer />
            <div className="lg:w-1/2 w-full h-screen">
                <img
                    src={login_img}
                    alt="Password reset illustration"
                    className="w-full h-full object-cover p-10 lg:pl-16"
                />
            </div>

            <div className="lg:w-1/2 w-full px-4 lg:px-40 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black mb-2">ChaskiX</h1>
                    <p className="text-xl text-gray-600">Reset Your Password</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg px-8 py-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border bg-[#F8FCFF] border-[#5C91B1] rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#1B97D8] transition duration-200"
                                required
                                disabled={isConfirming}
                            />
                            <LuLockKeyhole className="absolute top-12 left-3 text-[#959AA6]" />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border bg-[#F8FCFF] border-[#5C91B1] rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-[#1B97D8] transition duration-200"
                                required
                                disabled={isConfirming}
                            />
                            <LuLockKeyhole className="absolute top-12 left-3 text-[#959AA6]" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className={`bg-[#1B97D8] text-white rounded-lg px-8 py-3 w-full max-w-[200px] font-medium ${
                                    isConfirming
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-[#1581b6] transition duration-200"
                                }`}
                                disabled={isConfirming}
                            >
                                {isConfirming ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPassword;

