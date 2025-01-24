import React from "react";

interface DescriptionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Description *</label>
    <textarea
      name="description"
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      required
    />
  </div>
);

export default DescriptionInput;
