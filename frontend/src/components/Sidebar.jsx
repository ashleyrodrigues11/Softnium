import { NavLink, useNavigate } from "react-router-dom";
import {
    FaChartBar,
    FaUsers,
    FaMoneyBill,
    FaSignOutAlt,
} from "react-icons/fa";

import logo from "../assets/SoftNium_Logo.png";
import { logout } from "../services/auth";

export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
            ? "bg-lime-100 text-lime-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100"
        }`;

    return (
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">

            <div className="p-6 border-b border-gray-100">
                <img src={logo} alt="SoftNium" className="w-40 mx-auto" />
            </div>

            <nav className="flex-1 p-4 space-y-2">

                <NavLink to="/dashboard" className={linkClass}>
                    <FaChartBar />
                    Dashboard
                </NavLink>

                <NavLink to="/clients" className={linkClass}>
                    <FaUsers />
                    Clients
                </NavLink>

                <NavLink to="/payments" className={linkClass}>
                    <FaMoneyBill />
                    Payments
                </NavLink>

            </nav>

            <div className="p-4 border-t border-gray-100">

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </div>
    );
}