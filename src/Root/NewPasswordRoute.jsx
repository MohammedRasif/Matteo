import { Navigate } from "react-router-dom";

const NewPasswordRoute = ({ children }) => {
    const isVerified = localStorage.getItem("otp");

    if (!isVerified) {
        return <Navigate to="/confirm_password_verification" replace />;
    }

    return children;
};

export default NewPasswordRoute;