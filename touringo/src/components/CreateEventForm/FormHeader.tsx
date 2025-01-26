import React from "react"; // Import React to create the component

// Define the interface for the FormHeader props
interface FormHeaderProps {
  title: string; // The title text to display
  subTitle: string; // The subtitle text to display (likely an instruction or warning)
}

// Create the FormHeader functional component with props
const FormHeader: React.FC<FormHeaderProps> = ({ title, subTitle }) => (
  // Return JSX structure for the header with title and subtitle
  <div className="mb-6"> {/* Bottom margin */}
    <div className="text-xl font-bold">{title}</div> {/* Title with larger font and bold */}
    <div className="text-l text-red-500">{subTitle}</div> {/* Subtitle with smaller text and red color */}
  </div>
);

export default FormHeader; // Export the component for use in other parts of the application
