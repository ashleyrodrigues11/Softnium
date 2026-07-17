import axios from "axios";
import { getDecryptedToken, setEncryptedToken, clearTokens } from "../utils/storage";
import { encryptPayload, decryptPayload } from "../utils/crypto";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {

    const token = getDecryptedToken("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data) {
        config.data = { payload: encryptPayload(config.data) };
    }

    return config;
});

api.interceptors.response.use(

    (response) => {
        if (response.data && response.data.payload) {
            response.data = decryptPayload(response.data.payload);
        }
        return response;
    },

    async (error) => {
        if (error.response?.data?.payload) {
            error.response.data = decryptPayload(error.response.data.payload);
        }

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("login")
        ) {

            originalRequest._retry = true;

            const refresh = getDecryptedToken("refresh");

            if (!refresh) {

                clearTokens();
                window.location.href = "/";

                return Promise.reject(error);
            }

            try {

                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        payload: encryptPayload({ refresh: refresh })
                    }
                );

                const data = response.data.payload ? decryptPayload(response.data.payload) : response.data;

                const newAccess = data.access;

                setEncryptedToken("access", newAccess);
                
                if (data.refresh) {
                    setEncryptedToken("refresh", data.refresh);
                }

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            } catch (err) {

                clearTokens();

                window.location.href = "/";

                return Promise.reject(err);

            }

        }

        return Promise.reject(error);

    }

);

export default api;