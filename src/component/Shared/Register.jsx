
// import { useState } from "react";
// import registration_img from '../image/Mask group.png';
// import { LuLockKeyhole } from "react-icons/lu";
// import { MdEmail } from "react-icons/md";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../../Redux/feature/authApi";

// function Register() {
//     const [email, setEmail] = useState("");
//     const [userType, setUserType] = useState("Student");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [emailFocused, setEmailFocused] = useState(false);
//     const [passwordFocused, setPasswordFocused] = useState(false);
//     const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
//     const [register, { isLoading }] = useRegisterMutation();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log({ email, userType, password, confirmPassword });
//         // Add your form submission logic here (e.g., API call)
//     };

//     return (
//         <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
//             <div className="w-1/2 h-screen ">
//                 <img
//                     src={registration_img}
//                     alt="Registration illustration"
//                     className= " w-full h-screen p-10 "
//                 />
//             </div>
//             <div className="w-1/2 lg:px-40">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
//                     <p className="text-3xl text-[#000000]">Logo here</p>
//                 </div>

//                 <h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
//                     Welcome to ChaskiX
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="relative">
//                         <label className="block text-gray-700  mt-2">Email</label>
//                         <input
//                             type="email"
//                             placeholder= "user@gmail.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             onFocus={() => setEmailFocused(true)}
//                             onBlur={() => setEmailFocused(email !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
                     
//                             <MdEmail className="text-[#959AA6] bottom-[12px] left-3 absolute" />
                        
//                     </div>

//                     <div className="flex justify-between items-center">
//                         <label className="block text-gray-700 mb-2">
//                             What describes you best?
//                         </label>
//                         <select
//                             value={userType}
//                             onChange={(e) => setUserType(e.target.value)}
//                             className="w-1/2 px-8 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded"
//                         >
//                             <option value="Student">Student</option>
//                             <option value="Hostler">Hostler</option>
//                             <option value="Entrepreneur">Entrepreneur</option>
//                             <option value="Educator">Educator</option>
//                             <option value="Strategist">Strategist</option>
//                         </select>
//                     </div>

//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Password</label>
//                         <input
//                             type="password"
//                             placeholder= "Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onFocus={() => setPasswordFocused(true)}
//                             onBlur={() => setPasswordFocused(password !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
                      
//                             <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
                       
//                     </div>

//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Confirm Password</label>
//                         <input
//                             type="password"
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             onFocus={() => setConfirmPasswordFocused(true)}
//                             onBlur={() => setConfirmPasswordFocused(confirmPassword !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
                       
//                             <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
                      
//                     </div>

//                     <div className="flex justify-center mt-16">
//                         <button
//                             type="submit"
//                             className="bg-[#1B97D8] text-white rounded mx-auto px-6 py-2 cursor-pointer w-[123px]"
//                         >
//                             Register
//                         </button>
//                     </div>

//                     <p className="text-center text-gray-600">
//                         Already have an account?{" "}
//                         <NavLink to="/login">
//                         <a  className="text-[#1B97D8]">
//                             Login
//                         </a>
//                         </NavLink>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Register;

import { useState } from "react";
import registrationImage from '../image/Maskgroup.png'; // Renamed image
import { LuLockKeyhole } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/feature/authApi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Student"); // Renamed userType to role
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const userData = {
            email,
            role,
            password
        };

        try {
            await register(userData).unwrap();
            toast.success("Registration successful!");
            navigate('/verification');
        } catch (error) {
            toast.error(error?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-1/2 h-screen">
                <img
                    src={registrationImage}
                    alt="Registration illustration"
                    className="w-full h-screen p-10"
                />
            </div>
            <div className="w-1/2 lg:px-40">
                <div className="text-center mb-6">
                    <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
                    {/* Replace with actual logo */}
                    
                </div>

                <h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
                    Welcome to ChaskiX
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700 mt-2">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="user@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                            required
                        />
                        <MdEmail className="text-[#959AA6] bottom-[12px] left-3 absolute" />
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="block text-gray-700 mb-2">
                            What describes you best?
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-1/2 px-8 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded"
                        >
                            <option value="student">Student</option>
                            <option value="sostler">Hostler</option>
                            <option value="entrepreneur">Entrepreneur</option>
                            <option value="educator">Educator</option>
                            <option value="strategist">Strategist</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                            required
                        />
                        <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
                    </div>

                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                            required
                        />
                        <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
                    </div>

                    <div className="flex justify-center mt-16">
                        <button
                            type="submit"
                            className="bg-[#1B97D8] text-white rounded mx-auto px-6 py-2 cursor-pointer w-[123px] disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </div>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <NavLink to="/login">
                            <span className="text-[#1B97D8]">Login</span>
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;