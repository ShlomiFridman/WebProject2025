import React from "react"; // Import React to create a functional component

// Define the interface for the ErrorMessage props
interface ErrorMessageProps {
  message: string; // The error message string to be displayed
}

// Create the ErrorMessage functional component with props defined above
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  // Return JSX structure for rendering the error message
  <div className="mb-4 text-red-500"> {/* Styling for margin and text color */}
    <p>{message}</p> {/* The actual error message to display */}
  </div>
);

export default ErrorMessage; // Export the component for use in other parts of the application
