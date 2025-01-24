import React from "react";

interface EventNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventNameInput: React.FC<EventNameInputProps> = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">Event Name *</label>
    <input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      required
    />
  </div>
);

export default EventNameInput;
