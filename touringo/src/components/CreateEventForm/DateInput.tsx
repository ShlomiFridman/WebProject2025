import React from "react";

interface DateInputProps {
  label: string;
  name: string;
  value: string;
  min?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  value,
  min,
  onChange,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      min={min}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      required={required}
    />
  </div>
);

export default DateInput;
