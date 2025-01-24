import React from "react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Phone *</label>
    <input
      type="text"
      name="phone"
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      required
    />
  </div>
);

export default PhoneInput;
