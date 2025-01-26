import CryptoJS from 'crypto-js';

// Function to encrypt data using AES algorithm and a secret key
export const encryptData = (data: object, secretKey: string = "TouRingo"): string => {
    const stringifiedData = JSON.stringify(data); // Convert data to string format
    const encryptedData = CryptoJS.AES.encrypt(stringifiedData, secretKey).toString(); // Encrypt and return as string
    return encryptedData;
};

// Function to decrypt AES-encrypted data using a secret key
export const decryptData = (encryptedData: string | null, secretKey: string = "TouRingo"): object | null => {
    if (encryptedData == null)
        return null; // Return null if there's no data to decrypt
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey); // Decrypt the data
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes back to string format
    return JSON.parse(decryptedData); // Parse the decrypted JSON string
};

// Function to format a date into a human-readable format with an ordinal suffix
export const formatDate = (date: string, locale = "en-US") => {
    const ordinalRules = new Intl.PluralRules(locale, { type: "ordinal" }); // Get ordinal suffix based on locale
  
    // Function to get the ordinal suffix for a day
    const getOrdinalSuffix = (day: number) => {
      const suffixes: { [key: string]: string } = {
        one: "st", // 1st
        two: "nd", // 2nd
        few: "rd", // 3rd
        other: "th", // 4th and beyond
      };
      return suffixes[ordinalRules.select(day)]; // Return the appropriate suffix
    };
  
    const dateObj = new Date(date); // Convert the string date to Date object
    const day = dateObj.getDate(); // Get the day
    const month = dateObj.toLocaleString(locale, { month: "long" }); // Get month name
    const year = dateObj.getFullYear(); // Get year
  
    const dayWithOrdinal = `${day}${getOrdinalSuffix(day)}`; // Append ordinal suffix to the day
  
    return `${month} ${dayWithOrdinal}, ${year}`; // Format and return the full date string
};
  
// Function to compare two date strings and return the later one
export const getMaxDate = (dateStr1: string, dateStr2: string): string => {
    const date1 = new Date(dateStr1); // Convert date string to Date object
    const date2 = new Date(dateStr2); // Convert the second date string to Date object
  
    // Compare the two dates and return the maximum one
    return date1 > date2 ? dateStr1 : dateStr2;
}

// Function to convert a Date object to a simple string format (yyyy-mm-dd)
export const dateToFormat = (date: Date): string => {
    return date.toISOString().slice(0, 10); // Convert date to ISO format and slice to get only the date part
}
