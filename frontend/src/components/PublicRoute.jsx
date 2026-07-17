import { Navigate } from "react-router-dom";
import { getDecryptedToken } from "../utils/storage";

export default function PublicRoute({ children }) {

    const accessToken = getDecryptedToken("access");
    const refreshToken = getDecryptedToken("refresh");

    if (accessToken || refreshToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}