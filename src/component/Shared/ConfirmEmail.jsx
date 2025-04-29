import { useState } from "react";
import registration_img from '../image/Mask group.png';

import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

function ConfirmEmail() {
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("Student");

    const [emailFocused, setEmailFocused] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, userType, });
        // Add your form submission logic here (e.g., API call)
    };

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

                <div className="bg-[#F8FCFF] shadow-md rounded px-10 py-20">
                    <h2 className="text-[28px] font-medium text-center text-[#012939] mb-6">
                        Confirm email
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative py-10">
                            <label className="block text-gray-700  mb-2">Email</label>
                            <input
                                type="email"
                                placeholder={emailFocused ? "" : "user@gmail.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(email !== "")}
                                className="w-full  px-4 py-3 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                                required
                            />
                            {!emailFocused && (
                                <MdEmail className="text-[#959AA6] bottom-[58px] left-3 absolute" />
                            )}
                        </div>

                        <div className="flex justify-center mt-16">
                            <NavLink to="/verification">
                                <button
                                    type="submit"
                                    className="bg-[#1B97D8] text-white rounded-[8px] mx-auto px-6 py-2 cursor-pointer w-[123px]"
                                >
                                    Confirm
                                </button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmail;