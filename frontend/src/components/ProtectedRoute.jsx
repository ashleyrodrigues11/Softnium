import { Navigate } from "react-router-dom";
import { getDecryptedToken } from "../utils/storage";

export default function ProtectedRoute({ children }) {

    const accessToken = getDecryptedToken("access");
    const refreshToken = getDecryptedToken("refresh");

    if (!accessToken && !refreshToken) {
        return <Navigate to="/" replace />;
    }

    return children;
}