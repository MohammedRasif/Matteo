import { useState } from "react";
import login_img from "../image/Mask group.png";
import { LuLockKeyhole } from "react-icons/lu";
import { NavLink } from "react-router-dom";

function ConfirmPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log({ password, confirmPassword });
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
            <div className="w-1/2 h-screen">
                <img
                    src={login_img}
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
                    {/* <h2 className="text-[28px] font-medium text-center text-[#012939] mb-6">
            Confirm Password
          </h2> */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder={passwordFocused ? "" : "Password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(password !== "")}
                                className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                                required
                                aria-required="true"
                            />
                            {!passwordFocused && (
                                <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder={confirmPasswordFocused ? "" : "Confirm Password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setConfirmPasswordFocused(true)}
                                onBlur={() => setConfirmPasswordFocused(confirmPassword !== "")}
                                className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
                                required
                                aria-required="true"
                            />
                            {!confirmPasswordFocused && (
                                <LuLockKeyhole className="text-[#959AA6] absolute bottom-3 left-3" />
                            )}
                        </div>

                        <div className="flex justify-center mt-16">
                            <NavLink to="/password_change_succesfull">
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

export default ConfirmPassword;