
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

  export const formatDate = (date: string, locale = "en-US") => {
    const ordinalRules = new Intl.PluralRules(locale, { type: "ordinal" });
  
    const getOrdinalSuffix = (day: number) => {
      const suffixes: { [key: string]: string } = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th",
      };
      return suffixes[ordinalRules.select(day)];
    };
  
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString(locale, { month: "long" });
    const year = dateObj.getFullYear();
  
    const dayWithOrdinal = `${day}${getOrdinalSuffix(day)}`;
  
    return `${month} ${dayWithOrdinal}, ${year}`;
  };
  
