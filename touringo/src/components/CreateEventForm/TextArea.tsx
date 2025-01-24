import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      required={required}
    />
  </div>
);

export default TextArea;
