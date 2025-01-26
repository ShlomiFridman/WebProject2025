import React from "react";

// Define types for the CheckboxGroup component props
interface CheckboxGroupProps {
  // Label for the group of checkboxes
  label: string;
  // Array of strings representing each checkbox item
  items: string[];
  // Array of booleans representing the checked state of each checkbox
  values: boolean[];
  // Optional array of booleans for disabling specific checkboxes (default is empty array)
  disabledItems?: boolean[];
  // Function to handle change when a checkbox is toggled
  onChange: (index: number) => void;
}

// CheckboxGroup component definition
const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  items,
  values,
  disabledItems = [], // Default to empty array if not provided
  onChange,
}) => (
  <div className="mb-4">
    {/* Render the label of the checkbox group */}
    <label className="block font-semibold mb-1">{label}</label>
    
    {/* Render each checkbox with its label */}
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <label key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values[index]}  // Set checked state based on values array
            onChange={() => onChange(index)}  // Call onChange when checkbox is toggled
            disabled={disabledItems[index]}  // Disable checkbox if specified in disabledItems
          />
          {item}  {/* Display the text label for the checkbox */}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;
