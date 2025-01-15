
import CryptoJS from 'crypto-js';

export const encryptData = (data: object, secretKey: string = "TouRingo"): string => {
    const stringifiedData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(stringifiedData, secretKey).toString();
    return encryptedData;
  };

export const decryptData = (encryptedData: string | null, secretKey: string = "TouRingo"): object | null => {
    if (encryptedData == null)
        return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  };