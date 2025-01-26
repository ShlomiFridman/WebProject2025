import React from "react"; // Import React for creating the component

// Define interface for props
interface TextAreaProps {
  label: string; // The label for the textarea
  name: string; // The name of the textarea (used for form handling)
  value: string; // The current value of the textarea
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // The handler for changes to the value
  required?: boolean; // Optional field to specify if the textarea is required
}

// Functional component to render the TextArea
const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  required = false, // Default to false if not provided
}) => (
  <div className="mb-4"> {/* Wrapper div for styling */}
    <label className="block font-semibold mb-1">{label}</label> {/* Label for the textarea */}
    <textarea
      name={name} // Set name for the textarea
      value={value} // Bind value to the passed in prop value
      onChange={onChange} // Set onChange handler for value updates
      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" // Apply styling
      required={required} // If required is true, it makes the field required
    />
  </div>
);

export default TextArea; // Export the TextArea component for use in other parts of the app
