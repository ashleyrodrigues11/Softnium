import CryptoJS from "crypto-js";

const KEY = CryptoJS.enc.Utf8.parse("12345678901234567890123456789012");
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

export const encryptPayload = (data) => {
    const stringified = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(stringified, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
};

export const decryptPayload = (encryptedString) => {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedString, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedStr);
    } catch (e) {
        console.error("Failed to decrypt payload", e);
        return null;
    }
};
