import React from "react"; // Import React for creating the component

// Define the props interface for the component
interface TimeInputProps {
  label: string; // The label to display for the input field
  name: string; // The name of the input field
  value: string; // The current value of the input field
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for the change event
  required?: boolean; // Optional flag to mark the field as required
}

// Functional component for the TimeInput
const TimeInput: React.FC<TimeInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false, // Default to false if not provided
}) => (
  <div className="mb-4"> {/* Wrapper for the input field */}
    <label className="block font-semibold mb-1">{label}</label> {/* Label for the input */}
    <input
      type="time" // Specifies that this is a time input field
      name={name} // Name for the input
      value={value} // Controlled value from the parent component
      onChange={onChange} // Handle changes to the value
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" // Styling for the input
      required={required} // Makes the field required if true
    />
  </div>
);

export default TimeInput; // Export the component for use in other parts of the app
