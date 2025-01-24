import React from "react";

interface DateInputGroupProps {
  startDate: string;
  endDate: string;
  minDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInputGroup: React.FC<DateInputGroupProps> = ({
  startDate,
  endDate,
  minDate,
  onChange,
}) => (
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block font-semibold mb-1">Start Date *</label>
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={onChange}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        min={minDate}
        required
      />
    </div>
    <div>
      <label className="block font-semibold mb-1">End Date *</label>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={onChange}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        min={startDate}
        required
      />
    </div>
  </div>
);

export default DateInputGroup;
