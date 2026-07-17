import CryptoJS from "crypto-js";

const SECRET_KEY = "my_super_secret_encryption_key"; // In production, this should ideally be in a .env file

export const setEncryptedToken = (key, value) => {
    if (!value) return;
    const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
    localStorage.setItem(key, encrypted);
};

export const getDecryptedToken = (key) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted || null;
    } catch (e) {
        return null;
    }
};

export const removeToken = (key) => {
    localStorage.removeItem(key);
};

export const clearTokens = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};
