import { useLocation } from "react-router-dom";

const AdminDashboardChats = () => {
    const user = useLocation().state;
    console.log(user);
    return (
        <div>
            <h1>{user.user.message}</h1>
        </div>
    );
}

export default AdminDashboardChats;
