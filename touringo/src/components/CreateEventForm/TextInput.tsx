import React from "react"; // Import React for creating the component

// Define interface for props
interface TextInputProps {
  label: string; // The label for the input field
  name: string; // The name of the input (used for form handling)
  value: string; // The current value of the input field
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // The handler for input changes
  required?: boolean; // Optional field to specify if the input is required
}

// Functional component to render the TextInput
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false, // Default to false if not provided
}) => (
  <div className="mb-4"> {/* Wrapper div for styling */}
    <label className="block font-semibold mb-1">{label}</label> {/* Label for the input */}
    <input
      type="text" // Specifies the type as text input
      name={name} // Set the name for the input
      value={value} // Bind the input field value to the passed in prop value
      onChange={onChange} // Set onChange handler to update the value
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" // Apply styling
      required={required} // If required is true, make the field required
    />
  </div>
);

export default TextInput; // Export the TextInput component for use in other parts of the app
