import React from "react"; // Import React to create a functional component

// Define interface for DateInput props
interface DateInputProps {
  label: string; // The label that appears next to the input field
  name: string; // The name of the input field, typically used in form submission
  value: string; // The current value of the input field (in YYYY-MM-DD format)
  min?: string; // Optional prop to set a minimum date for the input field (e.g., restrict to future dates)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle changes to the input value
  required?: boolean; // Optional prop to make the field required for form submission
}

// Create the DateInput functional component with props defined above
const DateInput: React.FC<DateInputProps> = ({
  label, // Display label for the input field
  name, // Use this name for the input field
  value, // The value for the input, typically a date string
  min, // The minimum date for the input
  onChange, // Handler function for when the value of the input changes
  required = false, // Default to false if not specified
}) => (
  // Return JSX structure for rendering the input field
  <div className="mb-4"> {/* Container for the label and input */}
    <label className="block font-semibold mb-1">{label}</label> {/* The label element */}
    <input
      type="date" // Specifies that this is a date input field
      name={name} // Set the name for form data handling
      value={value} // The value prop binds the current date value
      min={min} // Optional minimum date for input validation
      onChange={onChange} // Triggered when the input value changes
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" // Apply TailwindCSS styling
      required={required} // Set field as required based on prop
    />
  </div>
);

export default DateInput; // Export the component for use in other parts of the application
