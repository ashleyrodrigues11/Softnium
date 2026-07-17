import api from "./api";
import { setEncryptedToken, clearTokens } from "../utils/storage";

export const login = async (email, password) => {
    const response = await api.post("login/", {
        email,
        password,
    });

    setEncryptedToken("access", response.data.access);
    setEncryptedToken("refresh", response.data.refresh);

    return response.data;
};

export const logout = () => {
    clearTokens();
};