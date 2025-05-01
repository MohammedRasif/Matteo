

// import { useState } from "react";
// import login_img from '../image/Maskgroup.png';
// import { LuLockKeyhole } from "react-icons/lu";
// import { MdEmail } from "react-icons/md";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../Redux/feature/authApi";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [emailFocused, setEmailFocused] = useState(false);
//     const [passwordFocused, setPasswordFocused] = useState(false);
//     const [Login, { isLoading }] = useLoginMutation();
//     const navigate = useNavigate()

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ email, password });
//     };



//     return (
//         <div className="flex items-center justify-between w-full min-h-screen gap-10 nunito">
//             <div className="w-1/2 h-screen">
//                 <img
//                     src={login_img}
//                     alt="Registration illustration"
//                     className="w-full h-screen p-10"
//                 />
//             </div>
//             <div className="w-1/2 lg:px-40">
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
//                     <p className="text-3xl text-[#000000]">Logo here</p>
//                 </div>

//                 <h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
//                     Welcome Back to ChaskiX
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Email</label>
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

//                     <div className="relative">
//                         <label className="block text-gray-700 mb-2">Password</label>
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onFocus={() => setPasswordFocused(true)}
//                             onBlur={() => setPasswordFocused(password !== "")}
//                             className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
//                             required
//                         />
                        
//                             <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
                        
//                     </div>
//                     <NavLink to="/confirm_email">
//                         <p className="text-[16px] text-[#1B97D8] text-end underline">Forget Password?</p>
//                     </NavLink>

//                     <div className="flex justify-center mt-16">

//                         <button
//                             type="submit"
//                             className="bg-[#1B97D8] text-white rounded mx-auto px-6 py-2 cursor-pointer"
//                         >
//                             Login
//                         </button>

//                     </div>

//                     <p className="text-center text-gray-600 mt-6">
//                         Don’t have account?{" "}
//                         <NavLink to="/registration">
//                             <a className="text-[#1B97D8] border rounded-lg p-1 border-[#1B97D8]">
//                                 Sign Up
//                             </a>
//                         </NavLink>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;


import { useState } from "react";
import login_img from "../image/Maskgroup.png";
import { LuLockKeyhole } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/feature/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!email || !password) {
      console.log("Missing fields");
      toast.error("Please fill in all fields.", {
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

    const loginData = { email, password };

    try {
      const res = await login(loginData).unwrap();
      console.log("Login response:", res);
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        console.log("Access Token:", res.access_token);
        console.log("Refresh Token:", res.refresh_token);
      } else {
        console.warn("No access token found in response");
      }
      const successMessage = res.message || "Login successful!";
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
      navigate("/");
    } catch (error) {
      const errorMessage = error.data?.message || "Login failed!";
      console.log("Login error:", errorMessage);
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

  return (
    <div className="flex items-center lg:flex-row flex-col justify-between w-full min-h-screen gap-10 nunito">
      <ToastContainer/>
      <div className="lg:w-1/2 w-full lg:h-screen">
        <img
          src={login_img}
          alt="Registration illustration"
          className="w-full h-screen md:py-10 p-6"
        />
      </div>
      <div className="lg:w-1/2 w-full lg:px-40 p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl text-[#000000]">ChaskiX</h1>
          <p className="text-3xl text-[#000000]">Logo here</p>
        </div>

        <h2 className="text-[40px] font-semibold text-center text-[#012939] mb-6">
          Welcome Back to ChaskiX
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(email !== "")}
              className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
           
              disabled={isLoading}
            />
            <MdEmail className="text-[#959AA6] bottom-[12px] left-3 absolute" />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(password !== "")}
              className="w-full px-4 py-2 border bg-[#F8FCFF] border-[#5C91B1] rounded pl-10"
            
              disabled={isLoading}
            />
            <LuLockKeyhole className="text-[#959AA6] absolute bottom-[14px] left-3" />
          </div>
          <NavLink to="/confirm_email">
            <p className="text-[16px] text-[#1B97D8] text-end underline">Forget Password?</p>
          </NavLink>

          <div className="flex justify-center mt-16">
            <button
              type="submit"
              className="bg-[#1B97D8] text-white rounded mx-auto px-6 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Don’t have account?{" "}
            <NavLink to="/registration">
              <a className="text-[#1B97D8] border rounded-lg p-1 border-[#1B97D8]">
                Sign Up
              </a>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;